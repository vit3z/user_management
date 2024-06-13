"use client"

import React, { useEffect } from "react";
import useFetchUsers from "@/app/hooks/useFetchUsers";

const UserList: React.FC<any> = () => {
  const { users, error, loading } = useFetchUsers();
  return <></>
}

export default UserList;