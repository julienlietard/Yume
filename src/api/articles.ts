/**
 * Couche d'abstraction data — Articles
 *
 * MVP  : lit les fichiers Markdown via import.meta.glob (filesystem Vite).
 * Futur: remplacer les implémentations par des appels fetch('/api/articles/').
 *
 * gray-matter utilise Buffer (API Node.js) — incompatible navigateur.
 * On parse le frontmatter YAML manuellement avec une regex simple.
 */

import { remark } from 'remark';
import remarkHtml from 'remark-html';
import type { Article, ArticleFrontmatter, ArticlePreview } from '@/types/article';

// ---------------------------------------------------------------------------
// Glob
// ---------------------------------------------------------------------------

const markdownFiles = import.meta.glob<string>('../content/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
});

// ---------------------------------------------------------------------------
// Helpers internes
// ---------------------------------------------------------------------------

/**
 * Parse le frontmatter YAML et le body Markdown sans dépendance Node.js.
 * Gère les types : string, boolean, tableau inline ["a", "b"].
 */
function parseFrontmatter(raw: string): { data: ArticleFrontmatter; content: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { data: {} as ArticleFrontmatter, content: raw };

  const yamlBlock = match[1] ?? '';
  const content = match[2] ?? '';
  const data: Record<string, unknown> = {};

  for (const line of yamlBlock.split('\n')) {
    const colonIdx = line.indexOf(':');
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim();
    const rawVal = line.slice(colonIdx + 1).trim();
    if (!key) continue;

    // Tableau inline : ["a", "b"] ou [a, b]
    if (rawVal.startsWith('[')) {
      data[key] = rawVal
        .slice(1, -1)
        .split(',')
        .map((v) => v.trim().replace(/^["']|["']$/g, ''))
        .filter(Boolean);
      continue;
    }

    if (rawVal === 'true') { data[key] = true; continue; }
    if (rawVal === 'false') { data[key] = false; continue; }

    data[key] = rawVal.replace(/^["']|["']$/g, '');
  }

  return { data: data as unknown as ArticleFrontmatter, content };
}

function estimateReadingTime(text: string): number {
  const wordCount = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(wordCount / 200));
}

async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark().use(remarkHtml, { sanitize: false }).process(markdown);
  return result.toString();
}

function slugFromPath(filePath: string): string {
  return filePath.split('/').pop()?.replace(/\.md$/, '') ?? '';
}

async function parseMarkdownFile(filePath: string, rawContent: string): Promise<Article> {
  const { data, content: markdownBody } = parseFrontmatter(rawContent);

  return {
    slug: slugFromPath(filePath),
    title: data.title ?? '',
    description: data.description ?? '',
    date: data.date ?? '',
    tags: data.tags ?? [],
    author: data.author ?? '',
    coverImage: data.coverImage,
    published: data.published ?? false,
    readingTime: estimateReadingTime(markdownBody),
    content: markdownBody,  // ← Markdown brut, pas HTML
  };
}

// ---------------------------------------------------------------------------
// API publique
// ---------------------------------------------------------------------------

export async function getArticles(): Promise<ArticlePreview[]> {
  const entries = Object.entries(markdownFiles);

  const articles = await Promise.all(
    entries.map(([filePath, rawContent]) => parseMarkdownFile(filePath, rawContent))
  );

  return articles
    .filter((article) => article.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .map(({ content: _content, ...preview }) => preview);
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const filePath = Object.keys(markdownFiles).find(
    (path) => slugFromPath(path) === slug
  );

  if (!filePath) return null;

  const rawContent = markdownFiles[filePath];
  if (!rawContent) return null;

  const article = await parseMarkdownFile(filePath, rawContent);
  if (!article.published) return null;

  return article;
}

export async function getAllTags(): Promise<string[]> {
  const articles = await getArticles();
  const tagSet = new Set(articles.flatMap((a) => a.tags));
  return Array.from(tagSet).sort();
}

export async function getRecentArticles(count: number = 3): Promise<ArticlePreview[]> {
  const articles = await getArticles();
  return articles.slice(0, count);
}
