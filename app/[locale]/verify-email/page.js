"use client";
import api from "@/lib/api";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [loading , setLoading] = useState(true)

  useEffect(() => {
    const verifyEmail = async () => {

        try {
            const res = await api.post('/verify-email' , {token})
            console.log(res)
        }
        catch (err) {
            console.log(err)
        }
        
    }

    verifyEmail()
  }, [token]);


  if (!token) {
    return <div>Youre not supposed to be here</div>;
  }
  return <div>Page</div>;
};

export default Page;
