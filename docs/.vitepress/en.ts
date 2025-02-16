import { createRequire } from 'module'
import { defineConfig, type DefaultTheme } from 'vitepress'

const require = createRequire(import.meta.url)

export const en = defineConfig({
  lang: 'en',
  description: 'Foreslash is a Javascript utilities lib which contains plenty of practical functions',

  themeConfig: {
    nav: nav(),

    sidebar: { 'func/': [...sidebarIs()], 'guide/': [...sidebarGuide()] },

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
      text: 'Guide',
      link: 'en/guide/',
      activeMatch: 'en/guide/',
    },
    {
      text: 'Overview',
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

function sidebarGuide(): DefaultTheme.SidebarItem[] {
  return [{ text: 'Quick Start', link: 'guide/index' }]
}

export const enSearch: DefaultTheme.LocalSearchOptions['locales'] = {
  en: {
    translations: {},
  },
}
