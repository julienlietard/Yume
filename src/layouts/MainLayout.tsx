import { Outlet, NavLink, Link } from 'react-router-dom';
import { JUTypography, JUButton, JUQuoteFooter } from 'ju-library';
import styles from './main-layout.module.css';

/**
 * Layout racine partagé par toutes les pages.
 *
 * Structure :
 *   <header> — navigation principale (ju-library components)
 *   <main>   — contenu de la page via <Outlet>
 *   <footer> — liens secondaires
 */

interface NavItem {
  to: string;
  label: string;
}

const NAV_ITEMS: NavItem[] = [
  { to: '/articles', label: 'Articles' },
  { to: '/about', label: 'À propos' },
];

export default function MainLayout() {
  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          {/* Logo / wordmark */}
          <Link to="/" className={styles.logo} aria-label="Yume — retour à l'accueil">
            <span className={styles.logoText}>夢</span>
            <JUTypography variant="body" as="span" className={styles.logoName}>
              Yume
            </JUTypography>
          </Link>

          {/* Navigation principale */}
          <nav aria-label="Navigation principale" className={styles.nav}>
            {NAV_ITEMS.map(({ to, label }) => (
              <NavLink key={to} to={to} className={styles.navLinkWrapper}>
                {({ isActive }) => (
                  <JUButton
                    label={label}
                    variant={isActive ? 'secondary' : 'ghost'}
                    size="s"
                  />
                )}
              </NavLink>
            ))}
          </nav>

          {/* Zone réservée pour UserMenu / auth (futur) */}
          <div className={styles.headerActions}>
            {/* TODO: <UserMenu /> quand l'auth sera en place */}
          </div>
        </div>
      </header>

      {/* Contenu de la page courante */}
      <main id="main-content" className={styles.main}>
        <Outlet />
      </main>

      <footer className={styles.footer}>
        <JUQuoteFooter
  quotes={[
    { text: "Le code est de la poésie.", author: "Anonyme" },
    { text: "Simplicité est sophistication.", author: "Da Vinci" },
  ]}
  backgroundColor="#161616"
  logo={{ src: '/logo.svg', alt: 'Yume' }}
  legal={{
    copyright: '© 2026 Julien Lietard',
    links: [{ label: 'Portfolio', href: 'https://julienlietard.fr' }],
  }}
/>
      </footer>
    </div>
  );
}
