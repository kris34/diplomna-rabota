import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import './index.css';
import router from './router/router';
import { AuthProvider } from './providers/authProvider';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} /> {/* RouterProvider should be here */}
    </AuthProvider>
  </StrictMode>
);
