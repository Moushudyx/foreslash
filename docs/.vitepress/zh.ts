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
      link: '/zh/guide/',
      activeMatch: '/zh/guide/'
    },
    {
      text: '文档',
      link: '/zh/func/',
      activeMatch: '/zh/func/'
    },
    {
      text: 'Foreslash',
      items: [
        {
          text: '更新日志',
          link: 'https://github.com/Moushudyx/foreslash/blob/master/CHANGELOG.md',
        },
        {
          text: '参与贡献',
          link: 'https://github.com/Moushudyx/foreslash/blob/master/.github/contributing.md',
        },
      ],
    },
  ]
}

// function sidebarGuide(): DefaultTheme.SidebarItem[] {
//   return [
//     // {
//     //   text: '简介',
//     //   collapsed: false,
//     //   items: [
//     //     { text: '什么是 VitePress？', link: 'what-is-vitepress' },
//     //     { text: '快速开始', link: 'getting-started' },
//     //     { text: '路由', link: 'routing' },
//     //     { text: '部署', link: 'deploy' }
//     //   ]
//     // },
//     // {
//     //   text: '写作',
//     //   collapsed: false,
//     //   items: [
//     //     { text: 'Markdown 扩展', link: 'markdown' },
//     //     { text: '资源处理', link: 'asset-handling' },
//     //     { text: 'frontmatter', link: 'frontmatter' },
//     //     { text: '在 Markdown 使用 Vue', link: 'using-vue' },
//     //     { text: '国际化', link: 'i18n' }
//     //   ]
//     // },
//     // {
//     //   text: '自定义',
//     //   collapsed: false,
//     //   items: [
//     //     { text: '自定义主题', link: 'custom-theme' },
//     //     { text: '扩展默认主题', link: 'extending-default-theme' },
//     //     { text: '构建时数据加载', link: 'data-loading' },
//     //     { text: 'SSR 兼容性', link: 'ssr-compat' },
//     //     { text: '连接 CMS', link: 'cms' }
//     //   ]
//     // },
//     // {
//     //   text: '实验性功能',
//     //   collapsed: false,
//     //   items: [
//     //     { text: 'MPA 模式', link: 'mpa-mode' },
//     //     { text: 'sitemap 生成', link: 'sitemap-generation' }
//     //   ]
//     // },
//     // { text: '配置和 API 参考', base: '/zh/reference/', link: 'site-config' }
//   ]
// }

function sidebarIs(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: '常用方法',
      base: 'func/',
      collapsed: false,
      items: [
        { text: 'deepClone 深拷贝', link: 'object/deepClone' },
        { text: 'curry 柯里化', link: 'functional/curry' },
      ],
    },
    {
      text: '对象操作',
      base: 'func/object/',
      collapsed: false,
      items: [
        { text: 'deepClone 深拷贝', link: 'deepClone' },
        { text: 'fastClone 快速深拷贝', link: 'deepClone#fastClone' },
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
      text: '随机操作',
      base: 'func/random/',
      collapsed: false,
      items: [
        { text: 'randomChoice 随机抽选', link: 'randomChoice' },
        { text: 'randomInt 随机数字', link: 'randomInt' },
        { text: 'randomString 随机字符串', link: 'randomString' },
      ],
    },
    {
      text: '类型守卫',
      base: 'func/is/',
      link: 'is',
      collapsed: true,
      items: [
        { text: 'Array 数组', link: 'is#Array' },
        { text: 'ArrayBuffer', link: 'is#ArrayBuffer' },
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
