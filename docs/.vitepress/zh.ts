import { createRequire } from 'module'
import { defineConfig, type DefaultTheme } from 'vitepress'

const require = createRequire(import.meta.url)

export const zh = defineConfig({
  lang: 'zh-Hans',
  description: 'Foreslash 是一个 Javascript 工具库，包含大量实用函数',

  themeConfig: {
    nav: nav(),

    sidebar: { 'func/': [...sidebarIs()], 'guide/': [...sidebarGuide()] },

    editLink: {
      pattern: 'https://github.com/Moushudyx/foreslash/edit/master/docs/:path',
      text: '在 GitHub 上编辑此页面',
    },

    footer: {
      message: '基于 Mulan PSL v2 许可发布',
      copyright: `© ${new Date().getFullYear()} Moushu`,
    },

    docFooter: {
      prev: '上一页',
      next: '下一页',
    },

    outline: {
      label: '页面导航',
    },

    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium',
      },
    },

    langMenuLabel: '多语言',
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
  },
})

function nav(): DefaultTheme.NavItem[] {
  return [
    {
      text: '指南',
      link: '/guide/',
      activeMatch: '/guide/',
    },
    {
      text: '总览',
      link: '/func/',
      activeMatch: '/func/',
    },
    {
      text: '参与贡献',
      items: [
        {
          text: '工单',
          link: 'https://github.com/Moushudyx/foreslash/issues',
        },
        {
          text: '合并',
          link: 'https://github.com/Moushudyx/foreslash/pulls',
        },
      ],
    },
  ]
}

function sidebarIs(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: '总览',
      link: 'func/index',
    },
    {
      text: '对象操作',
      base: 'func/object/',
      collapsed: false,
      items: [
        { text: 'deepClone 深拷贝', link: 'deepClone' },
        { text: 'fastClone 快速深拷贝', link: 'deepClone#fastClone' },
        { text: 'isEmpty 判断为空', link: 'isEmpty' },
      ],
    },
    {
      text: '函数式编程',
      base: 'func/functional/',
      collapsed: false,
      items: [
        { text: 'compose 组合', link: 'compose' },
        { text: 'curry 柯里化', link: 'curry' },
        { text: 'pipe 管道', link: 'pipe' },
        { text: '辅助函数', link: 'misc' },
      ],
    },
    {
      text: '异步函数',
      base: 'func/async/',
      collapsed: false,
      items: [
        { text: 'defer 延后', link: 'defer' },
        { text: 'parallel 并行', link: 'parallel' },
        { text: 'retry 重试', link: 'retry' },
        { text: 'sleep 休眠', link: 'sleep' },
        { text: 'tryit 错误优先回调', link: 'tryit' },
        { text: 'withResolvers ES15 的 Ponyfill', link: 'withResolvers' },
      ],
    },
    {
      text: '随机操作',
      base: 'func/random/',
      collapsed: false,
      items: [
        { text: 'randomChoice 随机抽选', link: 'randomChoice' },
        { text: 'randomInt 随机数字', link: 'randomInt' },
        { text: 'randomString 随机字符串', link: 'randomString' },
        { text: 'shuffle 打乱数组', link: 'shuffle' },
        { text: 'ulid 标准 ULID', link: 'ulid' },
        { text: 'uuid 标准 UUID V4', link: 'uuid' },
      ],
    },
    {
      text: '字符串操作',
      base: 'func/string/',
      collapsed: false,
      items: [
        { text: 'caseConvert 格式转换', link: 'caseConvert' },
        { text: 'camelCase 小驼峰格式', link: 'camelCase' },
        { text: 'pascalCase 大驼峰格式', link: 'pascalCase' },
        { text: 'kebabCase 串行格式', link: 'kebabCase' },
        { text: 'snakeCase 蛇行格式', link: 'snakeCase' },
        { text: 'titleCase 标题格式', link: 'titleCase' },
        { text: 'splitWords 词分割', link: 'splitWords' },
      ],
    },
    {
      text: '杂项功能',
      base: 'func/misc/',
      collapsed: false,
      items: [
        { text: 'acceptableFileName\n检查拓展名', link: 'acceptableFileName' },
        { text: 'acceptableFileType\n检查 MIME 类型', link: 'acceptableFileType' },
        { text: 'getAcceptableExtByMIME\n获取拓展名', link: 'getAcceptableExtByMIME' },
        { text: 'getAcceptableMIMEByExt\n获取 MIME 类型', link: 'getAcceptableMIMEByExt' },
      ],
    },
    {
      text: '类型守卫',
      base: 'func/is/',
      link: 'is',
      collapsed: true,
      items: [
        { text: 'Array (数组)', link: 'is#Array' },
        { text: 'ArrayLike (类数组)', link: 'is#ArrayLike' },
        { text: 'ArrayBuffer', link: 'is#ArrayBuffer' },
        { text: 'BigInt (大数)', link: 'is#BigInt' },
        { text: 'Boolean (布尔型)', link: 'is#Boolean' },
        { text: 'Buffer (NodeJs 的 Buffer)', link: 'is#Buffer' },
        { text: 'Date (日期)', link: 'is#Date' },
        { text: 'Function (函数)', link: 'is#Function' },
        { text: 'Integer (整数)', link: 'is#Integer' },
        { text: 'Map', link: 'is#Map' },
        { text: 'WeakMap', link: 'is#WeakMap' },
        { text: 'Nil (空值)', link: 'is#Nil' },
        { text: 'Number (数字)', link: 'is#Number' },
        { text: 'Object (对象)', link: 'is#Object' },
        { text: 'Primitive (原始类型)', link: 'is#Primitive' },
        { text: 'Promise', link: 'is#Promise' },
        { text: 'PromiseLike (类 Promise 对象)', link: 'is#PromiseLike' },
        { text: 'Set', link: 'is#Set' },
        { text: 'WeakSet', link: 'is#WeakSet' },
        { text: 'String (字符串)', link: 'is#String' },
        { text: 'Symbol', link: 'is#Symbol' },
        { text: 'Wrapper (包装对象)', link: 'is#Wrapper' },
      ],
    },
  ]
}

function sidebarGuide(): DefaultTheme.SidebarItem[] {
  return [{ text: '快速开始', link: 'guide/index' }]
}

export const zhSearch: DefaultTheme.LocalSearchOptions['locales'] = {
  zh: {
    // placeholder: '搜索文档',
    translations: {
      button: {
        buttonText: '搜索文档',
        buttonAriaLabel: '搜索文档',
      },
      modal: {
        displayDetails: '显示',
        resetButtonTitle: '重置',
        backButtonTitle: '返回',
        noResultsText: '无法找到相关结果',
        // searchBox: {
        //   resetButtonTitle: '清除查询条件',
        //   resetButtonAriaLabel: '清除查询条件',
        //   cancelButtonText: '取消',
        //   cancelButtonAriaLabel: '取消',
        // },
        // startScreen: {
        //   recentSearchesTitle: '搜索历史',
        //   noRecentSearchesText: '没有搜索历史',
        //   saveRecentSearchButtonTitle: '保存至搜索历史',
        //   removeRecentSearchButtonTitle: '从搜索历史中移除',
        //   favoriteSearchesTitle: '收藏',
        //   removeFavoriteSearchButtonTitle: '从收藏中移除',
        // },
        // errorScreen: {
        //   titleText: '无法获取结果',
        //   helpText: '你可能需要检查你的网络连接',
        // },
        footer: {
          selectText: '选择',
          selectKeyAriaLabel: '选择',
          navigateText: '切换',
          navigateUpKeyAriaLabel: '上',
          navigateDownKeyAriaLabel: '下',
          closeText: '关闭',
          closeKeyAriaLabel: '关闭',
          // searchByText: '搜索提供者',
        },
        // noResultsScreen: {
        //   noResultsText: '无法找到相关结果',
        //   suggestedQueryText: '你可以尝试查询',
        //   reportMissingResultsText: '你认为该查询应该有结果？',
        //   reportMissingResultsLinkText: '点击反馈',
        // },
      },
    },
  },
}
// export const search: DefaultTheme.AlgoliaSearchOptions['locales'] = {
//   zh: {
//     placeholder: '搜索文档',
//     translations: {
//       button: {
//         buttonText: '搜索文档',
//         buttonAriaLabel: '搜索文档'
//       },
//       modal: {
//         searchBox: {
//           resetButtonTitle: '清除查询条件',
//           resetButtonAriaLabel: '清除查询条件',
//           cancelButtonText: '取消',
//           cancelButtonAriaLabel: '取消'
//         },
//         startScreen: {
//           recentSearchesTitle: '搜索历史',
//           noRecentSearchesText: '没有搜索历史',
//           saveRecentSearchButtonTitle: '保存至搜索历史',
//           removeRecentSearchButtonTitle: '从搜索历史中移除',
//           favoriteSearchesTitle: '收藏',
//           removeFavoriteSearchButtonTitle: '从收藏中移除'
//         },
//         errorScreen: {
//           titleText: '无法获取结果',
//           helpText: '你可能需要检查你的网络连接'
//         },
//         footer: {
//           selectText: '选择',
//           navigateText: '切换',
//           closeText: '关闭',
//           searchByText: '搜索提供者'
//         },
//         noResultsScreen: {
//           noResultsText: '无法找到相关结果',
//           suggestedQueryText: '你可以尝试查询',
//           reportMissingResultsText: '你认为该查询应该有结果？',
//           reportMissingResultsLinkText: '点击反馈'
//         }
//       }
//     }
//   }
// }
