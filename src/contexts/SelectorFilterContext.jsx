import React, {
  createContext, useContext, useState, useMemo,
} from 'react';

// Создание контекста с начальным значением null
const SelectorFilterContext = createContext();

// Провайдер контекста, позволяющий его потребителям получать и обновлять состояние
export function SelectorFilterProvider({ children }) {
  const [selectorFilter, setSelectorFilter] = useState(null);

  // Использование useMemo для мемоизации объекта value
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

// Хук для использования контекста в потребляющих компонентах
export function useSelectorFilter() {
  const context = useContext(SelectorFilterContext);
  if (context === undefined) {
    throw new Error('useSelectorFilter must be used within a SelectorFilterProvider');
  }
  return context;
}
