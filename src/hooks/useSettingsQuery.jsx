import { useQuery } from '@tanstack/react-query';

const fetchSettings = async () => {
  const acesToken = localStorage.getItem('token'); // Получаем токен из localStorage
  if (!acesToken) {
    throw new Error('Token is not available'); // Проверяем наличие токена
  }

  const response = await fetch('https://app.tseh85.com/Service/api/delivery/settings', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      token: acesToken,
    },
  });

  if (!response.ok) {
    // Более детальная обработка ошибок в зависимости от статуса ответа
    if (response.status === 401) {
      throw new Error('Unauthorized: Token may be invalid or expired');
    } else {
      throw new Error('Network response was not ok');
    }
  }

  return response.json();
};

export function useSettingsQuery() {
  return useQuery({
    queryKey: ['settings'],
    queryFn: fetchSettings,
    onError: (error) => {
      console.error('Error fetching settings:', error.message);
    },
    staleTime: 5 * 60 * 1000, // Данные считаются устаревшими через 5 минут
    cacheTime: 30 * 60 * 1000, // Кэшированные данные удаляются через 30 минут неактивности
    retry: 1, // Попытка повторного запроса при ошибке
    retryDelay: 1000, // Задержка перед повторной попыткой
    refetchInterval: 30000, // Интервал автоматического обновления данных
    refetchIntervalInBackground: true, // Автоматическое обновление данных в фоновом режиме
  });
}
