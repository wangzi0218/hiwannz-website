// 导航调试脚本
document.addEventListener('DOMContentLoaded', () => {
  console.log('🔍 导航调试脚本已加载');
  
  // 记录当前页面信息
  console.log('📄 当前页面:', window.location.href);
  console.log('🔗 路径名:', window.location.pathname);
  
  // 监听所有点击事件
  document.addEventListener('click', (e) => {
    const target = e.target;
    
    // 检查是否点击了链接或其父元素是链接
    const linkElement = target.closest('a');
    if (linkElement) {
      const href = linkElement.getAttribute('href');
      console.log('🔗 点击链接:', href);
      
      // 检查是否是项目链接
      if (href && href.startsWith('/projects/')) {
        console.log('📁 项目链接被点击:', href);
        
        // 记录额外信息以便调试
        const projectId = href.split('/').pop();
        console.log('📋 项目ID:', projectId);
      }
    }
    
    // 检查是否点击了项目卡片
    const projectCard = target.closest('.project-card') || target.closest('[data-project-id]');
    if (projectCard) {
      const projectId = projectCard.getAttribute('data-project-id');
      console.log('🖼️ 项目卡片被点击:', projectId);
    }
  });
  
  // 监听导航事件
  window.addEventListener('beforeunload', () => {
    console.log('🚀 页面即将导航离开');
  });
});
