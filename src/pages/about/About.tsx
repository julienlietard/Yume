import { Link } from 'react-router-dom';
import {
  JUTypography,
  JUButton,
  JUBadge,
  JUSectionHeader,
  JUCard,
} from 'ju-library';
import styles from './about.module.css';

interface Skill {
  category: string;
  items: string[];
}

const SKILLS: Skill[] = [
  { category: 'Frontend', items: ['React', 'TypeScript', 'Vite', 'CSS Modules', 'Design Systems'] },
  { category: 'Backend', items: ['Django', 'Django REST Framework', 'PostgreSQL', 'Python'] },
  { category: 'Cloud & DevOps', items: ['Azure', 'Static Web Apps', 'App Service', 'CI/CD'] },
];

export default function About() {
  return (
    <div className={styles.root}>
      <div className={styles.inner}>
        {/* ── Intro ───────────────────────────────────────────────── */}
        <section className={styles.intro}>
          <JUTypography variant="h1">Julien Lietard</JUTypography>
          
          <JUTypography variant="lead" muted className={styles.role}>
            Développeur Full Stack · React & TypeScript · Azure
          </JUTypography>
          
          <div className={styles.bio}>
            <JUTypography variant="body">
              Je construis des interfaces et des architectures frontend depuis plusieurs années,
              avec une attention particulière pour la qualité du code, la performance et
              l'expérience développeur.
            </JUTypography>
            <JUTypography variant="body">
              En parallèle de mon travail, je maintiens <strong>ju-library</strong>, une librairie
              de composants React, et j'écris sur ce blog pour documenter ce que j'apprends.
            </JUTypography>
          </div>
          
          <div className={styles.links}>
            <a
              href="https://julienlietard.fr"
              target="_blank"
              rel="noopener noreferrer"
            >
              <JUButton label="Portfolio →" variant="primary" size="m" />
            </a>
            <a
              href="https://github.com/julienlietard"
              target="_blank"
              rel="noopener noreferrer"
            >
              <JUButton label="GitHub" variant="ghost" size="m" />
            </a>
          </div>
        </section>

        {/* ── Skills ──────────────────────────────────────────────── */}
        <section className={styles.section}>
          <JUSectionHeader title="Technologies" align="left" />
          
          <div className={styles.skillGrid}>
            {SKILLS.map(({ category, items }) => (
              <JUCard key={category} variant="outline" padding="md">
                <JUTypography variant="h4" className={styles.skillCategory}>
                  {category}
                </JUTypography>
                <div className={styles.skillList}>
                  {items.map((item) => (
                    <JUBadge key={item} label={item} color="default" />
                  ))}
                </div>
              </JUCard>
            ))}
          </div>
        </section>

        {/* ── Ce blog ─────────────────────────────────────────────── */}
        <section className={styles.section}>
          <JUSectionHeader title="Ce blog" align="left" />
          
          <div className={styles.prose}>
            <JUTypography variant="body">
              <strong>Yume</strong> (夢, <em>rêve</em> en japonais) est mon espace pour penser
              à voix haute sur le développement frontend. Pas de contenu généré, pas de SEO bait —
              juste des notes honnêtes sur ce que j'explore.
            </JUTypography>
            <JUTypography variant="body">
              La stack : React 18, TypeScript, Vite, CSS Modules, déployé sur Azure Static Web Apps.
              Le code source est pensé pour évoluer vers une plateforme multi-auteurs.
            </JUTypography>
          </div>
          
          <Link to="/articles" className={styles.ctaLink}>
            <JUButton label="Lire les articles →" variant="secondary" size="m" />
          </Link>
        </section>
      </div>
    </div>
  );
}
