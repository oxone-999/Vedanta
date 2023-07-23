import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Styles from "../../Styles/tasks.module.css";
import { formatDistanceToNow } from "date-fns";

const Tasks = () => {
  const [data, setData] = React.useState([]);

  const handleDownload = (id) => {
    const filename = "Operator Allocation.csv";
    //find the object with the given id
    const object = data.find((object) => object._id === id);
    //convert this object to CSV
    convertObjectToCSVAndDownload([object], filename);
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
          // `http://localhost:5005/api/excavator`
          `https://vedanta-services.onrender.com/api/excavator`
        );
        setData(response.data.excavators);
        console.log(response.data.excavators);
      } catch (error) {
        console.log(error);
      }
    };
    fetchEmployees();
  }, []);

  return (
    <div className={Styles.main}>
      <ToastContainer />
      <h2>Operator Allocation</h2>
      <div className={Styles.employee}>
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
                      <h3>Allocated Vehicle : </h3>
                      <h3>{excavator.vehicle}</h3>
                    </div>
                    <div className={Styles.field}>
                      <h3>Contact : </h3>
                      <h3>{excavator.contact}</h3>
                    </div>
                    <div className={Styles.field}>
                      <h3>Shift NO. : </h3>
                      <h3>{excavator.shift}</h3>
                    </div>
                    <div className={Styles.field}>
                      <h3>Starting Time : </h3>
                      <h3>{excavator.startTime}</h3>
                    </div>
                  </div>
                  <div className={Styles.signed}>
                    <h3>Operator Signature</h3>
                    <div className={Styles.date}>
                      <div
                        className={Styles.download}
                        onClick={() => handleDownload(excavator._id)}
                      ></div>
                      <p>Dated : {excavator.Date.substr(0, 10)}</p>
                      <p>Created : {formatTime(excavator.Date)}</p>
                      <p className={Styles.sign}>not signed</p>
                    </div>
                  </div>
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
    const values = keys.map((key) => row[key]);
    const csvRow = values.join(",");
    csvRows.push(csvRow);
  });

  // Join all rows with a line break to form the final CSV string
  return csvRows.join("\n");
}

export default Tasks;
