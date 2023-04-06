import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "../styles/LoginDropdown.module.css";

function Header({ isUserLoggedIn, navbarBackground }) {
  // localStorage.setItem('redirectUrl', window.location.href);
  const [isLoggedIn, setLoggedIn]=useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [navbarAppear, setNavbarAppear] = useState(false);
  const [loginOption, setLoginOption] = useState(false);

  useEffect(() => {

    const userName = localStorage.getItem("user_name");
    if (userName) {
      setLoggedIn(true);
    }
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLoginClick = () => {
    setLoginOption(true);
    setTimeout(() => {
      setLoginOption(false);
    }, 5000);
  };

  const menuToggle = () => {
    if (navbarAppear === true) {
      setNavbarAppear(false);
    } else {
      setNavbarAppear(true);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_name");
    localStorage.removeItem("user_picture");
    // window.location.reload();
  };

  return (
    <div className="header-area header-transparent">
      <div className="main-header ">
        <div
          className={`header-bottom  header-sticky ${
            scrollY > 400
              ? "sticky-bar"
              : navbarBackground === true
              ? "sticky-bar"
              : ""
          }`}
          style={{ transition: "all 0.5s ease-in" }}
        >
          <div className="container-fluid">
            <div className="row align-items-center">
              <div className="col-xl-2 col-lg-2">
                <div className="logo">
                  <a href="/">
                    <Image
                      width={100}
                      height={117}
                      src="/whitelogo.png"
                      style={{ padding: "30px 0" }}
                      alt="grabtern_logo"
                    />
                  </a>
                </div>
              </div>
              <div className="col-xl-10 col-lg-10">
                <div className="menu-wrapper d-flex align-items-center justify-content-end">
                  <div
                    className={`main-menu d-none d-lg-block ${
                      navbarAppear === true ? "active" : ""
                    }`}
                  >
                    <nav>
                      <ul id="navigation">
                        <li className="active">
                          <a href="/">Home</a>
                        </li>
                        <li>
                          <a href="/mentors">Mentors</a>
                        </li>
                        <li>
                          <a href="/contact">Contact</a>
                        </li>

                        {isLoggedIn||isUserLoggedIn? (
                          <li>
                            <div className={styles.loginOption}>
                              <button 
                                onClick={handleLoginClick}
                                className={styles.userName}
                              >
<img 
  style={{
    width: "35px", 
    height: "auto", 
    borderRadius: "50%", 
  }} 
  src={localStorage.getItem("user_picture")} 
  alt="not found" 
/>

                              </button>
                              {isLoggedIn||isUserLoggedIn && (
                                <div className="login-optionslist">
                                  <button
                                    className="login-buttons"
                                    style={{marginTop:"20px"}}
                                    onClick={handleLoginClick}
                                  >
                                    <a href="/login">Dashboard</a>
                                  </button>
                                  <button
                                    className="login-buttons"
                                    onClick={logout}
                                  >
                                    <a href="#">Logout</a>
                                  </button>
                                </div>
                              )}
                            </div>
                          </li>
                        ) : (
                          <li>
                            <div className={styles.loginOption}>
                              <button
                                className={styles.loginbutton}
                                onClick={handleLoginClick}
                              >
                                Login
                              </button>
                              {loginOption && (
                                <div className="login-optionslist">
                                  <button
                                    className="login-buttons"
                                    onClick={handleLoginClick}
                                  >
                                    <a href="/login">User</a>
                                  </button>
                                  <button
                                    className="login-buttons"
                                    onClick={handleLoginClick}
                                  >
                                    <a href="/mentorLogin">Mentor</a>
                                  </button>
                                </div>
                              )}
                            </div>
                          </li>
                        )}
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
              <div
                className={`menuToggle ${
                  navbarAppear === true ? "active" : ""
                }`}
                onClick={() => menuToggle()}
              >
                <span></span>
                <span></span>
                <span></span>
              </div>
              <div className="col-12">
                <div className="mobile_menu d-block d-lg-none"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
