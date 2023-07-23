import React, { useState, useRef, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Styles from "../../Styles/Report.module.css";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Report() {
  const form = useRef(null);
  const [shift, setShift] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [idleHours, setIdleHours] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [operatorName, setOperatorName] = useState(null);
  const [contact, setContact] = useState(null);
  const [message, setMessage] = useState("");
  const [formOpen, setForm] = useState(false);
  const [startTime, setStartTime] = useState("");

  useEffect(() => {
    const updatedTemplate = ` Date: ${selectedDate} \n Shift: ${shift} \n Vehicle: ${vehicle} \n Idle Hours: ${idleHours} \n Start Time: ${startTime} \n Excavator: ${vehicle} \n Operator Name: ${operatorName} \n Contact: ${contact}`;
    setMessage(updatedTemplate);
  }, [
    selectedDate,
    shift,
    vehicle,
    idleHours,
    startTime,
    operatorName,
    contact,
  ]);

  const sendEmail = (e) => {
    e.preventDefault();

    //   emailjs
    //     .sendForm(
    //       "service_dg55h57",
    //       "template_pwdkrwb",
    //       form.current,
    //       "pUOFVenh-cRbYqL43"
    //     )
    //     .then(
    //       (result) => {
    //         console.log(result.text);
    //       },
    //       (error) => {
    //         console.log(error.text);
    //       }
    //     );
    //   toast.success("Report Sent Successfully", { autoClose: 1000 });
    //   setTimeout(() => {
    //     window.location = "/";
    //   }, 2000);
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

  return (
    <>
      <ToastContainer />
      <div className={Styles.container}>
        <div className={Styles.heading}>IDLE SITUATION</div>
        <div className={Styles.section}>
          <div className={Styles.content}>
            <p>Date</p>
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              dateFormat="dd/MM/yyyy"
              placeholderText="Select a date"
              className={Styles.dateInput}
            />
            <button onClick={handleFillDate}>Current</button>
          </div>
          <div className={Styles.content}>
            <p>Shift No. : </p>
            <select
              value={shift}
              onChange={handleShift}
              className={Styles.input}
            >
              <option value="">Select an option</option>
              <option value="option1">1</option>
              <option value="option2">2</option>
              <option value="option3">3</option>
            </select>
          </div>
          <div className={Styles.content}>
            <p>Vehicle : </p>
            <select
              value={vehicle}
              onChange={handleVehicle}
              className={Styles.input}
              style={{ width: "7rem" }}
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

            <button
              type="button"
              onClick={() => {
                setForm(true);
              }}
            >
              Send
            </button>

            {formOpen && (
              <form ref={form} onSubmit={sendEmail} className={Styles.form}>
                <input
                  className={Styles.input}
                  style={{ width: "6rem", marginTop: "1rem" }}
                  placeholder="operator name"
                  value={operatorName}
                  type="text"
                  name="user_name"
                  onChange={(e) => setOperatorName(e.target.value)}
                />
                <input
                  className={Styles.input}
                  style={{ width: "5rem", marginTop: "1rem" }}
                  placeholder="contact"
                  value={contact}
                  type="email"
                  name="user_email"
                  onChange={(e) => setContact(e.target.value)}
                />
                <textarea
                  className={Styles.input}
                  style={{ width: "80rem", height: "55rem", marginTop: "1rem" }}
                  placeholder="message"
                  type="text"
                  name="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <button
                    type="button"
                    onClick={() => {
                      setForm(false);
                    }}
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    style={{ backgroundColor: "#90EE90", color: "#414141" }}
                  >
                    Submit
                  </button>
                </div>
              </form>
            )}
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
            >
              <option value="">Select an option</option>
              <option value="NRT pick up/drop">NRT pick up/drop</option>
              <option value="Relieving">Relieving</option>
              <option value="Bad weather/Heavy Rainfall">
                Bad weather/Heavy Rainfall
              </option>
              <option value="Safety Related Pause">Safety Related Pause</option>
              <option value="No Internal Transport">
                No Internal Transport
              </option>
              <option value="Late Duty Bus">Late Duty Bus</option>
              <option value="Public/Local Authority Problem">
                Public/Local Authority Problem
              </option>
              <option value="Blasting">Blasting</option>
              <option value="Union Related Issues">Union Related Issues</option>
              <option value="Canteen Issue">Canteen Issue</option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
}

export default Report;
