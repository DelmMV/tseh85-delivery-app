import React from 'react';
import { HashRouter as Router } from 'react-router-dom'; // Изменение здесь
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FilterProvider } from './contexts/FilterContext';
import { SearchProvider } from './contexts/SearchContext';
import { SelectorFilterProvider } from './contexts/SelectorFilterContext';
import { router } from './router/router';

const queryClient = new QueryClient();

function App() {
  return (
    <SearchProvider>
      <SelectorFilterProvider>
        <FilterProvider>
          <QueryClientProvider client={queryClient}>
            <Router router={router} />
          </QueryClientProvider>
        </FilterProvider>
      </SelectorFilterProvider>
    </SearchProvider>
  );
}

export default App;
