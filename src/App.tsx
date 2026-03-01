import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';

/**
 * Code-splitting par page — chaque route charge son chunk indépendamment.
 * Anticipation : quand les pages Dashboard / Auth arriveront, elles
 * s'ajouteront ici sans toucher à la structure existante.
 */
const Home = lazy(() => import('@/pages/home/Home'));
const ArticleList = lazy(() => import('@/pages/articleList/ArticleList'));
const ArticlePage = lazy(() => import('@/pages/articlePage/ArticlePage'));
const About = lazy(() => import('@/pages/about/About'));

/**
 * Composant de fallback pendant le lazy loading.
 * À remplacer par un skeleton component de ju-design quand disponible.
 */
function PageLoader() {
  return (
    <div
      role="status"
      aria-label="Chargement de la page"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        color: 'var(--color-text-muted, #6b7280)',
        fontSize: '0.875rem',
      }}
    >
      Chargement…
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      {/* Toutes les pages partagent le MainLayout (header + footer) */}
      <Route element={<MainLayout />}>
        <Route
          index
          element={
            <Suspense fallback={<PageLoader />}>
              <Home />
            </Suspense>
          }
        />
        <Route
          path="articles"
          element={
            <Suspense fallback={<PageLoader />}>
              <ArticleList />
            </Suspense>
          }
        />
        <Route
          path="articles/:slug"
          element={
            <Suspense fallback={<PageLoader />}>
              <ArticlePage />
            </Suspense>
          }
        />
        <Route
          path="about"
          element={
            <Suspense fallback={<PageLoader />}>
              <About />
            </Suspense>
          }
        />

        {/* Redirections de sécurité */}
        <Route path="blog/*" element={<Navigate to="/articles" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}