import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Spinner from "@/animations/Spinner";

export default function Protected({ children, authentication = true }) {
  const authStatus = useSelector((state) => state.auth.status);

  // While checking auth, show loader
  if (authStatus === null) {
    // you can initialize authStatus as null when checking
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  // If route requires authentication and user is not logged in
  if (authentication && !authStatus) {
    return <Navigate to="/login" replace />;
  }

  // If route is public (like login/signup) and user is logged in, redirect to home
  if (!authentication && authStatus) {
    return <Navigate to="/home" replace />;
  }

  // Otherwise render children
  return <>{children}</>;
}

