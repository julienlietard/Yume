import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getRecentArticles } from '@/api/articles';
import type { ArticlePreview } from '@/types/article';
import {
  JUTypography,
  JUButton,
  JUCard,
  JUBadge,
  JUSectionHeader,
} from 'ju-library';
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
          
          <JUTypography variant="h1" className={styles.heroTitle}>
            Penser à voix haute<br />sur le frontend.
          </JUTypography>
          
          <JUTypography variant="lead" muted className={styles.heroLead}>
            Notes, retours d'expérience et explorations sur React, TypeScript,
            les design systems et l'architecture applicative.
            Par <strong>Julien Lietard</strong>.
          </JUTypography>
          
          <div className={styles.heroActions}>
            <Link to="/articles">
              <JUButton label="Lire les articles" variant="primary" size="l" />
            </Link>
            <Link to="/about">
              <JUButton label="À propos" variant="ghost" size="l" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Articles récents ─────────────────────────────────────── */}
      {articles.length > 0 && (
        <section className={styles.recent}>
          <div className={styles.sectionInner}>
            <JUSectionHeader
              subtitle="Découvrez les derniers"
              title="Articles récents"
              align="left"
            />
            
            <ul className={styles.articleList}>
              {articles.map((article) => (
                <li key={article.slug}>
                  <Link to={`/articles/${article.slug}`} className={styles.articleLink}>
                    <JUCard variant="outline" padding="md" interactive>
                      <div className={styles.articleMeta}>
                        <JUTypography variant="caption" muted>
                          {new Date(article.date).toLocaleDateString('fr-FR', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </JUTypography>
                        {article.readingTime && (
                          <JUBadge label={`${article.readingTime} min`} color="default" />
                        )}
                      </div>
                      
                      <JUTypography variant="h3" className={styles.articleTitle}>
                        {article.title}
                      </JUTypography>
                      
                      <JUTypography variant="body" muted>
                        {article.description}
                      </JUTypography>
                      
                      <div className={styles.articleTags}>
                        {article.tags.map((tag) => (
                          <JUBadge key={tag} label={tag} color="blue" />
                        ))}
                      </div>
                    </JUCard>
                  </Link>
                </li>
              ))}
            </ul>
            
            <div className={styles.seeAll}>
              <Link to="/articles">
                <JUButton
                  label="Voir tous les articles →"
                  variant="secondary"
                  size="m"
                />
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
