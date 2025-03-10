import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind(),
    react()
  ],
  // 静态生成模式，适合部署到静态服务器
  output: 'static',
  // 配置站点 URL，有助于生成绝对路径的链接
  site: 'https://hiwannz.cn',
  
  // 国际化配置
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh'],
    routing: {
      prefixDefaultLocale: false, // 默认语言不加前缀，如 / 而非 /en
      strategy: 'pathname' // 使用路径策略，如 /zh/about
    }
  },
  
  // 服务器配置
  server: {
    // 添加这些标头以避免缓存问题
    headers: {
      'Cache-Control': 'no-store, max-age=0',
    },
  },
  
  // Vite 配置
  vite: {
    // 解决客户端导入 TypeScript 文件的问题
    build: {
      // 确保 TypeScript 文件被正确处理
      rollupOptions: {
        input: {
          main: './src/main.ts',
        },
      },
    },
    // 配置别名，使客户端导入更加简单
    resolve: {
      alias: {
        '@i18n': '/src/i18n',
        '@scripts': '/src/scripts',
      },
    },
    // 禁用客户端缓存，解决开发时的问题
    server: {
      hmr: {
        overlay: true,
      },
      watch: {
        usePolling: true,
      },
    },
  },
});
