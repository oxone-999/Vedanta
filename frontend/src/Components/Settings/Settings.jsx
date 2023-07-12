import React from "react";
import Styles from "../../Styles/Settings.module.css";

function Settings({ currUser }) {
  return (
    <>
      <div>
        <h1 className={Styles.content}>
          Hi! {currUser.username}, Welcome to our website
        </h1>
      </div>
    </>
  );
}

export default Settings;
