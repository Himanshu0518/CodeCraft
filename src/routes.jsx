import { createBrowserRouter, Navigate } from "react-router-dom";
import RootLayout from "@/layouts/RootLayout";
import { Home, LoginPage, SignupPage, YourWork, NewProject, Project  } from "./pages";
import AuthLayout from "./layouts/AuthLayout";

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
          { path: "yourWork", element: <YourWork /> },
          // other nested pages
        ],
      },
      {
        path: "home/newProject",
        element: <NewProject />,
      },
      {
        path: "home/project/:projectId",
        element: <Project />,
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
