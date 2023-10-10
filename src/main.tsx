import React from 'react'
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client'
import App from './components/App/App.tsx'
import { Provider } from 'react-redux';
import { store, persister } from './store/store';
import { StepsProvider } from './components/StepsProvider/StepsProvider.tsx';
import { PersistGate } from 'redux-persist/integration/react';

import './styles.css'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persister}>
        <StepsProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </StepsProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
)
