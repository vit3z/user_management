"use client";

import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import useFetchUsers from "@/app/hooks/useFetchUsers";
import { UserInformationProps } from "@/consts/interfaces";
import LoadingSpinner from "../LoadingSpinner";
import UserDetails from "../UserDetails";
import Image from "next/image";
import ProfileImage from "../../../../public/Profile_avatar_placeholder_large.png";
import { columnNameGenerator } from "@/app/utils/ColumnNameGenerator";

const UserList: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [userDetails, setUserDetails] = useState<UserInformationProps | null>(
    null
  );
  const [userData, setUserData] = useState<UserInformationProps[] | null>(null);
  const [currentSort, setCurrentSort] = useState<string>("");

  const { users, error, loading } = useFetchUsers();

  const handleOpenModal = (user: UserInformationProps) => {
    setUserDetails(user);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setUserDetails(null);
    setModalOpen(false);
  };

  useEffect(() => {
    setUserData(users);
  }, [users]);

  const handleSortBy = (sortParam: string) => {
    const clonedUserList = JSON.parse(JSON.stringify(userData));
    switch (sortParam) {
      case "name":
        clonedUserList.sort(
          (a: UserInformationProps, b: UserInformationProps) => {
            let nameA = a.name.toLowerCase();
            let nameB = b.name.toLowerCase();

            if (nameA > nameB) return 1;
            if (nameA < nameB) return -1;
            return 0;
          }
        );
        if(currentSort !== "nameAsc" && currentSort !== "nameDesc") {
          setCurrentSort("nameAsc");
        }
        if(currentSort === "nameAsc") {
          setCurrentSort("nameDesc");
          clonedUserList.reverse();
        }
        if(currentSort === "nameDesc") {
          setCurrentSort("nameAsc");
        }
        break;
      case "email":
        clonedUserList.sort(
          (a: UserInformationProps, b: UserInformationProps) => {
            let emailA = a.email.toLowerCase();
            let emailB = b.email.toLowerCase();

            if (emailA > emailB) return 1;
            if (emailA < emailB) return -1;
            return 0;
          }
        );
        if(currentSort !== "emailAsc" && currentSort !== "emailDesc") {
          setCurrentSort("emailAsc");
        }
        if(currentSort === "emailAsc") {
          setCurrentSort("emailDesc");
          clonedUserList.reverse();
        }
        if(currentSort === "emailDesc") {
          setCurrentSort("emailAsc");
        }
        break;
      case "phoneNum":
        clonedUserList.sort(
          (a: UserInformationProps, b: UserInformationProps) => {
            let phoneA = a.phone.toLowerCase();
            let phoneB = b.phone.toLowerCase();

            if (phoneA > phoneB) return 1;
            if (phoneA < phoneB) return -1;
            return 0;
          }
        );
        if(currentSort !== "phoneAsc" && currentSort !== "phoneDesc") {
          setCurrentSort("phoneAsc");
        }
        if(currentSort === "phoneAsc") {
          setCurrentSort("phoneDesc");
          clonedUserList.reverse();
        }
        if(currentSort === "phoneDesc") {
          setCurrentSort("phoneAsc");
        }
        break;
      default:
        break;
    }
    setUserData(clonedUserList);
  };

  const handleSearchForUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.value !== "") {
      const newResults = users?.filter((el: UserInformationProps) => {
        return el.name.toLowerCase().includes(e.target.value.toLowerCase());
      })
      if(newResults && newResults?.length > 0) {
        setUserData(newResults);
      } else {
        setUserData([]);
      }
      setCurrentSort("");
    } else {
      setUserData(users);
    }
  }

  return (
    <>
      <div className={styles.searchContainer}>
        <span className={styles.searchContainerIcon}>&#x1F50E;&#xFE0E;</span>
        <input className={styles.userDisplaySearchBar} placeholder="Search User By Name" onChange={(e) => handleSearchForUser(e)}/>
      </div>
      <div className={styles.userListDisplayContainer}>
        {!loading && !error && (
          <ul>
            <div className={styles.userDisplayBasicInfoTitle}>
              <p className={styles.userDisplayItemBlank}>&nbsp;</p>
              <p
                className={styles.userDisplayItemTitle}
                onClick={() => handleSortBy("name")}
              >
                {columnNameGenerator("Name", currentSort)}
              </p>
              <p
                className={styles.userDisplayItemTitle}
                onClick={() => handleSortBy("email")}
              >
                {columnNameGenerator("Email", currentSort)}
              </p>
              <p
                className={styles.userDisplayItemTitle}
                onClick={() => handleSortBy("phoneNum")}
              >
                {columnNameGenerator("Phone Number", currentSort)}
              </p>
            </div>
            {userData?.map((user: UserInformationProps, index: number) => {
              return (
                <div
                  className={index%2===0 ? styles.userDisplayBasicInfoEven : styles.userDisplayBasicInfoOdd}
                  key={`user-management-list-${index}-${user.id}`}
                  onClick={() => handleOpenModal(user)}
                >
                  <Image
                    className={styles.userListUserAvatar}
                    src={ProfileImage}
                    width={24}
                    height={24}
                    alt="User Avatar"
                  />
                  <p className={styles.userDisplayItem}>{user.name}</p>
                  <p className={styles.userDisplayItem}>{user.email}</p>
                  <p className={styles.userDisplayItem}>{user.phone}</p>
                </div>
              );
            })}
            {(userData && userData?.length < 1) && <p className={styles.noUsersFound}>No Users Found</p>}
          </ul>
        )}
        {loading && (
          <div className={styles.userListDisplayLoadingContainer}>
            <LoadingSpinner />
          </div>
        )}
        {error && <p className={styles.userListErrorMessage}>{error}</p>}

        {userDetails && (
          <UserDetails
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            data={userDetails}
          />
        )}
      </div>
    </>
  );
};

export default UserList;
