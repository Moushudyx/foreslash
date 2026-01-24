import DefaultTheme from 'vitepress/theme'
import VersionTag from './components/VersionTag.vue'
import RomanNumerals from './components/RomanNumerals.vue'
import ChinaNumerals from './components/ChinaNumerals.vue'
import '../../../lib/index.umd'
import './index.scss'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    // 注册全局组件
    app.component('VersionTag', VersionTag)
    app.component('RomanNumerals', RomanNumerals)
    app.component('ChinaNumerals', ChinaNumerals)
  }
}
