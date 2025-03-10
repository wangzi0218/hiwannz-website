/**
 * 便利贴颜色工具函数
 * 根据文章ID或标题生成一致的颜色，确保同一篇文章在列表页和详情页使用相同的颜色
 */

// 可用的便利贴颜色组合（背景、悬停、边框）
const STICKY_COLORS = [
  { bg: 'bg-sky-50', hover: 'hover:bg-sky-100', border: 'border-sky-200/50', name: 'sky' },
  { bg: 'bg-violet-50', hover: 'hover:bg-violet-100', border: 'border-violet-200/50', name: 'violet' },
  { bg: 'bg-amber-50', hover: 'hover:bg-amber-100', border: 'border-amber-200/50', name: 'amber' },
  { bg: 'bg-rose-50', hover: 'hover:bg-rose-100', border: 'border-rose-200/50', name: 'rose' },
  { bg: 'bg-emerald-50', hover: 'hover:bg-emerald-100', border: 'border-emerald-200/50', name: 'emerald' },
  { bg: 'bg-yellow-50', hover: 'hover:bg-yellow-100', border: 'border-yellow-200/50', name: 'yellow' },
  { bg: 'bg-blue-50', hover: 'hover:bg-blue-100', border: 'border-blue-200/50', name: 'blue' },
  { bg: 'bg-pink-50', hover: 'hover:bg-pink-100', border: 'border-pink-200/50', name: 'pink' },
  { bg: 'bg-green-50', hover: 'hover:bg-green-100', border: 'border-green-200/50', name: 'green' },
  { bg: 'bg-orange-50', hover: 'hover:bg-orange-100', border: 'border-orange-200/50', name: 'orange' },
  { bg: 'bg-indigo-50', hover: 'hover:bg-indigo-100', border: 'border-indigo-200/50', name: 'indigo' },
  { bg: 'bg-teal-50', hover: 'hover:bg-teal-100', border: 'border-teal-200/50', name: 'teal' }
];

/**
 * 根据字符串生成一个一致的数字
 * @param {string} str - 输入字符串（如文章ID或标题）
 * @returns {number} - 生成的数字
 */
function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash = hash & hash; // 转换为32位整数
  }
  return Math.abs(hash);
}

/**
 * 根据文章ID或标题获取一致的便利贴颜色
 * @param {string} identifier - 文章标识符（ID或标题）
 * @param {Object} options - 可选配置项
 * @param {number[]} options.exclude - 要排除的颜色索引数组
 * @returns {Object} - 包含背景、悬停和边框颜色的对象
 */
export function getStickyNoteColor(identifier, options = {}) {
  const hash = hashString(identifier);
  
  // 如果有排除的颜色索引，则选择不在排除列表中的颜色
  if (options.exclude && options.exclude.length > 0) {
    // 创建可用颜色索引数组（排除指定的颜色）
    const availableIndices = Array.from(
      { length: STICKY_COLORS.length },
      (_, i) => i
    ).filter(i => !options.exclude.includes(i));
    
    // 如果没有可用的颜色，则返回默认第一个
    if (availableIndices.length === 0) {
      return STICKY_COLORS[0];
    }
    
    // 从可用的颜色中选择一个
    const selectedIndex = availableIndices[hash % availableIndices.length];
    return STICKY_COLORS[selectedIndex];
  }
  
  // 没有排除项，正常选择颜色
  const colorIndex = hash % STICKY_COLORS.length;
  return STICKY_COLORS[colorIndex];
}

/**
 * 获取随机的轻微旋转角度
 * @param {string} identifier - 文章标识符（ID或标题）
 * @param {number} min - 最小角度（默认-1.5）
 * @param {number} max - 最大角度（默认1.5）
 * @returns {string} - 旋转角度字符串，如 "1.2deg"
 */
export function getStickyNoteRotation(identifier, min = -1.5, max = 1.5) {
  const hash = hashString(identifier);
  // 使用哈希值生成一个在min和max之间的数字
  const range = max - min;
  const rotation = min + (hash % 1000) / 1000 * range;
  return `${rotation.toFixed(1)}deg`;
}

/**
 * 获取便利贴完整的样式类和内联样式
 * @param {string} identifier - 文章标识符（ID或标题）
 * @param {boolean} isLink - 是否为链接元素（添加悬停效果）
 * @returns {Object} - 包含className和style的对象
 */
export function getStickyNoteStyles(identifier, isLink = false) {
  const color = getStickyNoteColor(identifier);
  const rotation = getStickyNoteRotation(identifier);
  
  let className = `${color.bg} ${color.border} border rounded-lg shadow-sm`;
  if (isLink) {
    className += ` ${color.hover} transition-all`;
  }
  
  return {
    className,
    style: `transform: rotate(${rotation});`,
    colorName: color.name,
    colorIndex: STICKY_COLORS.findIndex(c => c.name === color.name)
  };
}

/**
 * 获取装饰性便利贴的颜色，确保与主要便利贴颜色不同
 * @param {string} identifier - 文章标识符（ID或标题）
 * @param {number} mainColorIndex - 主要便利贴的颜色索引，用于排除
 * @returns {Object} - 包含装饰性便利贴的颜色数组（两个不同的颜色）
 */
export function getDecorativeStickyColors(identifier, mainColorIndex) {
  // 生成第一个装饰性便利贴的颜色（排除主要颜色）
  const decorColor1 = getStickyNoteColor(identifier + '-decor1', { 
    exclude: [mainColorIndex] 
  });
  
  // 生成第二个装饰性便利贴的颜色（排除主要颜色和第一个装饰性颜色）
  const decorColor1Index = STICKY_COLORS.findIndex(c => c.name === decorColor1.name);
  const decorColor2 = getStickyNoteColor(identifier + '-decor2', { 
    exclude: [mainColorIndex, decorColor1Index] 
  });
  
  return [decorColor1, decorColor2];
}
