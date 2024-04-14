import React from 'react';
import {
  HashRouter, Route, RouterProvider, Routes,
} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FilterProvider } from './contexts/FilterContext';
import { SearchProvider } from './contexts/SearchContext';
import { SelectorFilterProvider } from './contexts/SelectorFilterContext';
import { router } from './router/router';
import { MapComponent } from './pages/map.jsx';
import { Main } from './pages/main.jsx';
import { Layout } from './components/Layout.jsx';
import { PageNotFound } from './pages/page-not-found.jsx';
import { Login } from './pages/login.jsx';

const queryClient = new QueryClient();

function App() {
  return (
    <SearchProvider>
      <SelectorFilterProvider>
        <FilterProvider>
          <QueryClientProvider client={queryClient}>
            <HashRouter>
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route index element={<Main />} />
                  <Route path="map" element={<MapComponent />} />
                </Route>
                <Route path="*" element={<PageNotFound />} />
                <Route path="login" element={<Login />} />
              </Routes>
            </HashRouter>
          </QueryClientProvider>
        </FilterProvider>
      </SelectorFilterProvider>
    </SearchProvider>
  );
}

export default App;
