import { createBrowserRouter, Navigate } from "react-router-dom";
import RootLayout from "@/layouts/RootLayout";
import { Home, LoginPage, SignupPage } from "./pages";
import AuthLayout from "./layouts/AuthLayout";

const router = createBrowserRouter([
  // protected routes
  {
    path: "/",
    element: <AuthLayout authentication={true} />, // wraps all protected routes
    children: [
      {
        path: "home",
        element: <RootLayout />, // Outlet renders this
        children: [
          { path: "", element: <Home /> },
          // other nested pages
        ],
      },
    ],
  },
 // public routes 
  {
    path: "/",
    element: <AuthLayout authentication={false} />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/signup",
        element: <SignupPage />,
      },
      {
        path: "*",
        element: <Navigate to="/home" replace />,
      },
    ],
  },
]);

export default router;
