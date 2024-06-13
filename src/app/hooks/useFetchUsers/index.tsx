import { useState, useEffect } from "react";
import { UserInformationProps } from "@/consts/interfaces";
import { userFetchUrl } from "@/consts/urls";

const useFetchUsers = () => {
  const [users, setUsers] = useState<UserInformationProps[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          `${userFetchUrl}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("User fetch failed");
        }

        const userList = await response.json();
        setUsers(userList);
      } catch (error) {
        setError(`${error}`);
      } finally {
        setLoading(true);
      }
    };
    fetchUsers();
  }, []);

  return { users, error, loading };
};

export default useFetchUsers;
