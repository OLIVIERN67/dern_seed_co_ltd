import { Language } from '@/i18n/translations';

export interface BlogArticle {
  id: number;
  slug: string;
  categoryKey: string;
  date: string;
  image: string;
  titleKey: string;
  authorKey: string;
  excerptKey: string;
  contentKey: string;
}

export const blogArticles: BlogArticle[] = [
  {
    id: 1,
    slug: 'why-certified-seed-matters',
    categoryKey: 'blog_cat_seed_quality',
    date: '2026-05-15',
    image: '🌱',
    titleKey: 'blog_article_1_title',
    authorKey: 'blog_article_1_author',
    excerptKey: 'blog_article_1_excerpt',
    contentKey: 'blog_article_1_content',
  },
  {
    id: 2,
    slug: 'agricultural-financing-through-bk',
    categoryKey: 'blog_cat_finance',
    date: '2026-05-20',
    image: '💰',
    titleKey: 'blog_article_2_title',
    authorKey: 'blog_article_2_author',
    excerptKey: 'blog_article_2_excerpt',
    contentKey: 'blog_article_2_content',
  },
  {
    id: 3,
    slug: 'agra-aidi-project',
    categoryKey: 'blog_cat_projects',
    date: '2026-04-10',
    image: '🌍',
    titleKey: 'blog_article_3_title',
    authorKey: 'blog_article_3_author',
    excerptKey: 'blog_article_3_excerpt',
    contentKey: 'blog_article_3_content',
  },
  {
    id: 4,
    slug: 'iita-fobasi-partnership',
    categoryKey: 'blog_cat_projects',
    date: '2026-06-01',
    image: '🌾',
    titleKey: 'blog_article_4_title',
    authorKey: 'blog_article_4_author',
    excerptKey: 'blog_article_4_excerpt',
    contentKey: 'blog_article_4_content',
  },
  {
    id: 5,
    slug: 'available-opportunities',
    categoryKey: 'blog_cat_opportunities',
    date: '2026-06-10',
    image: '🌱',
    titleKey: 'blog_article_5_title',
    authorKey: 'blog_article_5_author',
    excerptKey: 'blog_article_5_excerpt',
    contentKey: 'blog_article_5_content',
  },
];

export function getBlogArticleBySlug(slug: string): BlogArticle | undefined {
  return blogArticles.find((a) => a.slug === slug);
}

export function getBlogArticleById(id: number): BlogArticle | undefined {
  return blogArticles.find((a) => a.id === id);
}
