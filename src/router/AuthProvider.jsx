import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUser(token);
    }
  }, []);

  const loginApp = async (login, password, token = null) => {
    try {
      if (token) {
        localStorage.setItem('token', token);
        setUser(token);
        return { success: true }; // Explicitly return a success object
      }
      const response = await fetch(
        'https://app.tseh85.com/Service/api/AuthenticateDelivery',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ login, password }),
        },
      );
      if (!response.ok) {
        return { success: false, message: 'Ошибка логина' }; // Return on error
      }
      const authToken = response.headers.get('Token');
      localStorage.setItem('token', authToken);
      setUser(authToken);
      return { success: true }; // Return on success
    } catch (error) {
      console.error('Ошибка при логине:', error);
      return { success: false, message: error.message }; // Return on exception
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      loginApp,
      logout,
    }),
    [user, loginApp, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
