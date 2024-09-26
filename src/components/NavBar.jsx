import React from 'react';
import {
  Box, Card, Tab, TabList, Tabs, useColorMode,
} from '@chakra-ui/react';
import { useSwipeable } from 'react-swipeable';
import { SelectorFilter } from './SelectorFilter';
import { DrawerPanel } from './DrawerPanel';
import { InputFilter } from './InputFilter';
import { useFilter } from '../contexts/FilterContext';

function NavBar() {
  const { colorMode } = useColorMode();
  const isLightMode = colorMode === 'light';
  const backgroundColor = isLightMode ? 'white' : '#2d3748';
  const { handleFilterChange, filter } = useFilter();
  const tabIndex = filter === 'active' ? 0 : 1;

  const handlers = useSwipeable({
    onSwipedLeft: () => handleFilterChange('completed'),
    onSwipedRight: () => handleFilterChange('active'),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  return (
    <Box {...handlers}>
      <Card
        borderRadius="0 0 5px 5px"
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
        </Box>
        <Box marginTop="8px">
          <Tabs isFitted index={tabIndex} onChange={(index) => handleFilterChange(index === 0 ? 'active' : 'completed')}>
            <TabList mb="1em">
              <Tab fontWeight="bold">Активные</Tab>
              <Tab fontWeight="bold">Завершенные</Tab>
            </TabList>
          </Tabs>
        </Box>
      </Card>
    </Box>
  );
}

export { NavBar };
