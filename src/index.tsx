import '@reach/dialog/styles.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import App from './pages/App';
import Providers from './providers';
import ApplicationUpdater from './store/application/updater';
import Updater from './store/multicall/updater';
import CallbackUpdater from './store/transactions/callbackUpdater';
import TransactionUpdater from './store/transactions/updater';
import ThemeProvider, { ThemedGlobalStyle } from './theme';
import ResetCSS from './theme/ResetCSS';

(window as any).global = window;
window.Buffer = window.Buffer || require('buffer').Buffer;

function Updaters() {
  return (
    <>
      <ApplicationUpdater />
      <TransactionUpdater />
      <Updater />
      <CallbackUpdater />
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Providers>
    <Updaters />
    <ThemeProvider>
      <ThemedGlobalStyle />
      <ResetCSS />
      <ToastContainer
        theme='dark'
        position='bottom-right'
        limit={5}
        closeOnClick={false}
        newestOnTop
        pauseOnHover
      />
      <App />
    </ThemeProvider>
  </Providers>,
);
