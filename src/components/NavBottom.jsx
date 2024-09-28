import React from 'react';
import {
  Box, Text, Center, Divider, Icon, useColorMode, Button,
} from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import { FaMap, FaListAlt, FaChartBar } from 'react-icons/fa';

function NavBottom() {
  const { colorMode } = useColorMode();
  const isLightMode = colorMode === 'light';

  // Определяем цвета в зависимости от темы
  const activeColor = isLightMode ? 'blue.500' : 'blue.500';
  const inactiveColor = isLightMode ? 'black' : 'white';
  const backgroundColor = isLightMode ? 'white' : '#2d3748';

  // Функция для рендеринга NavLink с иконкой
  const renderNavLink = (to, icon, text) => (
    <NavLink to={to}>
      {({ isActive }) => (
        <Button display="flex" flexDirection="column" alignItems="center" variant="outline" borderWidth="0" width="100px">
          <Icon as={icon} fontSize="25px" color={isActive ? activeColor : inactiveColor} fontWeight="bold" />
          <Text fontSize="smaller" fontWeight="bold" color={isActive ? activeColor : inactiveColor}>{text}</Text>
        </Button>
      )}
    </NavLink>
  );

  return (
    <Box display="flex" justifyContent="space-around" p="1" bg={backgroundColor} borderTop="1px" borderColor="grey" boxShadow="dark-lg">
      {renderNavLink('/', FaListAlt, 'Заказы')}
      <Center>
        <Divider orientation="vertical" />
      </Center>
      {renderNavLink('/map', FaMap, 'Карта')}
      <Center>
        <Divider orientation="vertical" />
      </Center>
      {renderNavLink('/statistics', FaChartBar, 'Статистика')}
    </Box>
  );
}

export { NavBottom };
