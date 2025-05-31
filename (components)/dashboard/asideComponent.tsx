"use client";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useState, useEffect, useMemo } from "react";
import SkeletonLoader from "../common/skeleton";
import { CalendarSync, LayoutDashboard, Warehouse } from "lucide-react";

type NavLink = {
  name: string;
  slug: string;
  icon: JSX.Element;
};

export default function AsideMenu() {
  const router = useRouter();

  const [clientPathname, setClientPathname] = useState<string | null>(null);

  useEffect(() => {
    setClientPathname(window.location.pathname);
  }, []);

  const companyCode = useMemo(() => {
    if (!clientPathname) return null;
    const parts = clientPathname.split("/").filter(Boolean);
    return parts.at(-1);
  }, [clientPathname]);

  const handleLogOut = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  const NavigationLinks: NavLink[] = useMemo(
    () => [
      {
        name: "Dashboard",
        slug: "",
        icon: <LayoutDashboard className="w-8 h-8" />,
      },
      {
        name: "Warehouse Report",
        slug: "warehousereport",
        icon: <Warehouse className="w-8 h-8" />,
      },
      {
        name: "Shift Report",
        slug: "shiftreport",
        icon: <CalendarSync className="w-8 h-8" />,
      },
    ],
    []
  );

  if (!companyCode) {
    return (
      <div className="w-full h-screen">
        <SkeletonLoader />
      </div>
    );
  }

  return (
    <nav className="w-full bg-[#1e1e1e] h-[100%] py-8 items-start justify-between">
      <aside className="px-4 flex flex-col items-start justify-between space-y-4 h-[100%]">
        <div className="w-full space-y-8">
          <div className="bg-red-500 p-2 rounded-md flex flex-row space-x-4">
            <div className="bg-white rounded-md">
              <img
                src="/prime-foam.png"
                alt=""
                className="w-20 h-10 object-cover"
              />
            </div>
            <h1 className="font-prim text-[24px] md:text-[32px] font-bold text-white">
              Prime Mattress
            </h1>
          </div>
          <div className="w-full">
            <ul className="w-full space-y-4">
              {NavigationLinks.map(({ name, slug, icon }) => {
                const fullPath = `/dashboard${
                  slug ? `/${slug}` : ""
                }/${companyCode}`;
                const isActive =
                  clientPathname === fullPath ||
                  (clientPathname && clientPathname.startsWith(fullPath));

                return (
                  <li
                    key={name}
                    className="text-[14px] md:text-[16px] lg:text-[18px] font-bold text-white"
                  >
                    <Link
                      href={fullPath}
                      className={`space-x-4 cursor-pointer rounded-md w-full transition-all ease-in duration-200 flex items-center justify-between px-4 py-2 md:px-6 md:py-3 lg:py-4 lg:px-8 text-white ${
                        isActive
                          ? "bg-blue-600 text-white font-bold"
                          : "bg-[#1e1e1e] text-gray-400 hover:bg-[#353238]/40"
                      }`}
                    >
                      <span>{icon}</span>
                      <p className="w-full">{name}</p>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="w-full">
          <button
            className="w-full bg-red-500 text-white font-bold hover:bg-red-400 transition-colors ease-in duration-300 cursor-pointer px-4 py-2 md:px-6 md:py-3 lg:px-8 lg:py-4"
            onClick={handleLogOut}
          >
            Logout
          </button>
        </div>
      </aside>
    </nav>
  );
}
