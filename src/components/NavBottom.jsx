import React from 'react';
import {
  Box, Center, Divider, Icon, useColorMode,
} from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import { FaMap, FaListAlt } from 'react-icons/fa';

function NavBottom() {
  const { colorMode } = useColorMode();
  const isLightMode = colorMode === 'light';

  // Определяем цвета в зависимости от темы
  const activeColor = isLightMode ? 'blue.500' : 'blue.500';
  const inactiveColor = isLightMode ? 'black' : 'white';
  const backgroundColor = isLightMode ? 'white' : '#2d3748';

  // Функция для рендеринга NavLink с иконкой
  const renderNavLink = (to, icon) => (
    <NavLink to={to}>
      {({ isActive }) => (
        <Icon as={icon} fontSize="25px" color={isActive ? activeColor : inactiveColor} fontWeight="bold" />
      )}
    </NavLink>
  );

  return (
    <Box display="flex" justifyContent="space-around" p="3" bg={backgroundColor} borderTop="1px" borderColor="grey" boxShadow="dark-lg">
      <Box>
        {renderNavLink('/', FaListAlt)}
      </Box>
      <Center>
        <Divider orientation="vertical" />
      </Center>
      <Box>
        {renderNavLink('/map', FaMap)}
      </Box>
    </Box>
  );
}

export { NavBottom };
