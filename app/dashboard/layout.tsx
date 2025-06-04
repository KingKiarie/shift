"use client";

import AsideMenu from "@/(components)/dashboard/asideComponent";
import Head from "@/(components)/dashboard/head";
import { ReactNode } from "react";
import Providers from "../providers";


export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <section className="w-full h-auto flex bg-[#F6F4F4]/60 ">
        <nav className="w-1/4">
          <AsideMenu />
        </nav>
        <main className="w-3/4">
          <Head />
          <Providers>{children}</Providers>
        </main>
      </section>
    </>
  );
}
