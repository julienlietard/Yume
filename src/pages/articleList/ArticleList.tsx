import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getArticles, getAllTags } from '@/api/articles';
import type { ArticlePreview } from '@/types/article';
import {
  JUTypography,
  JUButton,
  JUCard,
  JUBadge,
  JUSkeleton,
} from 'ju-library';
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
          <JUTypography variant="h1">Articles</JUTypography>
          <JUTypography variant="body" muted className={styles.subtitle}>
            {articles.length} article{articles.length !== 1 ? 's' : ''} publiés
          </JUTypography>
        </header>

        {/* ── Filtres par tag ─────────────────────────────────────── */}
        {tags.length > 0 && (
          <nav aria-label="Filtrer par tag" className={styles.tagNav}>
            <JUButton
              label="Tous"
              variant={activeTag === null ? 'primary' : 'ghost'}
              size="s"
              onClick={() => setActiveTag(null)}
            />
            {tags.map((tag) => (
              <JUButton
                key={tag}
                label={tag}
                variant={activeTag === tag ? 'primary' : 'ghost'}
                size="s"
                onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                aria-pressed={activeTag === tag}
              />
            ))}
          </nav>
        )}

        {/* ── Liste ──────────────────────────────────────────────── */}
        {loading ? (
          <div className={styles.skeletonList}>
            {[1, 2, 3].map((i) => (
              <JUSkeleton key={i} variant="rounded" height={180} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <JUTypography variant="body" muted align="center" className={styles.empty}>
            Aucun article pour ce tag.
          </JUTypography>
        ) : (
          <ul className={styles.list}>
            {filtered.map((article) => (
              <li key={article.slug}>
                <Link to={`/articles/${article.slug}`} className={styles.cardLink}>
                  <JUCard variant="outline" padding="md" interactive>
                    <div className={styles.cardMeta}>
                      <JUTypography variant="caption" muted>
                        {new Date(article.date).toLocaleDateString('fr-FR', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </JUTypography>
                      {article.readingTime && (
                        <JUTypography variant="caption" muted>
                          {article.readingTime} min de lecture
                        </JUTypography>
                      )}
                    </div>
                    
                    <JUTypography variant="h3">{article.title}</JUTypography>
                    
                    <JUTypography variant="body" muted className={styles.cardDescription}>
                      {article.description}
                    </JUTypography>
                    
                    <div className={styles.cardTags}>
                      {article.tags.map((tag) => (
                        <JUBadge key={tag} label={tag} color="blue" />
                      ))}
                    </div>
                  </JUCard>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
