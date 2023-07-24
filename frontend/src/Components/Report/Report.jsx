import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Styles from "../../Styles/Report.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function Report() {
  const [shift, setShift] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [idleHours, setIdleHours] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [endTime, setEndTime] = useState("");
  const [startTime, setStartTime] = useState("");
  const [timeDiff, setTimeDiff] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      name: vehicle,
      reason: idleHours,
      time: timeDiff,
      shift: shift,
      date: selectedDate,
    };

    console.log(data);

    try {
      const response = await axios.post(
        // "http://localhost:5005/api/idlehours",
        "https://vedanta-services.onrender.com/api/idlehours",
        data
      );
      toast.success("Idle Situation Submitted Successfully");
      const json = await response.json();
      console.log("Success:", JSON.stringify(json));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleShift = (event) => {
    setShift(event.target.value);
  };

  const handleVehicle = (event) => {
    setVehicle(event.target.value);
  };

  const handleIdleHours = (event) => {
    setIdleHours(event.target.value);
  };

  const handleFillDate = () => {
    const currentDate = new Date();
    setSelectedDate(currentDate);
  };

  const handleFillStartTime = () => {
    const today = new Date();
    const currentTime = today.toLocaleTimeString();
    setStartTime(currentTime);
  };

  const handleFillEndTime = () => {
    const today = new Date();
    const currentTime = today.toLocaleTimeString();
    console.log(currentTime);
    setEndTime(currentTime);
  };

  const calculateTimeDifference = (startTime, endTime) => {
    if (!startTime || !endTime) return;

    const startTimeObj = new Date(`01/01/2000 ${startTime}`);
    const endTimeObj = new Date(`01/01/2000 ${endTime}`);

    const timeDifference = endTimeObj - startTimeObj;
    const hours = Math.floor(timeDifference / 3600000); // 1 hour = 3600000 milliseconds
    const minutes = Math.floor((timeDifference % 3600000) / 60000); // 1 minute = 60000 milliseconds

    setTimeDiff(`${hours} hours ${minutes} minutes`);
  };

  useEffect(() => {
    calculateTimeDifference(startTime, endTime);
  }, [startTime, endTime]);

  return (
    <>
      <ToastContainer />
      <div className={Styles.container}>
        <div className={Styles.heading}>IDLE SITUATION</div>
        <form style={{ margin: "0", padding: "0" }} onSubmit={handleSubmit}>
          <div className={Styles.section}>
            <div className={Styles.content}>
              <p>Date</p>
              <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                dateFormat="dd/MM/yyyy"
                placeholderText="Select a date"
                className={Styles.dateInput}
                required
              />
              <button onClick={handleFillDate}>Current</button>
            </div>
            <div className={Styles.content}>
              <p>Shift No. : </p>
              <select
                value={shift}
                onChange={handleShift}
                className={Styles.input}
                required
              >
                <option value="">Select an option</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </div>
            <div className={Styles.content}>
              <p>Vehicle : </p>
              <select
                value={vehicle}
                onChange={handleVehicle}
                className={Styles.input}
                style={{ width: "7rem" }}
                required
              >
                <option value="">Excavator</option>
                <option value="Ve-3">Ve-3</option>
                <option value="Ve-4">Ve-4</option>
                <option value="Ve-5">Ve-5</option>
                <option value="Ve-6">Ve-6</option>
                <option value="Ve-7">Ve-7</option>
                <option value="KVE-9">KVE-9</option>
                <option value="KVE-10">KVE-10</option>
                <option value="KVE-11">KVE-11</option>
                <option value="KVE-12">KVE-12</option>
                <option value="KVE-13">KVE-13</option>
                <option value="KVE-14">KVE-14</option>
              </select>

              <button type="submit">Submit</button>
            </div>
          </div>
          <div className={Styles.section}>
            <div className={Styles.content}>
              <div>
                <p>Starting time : </p>
              </div>
              <div className={Styles.time}>
                <input
                  type="text"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className={Styles.input}
                  required
                />
                <button onClick={handleFillStartTime}>Current</button>
              </div>
            </div>
            <div className={Styles.content}>
              <div>
                <p>Ending time : </p>
              </div>
              <div className={Styles.time}>
                <input
                  type="text"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className={Styles.input}
                  required
                />
                <button onClick={handleFillEndTime}>Current</button>
              </div>
            </div>
          </div>
          <div className={Styles.section}>
            <div className={Styles.content}>
              <p>Idle Hours : </p>
              <select
                value={idleHours}
                onChange={handleIdleHours}
                className={Styles.input}
                required
              >
                <option value="">Select an option</option>
                <option value="NRT pick up/drop">NRT pick up/drop</option>
                <option value="Relieving">Relieving</option>
                <option value="Bad weather/Heavy Rainfall">
                  Bad weather/Heavy Rainfall
                </option>
                <option value="Safety Related Pause">
                  Safety Related Pause
                </option>
                <option value="No Internal Transport">
                  No Internal Transport
                </option>
                <option value="Late Duty Bus">Late Duty Bus</option>
                <option value="Public/Local Authority Problem">
                  Public/Local Authority Problem
                </option>
                <option value="Blasting">Blasting</option>
                <option value="Union Related Issues">
                  Union Related Issues
                </option>
                <option value="Canteen Issue">Canteen Issue</option>
              </select>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Report;
