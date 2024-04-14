import React, { useState } from 'react';
import {
  Box, Button, Input, InputGroup, InputRightElement, Stack,
  Image,
} from '@chakra-ui/react';
import logo from '../assets/image/logo-t85.jpeg';

function Login() {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  return (
    <Box display="flex" justifyContent="space-around" flexDirection="column" alignItems="center" zIndex="20">
      <Stack spacing={3} padding="10px" justifyContent="center" height="70vh">
        <Image src={logo} width="300px" alt="logo" borderRadius="200px" />
        <Input placeholder="Введите логин" size="md" minWidth="320px" maxWidth="400px" />
        <InputGroup size="md" minWidth="320px" maxWidth="400px">
          <Input
            pr="4.5rem"
            type={show ? 'text' : 'password'}
            placeholder="Введите пароль"
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>
        <Button variant="outline" borderWidth="3px" minWidth="320px" maxWidth="400px" marginTop="30px">Войти</Button>
      </Stack>
    </Box>
  );
}

export { Login };
