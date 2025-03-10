// 导入 Astro 内容集合工具
import { defineCollection, z } from 'astro:content';

// 定义项目集合的模式
const projectsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    id: z.string(),
    title: z.string(),
    chineseTitle: z.string(),
    description: z.string(),
    chineseDescription: z.string(),
    tags: z.array(z.string()),
    imageUrl: z.string(),
    liveUrl: z.string().optional(),
    githubUrl: z.string().optional(),
    category: z.union([z.string(), z.array(z.string())]),
    featured: z.boolean().default(false),
    date: z.date(),
    // 新增项目背景信息字段
    status: z.enum(['completed', 'in-progress', 'ongoing','discontinued']).default('completed'),
    chineseStatus: z.string().optional(),
    year: z.string().optional(),
    duration: z.string().optional(),
    chineseDuration: z.string().optional(),
    client: z.string().optional(),
    chineseClient: z.string().optional(),
    team: z.array(z.object({
      name: z.string(),
      role: z.string(),
      chineseRole: z.string().optional(),
    })).optional(),
    categoryLabel: z.string().optional(),
    chineseCategoryLabel: z.string().optional(),
  }),
});

// 定义洞察集合的模式
const insightsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    id: z.string(),
    title: z.string(),
    chineseTitle: z.string(),
    excerpt: z.string(),
    chineseExcerpt: z.string(),
    date: z.date(),
    timeToRead: z.string(),
    tags: z.array(z.string()),
  }),
});

// 导出集合配置
export const collections = {
  'projects': projectsCollection,
  'insights': insightsCollection,
};
