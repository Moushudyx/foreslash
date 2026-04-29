import { spawn } from 'node:child_process'

/**
 * 单次无输出允许的最长时长
 */
const idleTimeoutMs = Number.parseInt(process.env.VITEST_IDLE_TIMEOUT_MS ?? '60000', 10)

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
 * 生成 Vitest 子进程
 */
const child = spawn(isWindows ? 'pnpm.cmd' : 'pnpm', ['vitest', ...vitestArgs], isWindows
  ? {
      stdio: ['inherit', 'pipe', 'pipe'],
      shell: true
    }
  : {
      stdio: ['inherit', 'pipe', 'pipe'],
      detached: true
    })

let timedOut = false
let idleTimer

/**
 * 重置无输出计时器
 */
function resetIdleTimer() {
  if (idleTimer) clearTimeout(idleTimer)
  idleTimer = setTimeout(() => {
    timedOut = true
    process.stderr.write(`\n[vitest-guard] 超过 ${idleTimeoutMs}ms 无输出，强制终止测试进程\n`)
    killChildProcessTree()
  }, idleTimeoutMs)
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
pipeWithHeartbeat(child.stdout, process.stdout)
pipeWithHeartbeat(child.stderr, process.stderr)

child.on('error', (error) => {
  if (idleTimer) clearTimeout(idleTimer)
  process.stderr.write(`[vitest-guard] 启动失败: ${error.message}\n`)
  process.exit(1)
})

child.on('exit', (code, signal) => {
  if (idleTimer) clearTimeout(idleTimer)

  if (timedOut) {
    process.exit(TIMEOUT_EXIT_CODE)
  }

  if (signal) {
    process.stderr.write(`[vitest-guard] 测试进程被信号终止: ${signal}\n`)
    process.exit(1)
  }

  process.exit(code ?? 1)
})
