import { useState } from "react";
import Styles from "../../Styles/Login.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const [error, setError] = useState(null);

  const [employeeId, setEmployeeId] = useState(null);
  const [password, setPassword] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        // "http://localhost:5005/api/auth/login",
        "https://vedanta-services.onrender.com/api/auth/login",
        {
          method: "POST",
          body: JSON.stringify({
            employeeId: employeeId,
            password: password,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const json = await response.json();

      if (json.status === "ok") {
        localStorage.setItem("token", json.data);
        toast.success("Login Successful",{
          autoClose: 1000,
        });

        if (json.admin) {
          localStorage.setItem("admin", json.admin);
          console.log(json.admin);
        }
        setTimeout(() => {
          window.location = "/";
        }, 2000);
      } else {
        setError(json.error);
        alert("Login Failed");
      }
      console.log("Success:", JSON.stringify(json));
    } catch (error) {
      console.error("Error:", error);
      if (error) {
        setError(error.message);
      }
    }
  };

  return (
    <div className={Styles.login_container}>
      <ToastContainer />
      <div className={Styles.ccontainer}>
        <div className={Styles.left}>LOGIN</div>
        <div className={Styles.right}>
          <div className={Styles.form_container}>
            <img src="./authBg.jpg" width={600} height={400} alt="Image Alt" />
            <form onSubmit={handleSubmit}>
              <div className={Styles.container}>
                <input
                  type="username"
                  name="employeeId"
                  className={Styles.input}
                  placeholder="employeeId"
                  onChange={(e) => setEmployeeId(e.target.value)}
                  autoFocus
                  required
                />
              </div>
              <div className={Styles.container}>
                <input
                  type="password"
                  name="password"
                  className={Styles.input}
                  placeholder="password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && <p>{error}</p>}
              <button className={Styles.loginbtn} type="submit">
                Login
              </button>
            </form>
            <p>
              Don't have an account? <a href="/signup">Register here</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
