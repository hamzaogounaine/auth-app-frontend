import React from "react";
import ProtectedRoute from "../../../components/protectedRoute";
import SettingsComponent from "@/components/app/SettingsComponent";


const SettingsPage = () => {

 return (
  <SettingsComponent />
 )
};

const page = () => {
  return (
    <ProtectedRoute>
      <SettingsPage />
    </ProtectedRoute>
  );
};

export default page;
