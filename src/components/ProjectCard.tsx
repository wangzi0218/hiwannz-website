import React, { useState, useEffect } from 'react';
import { ExternalLink, Github } from 'lucide-react';

// 引入语言类型
import type { Language } from '../i18n/translations';

interface ProjectCardProps {
  title: string;
  description: string;
  chineseTitle?: string;
  chineseDescription?: string;
  tags: string[];
  imageUrl: string;
  liveUrl?: string;
  githubUrl?: string;
  index: number;
  projectUrl?: string; // 添加项目详情页面URL
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  chineseTitle,
  chineseDescription,
  tags,
  imageUrl,
  liveUrl,
  githubUrl,
  index,
  projectUrl
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');
  const [isI18nReady, setIsI18nReady] = useState(false);

  // 组件挂载状态管理
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  // 监听语言变化
  useEffect(() => {
    // 确保组件已挂载且在客户端执行
    if (!isMounted || typeof window === 'undefined') return;
    
    const updateLanguage = () => {
      try {
        // 使用全局函数获取当前语言
        if (typeof window.getCurrentLanguage === 'function') {
          const lang = window.getCurrentLanguage() as Language;
          setCurrentLanguage(lang);
          setIsI18nReady(true);
        }
      } catch (error) {
        console.error('获取当前语言时出错:', error);
        setIsI18nReady(true); // 即使出错也标记为准备就绪，使用默认语言
      }
    };
    
    // 初始化语言
    updateLanguage();
    
    // 添加语言变化事件监听器
    document.addEventListener('languageChanged', updateLanguage);
    
    // 清理函数
    return () => {
      document.removeEventListener('languageChanged', updateLanguage);
    };
  }, [isMounted]);

  // 处理内部链接点击，阻止事件冒泡，避免触发父级链接
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // 只有当点击的是 GitHub 或 Live Demo 链接时才阻止事件冒泡
    if (e.currentTarget.getAttribute('data-link-type') === 'external') {
      e.stopPropagation();
    }
  };
  
  // 处理卡片点击，导航到项目详情页面
  const handleCardClick = (e: React.MouseEvent) => {
    // 防止在点击外部链接时触发卡片点击
    const target = e.target as HTMLElement;
    if (target.closest('a[data-link-type="external"]')) {
      e.stopPropagation();
      return;
    }
    
    // 确保有效的项目 URL
    if (projectUrl) {
      // 确保 projectUrl 是字符串
      const safeProjectUrl = String(projectUrl);
      
      // 使用标准的方式进行导航
      window.location.href = safeProjectUrl;
    } else {
      console.warn('No project URL provided for navigation');
    }
  };

  // 如果组件未挂载，显示加载骨架
  if (!isMounted) {
    return (
      <div className="group relative rounded-lg overflow-hidden h-[350px] bg-card animate-pulse">
        <div className="absolute inset-0 w-full h-full bg-muted/50"></div>
        <div className="absolute inset-0 w-full h-full p-6 flex flex-col justify-end">
          <div className="flex flex-wrap gap-2 mb-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-5 w-16 rounded-full bg-muted/70"></div>
            ))}
          </div>
          <div className="h-7 w-3/4 mb-2 bg-muted/70 rounded"></div>
          <div className="h-4 w-full mb-4 bg-muted/70 rounded"></div>
          <div className="flex gap-4">
            <div className="h-5 w-20 bg-muted/70 rounded"></div>
            <div className="h-5 w-20 bg-muted/70 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  // 获取显示标题和描述
  const displayTitle = currentLanguage === 'zh' && chineseTitle ? chineseTitle : title;
  const displayDescription = currentLanguage === 'zh' && chineseDescription ? chineseDescription : description;

  return (
    <div
      className="group relative rounded-lg overflow-hidden h-[350px] cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-project-id={projectUrl ? String(projectUrl).split('/').pop() : title.toLowerCase().replace(/\s+/g, '-')}
      onClick={handleCardClick}
    >
      {/* 添加一个全屏链接，使整个卡片可点击 */}
      {projectUrl && (
        <a 
          href={String(projectUrl)}
          className="absolute inset-0 z-10"
          aria-label={`View project: ${displayTitle}`}
        >
          <span className="sr-only">{displayTitle}</span>
        </a>
      )}
      {/* Image with overlay */}
      <div className="absolute inset-0 w-full h-full">
        <img 
          src={imageUrl} 
          alt={displayTitle} 
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-500 ease-out group-hover:opacity-90"></div>
      </div>

      {/* Content */}
      <div className="absolute inset-0 w-full h-full p-6 flex flex-col justify-end text-white">
        {/* 标签区域 - 在顶部，hover 时上移 */}
        <div 
          className={`flex flex-wrap gap-2 mb-4 transition-all duration-500 ${isHovered ? '-translate-y-2 opacity-100' : 'translate-y-0 opacity-90'}`}
        >
          {tags.map((tag) => (
            <span key={tag} className="text-xs py-1 px-2 rounded-full bg-white/10 backdrop-blur-sm">
              {tag}
            </span>
          ))}
        </div>

        {/* 标题 - 在标签下方，hover 时上移 */}
        <h3 
          className={`text-xl font-bold mb-2 transition-transform duration-500 ${isHovered ? '-translate-y-2' : 'translate-y-0'} project-title`} 
          suppressHydrationWarning
        >
          {displayTitle}
        </h3>
        
        {/* 描述 - 在标题下方，只在 hover 时显示 */}
        <p 
          className={`text-sm text-white/90 transition-all duration-300 ${isHovered ? 'opacity-100 max-h-20 mb-4' : 'opacity-0 max-h-0 overflow-hidden mb-0'}`}
          suppressHydrationWarning
        >
          {currentLanguage === 'zh' && chineseDescription ? chineseDescription : description}
        </p>

        {/* 外部链接按钮 - 只在 hover 时显示 */}
        <div 
          className={`flex gap-4 transition-all duration-300 ${isHovered ? 'opacity-100 max-h-10' : 'opacity-0 max-h-0 overflow-hidden'}`}
        >
          {liveUrl && (
            <a 
              href={liveUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-white/80 transition-colors"
              onClick={handleLinkClick}
              data-link-type="external"
            >
              <ExternalLink size={16} />
              <span className="text-sm" data-i18n-key="projects.viewProject" suppressHydrationWarning>View project</span>
            </a>
          )}
          {githubUrl && (
            <a 
              href={githubUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-white/80 transition-colors"
              onClick={handleLinkClick}
              data-link-type="external"
            >
              <Github size={16} />
              <span className="text-sm" data-i18n-key="projects.sourceCode" suppressHydrationWarning>Source code</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
