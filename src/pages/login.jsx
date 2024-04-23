import {
  Box,
  Button,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/image/logo-t85.jpeg';
import { useOrdersQuery } from '../hooks/useOrdersQuery';
import { useAuth } from '../router/AuthProvider';

function Login() {
  const [show, setShow] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const { loginApp } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();
  const { error } = useOrdersQuery();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      if (!error) {
        await loginApp(username, password);
        navigate('/', { replace: true });
      }
    } catch (loginError) {
      // Renamed 'error' to 'loginError'
      console.error('Ошибка при попытке входа', loginError);
    }
  };

  const handleLoginWithToken = async (e) => {
    e.preventDefault();
    try {
      if (!error) {
        console.log(error);
        await loginApp(null, null, token); // Предполагается, что loginApp может принимать токен как третий аргумент
        navigate('/', { replace: true });
      }
    } catch (loginError) {
      console.error('Ошибка при попытке входа с токеном', loginError);
    }
  };

  useEffect(() => {
    if (error) {
      toast({
        title: 'Ошибка',
        description: error.message,
        status: 'error',
        duration: 1000,
        isClosable: true,
        position: 'bottom-right',
      });
    }
  }, [error, toast]);
  const handleClick = () => setShow(!show);
  return (
    <Box
      display="flex"
      justifyContent="space-around"
      flexDirection="column"
      alignItems="center"
      zIndex="20"
    >
      <Stack
        spacing={3}
        padding="10px"
        justifyContent="center"
        minHeight="70vh"
        alignItems="center"
      >
        <Image src={logo} width="200px" alt="logo" borderRadius="200px" />
        <Input
          placeholder="Введите логин"
          size="md"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <InputGroup size="md" minWidth="320px" maxWidth="400px">
          <Input
            pr="4.5rem"
            type={show ? 'text' : 'password'}
            placeholder="Введите пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? 'Скрыть' : 'Показать'}
            </Button>
          </InputRightElement>
        </InputGroup>
        <Button
          onClick={handleLogin}
          variant="outline"
          borderWidth="3px"
          minWidth="320px"
          maxWidth="400px"
          marginBottom="10px"
        >
          Войти
        </Button>
        <Text fontWeight="bold">или</Text>
        <InputGroup
          size="md"
          minWidth="320px"
          maxWidth="400px"
          marginTop="10px"
        >
          <Input
            type="text"
            placeholder="Введите токен"
            value={token}
            onChange={(e) => setToken(e.target.value)}
          />
        </InputGroup>
        <Button
          onClick={handleLoginWithToken}
          variant="outline"
          borderWidth="3px"
          minWidth="320px"
          maxWidth="400px"
        >
          Войти с токеном
        </Button>
      </Stack>
    </Box>
  );
}

export { Login };
