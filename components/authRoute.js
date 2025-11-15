"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";
import { useAuth } from "../context/userContext";
import LoaderComponent from "./ui/Loader";

const AuthRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();
  
  useEffect(() => {
      if (!loading && isAuthenticated) {
          // Send the user to the default protected route
          router.replace("/dashboard"); 
      }
  }, [loading, isAuthenticated, router]);
  
  // While loading, or if authenticated, show loader/null.
  if (loading || isAuthenticated) {
      return <LoaderComponent />; 
  }
  
  // Only render the public content (login/register) if confirmed logged out.
  return (
      <div className="px-10 py-3">
          {children}
      </div>
  );
};

export default AuthRoute;
