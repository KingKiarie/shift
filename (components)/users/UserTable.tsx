"use client";

import React, { useState } from "react";
import { useUsers } from "@/lib/hooks/useUsers";
import Link from "next/link";
import { Pagination } from "../pagination/pagination";
import AnimatedList from "../animated/AnimatedList";

interface UsersTableProps {
  companyCode: string;
}

const UsersTable: React.FC<UsersTableProps> = ({ companyCode }) => {
  const { data: users, isLoading, error } = useUsers(companyCode);

  const [filterUserId, setFilterUserId] = useState("");
  const [filterFullName, setFilterFullName] = useState("");
  const [filterEmail, setFilterEmail] = useState("");
  const [filterActive, setFilterActive] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center p-8">
        <div className="text-lg">Loading users...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4 m-4">
        <h3 className="text-red-800 font-medium">Error loading users</h3>
        <p className="text-red-600 text-sm mt-1">
          {error.message || "An unexpected error occurred"}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="mt-2 px-3 py-1 bg-red-100 text-red-700 rounded text-sm hover:bg-red-200"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!users || users.length === 0) {
    return (
      <div className="text-center p-8 h-screen w-full items-center justify-center">
        <p className="text-gray-500">
          No users found for company code: {companyCode}
        </p>
      </div>
    );
  }

  const filteredUsers = users.filter((user) => {
    const matchesUserId = filterUserId
      ? user.id.toString().includes(filterUserId)
      : true;
    const matchesFullName = filterFullName
      ? user.SalesRepName?.toLowerCase().includes(filterFullName.toLowerCase())
      : true;
    const matchesEmail = filterEmail
      ? user.email.toLowerCase().includes(filterEmail.toLowerCase())
      : true;
    const matchesActive =
      filterActive === ""
        ? true
        : filterActive === "active"
        ? user.isActive === 1
        : user.isActive === 0;

    return matchesUserId && matchesFullName && matchesEmail && matchesActive;
  });

  const startIdx = (currentPage - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
  const currentUsers = filteredUsers.slice(startIdx, endIdx);

  return (
    <section className="w-full items-center h-auto justify-center">
      <div className="mb-4 flex flex-wrap gap-4 py-8 px-4 bg-white shadow-sm">
        <input
          type="text"
          placeholder="Filter by UserID"
          value={filterUserId}
          onChange={(e) => {
            setFilterUserId(e.target.value);
            setCurrentPage(1);
          }}
          className="border border-gray-300 rounded px-3 py-1"
        />
        <input
          type="text"
          placeholder="Filter by Full Name"
          value={filterFullName}
          onChange={(e) => {
            setFilterFullName(e.target.value);
            setCurrentPage(1);
          }}
          className="border border-gray-300 rounded px-3 py-1"
        />
        <input
          type="text"
          placeholder="Filter by Email"
          value={filterEmail}
          onChange={(e) => {
            setFilterEmail(e.target.value);
            setCurrentPage(1);
          }}
          className="border border-gray-300 rounded px-3 py-1"
        />
        <select
          value={filterActive}
          onChange={(e) => {
            setFilterActive(e.target.value);
            setCurrentPage(1);
          }}
          className="border border-gray-300 rounded px-3 py-1"
        >
          <option value="">All Statuses</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                UserID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Full Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                UserCode
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Active
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {user.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.SalesRepName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.erpUserCode}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      user.isActive
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {user.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <Link
                    href={`/dashboard/shift/previous-shifts/${companyCode}/${user.id}`}
                  >
                    <button className="text-indigo-600 hover:text-indigo-900">
                      View shifts
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
            {currentUsers.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-4 text-gray-500">
                  No users match the filter criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div>
          <Pagination
            currentPage={currentPage}
            totalItems={filteredUsers.length}
            itemsPerPage={itemsPerPage}
            onPageChange={(page) => {
              setCurrentPage(page);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        </div>
      </div>

      {/* <div className="mt-8 p-4">
        <h2 className="text-[14px] font-semibold mb-4">User List</h2>
        <AnimatedList
          itemClassName=""
          className="bg-white rounded-xl"
          items={currentUsers.map((user) => ({
            id: user.id,
            userNames: user.SalesRepName || "Unnamed User",
            email: user.email,
            isActive: `${
              user.isActive
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            } ${user.isActive ? "Active" : "Inactive"}
`,
          }))}
          onItemSelect={(item, index) =>
            console.log("Selected user:", item, index)
          }
          showGradients={true}
          enableArrowNavigation={true}
          displayScrollbar={true}
        />
      </div> */}
    </section>
  );
};

export default UsersTable;
