import {
  Box,
  Button,
  Drawer, DrawerBody,
  DrawerCloseButton,
  DrawerContent, DrawerFooter,
  DrawerOverlay,
  useDisclosure, Text, Divider,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import { useAuth } from '../router/AuthProvider';
import { useSettingsQuery } from '../hooks/useSettingsQuery';
import { ThemeToggle } from './ThemeToggle';
import { useOrdersQuery } from '../hooks/useOrdersQuery';
import { useMapType } from '../contexts/MapTypeContext';
import { useCopyToClipboard } from '../hooks/useСopyToClipboard';

function DrawerPanel() {
  const tokenCopy = localStorage.getItem('token');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { data: settings, isLoading, isError } = useSettingsQuery();
  const { data: orders } = useOrdersQuery();
  const filterDelivery = orders?.filter((item) => item.CheckoutUserName === settings?.Name);
  const { mapType, changeMapType } = useMapType();
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Ошибка при попытке выходе', error);
    }
  };

  const { copyText } = useCopyToClipboard();

  const generateTelegramLink = () => {
    const baseUrl = 'https://t.me/Delivery_tseh85_bot';
    return `${baseUrl}`;
  };

  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      setDeferredPrompt(null);
    }
  };

  return (
    <>
      <Button ref={btnRef} onClick={onOpen}>
        <HamburgerIcon />
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody>
            {(() => {
              if (isLoading) {
                return <p>Загрузка настроек...</p>;
              }
              if (isError) {
                return <p>Ошибка загрузки настроек</p>;
              }
              return (
                <Box>
                  <Box>
                    <Box onClick={() => copyText(tokenCopy)}>
                      <Text fontSize="smaller" position="absolute" top="40px" right="10px" overflow="hidden">токен</Text>
                    </Box>
                    <Text fontSize="lg">
                      {settings?.Name}
                    </Text>
                    <Text fontSize="sm" color="grey">
                      {settings?.ShopName}
                    </Text>
                  </Box>
                  <Divider margin="10px 0 10px 0" />
                  <Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-between">
                    <Text fontSize="sm">
                      Интенсив в минутах:&#160;
                    </Text>
                    <Text fontSize="md" fontWeight="bold">
                      {settings?.AddDeliveryTime}
                    </Text>
                  </Box>
                  <Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-between">
                    <Text fontSize="sm">
                      Всего заказов:&#160;
                    </Text>
                    <Text fontSize="md" fontWeight="bold">
                      {orders?.length ?? 0}
                    </Text>
                  </Box>
                  <Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-between">
                    <Text fontSize="sm">
                      Доставил(a) заказов:&#160;
                    </Text>
                    <Text fontSize="md" fontWeight="bold">
                      {filterDelivery?.length ?? 0}
                    </Text>
                  </Box>
                  <Divider margin="10px 0 10px 0" />
                  <Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-between">
                    <Text fontSize="sm">
                      Переключения световой темы:
                    </Text>
                    <ThemeToggle />
                  </Box>
                  <Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-between" marginTop="10px">
                    <Text fontSize="sm">Карта:</Text>
                    <Box>
                      <Button onClick={() => changeMapType('yandex')} colorScheme={mapType === 'yandex' ? 'blue' : 'gray'}>Yandex</Button>
                      <Button onClick={() => changeMapType('2gis')} colorScheme={mapType === '2gis' ? 'blue' : 'gray'}>2GIS</Button>
                    </Box>
                  </Box>
                  <Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-between" marginTop="10px">
                    <Text fontSize="sm">Уведомления:</Text>
                    <Button
                      onClick={() => {
                        const token = localStorage.getItem('token');
                        const command = `/token ${token}`;
                        copyText(command); // Копируем команду в буфер обмена
                        window.location.href = generateTelegramLink(token); // Редирект на телеграм бота
                      }}
                      colorScheme="telegram"
                    >
                      Telegram Bot
                    </Button>
                  </Box>
                  {deferredPrompt && (
                    <Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-between" marginTop="10px">
                      <Text fontSize="sm">Установить приложение:</Text>
                      <Button onClick={handleInstallClick} colorScheme="blue" mt={4}>
                        Установить
                      </Button>
                    </Box>
                  )}
                </Box>
              );
            })()}
          </DrawerBody>
          <DrawerFooter display="flex" justifyContent="end">
            <Button bg="red.700" onClick={handleLogout}>Выйти</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export { DrawerPanel };
