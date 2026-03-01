import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getArticles, getAllTags } from '@/api/articles';
import type { ArticlePreview } from '@/types/article';
import styles from './article-list.module.css';

export default function ArticleList() {
  const [articles, setArticles] = useState<ArticlePreview[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getArticles(), getAllTags()]).then(([arts, tgs]) => {
      setArticles(arts);
      setTags(tgs);
      setLoading(false);
    });
  }, []);

  const filtered = activeTag
    ? articles.filter((a) => a.tags.includes(activeTag))
    : articles;

  return (
    <div className={styles.root}>
      <div className={styles.inner}>
        {/* ── Header ─────────────────────────────────────────────── */}
        <header className={styles.header}>
          <h1 className={styles.title}>Articles</h1>
          <p className={styles.subtitle}>
            {articles.length} article{articles.length !== 1 ? 's' : ''} publiés
          </p>
        </header>

        {/* ── Filtres par tag ─────────────────────────────────────── */}
        {tags.length > 0 && (
          <nav aria-label="Filtrer par tag" className={styles.tagNav}>
            <button
              className={[styles.tagBtn, activeTag === null ? styles.tagBtnActive : ''].join(' ')}
              onClick={() => setActiveTag(null)}
            >
              Tous
            </button>
            {tags.map((tag) => (
              <button
                key={tag}
                className={[styles.tagBtn, activeTag === tag ? styles.tagBtnActive : ''].join(' ')}
                onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                aria-pressed={activeTag === tag}
              >
                {tag}
              </button>
            ))}
          </nav>
        )}

        {/* ── Liste ──────────────────────────────────────────────── */}
        {loading ? (
          <p className={styles.loading}>Chargement…</p>
        ) : filtered.length === 0 ? (
          <p className={styles.empty}>Aucun article pour ce tag.</p>
        ) : (
          <ul className={styles.list}>
            {filtered.map((article) => (
              <li key={article.slug} className={styles.item}>
                <Link to={`/articles/${article.slug}`} className={styles.card}>
                  <div className={styles.cardMeta}>
                    <time dateTime={article.date} className={styles.date}>
                      {new Date(article.date).toLocaleDateString('fr-FR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </time>
                    {article.readingTime && (
                      <span className={styles.readingTime}>{article.readingTime} min de lecture</span>
                    )}
                  </div>
                  <h2 className={styles.cardTitle}>{article.title}</h2>
                  <p className={styles.cardDescription}>{article.description}</p>
                  <div className={styles.cardTags}>
                    {article.tags.map((tag) => (
                      <span key={tag} className={styles.tag}>{tag}</span>
                    ))}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}