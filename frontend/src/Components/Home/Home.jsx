import React, { useState } from "react";
import Styles from "../../Styles/Home.module.css";
import Button from "@mui/material/Button";
import { isExpired, decodeToken } from "react-jwt";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";

function Home() {
  const token = localStorage.getItem("token");
  const admin = localStorage.getItem("admin");
  const decodedToken = decodeToken(token);
  const [currUser, setUser] = useState({});
  const [disabled, setDisabled] = useState(false);

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    window.location = "/login";
  };

  useEffect(() => {
    if (token) {
      const user = decodedToken;
      setUser(user);
      if (!user) {
        localStorage.removeItem("token");
        localStorage.removeItem("admin");
        window.location = "/login";
      }
    } else {
      window.location = "/projects";
    }

    if (admin === "true") {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, []);

  return (
    <div className={Styles.home}>
      <div className={Styles.User}>
        <div className={Styles.UserInfo}>
          <h3>{currUser.username}</h3>
        </div>
        <div className={Styles.UserDetails}></div>
        <div className={Styles.log}>
          <Button variant="contained" color="error" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>
      <div className={Styles.main}>
        <div className={Styles.container}>
          <h1 className={Styles.content}>Home</h1>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Home;
