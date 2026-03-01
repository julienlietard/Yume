import { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { getArticleBySlug } from '@/api/articles';
import type { Article } from '@/types/article';
import styles from './article-page.module.css';

export default function ArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<Article | null | undefined>(undefined);

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

  if (article === undefined) {
    return (
      <div className={styles.loading} role="status" aria-label="Chargement de l'article">
        Chargement…
      </div>
    );
  }

  if (article === null) {
    return <Navigate to="/articles" replace />;
  }

  return (
    <div className={styles.root}>
      {/* ── Breadcrumbs ────────────────────────────────────────────── */}
      <nav aria-label="Fil d'Ariane" className={styles.breadcrumbs}>
        <div className={styles.breadcrumbsInner}>
          <Link to="/" className={styles.breadcrumbLink}>Accueil</Link>
          <span className={styles.breadcrumbSep} aria-hidden="true">/</span>
          <Link to="/articles" className={styles.breadcrumbLink}>Articles</Link>
          <span className={styles.breadcrumbSep} aria-hidden="true">/</span>
          <span className={styles.breadcrumbCurrent} aria-current="page">
            {article.title}
          </span>
        </div>
      </nav>

      <div className={styles.layout}>
        {/* ── Contenu principal ───────────────────────────────────── */}
        <article className={styles.article}>
          {/* Header */}
          <header className={styles.articleHeader}>
            <div className={styles.tags}>
              {article.tags.map((tag) => (
                <span key={tag} className={styles.tag}>{tag}</span>
              ))}
            </div>

            <h1 className={styles.title}>{article.title}</h1>
            <p className={styles.description}>{article.description}</p>

            <div className={styles.meta}>
              <span className={styles.author}>{article.author}</span>
              <span className={styles.metaSep} aria-hidden="true">·</span>
              <time dateTime={article.date} className={styles.date}>
                {new Date(article.date).toLocaleDateString('fr-FR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
              {article.readingTime && (
                <>
                  <span className={styles.metaSep} aria-hidden="true">·</span>
                  <span className={styles.readingTime}>
                    {article.readingTime} min de lecture
                  </span>
                </>
              )}
            </div>
          </header>

          {/* Cover image */}
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

          {/* Contenu Markdown rendu en HTML */}
          <div
            className={styles.content}
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Footer article */}
          <footer className={styles.articleFooter}>
            <Link to="/articles" className={styles.backLink}>
              ← Retour aux articles
            </Link>
          </footer>
        </article>
      </div>
    </div>
  );
}