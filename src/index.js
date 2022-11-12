// import react, react-dom/client, and module
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const element = document.getElementById('root');
const root = createRoot(element);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
