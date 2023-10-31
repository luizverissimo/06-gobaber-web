import React, { createContext, useCallback, useState } from 'react';
import api from '../services/api';

interface AuthState {
  token: string;
  user: object;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: object;
  signIn(credentials: SignInCredentials): Promise<void>;
}

interface AuthProviderData {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC<AuthProviderData> = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('GoBaber:token');
    const user = localStorage.getItem('GoBaber:user');

    if (token && user) {
      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }: SignInCredentials) => {
    const response = await api.post('sessions', { email, password });

    const { token, user } = response.data;

    localStorage.setItem('GoBaber:token', token);
    localStorage.setItem('GoBaber:user', JSON.stringify(user));

    setData({ token, user });
  }, []);
  return (
    <AuthContext.Provider
      value={{ user: data.user, signIn } as AuthContextData}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
