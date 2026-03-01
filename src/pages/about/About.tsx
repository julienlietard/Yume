import { Link } from 'react-router-dom';
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
          <div className={styles.introText}>
            <h1 className={styles.name}>Julien Lietard</h1>
            <p className={styles.role}>Développeur Full Stack · React & TypeScript · Azure</p>
            <div className={styles.bio}>
              <p>
                Je construis des interfaces et des architectures frontend depuis plusieurs années,
                avec une attention particulière pour la qualité du code, la performance et
                l'expérience développeur.
              </p>
              <p>
                En parallèle de mon travail, je maintiens <strong>ju-library</strong>, une librairie
                de composants React, et j'écris sur ce blog pour documenter ce que j'apprends.
              </p>
            </div>
            <div className={styles.links}>
              <a
                href="https://julienlietard.fr"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.linkPrimary}
              >
                Portfolio →
              </a>
              <a
                href="https://github.com/julienlietard"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.linkSecondary}
              >
                GitHub
              </a>
            </div>
          </div>
        </section>

        {/* ── Skills ──────────────────────────────────────────────── */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Technologies</h2>
          <div className={styles.skillGrid}>
            {SKILLS.map(({ category, items }) => (
              <div key={category} className={styles.skillGroup}>
                <h3 className={styles.skillCategory}>{category}</h3>
                <ul className={styles.skillList}>
                  {items.map((item) => (
                    <li key={item} className={styles.skillItem}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ── Ce blog ─────────────────────────────────────────────── */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Ce blog</h2>
          <div className={styles.prose}>
            <p>
              <strong>Yume</strong> (夢, <em>rêve</em> en japonais) est mon espace pour penser
              à voix haute sur le développement frontend. Pas de contenu généré, pas de SEO bait —
              juste des notes honnêtes sur ce que j'explore.
            </p>
            <p>
              La stack : React 18, TypeScript, Vite, CSS Modules, déployé sur Azure Static Web Apps.
              Le code source est pensé pour évoluer vers une plateforme multi-auteurs.
            </p>
          </div>
          <Link to="/articles" className={styles.linkPrimary} style={{ marginTop: '1.5rem', display: 'inline-flex' }}>
            Lire les articles →
          </Link>
        </section>
      </div>
    </div>
  );
}