import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import { NavBar } from './NavBar';
import { NavBottom } from './NavBottom';

function Layout() {
  return (
    <>
      <Box minWidth="360px" position="fixed" width="100%" zIndex="1" display="flex" justifyContent="center">
        <NavBar />
      </Box>
      <Box minWidth="360px">
        <Outlet />
      </Box>
      <Box minWidth="360px" position="fixed" bottom="0" width="100%" zIndex="1">
        <NavBottom />
      </Box>
    </>
  );
}

export { Layout };
