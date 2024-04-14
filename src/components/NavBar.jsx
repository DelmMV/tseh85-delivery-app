import {
  Box, Card, IconButton, Tab, TabList, Tabs, useColorMode,
} from '@chakra-ui/react';
import React from 'react';
import {
  MoonIcon, SunIcon,
} from '@chakra-ui/icons';
import { SelectorFilter } from './SelectorFilter';
import { DrawerPanel } from './DrawerPanel';
import { InputFilter } from './InputFilter';
import { useFilter } from '../contexts/FilterContext';

function ThemeToggle() {
  const { colorMode, toggleColorMode } = useColorMode();
  const isLightMode = colorMode === 'light';

  return (
    <IconButton
      onClick={toggleColorMode}
      aria-label="theme"
      variant="solid"
      fontSize="20px"
      icon={isLightMode ? <MoonIcon /> : <SunIcon />}
    />
  );
}

function NavBar() {
  const { colorMode } = useColorMode();
  const isLightMode = colorMode === 'light';
  const backgroundColor = isLightMode ? 'white' : '#2d3748';
  const { handleFilterChange } = useFilter();
  return (
    <Box>
      <Card
        borderRadius="none"
        borderTop="none"
        bg={backgroundColor}
        height="105px"
        margin="0 0 10px 0"
        padding="15px"
        boxShadow="lg"
      >
        <Box display="flex" flexDir="row-reverse" alignItems="start" justifyContent="space-between">
          <DrawerPanel />
          <Box margin="0 5px 0 5px" display="flex" flexDir="row">
            <SelectorFilter />
            <InputFilter />
          </Box>
          <ThemeToggle />
        </Box>
        <Box marginTop="8px">
          <Tabs isFitted>
            <TabList mb="1em">
              <Tab onClick={() => handleFilterChange('active')} fontWeight="bold">Активные</Tab>
              <Tab onClick={() => handleFilterChange('completed')} fontWeight="bold">Завершенные</Tab>
            </TabList>
          </Tabs>
        </Box>
      </Card>
    </Box>
  );
}
export { NavBar };