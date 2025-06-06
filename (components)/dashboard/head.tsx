"use client";

import { decodeJWT } from "@/lib/decodeJwt";
import { useEffect, useState } from "react";

export default function Head() {
  const [user, setUser] = useState<{
    userName?: string;
    shiftID?: string;
  } | null>(null);

  useEffect(() => {
    const decoded = decodeJWT();
    
    setUser(decoded);
  }, []);

  if(!user){
    return(
      <div className="flex items-center justify-center h-screen w-full">
        <h2>Processing...</h2>
      </div>
    )
  }
  return (
    <header className="w-full border-b-2 border-[#1e1e1e] py-4">
      <div className="flex items-start justify-between max-w-[90%] mx-auto">
        <div className="flex flex-col font-bold">
          <h3 className="text-[24px]">
            Welcome back <br />
          </h3>
          <span className=" text-amber-600">{user?.userName}</span>
        </div>
        <div>
          <div className="flex items-center justify-center space-x-4">
            <h3 className="font-semibold">Active </h3>
            <span className="w-3 h-3 bg-amber-500 animate-pulse rounded-full"></span>
          </div>
          <div className="flex space-x-4">
            <h3 className="font-semibold">shift:</h3>
            <span>{user?.shiftID}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
