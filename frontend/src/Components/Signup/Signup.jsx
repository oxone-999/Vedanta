import React, { useState } from "react";
import Styles from "../../Styles/Signup.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Signup() {
  const [fullName, setFullName] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");
  const [avatarURL, setAvatarURL] = useState("");
  const [error, setError] = React.useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  const handleAvatar = async (event) => {
    const file = event.target.files[0];
    const base64 = await convertTobase64(file);
    setAvatarURL(base64);
    const preview = URL.createObjectURL(file);
    setPreviewUrl(preview);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:5005/api/auth/signup",
        // "https://vedanta-services.onrender.com/api/auth/signup",
        {
          method: "POST",
          body: JSON.stringify({
            name: fullName,
            employeeId: employeeId,
            password: password,
            avatar: avatarURL,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const json = await response.json();

      if (json.status === "ok") {
        toast.success("Signup Successful", { autoClose: 1000 });
        setTimeout(() => {
          window.location = "/login";
        }, 2000);
      } else {
        toast.error("Signup Failed");
        setError(json.error);
      }

      console.log("Success:", JSON.stringify(json));
    } catch (error) {
      if (error) {
        setError(error.message);
      }
    }
  };

  return (
    <div className={Styles.login_container}>
      <ToastContainer />
      <div className={Styles.ccontainer}>
        <div className={Styles.right}>
          <div className={Styles.form_container}>
            <input
              className={Styles.avatarInput}
              type="file"
              name="avatar"
              accept="image/*"
              onChange={handleAvatar}
            />
            <img src={previewUrl} alt="register" />
            <button className={Styles.avatar}>Edit</button>
            <form onSubmit={handleSubmit}>
              <div className={Styles.container}>
                <input
                  type="text"
                  name="text"
                  className={Styles.input}
                  placeholder="username"
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
              <div className={Styles.container}>
                <input
                  type="text"
                  name="epmloyeeId"
                  className={Styles.input}
                  placeholder="employeeId"
                  onChange={(e) => setEmployeeId(e.target.value)}
                  required
                />
              </div>
              <div className={Styles.container}>
                <input
                  type="password"
                  name="text"
                  className={Styles.input}
                  placeholder="password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && <h3>{error}</h3>}
              <button className={Styles.loginbtn} type="submit">
                Register
              </button>
            </form>
            <p>
              Already have an account? <a href="/login">Login here</a>.
            </p>
          </div>
        </div>
        <div className={Styles.left}>Register</div>
      </div>
    </div>
  );
}

function convertTobase64(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(fileReader.result);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}
