import { createRequire } from 'module'
import { defineConfig, type DefaultTheme } from 'vitepress'

const require = createRequire(import.meta.url)

export const en = defineConfig({
  lang: 'en',
  description: 'Foreslash is a Javascript utilities lib which contains plenty of practical functions',

  themeConfig: {
    nav: nav(),

    sidebar: { 'func/': [...sidebarIs()] },

    editLink: {
      pattern: 'https://github.com/Moushudyx/foreslash/edit/master/docs/:path',
      text: 'Edit this page on GitHub',
    },

    footer: {
      message: 'Released under the Mulan PSL v2 License',
      copyright: `© ${new Date().getFullYear()} Moushu`,
    },

  },
})

function nav(): DefaultTheme.NavItem[] {
  return [
    {
      text: '指南',
      link: 'en/guide/',
      activeMatch: 'en/guide/',
    },
    {
      text: '总览',
      link: 'en/func/',
      activeMatch: 'en/func/',
    },
    {
      text: 'Foreslash',
      items: [
        {
          text: 'Issues',
          link: 'https://github.com/Moushudyx/foreslash/issues',
        },
        {
          text: 'Pull Requests',
          link: 'https://github.com/Moushudyx/foreslash/pulls',
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
      text: 'Type Guard',
      base: 'func/is/',
      link: 'is',
      items: [
        { text: 'Array', link: 'is#Array' },
        { text: 'ArrayBuffer', link: 'is#ArrayBuffer' },
      ],
    },
  ]
}

export const enSearch: DefaultTheme.LocalSearchOptions['locales'] = {
  en: {
    translations: {},
  },
}
