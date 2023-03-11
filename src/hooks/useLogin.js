import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import api from "../config/api";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (username, password) => {
    setIsLoading(true);
    setError(null);

    await api
      .post("https://scarlett-realism-api.onrender.com/api/auth/login", {
        username,
        password,
      })
      .then((res) => {
        const json = res.data;
        console.log(res.data);

        // save the user to local storage
        localStorage.setItem("user", JSON.stringify(json));

        // update the auth context
        dispatch({
          type: "LOGIN",
          payload: json,
        });

        window.location.replace("/");
        // update loading state
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        const json = error.response.data.error;
        setError(json);
      });
  };

  return {
    login,
    isLoading,
    error,
  };
};
