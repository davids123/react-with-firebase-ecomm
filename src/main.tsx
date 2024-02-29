import React from 'react'
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux';
import { store } from './redux/store/index.tsx';
import { ThemeProvider } from './components/theme-provider.tsx';
import { AuthProvider } from './context/auth-context.tsx';
import { ProductsProvider } from './context/products-context.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Provider store={store}>
        <Router>
          <ProductsProvider>
            <AuthProvider>            
              <App />
            </AuthProvider>
          </ProductsProvider>
        </Router>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
)
