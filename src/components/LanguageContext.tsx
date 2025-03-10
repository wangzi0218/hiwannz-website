import * as React from 'react';
const { createContext, useState, useContext, useEffect } = React;
type ReactNode = React.ReactNode;
import { translations, type Language } from '../i18n/translations';

// 确保与全局翻译函数兼容
declare global {
  interface Window {
    translate: (key: string, lang?: Language) => Promise<string>;
    translateSync: (key: string, lang?: Language) => string;
    getCurrentLanguage: () => Language;
    switchLanguage: (language: Language) => void;
    TRANSLATIONS?: Record<string, Record<Language, string>>;
  }
}

// 定义上下文类型
interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

// 创建上下文
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// 本地存储键
const LANGUAGE_STORAGE_KEY = 'preferred-language';

// 语言提供者组件
interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  // 状态初始化
  const [language, setLanguageState] = useState<Language>('en');
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // 客户端加载时从本地存储获取语言偏好
  useEffect(() => {
    // 标记组件已挂载
    setIsMounted(true);
    
    try {
      // 如果全局函数可用，优先使用全局函数
      if (typeof window !== 'undefined' && typeof window.getCurrentLanguage === 'function') {
        const currentLang = window.getCurrentLanguage();
        setLanguageState(currentLang);
      } else {
        // 否则使用本地方法
        // 获取当前语言
        const savedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY) as Language;
        
        if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'zh')) {
          setLanguageState(savedLanguage);
        } else {
          // 尝试使用浏览器语言
          const browserLang = navigator.language.split('-')[0];
          if (browserLang === 'zh') {
            setLanguageState('zh');
          } else {
            setLanguageState('en');
          }
        }
      }
    } catch (error) {
      console.error('Error initializing language:', error);
    } finally {
      // 无论成功与否，都标记加载完成
      setIsLoading(false);
    }
  }, []);

  // 设置语言并保存到本地存储
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (isMounted) {
      // 保存到本地存储
      localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
      
      // 触发自定义事件，通知页面内容更新
      document.dispatchEvent(new CustomEvent('languageChanged', { detail: { language: lang } }));
      
      // 触发 storage 事件，以便其他页面也能更新
      window.dispatchEvent(new StorageEvent('storage', {
        key: LANGUAGE_STORAGE_KEY,
        newValue: lang,
        storageArea: localStorage
      }));
    }
  };

  // 翻译函数
  const t = (key: string): string => {
    // 如果全局同步翻译函数可用，优先使用全局同步翻译函数
    if (typeof window !== 'undefined' && typeof window.translateSync === 'function') {
      return window.translateSync(key, language);
    }
    
    // 否则使用本地翻译函数
    if (!translations[key]) {
      console.warn(`Translation key not found: ${key}`);
      return key;
    }
    
    return translations[key][language] || translations[key]['en'] || key;
  };

  // 提供上下文值
  const contextValue: LanguageContextType = {
    language,
    setLanguage,
    t,
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

// 自定义钩子，用于在组件中使用语言上下文
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// 语言切换按钮组件
interface LanguageSwitcherProps {
  className?: string;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ className = '' }) => {
  const { language, setLanguage } = useLanguage();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // 在客户端渲染前显示骨架屏
  if (!isMounted) {
    return (
      <div className={`${className} inline-flex items-center`}>
        <span className="text-sm text-muted-foreground">EN</span>
        <span className="mx-1 text-muted-foreground">/</span>
        <span className="text-sm text-muted-foreground">中</span>
      </div>
    );
  }

  return (
    <div className={`${className} inline-flex items-center`}>
      <button
        onClick={() => setLanguage('en')}
        className={`text-sm transition-colors ${language === 'en' ? 'text-primary font-medium' : 'text-muted-foreground hover:text-foreground'}`}
        aria-label="Switch to English"
      >
        EN
      </button>
      <span className="mx-1 text-muted-foreground">/</span>
      <button
        onClick={() => setLanguage('zh')}
        className={`text-sm transition-colors ${language === 'zh' ? 'text-primary font-medium' : 'text-muted-foreground hover:text-foreground'}`}
        aria-label="切换到中文"
      >
        中
      </button>
    </div>
  );
};

export default LanguageContext;
