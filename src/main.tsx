import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './components/app/App';
import { Provider } from 'react-redux';
import { appStore } from './store/store';
import './styles/globals.css';
import { BrowserRouter as Router } from 'react-router-dom';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Provider store={appStore}>
        <App />
      </Provider>
    </Router>
  </StrictMode>,
);
