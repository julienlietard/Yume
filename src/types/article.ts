/**
 * Représente un article dans Yume.
 *
 * MVP : alimenté par les fichiers Markdown locaux via import.meta.glob.
 * Futur : alimenté par l'API Django REST (GET /api/articles/).
 *
 * Le champ `content` contient du HTML sérialisé après le parse Markdown.
 * Quand l'API sera en place, elle renverra du HTML pré-rendu ou du Markdown
 * selon la stratégie choisie côté backend.
 */
export interface Article {
  slug: string;
  title: string;
  description: string;
  date: string;         // ISO 8601 — ex: "2026-03-01"
  tags: string[];
  author: string;
  coverImage?: string;
  readingTime?: number; // en minutes, calculé au build ou par l'API
  published: boolean;
  content: string;      // HTML rendu côté client/build
}

/**
 * Sous-ensemble utilisé pour les cartes et listes d'articles.
 * Évite de transporter `content` (potentiellement lourd) dans les listings.
 *
 * Anticipation : l'endpoint GET /api/articles/ renverra ce format,
 * GET /api/articles/:slug/ renverra l'Article complet.
 */
export type ArticlePreview = Omit<Article, 'content'>;

/**
 * Frontmatter brut tel qu'il apparaît dans les fichiers .md.
 * Utilisé uniquement dans la couche api/ — ne pas exporter vers les pages.
 */
export interface ArticleFrontmatter {
  title: string;
  description: string;
  date: string;
  tags: string[];
  author: string;
  coverImage?: string;
  published: boolean;
}