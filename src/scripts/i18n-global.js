// 在客户端脚本中加载翻译
// 注意：在 Astro 中，我们需要使用异步方式加载翻译

// 加载翻译
async function loadTranslations() {
  try {
    // 使用全局变量获取翻译，如果已经定义
    if (window.__translations) {
      console.log('Using pre-loaded translations');
      return window.__translations;
    }
    
    // 如果没有预加载的翻译，尝试使用动态导入
    console.log('Attempting to dynamically load translations');
    const module = await import('../i18n/translations');
    console.log('Translations loaded dynamically:', module.translations);
    window.__translations = module.translations;
    return module.translations;
  } catch (error) {
    console.error('Failed to load translations:', error);
    
    // 如果动态加载失败，尝试使用硬编码的翻译键
    console.log('Using hardcoded translations');
    
    // 加载基本翻译键（导航等通用翻译）
    const baseTranslations = {
      'nav.home': { en: 'Home', zh: '首页' },
      'nav.about': { en: 'About', zh: '关于' },
      'nav.projects': { en: 'Projects', zh: '项目' },
      'nav.insights': { en: 'Insights', zh: '设计洞察' },
      'nav.contact': { en: 'Contact', zh: '联系' },
      'footer.copyright': { en: '© 2025 Wang Zi. All rights reserved.', zh: '© 2025 Wang Zi. 保留所有权利。' },
      'footer.links.sourceCode': { en: 'Source Code', zh: '源代码' },
      'footer.links.changelog': { en: 'Changelog', zh: '更新日志' },
      'footer.links.legal': { en: 'Legal', zh: '法律声明' },
      
      // 首页英雄区
      'hero.greeting': { en: 'hi, my name is', zh: '你好，我是' },
      'hero.title': { en: 'Wannz. I build amazing things', zh: 'Wannz. 我创造数字体验' },
      'hero.description': { 
        en: 'I\'m a developer and designer passionate about creating intuitive, accessible, and beautiful digital experiences.',
        zh: '我是一名开发者和设计师，热衷于创造直觉、易用且美观的数字体验。'
      },
      'hero.cta.work': { en: 'View my work', zh: '查看我的作品' },
      'hero.cta.contact': { en: 'Get in touch', zh: '联系我' },
      'hero.scroll': { en: 'Scroll down', zh: '向下滚动' }
    };
    
    // 源代码页面翻译键
    const sourceCodeTranslations = {
      'sourceCode.title': { en: 'Source Code', zh: '项目源代码' },
      'sourceCode.description': {
        en: 'This personal website project is built with the Astro framework, using modern frontend technologies including TailwindCSS, Lucide icons, and shadcn/ui components.',
        zh: '这个个人网站项目是基于 Astro 框架构建的，采用了现代化的前端技术栈，包括 TailwindCSS、Lucide 图标和 shadcn/ui 组件库。'
      },
      'sourceCode.about.title': { en: 'About This Project', zh: '关于本项目' },
      'sourceCode.about.content': {
        en: 'This personal website project is built with the Astro framework, using modern frontend technologies including TailwindCSS, Lucide icons, and shadcn/ui components.',
        zh: '这个个人网站项目是基于 Astro 框架构建的，采用了现代化的前端技术栈，包括 TailwindCSS、Lucide 图标和 shadcn/ui 组件库。'
      },
      'sourceCode.techStack.title': { en: 'Technology Stack', zh: '技术栈' },
      'sourceCode.techStack.framework': { en: 'Framework:', zh: '框架：' },
      'sourceCode.techStack.styling': { en: 'Styling:', zh: '样式：' },
      'sourceCode.techStack.icons': { en: 'Icons:', zh: '图标：' },
      'sourceCode.techStack.components': { en: 'UI Components:', zh: 'UI组件：' },
      'sourceCode.techStack.content': { en: 'Content Management:', zh: '内容管理：' },
      'sourceCode.techStack.i18n': { en: 'Internationalization:', zh: '国际化：' },
      'sourceCode.repository.title': { en: 'GitHub Repository', zh: 'GitHub 仓库' },
      'sourceCode.repository.description': {
        en: 'The source code for this project is open source on GitHub. Feel free to check it out, use it, or contribute.',
        zh: '本项目的源代码已在 GitHub 上开源，欢迎查看、使用或贡献代码。'
      },
      'sourceCode.repository.button': { en: 'View Source Code', zh: '查看源代码' },
      'sourceCode.license.title': { en: 'License', zh: '使用许可' },
      'sourceCode.license.content': {
        en: 'This project is open source under the MIT License. This means you are free to use, modify, and distribute the code, whether for personal or commercial purposes.',
        zh: '本项目采用 MIT 许可证开源。这意味着您可以自由地使用、修改和分发本项目的代码，无论是用于个人还是商业目的。'
      }
    };
    
    // 项目相关翻译键
    const projectTranslations = {
      'projects.title': { en: 'Projects', zh: '项目' },
      'projects.filter.all': { en: 'All Projects', zh: '所有项目' },
      'projects.filter.frontend': { en: 'Frontend', zh: '前端' },
      'projects.filter.backend': { en: 'Backend', zh: '后端' },
      'projects.filter.design': { en: 'Design', zh: '设计' },
      'projects.filter.featured': { en: 'Featured', zh: '精选' },
      'projects.filter.web': { en: 'Web', zh: '网站' },
      'projects.filter.app': { en: 'App', zh: '应用' },
      'projects.viewProject': { en: 'View project', zh: '查看项目' },
      'projects.sourceCode': { en: 'Source code', zh: '源代码' },
      'projects.description': { 
        en: "Here's a selection of my recent work. Each project represents a unique challenge and solution, showcasing my skills in design and development. Feel free to explore the live demos or check out the code on GitHub.",
        zh: "这是我最近作品的精选。每个项目都代表了一个独特的挑战和解决方案，展示了我在设计和开发方面的技能。欢迎探索在线演示或在GitHub上查看代码。"
      },
      'projects.noProjects.title': { en: 'No projects found', zh: '未找到项目' },
      'projects.noProjects.description': { 
        en: 'There are currently no projects in this category. Please check back later or explore other categories.',
        zh: '当前类别中没有项目。请稍后再查看或探索其他类别。'
      }
    };
    
    // // 文章相关翻译键
    // const postTranslations = {
    //   'post.ux-research.title': { en: 'UX Research Methods', zh: 'UX研究方法' },
    //   'post.design-systems.title': { en: 'Building Design Systems', zh: '构建设计系统' },
    //   'post.frontend-trends.title': { en: 'Frontend Development Trends', zh: '前端开发趋势' },
    //   'post.accessibility.title': { en: 'Web Accessibility', zh: '网页无障碍设计' }
    // };
    
    // // 项目详情页面翻译键
    // const projectDetailTranslations = {
    //   'project.portfolio.title': { en: 'Minimalist Portfolio', zh: '极简作品集' },
    //   'project.digital-garden.title': { en: 'Digital Garden', zh: '数字花园' },
    //   'project.ux-research.title': { en: 'UX Research Tool', zh: 'UX研究工具' },
    //   'project.details.overview': { en: 'Project Overview', zh: '项目概述' },
    //   'project.details.technologies': { en: 'Technologies Used', zh: '使用的技术' },
    //   'project.details.backToProjects': { en: 'Back to Projects', zh: '返回项目列表' }
    // };
    
    // 合并所有翻译
    const allTranslations = { 
      ...baseTranslations, 
      ...sourceCodeTranslations,
      ...projectTranslations,
      ...postTranslations,
      ...projectDetailTranslations
    };
    
    window.__translations = allTranslations;
    return allTranslations;
  }
}

// 初始化国际化
async function initI18n() {
  // 本地存储键
  const LANGUAGE_STORAGE_KEY = 'preferred-language';
  
  // 获取当前语言
  function getCurrentLanguage() {
    const savedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'zh')) {
      return savedLanguage;
    }
    
    // 尝试使用浏览器语言
    try {
      const browserLang = navigator.language.split('-')[0];
      if (browserLang === 'zh') {
        return 'zh';
      }
    } catch (e) {
      console.error('Error detecting browser language:', e);
    }
    
    // 默认为英语
    return 'en';
  }
  
  // 加载翻译
  const translations = await loadTranslations();
  
  // 翻译函数
  function translate(key, lang) {
    const currentLang = lang || getCurrentLanguage();
    console.log(`Translating key: ${key} to language: ${currentLang}`);
    
    if (!translations[key]) {
      // 输出警告，以便调试
      console.warn(`Translation key not found: ${key}`);
      return key;
    }
    
    const translation = translations[key][currentLang] || translations[key]['en'] || key;
    console.log(`Translation result for ${key}: ${translation}`);
    return translation;
  }
  
  // 更新页面内容
  function updatePageContent() {
    const currentLang = getCurrentLanguage();
    console.log(`Updating page content for language: ${currentLang}`);
    console.log(`Available translations:`, Object.keys(translations));
    
    // 更新所有带有 data-i18n-key 属性的元素
    const elements = document.querySelectorAll('[data-i18n-key]');
    console.log(`Found ${elements.length} elements with data-i18n-key attribute`);
    
    elements.forEach(element => {
      const key = element.getAttribute('data-i18n-key');
      const originalText = element.textContent;
      if (key) {
        console.log(`Updating element with key: ${key}, original text: ${originalText}`);
        // 始终更新元素内容，确保翻译能正确显示
        element.textContent = translate(key, currentLang);
        console.log(`Updated element text: ${element.textContent}`);
      }
    });
    
    // 切换基于语言的内容显示
    document.querySelectorAll('[data-language]').forEach(element => {
      const lang = element.getAttribute('data-language');
      if (lang === currentLang) {
        element.classList.remove('hidden');
      } else {
        element.classList.add('hidden');
      }
    });
    
    // 更新所有带有 data-i18n-placeholder 属性的输入元素
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
      const key = element.getAttribute('data-i18n-placeholder');
      if (key && element instanceof HTMLInputElement) {
        element.placeholder = translate(key, currentLang);
      }
    });
    
    // 更新所有带有 data-i18n-alt 属性的图片元素
    document.querySelectorAll('[data-i18n-alt]').forEach(element => {
      const key = element.getAttribute('data-i18n-alt');
      if (key && element instanceof HTMLImageElement) {
        element.alt = translate(key, currentLang);
      }
    });
    
    // 更新所有带有 data-i18n-title 属性的元素
    document.querySelectorAll('[data-i18n-title]').forEach(element => {
      const key = element.getAttribute('data-i18n-title');
      if (key) {
        element.setAttribute('title', translate(key, currentLang));
      }
    });
  }
  
  // 设置语言切换器事件
  document.querySelectorAll('.language-switcher').forEach(button => {
    button.addEventListener('click', function() {
      const lang = this.getAttribute('data-lang');
      if (lang && (lang === 'en' || lang === 'zh')) {
        localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
        updatePageContent();
      }
    });
  });
  
  // 监听自定义语言变更事件
  document.addEventListener('languageChanged', (event) => {
    console.log('Language changed event detected:', event.detail);
    updatePageContent();
  });
  
  // 监听存储事件，以便在不同标签页之间同步语言设置
  window.addEventListener('storage', (event) => {
    if (event.key === LANGUAGE_STORAGE_KEY) {
      console.log('Language changed in another tab:', event.newValue);
      updatePageContent();
    }
  });
  
  // 初始化时更新页面
  updatePageContent();
  
  // 设置一个定期检查，确保翻译已应用
  const checkInterval = setInterval(() => {
    const untranslatedElements = document.querySelectorAll('[data-i18n-key]:empty');
    if (untranslatedElements.length > 0) {
      console.log('Found untranslated elements, updating content...');
      updatePageContent();
    } else {
      clearInterval(checkInterval);
    }
  }, 500);
  
  // 5秒后清除检查间隔，避免无限循环
  setTimeout(() => clearInterval(checkInterval), 5000);
}

// 确保 DOM 加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
  // 使用延迟确保所有元素都已经渲染
  setTimeout(initI18n, 100);
});

// 为了确保在页面加载后和水合完成后都能正确应用翻译
// 我们也在 window.onload 中初始化
window.onload = function() {
  setTimeout(initI18n, 200);
};
