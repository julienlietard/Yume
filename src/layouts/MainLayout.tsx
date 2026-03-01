import { Outlet, NavLink, Link } from 'react-router-dom';
import styles from './main-layout.module.css';

/**
 * Layout racine partagé par toutes les pages.
 *
 * Structure :
 *   <header> — navigation principale
 *   <main>   — contenu de la page via <Outlet>
 *   <footer> — liens secondaires
 *
 * Anticipation : quand l'auth arrivera, le header contiendra
 * le UserMenu (avatar, dashboard, déconnexion). L'emplacement
 * est prévu dans .header__actions.
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
            <span className={styles.logoName}>Yume</span>
          </Link>

          {/* Navigation principale */}
          <nav aria-label="Navigation principale" className={styles.nav}>
            {NAV_ITEMS.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  [styles.navLink, isActive ? styles.navLinkActive : ''].join(' ')
                }
              >
                {label}
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
        <div className={styles.footerInner}>
          <p className={styles.footerCopy}>
            © {new Date().getFullYear()} Julien Lietard —{' '}
            <a
              href="https://julienlietard.fr"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.footerLink}
            >
              Portfolio
            </a>
          </p>
          <nav aria-label="Navigation secondaire" className={styles.footerNav}>
            <Link to="/articles" className={styles.footerLink}>Articles</Link>
            <Link to="/about" className={styles.footerLink}>À propos</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}