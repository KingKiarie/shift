"use client";

import AsideMenu from "@/(components)/dashboard/asideComponent";
import Head from "@/(components)/dashboard/head";
import { ReactNode } from "react";
import Providers from "../providers";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <section className="w-full h-auto flex bg-[#F6F4F4]/60 ">
        <nav className="lg:h-auto lg:w-1/4 bg-[#1e1e1e]">
          <AsideMenu />
        </nav>
        <main className="w-full lg:w-3/4">
          <Head />
          <Providers>{children}</Providers>
        </main>
      </section>
    </>
  );
}
