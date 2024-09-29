// import { router } from './router/router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import {
  HashRouter, Route, Routes,
} from 'react-router-dom';
import { Layout } from './components/Layout';
import { FilterProvider } from './contexts/FilterContext';
import { MapTypeProvider } from './contexts/MapTypeContext';
import { SearchProvider } from './contexts/SearchContext';
import { SelectorFilterProvider } from './contexts/SelectorFilterContext';
import { Login } from './pages/login';
import { Main } from './pages/main';
import { MapComponent } from './pages/map';
import { PageNotFound } from './pages/page-not-found';
import ProtectedRoute from './router/ProtectedRoute';
import { Order } from './pages/order';
import { OrderStatistics } from './pages/order-statistics';

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
                    <Route element={<Layout />}>
                      <Route path="/statistics" element={<OrderStatistics />} />
                    </Route>
                  </Route>
                  <Route path="*" element={<PageNotFound />} />
                  <Route path="login" element={<Login />} />
                  <Route path="/order/:OrderId" element={<Order />} />
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
