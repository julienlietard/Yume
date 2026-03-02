import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import 'ju-library/tokens';
import 'ju-library/styles';
import './styles/global.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error(
    '[Yume] Élément #root introuvable dans le DOM. Vérifier index.html.'
  );
}

createRoot(rootElement).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
