import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useToast } from '@chakra-ui/react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUser(token);
    }
  }, []);

  const loginApp = async (login, password, token = null) => {
    setIsLoading(true);
    try {
      if (token) {
        localStorage.setItem('token', token);
        setUser(token);
        // Получаем и сохраняем настройки пользователя
        await fetchAndSaveUserSettings(token);
        toast({
          title: 'Успешный вход в систему!',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        setIsLoading(false);
        return { success: true };
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
        toast({
          title: 'Неправильный логин или пароль',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
        setIsLoading(false);
        return { success: false, message: 'Неправильный логин или пароль' };
      }
      const authToken = response.headers.get('Token');
      localStorage.setItem('token', authToken);
      setUser(authToken);
      // Получаем и сохраняем настройки пользователя
      await fetchAndSaveUserSettings(authToken);
      toast({
        title: 'Успешный вход в систему!',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      setIsLoading(false);
      return { success: true };
    } catch (error) {
      toast({
        title: `Ошибка при логине: ${error.message}`,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      setIsLoading(false);
      return { success: false, message: error.message };
    }
  };

  // Функция для получения и сохранения настроек пользователя
  const fetchAndSaveUserSettings = async (token) => {
    try {
      const response = await fetch('https://app.tseh85.com/Service/api/delivery/settings', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          token: token,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch user settings');
      }
      const settings = await response.json();
      localStorage.setItem('settings', JSON.stringify(settings));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error fetching user settings:', error);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    toast({
      title: 'Вы вышли из системы',
      status: 'info',
      duration: 5000,
      isClosable: true,
    });
  };

  const value = useMemo(
    () => ({
      user,
      isLoading,
      loginApp,
      logout,
    }),
    [user, isLoading, loginApp, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
