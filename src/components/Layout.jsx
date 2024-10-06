import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import { NavBar } from './NavBar';
import { NavBottom } from './NavBottom';

function Layout() {
  const location = useLocation();

  return (
    <>
      <Box
        position="fixed"
        width="100%"
        zIndex={1}
        display={location.pathname === '/statistics' ? 'none' : 'block'}
      >
        <NavBar />
      </Box>
      <Box minWidth="360px" paddingTop="4px">
        <Outlet />
      </Box>
      <Box
        minWidth="360px"
        position="fixed"
        bottom="0"
        width="100%"
        zIndex="1"
        display="block"
      >
        <NavBottom />
      </Box>
    </>
  );
}

export { Layout };
