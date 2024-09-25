import { useRoutes } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";

import Home from "../pages/home/home";
import UsersList from "../pages/users/users-list";
import MoviesList from "../pages/movies/movies-list";

const RoutesConfig = () => {
  return useRoutes([
    {
      element: <MainLayout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/users-list", element: <UsersList /> },
        { path: "/movies-list", element: <MoviesList /> },
      ],
    },
    {
      element: <AuthLayout />,
    },
  ]);
};

export default RoutesConfig;
