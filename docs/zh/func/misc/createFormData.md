---
prev:
  text: 'objectListToCSV 对象列表转 CSV'
  link: './objectListToCSV'
next:
  text: 'acceptableFileName 检查拓展名'
  link: './acceptableFileName'
---

# createFormData

<VersionTag version="0.4.0" />

在没有原生 `FormData` 的环境中, 将对象编码为 `multipart/form-data` 的 `ArrayBuffer`, 可直接作为请求体发送

常见用途是在微信小程序等环境中上传文件, 也可用于任何需要构建 `multipart/form-data` 请求体, 但不支持原生 `FormData` 的场景

> [!NOTE] 注意
> 需要运行环境支持 `TextEncoder`、`Uint8Array` 和 `ArrayBuffer`
>
> 不要求原生 `Blob`, 只要对象实现 `arrayBuffer()` 方法, 并提供可选的 `name`/`type` 字段即可

## 基本用法

通常先通过 `createFormDataBoundary` 生成边界字符串, 再用 `createFormData` 构造请求体

```JS
const boundary = createFormDataBoundary()

const body = await createFormData({
  userId: 1001,
  active: true,
}, boundary)

// 可用于任何主流的网络请求方法 axios / wx.request / Taro.request
request('/upload', {
  method: 'POST',
  headers: {
    'Content-Type': `multipart/form-data; boundary=${boundary}`,
  },
  data: body,
})
```

## 示例: Taro + 微信小程序, 实现表单上传文件

微信小程序的运行环境不支持原生 `FormData` 和 `Blob`, 但 `createFormData` 支持类 `Blob` 对象（实现 `arrayBuffer()` 方法）, 可用于构建表单数据

```JS
import Taro from '@tarojs/taro'
import { createFormData, createFormDataBoundary } from 'foreslash/misc/createFormData'

async function handleUpload() {
  // 这里也可以使用 Taro.chooseMessageFile
  const res = await Taro.chooseImage({
    count: 1,
  })
  // 获取临时文件, 这里假设接口只接受一个文件, 也可以根据实际情况调整代码
  const tempFiles = res.tempFiles
  const file = tempFiles[0]
  if (!file) return
  try {
    Taro.showLoading({ title: '上传中...' })
    const fs = Taro.getFileSystemManager()
    fs.readFile({
      filePath: file.path,
      success: async ({ data }) => {
        try {
          const boundary = createFormDataBoundary()
          const formData = createFormData({
            file: {
              name: file.name,
              type: file.type,
              arrayBuffer: async () => data, // 这里的 `data` 是 `ArrayBuffer`, 直接返回即可
            },
            // ... 其他必要信息
          }, boundary)
          const result = await Taro.request({
            url: '/upload', // 接口
            method: 'POST',
            header: {
              'Content-Type': `multipart/form-data; boundary=${boundary}`,
              // ... 其他必要信息
            },
            data: formData,
          })
          if (result.success) {
            console.log('上传成功:', result)
            Taro.showToast({ title: '上传成功', icon: 'success' })
          } else {
            console.error('上传失败:', result)
            Taro.showToast({ title: '上传失败', icon: 'error' })
          }
        } catch (err) {
          console.error('上传文件出错:', err)
          Taro.showToast({ title: '上传文件出错', icon: 'error' })
        } finally {
          Taro.hideLoading()
        }
      },
      fail: (err) => {
        console.error('读取文件出错:', err)
        Taro.hideLoading()
        Taro.showToast({ title: '读取文件出错', icon: 'error' })
      }
    })
  } catch (err) {
    console.error('上传文件出错:', err)
    Taro.hideLoading()
    Taro.showToast({ title: '上传文件出错', icon: 'error' })
  }
}
```

## 默认值说明

当文件字段缺少 `name` 或 `type` 时：

- `name` 默认值为 `file`
- `type` 默认值为 `application/octet-stream`

`createFormDataBoundary()` 生成的字符串格式示例：

```text
----301aa4fe399bForeslashFormBoundary
```
