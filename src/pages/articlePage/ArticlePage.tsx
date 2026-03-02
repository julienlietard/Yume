import { useEffect, useState, useCallback } from 'react';
import { useParams, Link, Navigate, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { getArticleBySlug } from '@/api/articles';
import type { Article } from '@/types/article';
import {
  JUTypography,
  JUBadge,
  JUBreadcrumbs,
  JUButton,
  JUSkeleton,
  JUIsland,
  JUCodeBlock,
} from 'ju-library';
import styles from './article-page.module.css';

export default function ArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [article, setArticle] = useState<Article | null | undefined>(undefined);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    if (!slug) return;
    getArticleBySlug(slug).then(setArticle);
  }, [slug]);

  useEffect(() => {
    if (article) {
      document.title = `${article.title} — Yume`;
    }
    return () => {
      document.title = 'Yume';
    };
  }, [article]);

  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    setScrollProgress(Math.min(100, Math.max(0, progress)));
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Loading state
  if (article === undefined) {
    return (
      <div className={styles.root}>
        <div className={styles.breadcrumbsWrapper}>
          <div className={styles.breadcrumbsInner}>
            <JUSkeleton variant="text" width="60%" height={20} />
          </div>
        </div>
        <div className={styles.layout}>
          <article className={styles.article}>
            <header className={styles.articleHeader}>
              <div className={styles.tags}>
                <JUSkeleton variant="rounded" width={60} height={24} />
                <JUSkeleton variant="rounded" width={80} height={24} />
              </div>
              <JUSkeleton variant="text" width="90%" height={48} />
              <JUSkeleton variant="text" width="70%" height={24} />
              <div className={styles.meta}>
                <JUSkeleton variant="text" width={200} height={16} />
              </div>
            </header>
            <JUSkeleton variant="rounded" width="100%" height={400} />
          </article>
        </div>
      </div>
    );
  }

  // Not found
  if (article === null) {
    return <Navigate to="/articles" replace />;
  }

  const breadcrumbItems = [
    { label: 'Accueil', href: '/', onClick: () => navigate('/') },
    { label: 'Articles', href: '/articles', onClick: () => navigate('/articles') },
    { label: article.title },
  ];

  return (
    <div className={styles.root}>
      <nav aria-label="Fil d'Ariane" className={styles.breadcrumbsWrapper}>
        <div className={styles.breadcrumbsInner}>
          <JUBreadcrumbs items={breadcrumbItems} maxItems={4} />
        </div>
      </nav>

      <div className={styles.layout}>
        <article className={styles.article}>
          <header className={styles.articleHeader}>
            <div className={styles.tags}>
              {article.tags.map((tag) => (
                <JUBadge key={tag} label={tag} color="blue" />
              ))}
            </div>

            <JUTypography variant="h1" balance>
              {article.title}
            </JUTypography>
            
            <JUTypography variant="lead" muted className={styles.description}>
              {article.description}
            </JUTypography>

            <div className={styles.meta}>
              <JUTypography variant="small" as="span">
                {article.author}
              </JUTypography>
              <span className={styles.metaSep} aria-hidden="true">·</span>
              <JUTypography variant="small" as="time" muted>
                {new Date(article.date).toLocaleDateString('fr-FR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </JUTypography>
              {article.readingTime && (
                <>
                  <span className={styles.metaSep} aria-hidden="true">·</span>
                  <JUTypography variant="small" as="span" muted>
                    {article.readingTime} min de lecture
                  </JUTypography>
                </>
              )}
            </div>
          </header>

          {article.coverImage && (
            <div className={styles.cover}>
              <img
                src={article.coverImage}
                alt={`Illustration pour "${article.title}"`}
                className={styles.coverImg}
                loading="eager"
              />
            </div>
          )}

          {/* Contenu Markdown avec JUCodeBlock */}
          <div className={styles.content}>
            <ReactMarkdown
              components={{
                code({ node, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || '');
                  const isInline = !match;
                  
                  if (isInline) {
                    return <code className={styles.inlineCode} {...props}>{children}</code>;
                  }
                  
                  return (
                    <JUCodeBlock
                      code={String(children).replace(/\n$/, '')}
                      language={match[1]}
                      lineNumbers
                      copyable
                    />
                  );
                },
                h1: ({ children }) => <JUTypography variant="h1">{children}</JUTypography>,
                h2: ({ children }) => <JUTypography variant="h2">{children}</JUTypography>,
                h3: ({ children }) => <JUTypography variant="h3">{children}</JUTypography>,
                h4: ({ children }) => <JUTypography variant="h4">{children}</JUTypography>,
                p: ({ children }) => <JUTypography variant="body">{children}</JUTypography>,
                blockquote: ({ children }) => <blockquote className={styles.blockquote}>{children}</blockquote>,
              }}
            >
              {article.content}
            </ReactMarkdown>
          </div>

          <footer className={styles.articleFooter}>
            <Link to="/articles">
              <JUButton
                label="← Retour aux articles"
                variant="ghost"
                size="m"
              />
            </Link>
          </footer>
        </article>
      </div>

      <div className={styles.islandWrapper}>
        <JUIsland
          sectionLabel={article.title}
          progress={scrollProgress}
          visible={scrollProgress > 5}
        />
      </div>
    </div>
  );
}