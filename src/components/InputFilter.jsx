import {
  Box, Input, InputGroup, InputLeftElement,
} from '@chakra-ui/react';
import { Search2Icon } from '@chakra-ui/icons';
import { useState } from 'react';
import { useSearch } from '../contexts/SearchContext';

function InputFilter() {
  const { handleSearchChange } = useSearch();
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e) => {
    setInputValue(e.target.value);
    handleSearchChange(e.target.value);
  };
  return (
    <Box>
      <InputGroup minWidth="110px">
        <InputLeftElement pointerEvents="none">
          <Search2Icon />
        </InputLeftElement>
        <Input type="search" name="search" value={inputValue} onChange={handleChange} />
      </InputGroup>
    </Box>
  );
}

export { InputFilter };
