"use client";

import Link from "next/link";
import { usePathname, useRouter, useParams } from "next/navigation";
import { useState } from "react";
import SkeletonLoader from "../common/skeleton";
import { CalendarSync, LayoutDashboard, Warehouse } from "lucide-react";
import { removeToken } from "@/lib/token";

export default function AsideMenu() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  const companyCode = params?.companyCode as string | null;
  const userId = params?.userId as string | null;
  const shiftId = params?.shiftId as string | null;

  const [isShiftMenuOpen, setIsShiftMenuOpen] = useState(false);

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
    router.push("/login");
  };

  if (!pathname) {
    return (
      <div className="w-full h-screen">
        <SkeletonLoader />
      </div>
    );
  }

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
                  <li>
                    <Link
                      href={
                        companyCode && userId
                          ? `/dashboard/shift/activeshift/${companyCode}/${userId}`
                          : "#"
                      }
                      className={`block px-4 py-2 rounded-md ${
                        pathname.startsWith("/dashboard/shift/activeshift")
                          ? "bg-blue-600 text-white"
                          : "hover:bg-[#2d2d2d]"
                      } ${
                        !(companyCode && userId)
                          ? "opacity-50 pointer-events-none"
                          : ""
                      }`}
                    >
                      Active Shift
                    </Link>
                  </li>

                  <li>
                    <Link
                      href={
                        companyCode && userId
                          ? `/dashboard/shift/previous-shifts/${companyCode}/${userId}`
                          : "#"
                      }
                      className={`block px-4 py-2 rounded-md ${
                        pathname.startsWith(
                          `/dashboard/shift/previous-shifts/${companyCode}/${userId}`
                        )
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
                        pathname.startsWith(
                          `/dashboard/shift/shift-sales-summary/${shiftId}`
                        )
                          ? "bg-blue-600 text-white"
                          : "hover:bg-[#2d2d2d]"
                      } ${
                        !(shiftId && companyCode && userId)
                          ? "opacity-50 pointer-events-none"
                          : ""
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
                      className={`block px-4 py-2 rounded-md ${
                        pathname.startsWith(
                          `/dashboard/shift/shift-report/${shiftId}`
                        )
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
