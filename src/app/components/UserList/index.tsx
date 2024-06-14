"use client";

import React, { useState } from "react";
import styles from "./index.module.css";
import useFetchUsers from "@/app/hooks/useFetchUsers";
import { UserInformationProps } from "@/consts/interfaces";
import LoadingSpinner from "../LoadingSpinner";
import UserDetails from "../UserDetails";

const UserList: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [userDetails, setUserDetails] = useState<UserInformationProps | null>(null)
  const { users, error, loading } = useFetchUsers();


  const handleOpenModal = (user: UserInformationProps) => {
    setUserDetails(user);
    setModalOpen(true);
  }
  const handleCloseModal = () => {
    setUserDetails(null);
    setModalOpen(false)
  };

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
              <div className={styles.userDisplayBasicInfo} key={`user-management-list-${index}-${user.id}`} onClick={() => handleOpenModal(user)}>
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

      {userDetails && <UserDetails isOpen={isModalOpen} onClose={handleCloseModal} data={userDetails}/>}
    </div>
  );
};

export default UserList;
