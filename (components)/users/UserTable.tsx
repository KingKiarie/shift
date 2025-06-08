"use client";

import React from "react";
import { useUsers } from "@/lib/hooks/useUsers";

interface UsersTableProps {
  companyCode: string;
}

const UsersTable: React.FC<UsersTableProps> = ({ companyCode }) => {
  const { data, isLoading, error } = useUsers(companyCode);

  if (isLoading) return <p>Loading users...</p>;
  if (error) return <p>Error loading users: {error.message}</p>;

  console.log("Users data:", data);

  return (
    <table>
      <thead>
        <tr>
          <th>Username</th>
          <th>Full Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Active</th>
          <th>Created At</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data?.users.map((user) => (
          <tr key={user.id}>
            <td>{user.username}</td>
            <td>{user.fullName}</td>
            <td>{user.email}</td>
            <td>{user.role}</td>
            <td>{user.isActive ? "Yes" : "No"}</td>
            <td>{new Date(user.createdAt).toLocaleDateString()}</td>
            <td>
              <button onClick={() => alert(`Viewing user ${user.username}`)}>
                View User
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UsersTable;
