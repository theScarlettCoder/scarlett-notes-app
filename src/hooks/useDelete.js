import { useState } from "react";
import { useTodoContext } from "./useTodosContext";
import api from "../config/api";
import { useAuthContext } from "./useAuthContext";

export const useDelete = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useTodoContext();
  const { user } = useAuthContext();

  const handleDelete = async (todo) => {
    console.log(user);
    if (todo) {
      console.log(todo);
      setIsLoading(true);
      setError(null);

      try {
        await api
          .delete("/notes/" + todo, {
            data: { username: user.username },
          })
          .then(
            (res) => {
              dispatch({
                type: "DELETE_TODO",
                payload: res.data.deletedNote,
              });
              console.log(res.data.deletedNote);
              setIsLoading(false);
            },
            (error) => {
              setError(error.response.data.message);
              console.log(error.response.data.message);
            }
          );
      } catch (error) {
        setError(error.message);
        console.log(error.message);
      }
    }
  };

  return {
    handleDelete,
    error,
    isLoading,
  };
};
