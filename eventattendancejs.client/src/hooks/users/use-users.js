import { useCallback, useEffect, useState } from "react";
import { getAllUsers } from "@/services/users/user-api";

export default function useUsers() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const [reloadKey, setReloadKey] = useState(0);

  // OLD — flagged by react-hooks/set-state-in-effect: effect called fetchUsers, which runs setState
  // const fetchUsers = useCallback(async () => {
  //   try {
  //     const data = await getAllUsers();
  //     setUsers(data);
  //   } catch (error) {
  //     setErrorMessage(error.response?.data?.message ?? "Failed to load users. Please try again.");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }, []);
  //
  // const loadUsers = useCallback(async () => {
  //   setIsLoading(true);
  //   setErrorMessage("");
  //   await fetchUsers();
  // }, [fetchUsers]);
  //
  // useEffect(() => {
  //   fetchUsers();
  // }, [fetchUsers]);

  useEffect(() => {
    let isCancelled = false;

    // setState only inside promise callbacks, which the lint rule allows
    getAllUsers()
      .then((data) => {
        if (!isCancelled) setUsers(data);
      })
      .catch((error) => {
        if (!isCancelled) {
          setErrorMessage(error.response?.data?.message ?? "Failed to load users. Please try again.");
        }
      })
      .finally(() => {
        if (!isCancelled) setIsLoading(false);
      });

    // Ignore late responses after leaving the page or reloading again
    return () => {
      isCancelled = true;
    };
  }, [reloadKey]);

  // Runs from a button click (event handler), so setState here is fine
  const reloadUsers = useCallback(() => {
    setIsLoading(true);
    setErrorMessage("");
    setReloadKey((currentKey) => currentKey + 1);
  }, []);

  return { users, isLoading, errorMessage, reloadUsers };
}