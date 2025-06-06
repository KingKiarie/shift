"use client";

import DashFooter from "@/(components)/common/dashFooter";
import AsideMenu from "@/(components)/dashboard/asideComponent";
import Head from "@/(components)/dashboard/head";
import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryQlient = new QueryClient();

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <section className="w-full h-auto flex bg-[#F6F4F4]/60 ">
        <nav className="w-1/4">
          <AsideMenu />
        </nav>
        <main className="w-3/4">
          <Head />
          <QueryClientProvider client={queryQlient}>
            {children}
          </QueryClientProvider>
        </main>
      </section>
      <footer>{/* <DashFooter /> */}</footer>
    </>
  );
}
