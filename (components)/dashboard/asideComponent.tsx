"use client";

import Link from "next/link";
import {
  usePathname,
  useRouter,
  useParams,
  useSearchParams,
} from "next/navigation";
import { useState, useEffect } from "react";
import {
  CalendarSync,
  Users,
  Menu,
  X,
  CloudSnowIcon,
  HamburgerIcon,
} from "lucide-react";
import { removeToken } from "@/lib/token";
import { decodeJWT } from "@/lib/decodeJwt";
import SkeletonLoader from "../common/skeleton";

export default function AsideMenu() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const searchParams = useSearchParams();

  const user = decodeJWT();
  const userId = user?.id || user?.areaCode || user?.companyCode || null;

  const companyCode = params?.companyCode as string | null;

  const [shiftId, setShiftId] = useState<string | null>(() => {
    const paramShiftId = params?.shiftId as string | null;
    if (paramShiftId) return paramShiftId;
    const searchShiftId = searchParams?.get("shiftId");
    if (searchShiftId) return searchShiftId;
    if (typeof window !== "undefined") {
      return localStorage.getItem("currentShiftId") || null;
    }
    return null;
  });

  const [isShiftMenuOpen, setIsShiftMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const NavigationLinks = [
    {
      name: "Users",
      slug: companyCode
        ? `/dashboard/user/get-users/${companyCode}`
        : "/dashboard/user/get-users",
      icon: <Users className="w-6 h-6" />,
    },
  ];

  const handleLogOut = () => {
    removeToken();
    localStorage.removeItem("currentShiftId");
    router.push("/login");
  };

  const isShiftActive = () => {
    if (!pathname) return false;
    if (pathname.includes("/dashboard/shift/shift-sales-summary")) return false;
    if (pathname.includes("/dashboard/shift/shift-report")) return false;
    if (pathname.includes("/dashboard/shift/previous-shifts")) return false;
    return pathname.includes("/dashboard/shift/");
  };

  const MenuContent = () => (
    <aside className="w-full h-[100%] pr-4 bg-[#1e1e1e]/50 lg:bg-[#1e1e1e]/80 flex flex-col justify-between py-4">
      <div className="flex flex-col w-full  lg:h-auto items-start justify-between space-y-4">
        <div className="w-full flex flex-col space-y-4">
          <div className="flex items-center justify-start bg-blue-700 p-4 rounded-r-full  w-full space-x-4  ">
            <h1 className="text-[20px] text-start text-white font-bold">
              Prime Mattress
            </h1>
            <span className="rounded-md animate-pulse flex item-center justify-center-spin w-2 h-2 duration-500  bg-green-500"></span>
          </div>
          <div className="w-full">
            <ul className="mt-8 space-y-4">
              {NavigationLinks.map(({ name, slug, icon }) => {
                const isActive = pathname === slug;
                return (
                  <li key={name}>
                    <Link
                      href={slug}
                      className={`flex items-center space-x-3 p-4 rounded-r-full bg-blue-200 hover:bg-blue-400 ease-in-out duration-300 ${
                        isActive
                          ? "bg-blue-600 text-white"
                          : "text-blue-800 hover:bg-[#353238]"
                      }`}
                    >
                      {icon}
                      <span>{name}</span>
                    </Link>
                  </li>
                );
              })}

              <li>
                <button
                  onClick={() => setIsShiftMenuOpen((prev) => !prev)}
                  className=" items-center justify-between w-full px-4 py-2 rounded-md hover:bg-[#353238] font-semibold hidden"
                >
                  <div className="flex items-center space-x-3">
                    <CalendarSync className="w-6 text-blue-600 h-6" />
                    <span className="text-white"> View Shifts</span>
                  </div>
                  <span>
                    {isShiftMenuOpen ? <CloudSnowIcon /> : <HamburgerIcon />}
                  </span>
                </button>

                {isShiftMenuOpen && (
                  <ul className="hidden ml-6 mt-2 space-y-2 text-sm text-gray-300">
                    <li>
                      <Link
                        href={
                          companyCode && userId
                            ? `/dashboard/shift/previous-shifts/${companyCode}/${userId}`
                            : "#"
                        }
                        className={`block px-3 py-1 rounded-md ${
                          pathname.includes("/shift/previous-shifts")
                            ? "bg-blue-600 text-white"
                            : "hover:bg-[#2d2d2d]"
                        }`}
                      >
                        Previous Shifts
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={
                          shiftId && companyCode && userId
                            ? `/dashboard/shift/shift-sales-summary/${shiftId}/${companyCode}/${userId}`
                            : "#"
                        }
                        className={`block px-3 py-1 rounded-md ${
                          pathname.includes("/shift/shift-sales-summary")
                            ? "bg-blue-600 text-white"
                            : "hover:bg-[#2d2d2d]"
                        }`}
                      >
                        Sales Summary
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={
                          shiftId && companyCode && userId
                            ? `/dashboard/shift/shift-report/${shiftId}/${companyCode}/${userId}`
                            : "#"
                        }
                        className={`block px-3 py-1 rounded-md ${
                          pathname.includes("/shift/shift-report")
                            ? "bg-blue-600 text-white"
                            : "hover:bg-[#2d2d2d]"
                        }`}
                      >
                        Shift Report
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <button
          onClick={handleLogOut}
          className="w-full mt-8 bg-red-500 hover:bg-red-400 p-4 rounded-r-full text-white font-bold"
        >
          Logout
        </button>
      </div>
    </aside>
  );

  return (
    <>
      <div className="block  lg:hidden fixed  top-4 right-4  z-50">
        <button
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          className="bg-[#1e1e1e] p-2 rounded-md text-white"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      <div
        className={`fixed  inset-0 z-40 transition-all duration-300 ease-in-out lg:hidden ${
          isMobileMenuOpen
            ? "translate-x-0 opacity-100"
            : "-translate-x-full opacity-0 pointer-events-none"
        }`}
      >
        <div className="absolute top-0 left-0 h-full w-4/5  z-50 shadow-lg">
          {MenuContent()}
        </div>
        <div
          className="absolute inset-0"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      </div>

      <div className="hidden md:hidden lg:block h-[100%]  w-full ">
        {MenuContent()}
      </div>
    </>
  );
}
