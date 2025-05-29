import AsideMenu from "@/(components)/dashboard/asideComponent";
import Head from "@/(components)/dashboard/head";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <section className="w-full h-screen flex  ">
      <nav className="w-1/4">
        <AsideMenu />
      </nav>
      <main className="w-3/4">
        <Head />
        {children}
      </main>
    </section>
  );
}
