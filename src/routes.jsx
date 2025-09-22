import { createBrowserRouter, Navigate } from "react-router-dom";
import RootLayout from "@/layouts/RootLayout";
import { Home, LoginPage, SignupPage } from "./pages";
import AuthLayout from "./layouts/AuthLayout";
import NewProject from "./pages/NewProject";
import YourWork from "./pages/YourWork";

const router = createBrowserRouter([
  // protected routes
  {
    path: "/",
    element: <AuthLayout authentication={true} />, 
    children: [
      {
        path: "home",
        element: <RootLayout />, // Outlet renders this
        children: [
          { path: "", element: <Home /> },
          {path : "yourWork", element: <YourWork />},
          // other nested pages
        ],
      },
      {
        path:"home/newProject",
        element:<NewProject/>
      }
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
