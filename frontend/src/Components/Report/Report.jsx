import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Styles from "../../Styles/Report.module.css";

function Report() {
  const [shift, setShift] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [idleHours, setIdleHours] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);

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

  return (
    <>
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
              className={Styles.input}
            />
          </div>
          <div className={Styles.content}>
            <p>Shift No. : {shift}</p>
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
            <p>Vehicle No. : {vehicle}</p>
            <select
              value={vehicle}
              onChange={handleVehicle}
              className={Styles.input}
            >
              <option value="">Select an option</option>
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
          </div>
        </div>
        <div className={Styles.section}>
          <div className={Styles.content}>
            <div>
              <p>Starting time : </p>
            </div>
            <div>
              <input type="time" className={Styles.input} />
            </div>
          </div>
          <div className={Styles.content}>
            <div>
              <p>End time : </p>
            </div>
            <div>
              <input type="time" className={Styles.input} />
            </div>
          </div>
        </div>
        <div className={Styles.section}>
          <div className={Styles.content}>
            <p>Idle Hours : {idleHours}</p>
            <select
              value={idleHours}
              onChange={handleIdleHours}
              className={Styles.input}
            >
              <option value="">Select an option</option>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
}

export default Report;
