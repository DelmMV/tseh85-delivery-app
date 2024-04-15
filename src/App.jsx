// import { router } from './router/router';
import React from 'react';
import {
  HashRouter, Route, Routes,
} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FilterProvider } from './contexts/FilterContext';
import { SearchProvider } from './contexts/SearchContext';
import { SelectorFilterProvider } from './contexts/SelectorFilterContext';
import { MapComponent } from './pages/map';
import { Main } from './pages/main';
import { Layout } from './components/Layout';
import { PageNotFound } from './pages/page-not-found';
import { Login } from './pages/login';
import ProtectedRoute from './router/ProtectedRoute';
import { MapTypeProvider } from './contexts/MapTypeContext';

const queryClient = new QueryClient();

function App() {
  return (
    <SearchProvider>
      <SelectorFilterProvider>
        <FilterProvider>
          <QueryClientProvider client={queryClient}>
            <MapTypeProvider>
              <HashRouter>
                <Routes>
                  <Route path="/" element={<Layout />}>
                    <Route
                      index
                      element={(
                        <ProtectedRoute>
                          <Main />
                        </ProtectedRoute>
                  )}
                    />
                    <Route
                      path="map"
                      element={(
                        <ProtectedRoute>
                          <MapComponent />
                        </ProtectedRoute>
                  )}
                    />
                  </Route>
                  <Route path="*" element={<PageNotFound />} />
                  <Route path="login" element={<Login />} />
                </Routes>
              </HashRouter>
            </MapTypeProvider>
          </QueryClientProvider>
        </FilterProvider>
      </SelectorFilterProvider>
    </SearchProvider>
  );
}

export default App;
