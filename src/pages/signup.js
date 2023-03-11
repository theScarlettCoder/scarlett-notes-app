import React, { useState } from "react";
import style from "../styles/Form.module.scss";

import UpdateBG from "../image/bg/update-bg.jpg";
import { useSignup } from "../hooks/useSignUp";
import { Link } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { signup, isLoading, error } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(email, username, password);
  };

  return (
    <div className={style.AddTodoModalContainer}>
      <div className={style.formModalOverlay}>
        <img
          src={UpdateBG}
          alt="Thumbnail by Kelly Sikkema"
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
          <Link to="/login" className={style.link}>
            Login
          </Link>
        </div>
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit} className={style.form}>
          <div className={style.inputContainer}>
            <input
              type="email"
              id="email"
              placeholder="scarlett@email.com"
              onChange={(e) => setEmail(() => e.target.value)}
              value={email}
            />
            <label htmlFor="email">Email</label>
          </div>

          <div className={style.inputContainer}>
            <input
              type="text"
              id="username"
              placeholder="scarlett"
              onChange={(e) => setUsername(() => e.target.value)}
              value={username}
            />
            <label htmlFor="username">Username</label>
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
              Sign Up
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

export default Signup;
