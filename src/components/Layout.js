import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import style from "../styles/Layout.module.scss";
import { useModalContext } from "../hooks/useModalContext";
import { useLocation } from "react-router-dom";

const Layout = ({ title, children }) => {
  const [removeFooter, setRemoveFooter] = useState(false);
  const { modal } = useModalContext();
  const createTodo = modal ? true : false;
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/" && modal) {
      setRemoveFooter(true);
    } else {
      setRemoveFooter(false);
    }
  }, [location, modal]);

  return (
    <div className={style.container}>
      {!createTodo && (
        <div className={style.navbarContainer}>
          <Navbar />
        </div>
      )}

      {children}

      {!removeFooter && (
        <footer className={style.footerContainer}>
          <Footer />
        </footer>
      )}
    </div>
  );
};

export default Layout;
