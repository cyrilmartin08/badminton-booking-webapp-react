import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './styles/vars.module.css';
import './styles/globals.css';

import App from './App';
import Home from './routes/Home';
import MyBookings from './routes/MyBookings';
import NotFound from './routes/NotFound';
import { BookingProvider } from './context/BookingContext';  //src\context\BookingContext.tsx

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'bookings', element: <MyBookings /> },
      { path: '*', element: <NotFound /> }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BookingProvider>
      <RouterProvider router={router} />
    </BookingProvider>
  </React.StrictMode>
);