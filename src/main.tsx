/* 
  Ponto de entrada da aplicação React.
  Inicializa o componente principal e estilos globais.
*/
import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './Principal.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
