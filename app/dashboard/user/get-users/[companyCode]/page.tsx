"use client";

import UsersTable from "@/(components)/users/UserTable";
import { useParams } from "next/navigation";

export default function GetUsersPage() {
  const params = useParams();
  const companyCode = params?.companyCode as string;

  console.log("Company Code:", companyCode);

  return (
    <section className="w-full xl:h-screen lg:h-screen h-auto flex items-start justify-start flex-col">
      <div className="w-full max-w-[90%] mx-auto">
        <h1 className="text-2xl font-bold mb-4">Users available</h1>
        <div className="w-full h-auto">
          <UsersTable companyCode={companyCode} />
        </div>
      </div>
    </section>
  );
}
