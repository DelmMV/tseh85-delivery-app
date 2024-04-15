import {
  Box,
  Button,
  Drawer, DrawerBody,
  DrawerCloseButton,
  DrawerContent, DrawerFooter,
  DrawerOverlay,
  useDisclosure, Text, Divider, useToast,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../router/AuthProvider';
import { useSettingsQuery } from '../hooks/useSettingsQuery';
import { ThemeToggle } from './ThemeToggle';
import { useOrdersQuery } from '../hooks/useOrdersQuery';
import { useMapType } from '../contexts/MapTypeContext';

function DrawerPanel() {
  const tokenCopy = localStorage.getItem('token');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { data: settings, isLoading, isError } = useSettingsQuery();
  const { data: orders } = useOrdersQuery();
  const filterDelivery = orders?.filter((item) => item.CheckoutUserName === settings?.Name);
  const { mapType, changeMapType } = useMapType(); // Использование хука useMapType
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Ошибка при попытке выходе', error);
    }
  };

  const toast = useToast();
  function copyToClipboard(text) {
    // Создаем временный элемент input
    const tempInput = document.createElement('input');
    tempInput.style.position = 'absolute';
    tempInput.style.left = '-1000px';
    tempInput.style.top = '-1000px';
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    tempInput.setSelectionRange(0, 99999); // Для мобильных устройств

    try {
      const successful = document.execCommand('copy');
      toast({
        title: successful ? 'Скопировано' : 'Ошибка',
        status: successful ? 'success' : 'error',
        duration: 1000,
        isClosable: true,
        position: 'bottom-right',
      });
    } catch (err) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось скопировать номер доставки.',
        status: 'error',
        duration: 1000,
        isClosable: true,
      });
    }

    // Удаляем временный элемент
    document.body.removeChild(tempInput);
  }
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
            {isLoading ? (
              <p>Загрузка настроек...</p>
            ) : isError ? (
              <p>Ошибка при загрузке настроек.</p>
            ) : (
              <Box>
                <Box>
                  <Text fontSize="smaller" onClick={() => copyToClipboard(tokenCopy)} position="absolute" top="40px" right="10px">token</Text>
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
              </Box>
            )}
          </DrawerBody>

          <DrawerFooter display="flex" justifyContent="space-between">
            <Button variant="outline" mr={3} onClick={onClose}>
              Закрыть
            </Button>
            <Button bg="red.700" onClick={handleLogout}>Выйти</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export { DrawerPanel };
