import { useState } from "react";
import Styles from "../../Styles/Home.module.css";
import { isExpired, decodeToken } from "react-jwt";
import { useEffect } from "react";
import Reports from "../Report/Report";
import Settings from "../Settings/Settings";
import Employees from "../Employees/Employees";
import Projects from "../Projects/Projects";
import Tasks from "../Tasks/Tasks";
import IdleHours from "../IdleHours/IdleHours";

function Home() {
  const token = localStorage.getItem("token");
  const admin = localStorage.getItem("admin");
  const decodedToken = decodeToken(token);
  const [currUser, setUser] = useState({});
  const [disabled, setDisabled] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState("projects");

  const handleComponentChange = (componentName) => {
    setSelectedComponent(componentName);
  };

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
      window.location = "/";
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
          <img
            className={Styles.profile_img}
            src={currUser.avatar}
            alt="profile"
          />
          <h3 className={Styles.employeeId}>{currUser.employeeId}</h3>
          <h3 className={Styles.username}>{currUser.username}</h3>
        </div>
        <div className={Styles.UserDetails}></div>
        <div className={Styles.log}>
          <button className={Styles.Btn}>
            <div className={Styles.sign}>
              <svg viewBox="0 0 512 512">
                <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
              </svg>
            </div>
            <div className={Styles.text} onClick={handleLogout}>
              Logout
            </div>
          </button>
        </div>
      </div>
      <div className={Styles.main}>
        <div className={Styles.navbar}>
          <div className={Styles.navbar__left}>
            <img className={Styles.logo} src="Vedanta.png" alt="logo" />
          </div>
          <div className={Styles.navbar__right}>
            <div className={Styles.radio_inputs}>
              <label className={Styles.radio}>
                <input
                  type="radio"
                  name="radio"
                  checked={selectedComponent === "projects"}
                  onChange={() => handleComponentChange("projects")}
                />
                <span className={Styles.name}>Projects</span>
              </label>
              <label className={Styles.radio}>
                <input
                  type="radio"
                  name="radio"
                  checked={selectedComponent === "employees"}
                  onChange={() => handleComponentChange("employees")}
                />
                <span className={Styles.name}>Employees</span>
              </label>
              <label className={Styles.radio}>
                <input
                  type="radio"
                  name="radio"
                  checked={selectedComponent === "tasks"}
                  onChange={() => handleComponentChange("tasks")}
                />
                <span className={Styles.name}>Tasks</span>
              </label>
              <label className={Styles.radio}>
                <input
                  type="radio"
                  name="radio"
                  checked={selectedComponent === "idleHours"}
                  onChange={() => handleComponentChange("idleHours")}
                />
                <span className={Styles.name}>IdleHours</span>
              </label>
              <label className={Styles.radio}>
                <input
                  type="radio"
                  name="radio"
                  checked={selectedComponent === "reports"}
                  onChange={() => handleComponentChange("reports")}
                />
                <span className={Styles.name}>Reports</span>
              </label>
              <label className={Styles.radio}>
                <input
                  type="radio"
                  name="radio"
                  checked={selectedComponent === "settings"}
                  onChange={() => handleComponentChange("settings")}
                />
                <span className={Styles.name}>Settings</span>
              </label>
            </div>
          </div>
        </div>
        <div className={Styles.container}>
          <div className={Styles.componentArea}>
            {selectedComponent === "projects" && <Projects />}
            {selectedComponent === "employees" && <Employees />}
            {selectedComponent === "tasks" && <Tasks />}
            {selectedComponent === "idleHours" && <IdleHours />}
            {selectedComponent === "reports" && <Reports />}
            {selectedComponent === "settings" && (
              <Settings currUser={currUser} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
