import { spawn } from 'node:child_process'

/**
 * 单次无输出允许的最长时长
 */
const idleTimeoutMs = Number.parseInt(process.env.VITEST_IDLE_TIMEOUT_MS ?? '60000', 10)

/**
 * 测试任务最大总时长（0 表示不启用硬超时）
 */
const hardTimeoutMs = Number.parseInt(process.env.VITEST_HARD_TIMEOUT_MS ?? '0', 10)

/**
 * 子进程退出码
 */
const TIMEOUT_EXIT_CODE = 124

/**
 * 是否为 Windows 环境
 */
const isWindows = process.platform === 'win32'

/**
 * 解析用户传入的 vitest 参数
 */
const vitestArgs = process.argv.slice(2)

/**
 * 标记是否包含 benchmark 目标\
 * 说明：benchmark 只允许通过本守护脚本运行，避免 AI 直接调用 vitest 导致长时间阻塞
 */
const containsBenchmarkTarget = vitestArgs.some((arg) => String(arg).includes('benchmark'))

/**
 * 注入给 vitest 子进程的环境变量
 */
const childEnv = {
  ...process.env,
  FORESLASH_VITEST_GUARDED: '1',
  ...(containsBenchmarkTarget ? { FORENUMBER_RUN_BENCHMARK: '1' } : {})
}

/**
 * 生成 Vitest 子进程
 */
const child = spawn(isWindows ? 'pnpm.cmd' : 'pnpm', ['vitest', ...vitestArgs], isWindows
  ? {
      stdio: ['inherit', 'pipe', 'pipe'],
      shell: true,
      env: childEnv
    }
  : {
      stdio: ['inherit', 'pipe', 'pipe'],
      detached: true,
      env: childEnv
    })

let timedOut = false
let timeoutReason = null
let idleTimer
let hardTimer

/**
 * 重置无输出计时器
 */
function resetIdleTimer() {
  if (idleTimer) clearTimeout(idleTimer)
  idleTimer = setTimeout(() => {
    timedOut = true
    timeoutReason = 'idle'
    process.stderr.write(`\n[vitest-guard] 超过 ${idleTimeoutMs}ms 无输出，强制终止测试进程\n`)
    killChildProcessTree()
  }, idleTimeoutMs)
}

/**
 * 启动总时长硬超时
 */
function startHardTimer() {
  if (!Number.isFinite(hardTimeoutMs) || hardTimeoutMs <= 0) return
  hardTimer = setTimeout(() => {
    timedOut = true
    timeoutReason = 'hard'
    process.stderr.write(`\n[vitest-guard] 超过 ${hardTimeoutMs}ms 总时长，强制终止测试进程\n`)
    killChildProcessTree()
  }, hardTimeoutMs)
}

/**
 * 清理全部定时器
 */
function clearTimers() {
  if (idleTimer) clearTimeout(idleTimer)
  if (hardTimer) clearTimeout(hardTimer)
}

/**
 * 强制终止子进程及其子树
 */
function killChildProcessTree() {
  if (!child.pid) return

  if (isWindows) {
    const killer = spawn('taskkill', ['/pid', String(child.pid), '/T', '/F'], {
      stdio: 'ignore'
    })
    killer.on('error', () => {
      try {
        child.kill('SIGKILL')
      } catch {}
    })
    return
  }

  try {
    process.kill(-child.pid, 'SIGKILL')
  } catch {
    try {
      child.kill('SIGKILL')
    } catch {}
  }
}

/**
 * 转发输出并维持存活探针
 */
function pipeWithHeartbeat(stream, target) {
  stream.on('data', (chunk) => {
    target.write(chunk)
    resetIdleTimer()
  })
}

resetIdleTimer()
startHardTimer()
pipeWithHeartbeat(child.stdout, process.stdout)
pipeWithHeartbeat(child.stderr, process.stderr)

child.on('error', (error) => {
  clearTimers()
  process.stderr.write(`[vitest-guard] 启动失败: ${error.message}\n`)
  process.exit(1)
})

child.on('exit', (code, signal) => {
  clearTimers()

  if (timedOut) {
    if (timeoutReason) {
      process.stderr.write(`[vitest-guard] 退出原因: ${timeoutReason}\n`)
    }
    process.exit(TIMEOUT_EXIT_CODE)
  }

  if (signal) {
    process.stderr.write(`[vitest-guard] 测试进程被信号终止: ${signal}\n`)
    process.exit(1)
  }

  process.exit(code ?? 1)
})
