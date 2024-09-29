import { defineConfig } from 'vitepress'
import { zh, zhSearch } from './zh'
import { en, enSearch } from './en'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Foreslash',
  rewrites: {
    'zh/:rest*': ':rest*',
  },
  // description: 'Foreslash is a Javascript utilities lib which contains plenty of practical functions',
  base: '/foreslash/',
  cleanUrls: true,

  lastUpdated: true,

  themeConfig: {
    socialLinks: [{ icon: 'github', link: 'https://github.com/Moushudyx/foreslash' }],
    search: {
      provider: 'local',
      options: {
        // appId: 'awa',
        // apiKey: 'qwq',
        // indexName: 'foreslash',
        locales: {
          ...zhSearch,
          ...enSearch,
        }
      }
    },
  },
  locales: {
    root: { label: '中文', ...zh },
    en: { label: 'English', ...en },
  },
})
