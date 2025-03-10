// 定义类型但不导入（避免类型导入问题）
type Language = 'en' | 'zh';

// 创建一个空的翻译对象，稍后会动态填充
let translations: Record<string, Record<Language, string>> = {};

// 标记翻译是否已加载
let translationsLoaded = false;

// 检查翻译是否已加载
export function isTranslationsLoaded(): boolean {
  return translationsLoaded;
}

// 加载翻译数据
// 这个函数会尝试从全局变量中获取翻译数据
export async function loadTranslations(): Promise<boolean> {
  if (translationsLoaded) return true;
  
  // 首先检查全局变量是否已定义翻译数据
  if (typeof window !== 'undefined' && window.TRANSLATIONS) {
    translations = window.TRANSLATIONS;
    translationsLoaded = true;
    return true;
  }
  
  try {
    // 如果全局变量不可用，尝试动态导入
    const module = await import('../i18n/translations');
    translations = module.translations;
    translationsLoaded = true;
    return true;
  } catch (error) {
    console.error('Failed to load translations:', error);
    return false;
  }
}

// 在客户端自动加载翻译
if (typeof window !== 'undefined') {
  // 页面加载时立即加载翻译数据
  loadTranslations().then(success => {
    if (success) {
      console.log('Translations loaded successfully');
    } else {
      console.warn('Failed to load translations');
    }
  });
}

// 本地存储键
const LANGUAGE_STORAGE_KEY = 'preferred-language';

// 获取当前语言
export function getCurrentLanguage(): Language {
  if (typeof window === 'undefined') return 'en';
  
  // 优先检查 URL 参数，这样搜索引擎可以通过不同 URL 索引不同语言版本
  const urlParams = new URLSearchParams(window.location.search);
  const langParam = urlParams.get('lang');
  
  if (langParam && (langParam === 'en' || langParam === 'zh')) {
    // 将语言参数保存到本地存储，以便用户在后续访问中保持该语言
    localStorage.setItem(LANGUAGE_STORAGE_KEY, langParam);
    return langParam as Language;
  }
  
  // 检查本地存储
  const savedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY) as Language;
  
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

// 翻译函数
export async function translate(key: string, lang?: Language): Promise<string> {
  // 确保翻译数据已加载
  await loadTranslations();
  
  const currentLang = lang || getCurrentLanguage();
  
  if (!translations[key]) {
    console.warn(`Translation key not found: ${key}`);
    return key;
  }
  
  return translations[key][currentLang] || translations[key]['en'] || key;
}

// 同步翻译函数（如果翻译已加载）
export function translateSync(key: string, lang?: string): string {
  // 确保语言参数是有效的 Language 类型
  const validLang = (lang === 'en' || lang === 'zh') ? lang as Language : getCurrentLanguage();
  
  if (!translationsLoaded) {
    console.warn('Translations not loaded yet, using key as fallback');
    return key;
  }
  
  if (!translations[key]) {
    console.warn(`Translation key not found: ${key}`);
    return key;
  }
  
  return translations[key][validLang] || translations[key]['en'] || key;
}

// 更新页面内容
export function updatePageContent() {
  const currentLang = getCurrentLanguage();
  
  // 使用延迟更新来避免水合错误
  setTimeout(() => {
    // 更新 HTML 标签的 lang 属性，对 SEO 非常重要
    document.documentElement.setAttribute('lang', currentLang);
    document.documentElement.setAttribute('data-current-lang', currentLang);
    
    // 切换基于语言的内容显示
    document.querySelectorAll('[data-language]').forEach(element => {
      const lang = element.getAttribute('data-language');
      if (lang === currentLang) {
        element.classList.remove('hidden');
      } else {
        element.classList.add('hidden');
      }
    });
    
    // 更新所有带有 data-i18n-key 属性的元素
    document.querySelectorAll('[data-i18n-key]').forEach(element => {
      const key = element.getAttribute('data-i18n-key');
      if (key) {
        // 仅在客户端渲染完成后更新文本
        setTimeout(() => {
          // 使用同步翻译函数
          const translatedText = translateSync(key, currentLang);
          element.textContent = translatedText;
          
          // 添加翻译内容的数据属性，有助于 SEO
          element.setAttribute(`data-${currentLang}-text`, translatedText);
        }, 0);
      }
    });
    
    // 更新元数据链接
    updateMetaLinks(currentLang);
  }, 100);
  
  // 更新所有带有 data-i18n-placeholder 属性的输入元素
  document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
    const key = element.getAttribute('data-i18n-placeholder');
    if (key && element instanceof HTMLInputElement) {
      // 使用同步翻译函数
      element.placeholder = translateSync(key, currentLang);
    }
  });
  
  // 更新所有带有 data-i18n-alt 属性的图片元素
  document.querySelectorAll('[data-i18n-alt]').forEach(element => {
    const key = element.getAttribute('data-i18n-alt');
    if (key && element instanceof HTMLImageElement) {
      // 使用同步翻译函数
      element.alt = translateSync(key, currentLang);
    }
  });
  
  // 更新所有带有 data-i18n-title 属性的元素
  document.querySelectorAll('[data-i18n-title]').forEach(element => {
    const key = element.getAttribute('data-i18n-title');
    if (key) {
      // 使用同步翻译函数
      element.setAttribute('title', translateSync(key, currentLang));
    }
  });
  
  // 更新所有带有 data-i18n-aria-label 属性的元素
  document.querySelectorAll('[data-i18n-aria-label]').forEach(element => {
    const key = element.getAttribute('data-i18n-aria-label');
    if (key) {
      try {
        // 使用同步翻译函数而不是异步的 translate
        element.setAttribute('aria-label', translateSync(key, currentLang));
      } catch (error) {
        console.error('翻译 aria-label 时出错:', error);
        // 如果出错，保留原始文本
      }
    }
  });
  
  // 触发自定义事件
  document.dispatchEvent(new CustomEvent('i18n:updated', { detail: { language: currentLang } }));
}

// 设置语言并更新内容
export function setLanguage(lang: Language) {
  // 保存到本地存储
  localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
  
  // 更新 URL 参数，对 SEO 更友好
  const url = new URL(window.location.href);
  
  if (lang === 'en') {
    // 英语作为默认语言，移除 lang 参数
    url.searchParams.delete('lang');
  } else {
    // 设置语言参数
    url.searchParams.set('lang', lang);
  }
  
  // 更新 URL，但不刷新页面
  window.history.replaceState({}, '', url.toString());
  
  // 更新页面内容
  updatePageContent();
  
  // 触发自定义事件
  document.dispatchEvent(new CustomEvent('languageChanged', { detail: { language: lang } }));
  
  // 触发 storage 事件，以便其他页面也能更新
  window.dispatchEvent(new StorageEvent('storage', {
    key: LANGUAGE_STORAGE_KEY,
    newValue: lang,
    storageArea: localStorage
  }));
}

// 更新元数据链接
function updateMetaLinks(currentLang: Language) {
  try {
    // 获取当前 URL 路径
    const pathname = window.location.pathname;
    const origin = window.location.origin;
    const search = window.location.search;
    
    // 当前语言的查询参数
    const langParam = currentLang === 'en' ? '' : `?lang=${currentLang}`;
    
    // 防止 [object Object] 错误
    // 确保 pathname 是字符串并清理路径
    let safePathname = typeof pathname === 'string' ? pathname : '/';
    
    // 检查路径中是否包含 [object Object]
    if (safePathname.includes('[object Object]') || safePathname.includes('object Object')) {
      console.warn('路径中包含对象引用，正在清理:', safePathname);
      // 尝试清理路径 - 处理多种可能的格式
      safePathname = safePathname.replace(/\/projects\/\[?object\s*Object\]?/gi, '/projects');
      safePathname = safePathname.replace(/\/projects\/object\s*Object/gi, '/projects');
    }
    
    // 检查是否包含项目路径
    const projectPathMatch = safePathname.match(/\/projects\/([^\/\?]+)/);
    if (projectPathMatch && projectPathMatch[1]) {
      const projectId = projectPathMatch[1];
      // 确保项目 ID 是字符串而不是对象
      if (typeof projectId !== 'string' || 
          projectId.includes('object') || 
          projectId.includes('[object') || 
          projectId.includes('undefined') || 
          projectId === 'null') {
        console.warn('检测到无效的项目 ID:', projectId);
        // 将路径重定向到项目列表页面
        safePathname = '/projects';
        
        // 如果当前页面是项目详情页，尝试重定向
        if (window.location.pathname.includes('/projects/')) {
          window.location.href = `${origin}/projects`;
          return; // 阻止继续执行
        }
      }
    }
    
    // 更新规范链接
    const canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      // 再次检查路径是否安全
      if (safePathname.includes('object') || safePathname.includes('undefined') || safePathname.includes('null')) {
        console.warn('规范链接中检测到无效路径:', safePathname);
        safePathname = '/';
      }
      canonicalLink.setAttribute('href', `${origin}${safePathname}${langParam}`);
    }
    
    // 更新语言元数据链接
    document.querySelectorAll('link[hreflang]').forEach(link => {
      const hreflang = link.getAttribute('hreflang');
      // 再次检查路径是否安全
      let finalPathname = safePathname;
      if (finalPathname.includes('object') || finalPathname.includes('undefined') || finalPathname.includes('null')) {
        console.warn('语言链接中检测到无效路径:', finalPathname);
        finalPathname = '/';
      }
      
      if (hreflang === 'en') {
        link.setAttribute('href', `${origin}${finalPathname}`);
      } else if (hreflang === 'zh') {
        link.setAttribute('href', `${origin}${finalPathname}?lang=zh`);
      } else if (hreflang === 'x-default') {
        link.setAttribute('href', `${origin}${finalPathname}`);
      }
    });
    
    // 更新标题和描述的语言
    const title = document.querySelector('title');
    const description = document.querySelector('meta[name="description"]');
    
    if (title) {
      const titleKey = title.getAttribute('data-i18n-key');
      if (titleKey) {
        try {
          // 使用同步翻译函数
          title.textContent = translateSync(titleKey, currentLang);
        } catch (error) {
          console.error('Error translating title:', error);
          // 保留原标题
        }
      }
    }
    
    if (description) {
      const descKey = description.getAttribute('data-i18n-key');
      if (descKey) {
        try {
          // 使用同步翻译函数
          description.setAttribute('content', translateSync(descKey, currentLang));
        } catch (error) {
          console.error('Error translating description:', error);
          // 保留原描述
        }
      }
    }
  } catch (error) {
    console.error('更新元数据链接时出错:', error);
  }
}

// 初始化
export function initI18n(): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve();
  
  // 返回一个 Promise，在翻译加载完成后 resolve
  return new Promise<void>((resolve) => {
    // 首先加载翻译数据
    loadTranslations().then(() => {
      // 使用延迟来确保水合完成
      setTimeout(() => {
        // 初始化时更新内容
        if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', () => {
            // 确保 DOM 加载完成后再应用翻译
            setTimeout(() => {
              updatePageContent();
              resolve();
            }, 100);
          });
        } else {
          // DOM 已经加载完成
          updatePageContent();
          resolve();
        }
        
        // 监听语言变化
        window.addEventListener('storage', event => {
          if (event.key === LANGUAGE_STORAGE_KEY) {
            updatePageContent();
          }
        });
        
        // 监听 URL 参数变化
        window.addEventListener('popstate', () => {
          updatePageContent();
        });
        
        // 自定义事件监听
        document.addEventListener('languageChanged', () => updatePageContent());
      }, 0);
    });
  });
}
