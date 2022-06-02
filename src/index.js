import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';

const rootEl = document.getElementById('root');
const root = createRoot(rootEl);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);

