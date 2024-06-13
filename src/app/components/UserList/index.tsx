"use client";

import React from "react";
import styles from "./index.module.css";
import useFetchUsers from "@/app/hooks/useFetchUsers";
import { UserInformationProps } from "@/consts/interfaces";
import LoadingSpinner from "../LoadingSpinner";

const UserList: React.FC<any> = () => {
  const { users, error, loading } = useFetchUsers();

  return (
    <div className={styles.userListDisplayContainer}>
      {!loading && !error && (
        <ul className="">
          <div className={styles.userDisplayBasicInfoTitle}>
            <p className={styles.userDisplayItemTitle}>Name</p>
            <p className={styles.userDisplayItemTitle}>Email</p>
            <p className={styles.userDisplayItemTitle}>Phone number</p>
          </div>
          {users?.map((user: UserInformationProps, index: number) => {
            return (
              <div className={styles.userDisplayBasicInfo} key={`user-management-list-${index}-${user.id}`}>
                <p className={styles.userDisplayItem}>{user.name}</p>
                <p className={styles.userDisplayItem}>{user.email}</p>
                <p className={styles.userDisplayItem}>{user.phone}</p>
              </div>
            );
          })}
        </ul>
      )}
      {loading && <div className={styles.userListDisplayLoadingContainer}><LoadingSpinner /></div>}
      {error && <p className={styles.userListErrorMessage}>{error}</p>}
    </div>
  );
};

export default UserList;
