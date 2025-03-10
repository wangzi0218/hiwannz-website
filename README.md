# HiWannz - 极简主义个人网站

[![License: CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc-sa/4.0/)
[![Astro](https://img.shields.io/badge/Built%20with-Astro-FF5D01.svg?logo=astro)](https://astro.build)
[![TailwindCSS](https://img.shields.io/badge/Styled%20with-Tailwind-38B2AC.svg?logo=tailwind-css)](https://tailwindcss.com)

一个基于 Astro 构建的极简主义个人网站，具有清晰的设计和双语支持（中文/英文）。采用基于 Markdown 的内容管理系统，便于维护和扩展。

## 🚀 特点

- 🌐 完整的中英文双语支持，基于 Markdown 文件的国际化方案
- 🎨 极简主义设计风格，注重内容展示和用户体验
- 📱 响应式布局，适配各种设备尺寸
- ⚡ 基于 Astro 的高性能架构，静态生成与局部交互结合
- 🔍 SEO 友好，包含完整的元数据和结构化数据
- 🌙 明暗主题切换，适应不同的浏览环境
- 📝 支持项目展示和产品洞察文章，基于 Markdown 内容管理

## 🛠️ 技术栈

- [Astro](https://astro.build) - 网站框架，提供高性能的静态网站生成
- [React](https://reactjs.org) - 用于交互组件和局部动态功能
- [TailwindCSS](https://tailwindcss.com) - 原子化CSS样式系统，提供高度自定义的设计能力
- [Lucide Icons](https://lucide.dev) - 轻量级图标库，提供清晰简洁的图标
- [Markdown](https://www.markdownguide.org/) - 内容管理系统，用于项目和洞察文章
- [i18n](https://www.i18next.com/) - 国际化解决方案，基于 Markdown 文件和数据属性

## 🏗️ 项目结构

```
/
├── public/           # 静态资源
├── src/
│   ├── components/   # UI 组件
│   ├── content/      # 内容集合
│   │   ├── projects/   # 项目内容（中英文内容在同一文件中）
│   │   └── insights/   # 洞察文章（中英文内容在同一文件中）
│   ├── i18n/         # 国际化相关
│   │   ├── translations.ts # 页面UI翻译键值对
│   │   └── utils.ts     # 国际化工具函数
│   ├── layouts/      # 页面布局
│   ├── pages/        # 页面路由
│   │   ├── index.astro  # 英文首页
│   │   └── zh/         # 中文页面
│   ├── scripts/      # 客户端脚本
│   │   └── i18n-client.ts # 客户端语言切换脚本
│   └── styles/       # 全局样式
└── package.json      # 项目依赖
```

## 🌐 国际化实现

本项目采用了多种国际化方案相结合：

1. **基于路由的静态国际化**：
   - 为中文页面创建 `/zh/` 前缀的路由
   - 通过语言切换器实现不同语言页面之间的跳转

2. **基于 Markdown 的内容国际化**：
   - 项目和洞察文章在同一个 Markdown 文件中包含中英文内容
   - 使用 frontmatter 字段存储不同语言的标题、描述等信息

3. **客户端语言切换**：
   - 使用 `data-en` 和 `data-zh` 属性存储不同语言的内容
   - 通过客户端 JavaScript 实现内容切换
   - 保存用户语言偏好到 localStorage

4. **翻译键值对管理**：
   - 使用 `translations.ts` 集中管理 UI 元素的翻译
   - 采用分类组织翻译键，便于维护

## 📝 内容管理

本项目采用基于 Markdown 的内容管理系统，特别适合多语言内容的维护：

### 项目内容

项目内容存储在 `src/content/projects/` 目录下的 Markdown 文件中，每个文件包含一个项目的中英文信息：

```markdown
---
# 英文元数据
title: "Project Title"
excerpt: "Short description of the project"
# 中文元数据
titleZh: "项目标题"
excerptZh: "项目简短描述"
# 共用元数据
date: "2023-01-01"
tags: ["tag1", "tag2"]
image: "/images/projects/project-image.jpg"
---

<!-- 英文内容 -->
## English Content

Project details in English...

<!-- 中文内容 -->
## 中文内容

项目详情介绍...
```

### 洞察文章

洞察文章存储在 `src/content/insights/` 目录下，采用类似的结构：

```markdown
---
# 英文元数据
title: "Article Title"
excerpt: "Article excerpt or summary"
# 中文元数据
titleZh: "文章标题"
excerptZh: "文章摘要或摘要"
# 共用元数据
date: "2023-01-01"
tags: ["tag1", "tag2"]
image: "/images/insights/article-image.jpg"
---

<!-- 英文内容 -->
## English Content

Article content in English...

<!-- 中文内容 -->
## 中文内容

文章中文内容...
```

### 内容展示

在页面中展示内容时，使用 `data-en` 和 `data-zh` 属性存储不同语言的内容，通过客户端 JavaScript 实现语言切换。

## 🚀 开始使用

### 开发环境

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

### 构建生产版本

```bash
# 构建网站
npm run build

# 预览构建结果
npm run preview
```

## 📝 许可证

本项目采用 [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/) 许可证。

## 🔗 链接

- 网站: [https://hiwannz.cn/](https://hiwannz.cn/)
- 作者: Wannz

---

© 2025 Wannz. All Rights Reserved.
