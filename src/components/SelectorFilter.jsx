import { Box, Select } from '@chakra-ui/react';
import { IoFilterSharp } from 'react-icons/io5';
import React from 'react';
import { useSelectorFilter } from '../contexts/SelectorFilterContext';

function SelectorFilter() {
  const { setSelectorFilter } = useSelectorFilter();

  const handleChange = (event) => {
    setSelectorFilter(event.target.value);
  };
  return (
    <Box minWidth="135px" marginRight="4px">
      <Select placeholder="Все заказы" icon={<IoFilterSharp />} onChange={handleChange}>
        <option value={5}>Подвержденные</option>
        <option value={6}>На доставке</option>
        <option value={12}>Новые</option>
      </Select>
    </Box>
  );
}

export { SelectorFilter };
