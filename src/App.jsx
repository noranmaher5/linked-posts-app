import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import Profile from './components/Profile/Profile';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import NotFound from './components/NotFound/NotFound';
import CounterContextProvider from './Context/CounterContext';
import UserContextProvider from './Context/UserContext';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import PostContextProvider from './Context/PostContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import PostDeatils from './components/PostDeatils/PostDeatils';
import { Toaster } from 'react-hot-toast';

const query = new QueryClient();

const x = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      { index: true, element: <ProtectedRoute><Home /></ProtectedRoute> },
      { path: "profile", element: <ProtectedRoute><Profile /></ProtectedRoute> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "PostDeatils/:id", element: <PostDeatils /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

function App() {
  return (
    <>
      <UserContextProvider>
        <PostContextProvider>
          <CounterContextProvider>
            <QueryClientProvider client={query}>
              <RouterProvider router={x} />
              <Toaster position="top-center" reverseOrder={false} />
              <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
          </CounterContextProvider>
        </PostContextProvider>
      </UserContextProvider>
    </>
  )
}

export default App;
