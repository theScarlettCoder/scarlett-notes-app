import React, { useState } from "react";
import style from "../styles/Form.module.scss";

import UpdateBG from "../image/bg/update-bg.jpg";

import { useLogin } from "../hooks/useLogin";
import { Link } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, error } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(username, password);

    setUsername("");
    setPassword("");
  };

  return (
    <div className={style.AddTodoModalContainer}>
      <div className={style.formModalOverlay}>
        <img
          src={UpdateBG}
          alt="thumbnail by Kelly Sikkema"
          className={style.overlayPhoto}
        />
        <div className={style.attribute}>
          Photo by{" "}
          <Link to="https://unsplash.com/@kellysikkema?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
            Kelly Sikkema
          </Link>
          on
          <Link to="https://unsplash.com/photos/Pmq77M23eU8?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
            Unsplash
          </Link>
        </div>
      </div>

      <div className={style.formModalContainer}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: "20%",
          }}
        >
          <Link to="/" className={style.link}>
            Home
          </Link>
          <Link to="/signup" className={style.link}>
            Sign Up
          </Link>
        </div>
        <h2>Log in</h2>
        <form onSubmit={handleSubmit} className={style.form}>
          <div className={style.inputContainer}>
            <input
              type="text"
              id="text"
              placeholder="scarlett@email.com"
              onChange={(e) => setUsername(() => e.target.value)}
              value={username}
            />
            <label htmlFor="text">Username</label>
          </div>
          <div className={style.inputContainer}>
            <input
              type="password"
              id="password"
              placeholder="Scarlett.123"
              onChange={(e) => setPassword(() => e.target.value)}
              value={password}
            />
            <label htmlFor="password">Password</label>
          </div>

          <div className={style.buttonContainer}>
            <button type="submit" className={style.button} disabled={isLoading}>
              Login
            </button>
          </div>
          {error && (
            <div className={style.errorContainer}>
              <span className={style.errorText}>{error}</span>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
