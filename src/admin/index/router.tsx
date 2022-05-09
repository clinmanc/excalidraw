import { Navigate, useRoutes } from "react-router-dom";

import DashboardLayout from "../layouts/dashboard";
import LogoOnlyLayout from "../layouts/LogoOnlyLayout";
//
import Login from "../pages/Login";
import Register from "../pages/Register";
import Products from "../pages/Products";
import Blog from "../pages/Blog";
import NotFound from "../pages/Page404";
import ExcalidrawApp from "../../excalidraw-app";

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: "/",
      element: <LogoOnlyLayout />,
      children: [
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "404", element: <NotFound /> },
        { path: "/", element: <Navigate to="/login" /> },
        { path: "*", element: <Navigate to="/404" /> },
      ],
    },
    {
      path: "/dashboard",
      element: <DashboardLayout />,
      children: [
        // { element: <Navigate to="/dashboard/app" replace /> },
        // { path: 'app', element: <DashboardApp /> },
        // { path: 'user', element: <User /> },
        // { element: <Navigate to="/" replace /> },
        { path: "/dashboard", element: <Navigate to="/dashboard/products" /> },
        { path: "products", element: <Products /> },
        { path: "collect", element: <Blog /> },
        { path: "ed/:id", element: <ExcalidrawApp /> },
      ],
    },
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}
