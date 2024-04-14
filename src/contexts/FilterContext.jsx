import React, {
  createContext, useContext, useState, useMemo,
} from 'react';

const FilterContext = createContext();

export const useFilter = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilter must be used within a FilterProvider');
  }
  return context;
};

export function FilterProvider({ children }) {
  const [filter, setFilter] = useState('active'); // 'active' или 'completed'

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const value = useMemo(() => ({
    filter,
    handleFilterChange,
  }), [filter]);

  return (
    <FilterContext.Provider value={value}>
      {children}
    </FilterContext.Provider>
  );
}
