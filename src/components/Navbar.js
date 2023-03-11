import React, { useEffect, useState } from "react";
import style from "../styles/Navbar.module.scss";
import { HiMenuAlt2 } from "react-icons/hi";
import { useMobileContext } from "../hooks/useMobileContext";
import useWindowDimensions from "../hooks/useWindowDimensions";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { mobileMenu, mobileDispatch } = useMobileContext();
  const [desktop, setIsDesktop] = useState(false);
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const { width } = useWindowDimensions();

  useEffect(() => {
    if (width >= 1024) {
      setIsDesktop(true);
    } else {
      setIsDesktop(false);
    }
  }, [width]);

  useEffect(() => {
    if (mobileMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [mobileMenu]);

  const handleCloseMenu = () => {
    mobileDispatch({
      type: "CLOSE_MOBILE_MENU",
      payload: false,
    });
  };

  const handleLogout = () => {
    logout();
  };

  // console.log(user);

  return (
    <>
      <div
        className={
          mobileMenu
            ? style.menuOverlay + " " + style.active
            : style.menuOverlay
        }
        onClick={() =>
          mobileDispatch({
            type: "CLOSE_MOBILE_MENU",
            payload: false,
          })
        }
      ></div>

      {!desktop && (
        <div
          className={
            mobileMenu
              ? style.mobileMenu + " " + style.active
              : style.mobileMenu
          }
          // style={singleTodo ? singleMenuStyle : homeMenuStyle}
        >
          <div className={style.menu}>
            <div className={style.navIntro}>
              <span className={style.navLogo}> Sc. </span>
              <span
                className={style.cancel}
                onClick={() =>
                  mobileDispatch({
                    type: "CLOSE_MOBILE_MENU",
                    payload: false,
                  })
                }
              >
                [X]
              </span>
            </div>

            <ul className={style.menu}>
              <li>
                <Link to="/" onClick={() => handleCloseMenu()}>
                  Home
                </Link>
              </li>

              {user ? (
                <li className={style.loggedIn}>
                  <span> {user.email} </span>
                  <button onClick={handleLogout} style={{ cursor: "pointer" }}>
                    Log out
                  </button>
                </li>
              ) : (
                <>
                  <li>
                    <Link to="/login" onClick={() => handleCloseMenu()}>
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link to="/signup" onClick={() => handleCloseMenu()}>
                      Sign up
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      )}

      <div className={style.innerNavbar}>
        <span className={style.logo}>Scarlett</span>
        {desktop ? (
          <ul className={style.menu}>
            <li>
              <Link to="/">Home</Link>
            </li>

            {user ? (
              <li>
                <span> {user.email} </span>
                <button onClick={handleLogout} style={{ cursor: "pointer" }}>
                  Log out
                </button>
              </li>
            ) : (
              <li>
                <span>
                  <Link to="/login">Login</Link>
                </span>
                <span>
                  <Link to="/signup">Sign up</Link>
                </span>
              </li>
            )}
          </ul>
        ) : (
          <HiMenuAlt2
            className={style.mobilemenuIcon}
            color="white"
            size={30}
            onClick={() =>
              mobileDispatch({
                type: "OPEN_MOBILE_MENU",
                payload: true,
              })
            }
          />
        )}
      </div>
    </>
  );
};

export default Navbar;
