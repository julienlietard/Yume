import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getRecentArticles } from '@/api/articles';
import type { ArticlePreview } from '@/types/article';
import styles from './home.module.css';

export default function Home() {
  const [articles, setArticles] = useState<ArticlePreview[]>([]);

  useEffect(() => {
    getRecentArticles(3).then(setArticles);
  }, []);

  return (
    <div className={styles.root}>
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <span className={styles.heroKanji} aria-hidden="true">夢</span>
          <h1 className={styles.heroTitle}>
            Penser à voix haute<br />sur le frontend.
          </h1>
          <p className={styles.heroLead}>
            Notes, retours d'expérience et explorations sur React, TypeScript,
            les design systems et l'architecture applicative.
            Par <strong>Julien Lietard</strong>.
          </p>
          <div className={styles.heroActions}>
            <Link to="/articles" className={styles.ctaPrimary}>
              Lire les articles
            </Link>
            <Link to="/about" className={styles.ctaSecondary}>
              À propos
            </Link>
          </div>
        </div>
      </section>

      {/* ── Articles récents ─────────────────────────────────────── */}
      {articles.length > 0 && (
        <section className={styles.recent}>
          <div className={styles.sectionInner}>
            <h2 className={styles.sectionTitle}>Articles récents</h2>
            <ul className={styles.articleList}>
              {articles.map((article) => (
                <li key={article.slug}>
                  <Link to={`/articles/${article.slug}`} className={styles.articleCard}>
                    <div className={styles.articleMeta}>
                      <time dateTime={article.date} className={styles.articleDate}>
                        {new Date(article.date).toLocaleDateString('fr-FR', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </time>
                      {article.readingTime && (
                        <span className={styles.articleReadingTime}>
                          {article.readingTime} min
                        </span>
                      )}
                    </div>
                    <h3 className={styles.articleTitle}>{article.title}</h3>
                    <p className={styles.articleDescription}>{article.description}</p>
                    <div className={styles.articleTags}>
                      {article.tags.map((tag) => (
                        <span key={tag} className={styles.tag}>{tag}</span>
                      ))}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
            <div className={styles.seeAll}>
              <Link to="/articles" className={styles.ctaSecondary}>
                Voir tous les articles →
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}