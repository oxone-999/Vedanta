
import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Styles from "../../Styles/Employee.module.css";

function Employees() {
  const [data, setData] = React.useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(
          // `http://localhost:5005/api/excavator`
          `https://vedanta-services.onrender.com/api/employees`
        );
        setData(response.data.data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchEmployees();
  }, []);

  return (
    <div className={Styles.main}>
      <ToastContainer />
      <h2>Vedanta Employees</h2>
      <div className={Styles.employee}>
        <div className={Styles.employeeSpace}>
          {data !== null &&
            data !== undefined &&
            data &&
            data.map((employee) => (
              <>
                <div className={Styles.employeeCard}>
                  <div className={Styles.image}>
                    <img src={employee.avatar} alt="profile" />
                  </div>
                  <div className={Styles.info}>
                    <div>
                      <h3>Employee ID : {employee.employeeId}</h3>
                    </div>
                    <div>
                      <h3>Name : {employee.username}</h3>
                    </div>
                  </div>
                </div>
              </>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Employees;
