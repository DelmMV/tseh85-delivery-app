import {
  Button,
  Drawer, DrawerBody,
  DrawerCloseButton,
  DrawerContent, DrawerFooter,
  DrawerHeader,
  DrawerOverlay, Input,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../router/AuthProvider';

function DrawerPanel() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Ошибка при попытке выходе', error);
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
          <DrawerHeader>Create your account</DrawerHeader>

          <DrawerBody>
            Здесь что-то будет
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
