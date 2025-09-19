import DefaultTheme from 'vitepress/theme'
import VersionTag from './components/VersionTag.vue'
import '../../../lib/index.umd'
import './index.scss'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    // 注册全局组件
    app.component('VersionTag', VersionTag)
  }
}
