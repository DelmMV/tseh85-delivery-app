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
  const [filter, setFilter] = useState(() => {
    const savedFilter = localStorage.getItem('filter');
    return savedFilter || 'active';
  });

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    localStorage.setItem('filter', newFilter); // Сохраняем новое состояние фильтра в localStorage
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
