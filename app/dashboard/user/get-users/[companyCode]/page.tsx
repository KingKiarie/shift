"use client";

import UsersTable from "@/(components)/users/UserTable";
import { useParams } from "next/navigation";

export default function GetUsersPage() {
  const params = useParams();
  const companyCode = params?.companyCode as string;

  console.log("Company Code:", companyCode);

  return (
    <section className="w-full h-full flex items-start justify-center flex-col">
      <div className="w-full max-w-[90%] mx-auto">
        <h1 className="text-2xl font-bold mb-4">Users available</h1>
        <div className="w-full h-screen">
          <UsersTable companyCode={companyCode} />
        </div>
      </div>
    </section>
  );
}
