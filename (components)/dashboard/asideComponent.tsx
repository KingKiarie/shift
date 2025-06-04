"use client";

import Link from "next/link";
import {
  usePathname,
  useRouter,
  useParams,
  useSearchParams,
} from "next/navigation";
import { useState, useEffect } from "react";
import SkeletonLoader from "../common/skeleton";
import { CalendarSync, LayoutDashboard, Warehouse } from "lucide-react";
import { removeToken } from "@/lib/token";
import { decodeJWT } from "@/lib/decodeJwt";

export default function AsideMenu() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const searchParams = useSearchParams();

  const user = decodeJWT();

  // Extract user ID from JWT token instead of URL params
  const userId = user?.id || user?.userId || user?.sub || null;
  const companyCode = params?.companyCode as string | null;

  // Handle shift ID from multiple sources
  const [shiftId, setShiftId] = useState<string | null>(() => {
    // First try URL params
    const paramShiftId = params?.shiftId as string | null;
    if (paramShiftId) return paramShiftId;

    // Then try search params
    const searchShiftId = searchParams?.get("shiftId");
    if (searchShiftId) return searchShiftId;

    // Finally try localStorage (if available)
    if (typeof window !== "undefined") {
      return localStorage.getItem("currentShiftId") || null;
    }

    return null;
  });

  const [isShiftMenuOpen, setIsShiftMenuOpen] = useState(false);

  // useEffect(() => {
  //   const fetchActiveShift = async () => {
  //     if (!shiftId && userId && companyCode) {
  //       try {
  //         // Replace with your actual API endpoint
  //         const response = await fetch(
  //           `/api/shifts/active?userId=${userId}&companyCode=${companyCode}`
  //         );
  //         if (response.ok) {
  //           const data = await response.json();
  //           if (data.shiftId) {
  //             setShiftId(data.shiftId);

  //             localStorage.setItem("currentShiftId", data.shiftId);
  //           }
  //         }
  //       } catch (error) {
  //         console.error("Failed to fetch active shift:", error);
  //       }
  //     }
  //   };

  //   fetchActiveShift();
  // }, [userId, companyCode, shiftId]);

  const NavigationLinks = [
    {
      name: "Dashboard",
      slug: companyCode ? `/dashboard/${companyCode}` : "/dashboard",
      icon: <LayoutDashboard className="w-8 h-8" />,
    },
    {
      name: "Warehouse Report",
      slug: companyCode
        ? `/dashboard/warehousereport/${companyCode}`
        : "/dashboard/warehousereport",
      icon: <Warehouse className="w-8 h-8" />,
    },
  ];

  const handleLogOut = () => {
    removeToken();
    // Clear shift data on logout
    localStorage.removeItem("currentShiftId");
    router.push("/login");
  };

  if (!pathname) {
    return (
      <div className="w-full h-screen">
        <SkeletonLoader />
      </div>
    );
  }

  // Debug logging (remove in production)
  console.log("Debug Info:", { userId, companyCode, shiftId, user });

  // Helper function to check if a path is active, ignoring dynamic params
  const isShiftActive = () => {
    if (!pathname) return false;

    if (pathname.includes("/dashboard/shift/shift-sales-summary")) {
      return false;
    }
    if (pathname.includes("/dashboard/shift/shift-report")) {
      return false;
    }
    if (pathname.includes("/dashboard/shift/previous-shifts")) {
      return false;
    }
    // Active shift base route (excluding the above)
    return pathname.includes("/dashboard/shift/");
  };

  return (
    <nav className="w-full bg-[#1e1e1e] h-full py-8 flex flex-col justify-between">
      <aside className="px-4 flex flex-col justify-between h-full">
        <div className="space-y-8">
          <div className="bg-red-500 p-2 rounded-md flex items-center space-x-4">
            <div className="bg-white rounded-md">
              <img
                src="/prime-foam.png"
                alt="Prime Foam Logo"
                className="w-20 h-10 object-cover"
              />
            </div>
            <h1 className="font-prim text-[24px] md:text-[32px] font-bold text-white">
              Prime Mattress
            </h1>
          </div>

          <ul className="space-y-4">
            {NavigationLinks.map(({ name, slug, icon }) => {
              const isActive = pathname === slug;
              return (
                <li key={name} className="text-white font-bold text-lg">
                  <Link
                    href={slug}
                    className={`flex items-center space-x-4 px-6 py-3 rounded-md transition ${
                      isActive
                        ? "bg-blue-600 text-white"
                        : "text-gray-400 hover:bg-[#353238]/40"
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
                className="w-full flex justify-between items-center px-6 py-3 rounded-md bg-[#1e1e1e] hover:bg-[#353238]/40 text-white font-bold"
                aria-expanded={isShiftMenuOpen}
              >
                <div className="flex items-center space-x-4">
                  <CalendarSync className="w-6 h-6" />
                  <span>Shift</span>
                </div>
                <span className="text-2xl select-none">
                  {isShiftMenuOpen ? "−" : "+"}
                </span>
              </button>

              {isShiftMenuOpen && (
                <ul className="ml-8 mt-2 space-y-2 text-gray-400">
                  {/* <li className="">
                    <Link
                      href={
                        companyCode && userId
                          ? `/dashboard/shift/${companyCode}/${userId}`
                          : "#"
                      }
                      className={`block px-4 py-2 rounded-md ${
                        isShiftActive()
                          ? "bg-blue-600 text-white"
                          : "hover:bg-[#2d2d2d]"
                      } ${
                        !(companyCode && userId)
                          ? "opacity-50 pointer-events-none"
                          : ""
                      }`}
                    >
                      Active Shift
                      {!userId && (
                        <span className="text-xs"> (No User ID)</span>
                      )}
                    </Link>
                  </li> */}

                  <li>
                    <Link
                      href={
                        companyCode && userId
                          ? `/dashboard/shift/previous-shifts/${companyCode}/${userId}`
                          : "#"
                      }
                      className={`block px-4 py-2 rounded-md ${
                        pathname.includes("/shift/previous-shifts")
                          ? "bg-blue-600 text-white"
                          : "hover:bg-[#2d2d2d]"
                      } ${
                        !(companyCode && userId)
                          ? "opacity-50 pointer-events-none"
                          : ""
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
                      className={`block px-4 py-2 rounded-md ${
                        pathname.includes("/shift/shift-sales-summary")
                          ? "bg-blue-600 text-white"
                          : "hover:bg-[#2d2d2d]"
                      } ${
                        !(shiftId && companyCode && userId)
                          ? "opacity-50 pointer-events-none"
                          : ""
                      }`}
                    >
                      Sales Summary
                      {!shiftId && (
                        <span className="text-xs"> (No Shift ID)</span>
                      )}
                    </Link>
                  </li>

                  <li>
                    <Link
                      href={
                        shiftId && companyCode && userId
                          ? `/dashboard/shift/shift-report/${shiftId}/${companyCode}/${userId}`
                          : "#"
                      }
                      className={`block px-4 py-2 rounded-md ${
                        pathname.includes("/shift/shift-report")
                          ? "bg-blue-600 text-white"
                          : "hover:bg-[#2d2d2d]"
                      } ${
                        !(shiftId && companyCode && userId)
                          ? "opacity-50 pointer-events-none"
                          : ""
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

        <div>
          <button
            className="w-full bg-red-500 hover:bg-red-400 text-white font-bold py-3 rounded-md transition"
            onClick={handleLogOut}
          >
            Logout
          </button>
        </div>
      </aside>
    </nav>
  );
}
