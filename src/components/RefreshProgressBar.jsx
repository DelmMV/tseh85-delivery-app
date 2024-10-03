import React, { useState, useEffect } from 'react';
import { Box, Progress } from '@chakra-ui/react';
import { useOrdersQuery } from '../hooks/useOrdersQuery';

function RefreshProgressBar() {
  const { timeUntilNextRefetch } = useOrdersQuery();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const newProgress = ((30000 - timeUntilNextRefetch) / 30000) * 100;
    setProgress(newProgress);
  }, [timeUntilNextRefetch]);

  return (
    <Box position="fixed" top="0" left="0" right="0" zIndex="9999">
      <Progress
        value={progress}
        size="xs"
        colorScheme="blue"
        isAnimated
        hasStripe
      />
    </Box>
  );
}

export { RefreshProgressBar };
