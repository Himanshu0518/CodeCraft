import { createBrowserRouter, Navigate } from "react-router-dom";
import RootLayout from "@/layouts/RootLayout";
import {
  Home,
  LoginPage,
  SignupPage,
  YourWork,
  NewProject,
  Project,
  Bookmarks,
  Following,
  Profile,
} from "./pages";
import AuthLayout from "./layouts/AuthLayout";

const router = createBrowserRouter([
  {
    path: "/home",
    element: <AuthLayout authentication={true} />,
    children: [
      {
        path: "",
        element: <RootLayout />,
        children: [
          {
            index: true, // Use index instead of empty path
            element: <Home />,
          },
          {
            path: "yourWork",
            element: <YourWork />,
          },
          {
            path: "bookmarks",
            element: <Bookmarks />,
          },
          {
            path: "following",
            element: <Following />,
          },
        ],
      },
      {
        path: "newProject",
        element: <NewProject />,
      },
      {
        path: "project/:projectId",
        element: <Project />,
      },
      {
        path: "profile/:userId",
        element: <Profile />,
      },
    ],
  },
  {
    path: "/",
    element: <AuthLayout authentication={false} />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "signup",
        element: <SignupPage />,
      },
      {
        path: "",
        element: <Navigate to="/home" replace />,
      },
      {
        path: "*",
        element: <Navigate to="/home" replace />,
      },
    ],
  },
]);

export default router;
