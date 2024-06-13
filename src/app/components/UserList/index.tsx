"use client";

import React from "react";
import useFetchUsers from "@/app/hooks/useFetchUsers";
import { UserInformationProps } from "@/consts/interfaces";
import LoadingSpinner from "../LoadingSpinner";

const UserList: React.FC<any> = () => {
  const { users, error, loading } = useFetchUsers();

  return (
    <div>
      {!loading && !error && (
        <ul className="">
          {users?.map((user: UserInformationProps, index: number) => {
            return (
              <div key={`user-management-list-${index}-${user.id}`}>
                <p>{user.name}</p>
                <p>{user.email}</p>
                <p>{user.phone}</p>
              </div>
            );
          })}
        </ul>
      )}
      {loading && <LoadingSpinner />}
      {error && <p>{error}</p>}
    </div>
  );
};

export default UserList;
