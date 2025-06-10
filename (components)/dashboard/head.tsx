"use client";

import { decodeJWT } from "@/lib/decodeJwt";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Head() {
  const [user, setUser] = useState<{
    userName?: string;
    shiftID?: string;
  } | null>(null);

  useEffect(() => {
    const decoded = decodeJWT();

    setUser(decoded);
  }, []);

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen w-full">
        <h2>Processing...</h2>
      </div>
    );
  }
  return (
    <header className="w-full bg-[#1e1e1e] ">
      <div className="flex items-start justify-evenly   mx-auto">
        <div className="lg:w-1/4 flex items-center justify-center text-white border-r-2 border-zinc-900 h-full border-b-2">
          <Image
            width={100}
            height={100}
            src={"/prime-foam.png"}
            alt="Prime mattress "
          ></Image>
        </div>
        <div className="lg:w-3/4">
          <div className="w-full flex flex-row items-start justify-between px-2">
            <div>
              <h1 className="text-[24px] md:text-[32px] lg:text-[34px] text-white font-medium">
                Overview
              </h1>
            </div>
            <div></div>
          </div>
          <div className="w-full"></div>
          <div className="hidden  flex-col font-bold bg-white rounded-xl shadow p-4">
            <h3 className="text-[12px] md:text-[24px]">
              Welcome back <br />
            </h3>
            <span className=" text-blue-600 text-[12px] md:text-[16px]">
              {user?.userName}
            </span>
          </div>
          <div className="hidden">
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
      </div>
    </header>
  );
}
