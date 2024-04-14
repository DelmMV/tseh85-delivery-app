import React from 'react';
import { RouterProvider } from 'react-router-dom';
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
            <RouterProvider router={router} />
          </QueryClientProvider>
        </FilterProvider>
      </SelectorFilterProvider>
    </SearchProvider>
  );
}

export default App;
