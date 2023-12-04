import React from 'react';

import { AuthProvider } from './auth';
import { ToastProvider } from './toast';

interface AppProviderData {
  children: React.ReactNode;
}

const AppProvider: React.FC<AppProviderData> = ({ children }) => (
  <AuthProvider>
    <ToastProvider>{children}</ToastProvider>
  </AuthProvider>
);

export default AppProvider;
