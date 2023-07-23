import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Styles from "../../Styles/tasks.module.css";
import { formatDistanceToNow } from "date-fns";

const IdleHours = () => {
  const [data, setData] = React.useState([]);

  const handleDownload = () => {
    const filename = "Idle Hours Allocation.csv";
    convertObjectToCSVAndDownload(data, filename);
  };

  const formatTime = (date) => {
    const newDate = new Date(date);
    const formattedTimeDifference = formatDistanceToNow(newDate, {
      addSuffix: true,
    });
    return formattedTimeDifference;
  };

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(
        //   `http://localhost:5005/api/idlehours`
          `https://vedanta-services.onrender.com/api/idlehours`
        );
        setData(response.data.idleHours);
        console.log("data", response.data.excavators);
      } catch (error) {
        console.log(error);
      }
    };
    fetchEmployees();
  }, []);

  return (
    <div className={Styles.main}>
      <ToastContainer />
      <h2>Idle Hours Allocation</h2>
      <div className={Styles.employee}>
        <div className={Styles.download} onClick={handleDownload}></div>
        <div className={Styles.employeeSpace}>
          {data !== null &&
            data !== undefined &&
            data &&
            data.map((excavator) => (
              <>
                <div className={Styles.employeeCard}>
                  <div className={Styles.image}>
                    <img src="/authBg.jpg" alt="profile" />
                  </div>
                  <div className={Styles.info}>
                    <div className={Styles.field}>
                      <h3> Name : </h3>
                      <h3>{excavator.name}</h3>
                    </div>
                    <div className={Styles.field}>
                      <h3>Reason : </h3>
                      <h3>{excavator.reason}</h3>
                    </div>
                    <div className={Styles.field}>
                      <h3>Time Difference : </h3>
                      <h3>{excavator.time}</h3>
                    </div>
                    <div className={Styles.field}>
                      <h3>Shift No. : </h3>
                      <h3>{excavator.shift}</h3>
                    </div>
                    <div className={Styles.field}>
                      <h3>Dated : </h3>
                      <h3>{excavator.Date}</h3>
                    </div>
                  </div>
                  <div className={Styles.signed}></div>
                </div>
              </>
            ))}
        </div>
      </div>
    </div>
  );
};

function convertObjectToCSVAndDownload(data, filename) {
  const csvData = convertObjectToCSV(data);
  const blob = new Blob([csvData], { type: "text/csv" });

  // Create a download link
  const downloadLink = document.createElement("a");
  downloadLink.href = URL.createObjectURL(blob);
  downloadLink.download = filename;

  // Trigger the download by simulating a click event on the link
  downloadLink.click();
}

function convertObjectToCSV(data) {
  const keys = Object.keys(data[0]);
  const csvRows = [];

  // Create the header row
  const headerRow = keys.join(",");
  csvRows.push(headerRow);

  // Create the data rows
  data.forEach((row) => {
    const values = keys.map((key) => {
      // Check if the value needs to be quoted (e.g., if it contains commas or quotes)
      const needsQuoting =
        typeof row[key] === "string" &&
        (row[key].includes(",") || row[key].includes('"'));
      return needsQuoting ? `"${row[key]}"` : row[key];
    });
    const csvRow = values.join(",");
    csvRows.push(csvRow);
  });

  // Join all rows with a line break to form the final CSV string
  return csvRows.join("\n");
}

export default IdleHours;
