import { IconButton, useColorMode } from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import React from 'react';

export function ThemeToggle() {
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
