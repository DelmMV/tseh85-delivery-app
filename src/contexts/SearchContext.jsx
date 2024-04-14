import React, {createContext, useContext, useMemo, useState} from 'react';

const SearchContext = createContext();

export const useSearch = () => useContext(SearchContext);

export function SearchProvider({ children }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  const value = useMemo(() => ({
    searchQuery,
    handleSearchChange,
  }), [searchQuery]);

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
}
