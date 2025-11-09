'use client';

import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import api from "@/lib/api"; // Assuming this is your Axios/Fetch wrapper
import { toast } from "sonner";

const PrivacyTab = () => {
    // 1. State for managing form inputs
    const [passwords, setPasswords] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Handler to update state on input change
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setPasswords(prev => ({
            ...prev,
            // Map input IDs to state keys
            [id === 'current-password' ? 'oldPassword' : 
             id === 'new-password' ? 'newPassword' : 
             'confirmPassword']: value,
        }));
    };

    // 2. Password Reset Submission Logic
    const handleResetPassword = async () => {
        const { oldPassword, newPassword, confirmPassword } = passwords;

        // Basic frontend validation
        if (!oldPassword || !newPassword || !confirmPassword) {
            return toast.error("Please fill in all password fields.");
        }

        if (newPassword !== confirmPassword) {
            return toast.error("New password and confirmation do not match.");
        }

        if (newPassword.length < 6) {
            return toast.error("New password must be at least 6 characters long.");
        }

        setIsSubmitting(true);
        const loadingToastId = toast.loading('Updating password...');

        try {
            // API call matches the structure expected by the Express backend
            const res = await api.post('/reset-password', {
                oldPassword: oldPassword,
                newPassword: newPassword,
                newConfirmationPassword: confirmPassword, // Match Express endpoint field name
            });
            
            toast.dismiss(loadingToastId);
            toast.success(res.data.message || "Password updated successfully!");

            // 3. Clear the form fields on success
            setPasswords({
                oldPassword: '',
                newPassword: '',
                confirmPassword: '',
            });

        } catch (error) {
            toast.dismiss(loadingToastId);
            const errorMessage = error.response?.data?.message || "Failed to update password. Please try again.";
            toast.error(errorMessage);
            console.error('Password reset failed:', error);
        } finally {
            setIsSubmitting(false);
        }
    };


  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-foreground">
        Privacy & Security
      </h3>
      
      {/* Current Password Input */}
      <div>
        <Label htmlFor="current-password" className="text-foreground">
          Current Password
        </Label>
        <Input
          id="current-password"
          type="password"
          className="mt-1 bg-input border-border"
          placeholder="Enter current password"
          value={passwords.oldPassword}
          onChange={handleInputChange}
          disabled={isSubmitting}
        />
      </div>

      {/* New Password Input */}
      <div>
        <Label htmlFor="new-password" className="text-foreground">
          New Password
        </Label>
        <Input
          id="new-password"
          type="password"
          className="mt-1 bg-input border-border"
          placeholder="Enter new password"
          value={passwords.newPassword}
          onChange={handleInputChange}
          disabled={isSubmitting}
        />
      </div>

      {/* Confirm Password Input */}
      <div>
        <Label htmlFor="confirm-password" className="text-foreground">
          Confirm Password
        </Label>
        <Input
          id="confirm-password"
          type="password"
          className="mt-1 bg-input border-border"
          placeholder="Confirm new password"
          value={passwords.confirmPassword}
          onChange={handleInputChange}
          disabled={isSubmitting}
        />
      </div>

      <div className="pt-4 border-t border-border">
        <h4 className="font-medium text-foreground mb-3">
          Two-Factor Authentication
        </h4>
        <p className="text-sm text-muted-foreground mb-3">
          Add an extra layer of security to your account
        </p>
        <Button variant="outline" className="border-border bg-transparent">
          Enable 2FA
        </Button>
      </div>

      {/* Update Password Button */}
      <Button 
        className="bg-primary hover:bg-primary/90 text-primary-foreground" 
        onClick={handleResetPassword}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Updating...' : 'Update Password'}
      </Button>
    </div>
  );
};

export default PrivacyTab;