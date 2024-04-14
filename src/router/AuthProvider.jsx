import React, { useContext, createContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const loginApp = async (login, password) => {
    try {
      const response = await fetch('https://app.tseh85.com/Service/api/AuthenticateDelivery', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ login, password }),
      });
      if (!response.ok) {
        throw new Error('Ошибка логина');
      }
      const data = response.headers.get('Token');
      localStorage.setItem('token', data);
      setUser({ token: data.token });
    } catch (error) {
      console.error('Ошибка при логине:', error);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const value = {
    user,
    loginApp,
    logout,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
