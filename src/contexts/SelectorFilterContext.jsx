import React, {
  createContext, useContext, useState, useMemo,
} from 'react';

const SelectorFilterContext = createContext();

export function SelectorFilterProvider({ children }) {
  const [selectorFilter, setSelectorFilter] = useState(null);

  const value = useMemo(() => ({
    selectorFilter,
    setSelectorFilter,
  }), [selectorFilter, setSelectorFilter]);
  return (
    <SelectorFilterContext.Provider value={value}>
      {children}
    </SelectorFilterContext.Provider>
  );
}

export function useSelectorFilter() {
  const context = useContext(SelectorFilterContext);
  if (context === undefined) {
    throw new Error('useSelectorFilter must be used within a SelectorFilterProvider');
  }
  return context;
}
