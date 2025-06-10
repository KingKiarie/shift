"use client";

import AsideMenu from "@/(components)/dashboard/asideComponent";
import Head from "@/(components)/dashboard/head";
import { ReactNode } from "react";
import Providers from "../providers";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <section className="w-full h-auto flex flex-col bg-[#F6F4F4]/60 ">
        <div className="w-full">
          <Head />
        </div>
        <main className="w-full h-auto flex flex-row">
          <div className=" bg-[#1e1e1e] lg:w-1/4 lg:h-auto ">
            <AsideMenu />
          </div>
          <div className="w-full lg:w-3/4">
            <Providers>{children}</Providers>
          </div>
        </main>
      </section>
    </>
  );
}
