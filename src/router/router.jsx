import { createBrowserRouter } from 'react-router-dom';
import React from 'react';
import { Layout } from '../components/Layout';
import { Main } from '../pages/main';
import { MapComponent } from '../pages/map';
import { PageNotFound } from '../pages/page-not-found';
import { Login } from '../pages/login';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Main />,
      },
      {
        path: 'map',
        element: <MapComponent />,
      },
    ],
  },
  {
    path: '*',
    element: <PageNotFound />,
  },
  {
    path: 'login',
    element: <Login />,
  },
]);
