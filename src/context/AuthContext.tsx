import React, { createContext, useCallback } from 'react';
import api from '../services/api';

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  name: string;
  signIn(credentials: SignInCredentials): Promise<void>;
}

interface AuthProviderData {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC<AuthProviderData> = ({ children }) => {
  const signIn = useCallback(async ({ email, password }: SignInCredentials) => {
    const response = await api.post('sessions', { email, password });
    console.log(response.data);
  }, []);
  return (
    <AuthContext.Provider
      value={{ name: 'Verissimo', signIn } as AuthContextData}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
