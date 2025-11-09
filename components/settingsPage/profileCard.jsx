"use client";

import { useAuth } from "@/context/userContext";
import React, { useState } from "react";
// Assuming '../ui/separator' exports a component named Separator
import { Separator } from "../ui/separator";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Camera, Mail, MapPin, Phone } from "lucide-react";
import { Card } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

// Fallback image for the avatar
const DEFAULT_AVATAR_URL = "https://www.gravatar.com/avatar?d=mp&s=200";

/**
 * Renders a detailed profile card for the authenticated user,
 * including an avatar, username, email (with verification status), and joining date.
 */
const ProfileCard = ({user}) => {
  // Destructure the necessary state from your custom authentication hook
  // State for managing the resend button's loading status
  const [isResending, setIsResending] = useState(false);

  // --- Utility Function for Date Formatting ---
  const formatJoinDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch (e) {
      return dateString;
    }
  };

  // --- Handle Resend Email Verification ---
  const handleResend = async () => {
    if (!user || user.emailVerified || isResending) return;

    setIsResending(true);
    toast.loading("Sending verification email...");

    try {
      // 1. Replace '/api/resend-verification' with your actual endpoint
      // This is a placeholder for your API call to the Express backend.
      const response = await fetch("/api/resend-verification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Include auth headers if needed, like Authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify({ email: user.email }),
      });

      const data = await response.json();
      toast.dismiss(); // Dismiss the loading toast

      if (response.ok) {
        toast.success(
          data.message ||
            "Verification email sent successfully! Check your inbox."
        );
      } else {
        toast.error(
          data.message || "Failed to send verification email. Try again later."
        );
      }
    } catch (error) {
      toast.dismiss();
      toast.error("Network error during resend request.");
      console.error("Resend verification error:", error);
    } finally {
      setIsResending(false);
      // OPTIONAL: Implement a cooldown timer here to prevent abuse
    }
  };

  

  // 3. Render the authenticated user data
  return (
    <div className="">
      <Card className="p-6 border border-border">
        <div className="flex flex-col items-center">
          <div className="relative mb-4">
            <Avatar className="h-24 w-24">
              <AvatarImage
                src={user.avatar || "/placeholder.svg"}
                alt={user.username}
              />
              <AvatarFallback className="text-lg">
                {user.username.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <button className="absolute bottom-0 right-0 bg-primary text-primary-foreground p-2 rounded-full hover:bg-primary/90 transition-colors">
              <Camera className="h-4 w-4" />
            </button>
          </div>

          <h2 className="text-xl font-semibold text-foreground text-center mb-1">
            {user.username}
          </h2>
          {/* <p className="text-sm text-muted-foreground text-center mb-4">{user.bio}</p> */}

          <div className="w-full space-y-3 mt-4 pt-4 border-t border-border">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Mail className="h-4 w-4 flex-shrink-0" />
              <span className="truncate">{user.email}</span>
              <span className="font-semibold text-xs ml-2">
                {/* Corrected spelling */}
                {user.is_email_verified ? "Verified" : "Pending"}
              </span>
            </div>

            {/* <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Phone className="h-4 w-4 flex-shrink-0" />
            <span>{user.phone}</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 flex-shrink-0" />
            <span>{user.location}</span>
          </div> */}
          </div>

          <p className="text-xs text-muted-foreground mt-4 pt-4 border-t border-border w-full text-center">
            Joined in {formatJoinDate(user.createdAt)}
          </p>
        </div>
      </Card>
    </div>
  );
};

export default ProfileCard;
