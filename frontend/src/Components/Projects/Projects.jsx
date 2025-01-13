import { useState, useRef, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Styles from "../../Styles/projects.module.css";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function Projects() {
  const DrillsList = [{ id: "", name: "Production Drills" }];

  // for (let i = 3; i <= 14; i++) {
  //   const id = i < 10 ? `VE-${i}` : `KVE-${i}`;
  //   DrillsList.push({ id, name: id });
  // }

  const JumbosList = [
    { id: "", name: "Jumbos" },
    // { id: "RD-2", name: "RD-2" },
    // { id: "RD-3", name: "RD-3" },
    // { id: "RD-11", name: "RD-11" },
    // { id: "RD-12", name: "RD-12" },
    // { id: "RD-13", name: "RD-13" },
  ];

  const LHDList = [{ id: "", name: "LHD" }];

  // for (let i = 1; i <= 11; i++) {
  //   LHDList.push({ id: `VL-H${i}`, name: `VL-H${i}` });
  // }

  const LPDTList = [{ id: "", name: "LPDT" }];

  // for (let i = 1; i <= 55; i++) {
  //   LPDTList.push({ id: `VT-${i}`, name: `VT-${i}` });
  // }

  const CharmacList = [{ id: "", name: "Charmac" }];

  // for (let i = 1; i <= 55; i++) {
  //   CharmacList.push({ id: `VT-${i}`, name: `VT-${i}` });
  // }

  const ScalarList = [{ id: "", name: "Scalar" }];

  // for (let i = 1; i <= 55; i++) {
  //   ScalarList.push({ id: `VT-${i}`, name: `VT-${i}` });
  // }

  const form = useRef(null);
  const [shift, setShift] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [operatorName, setOperatorName] = useState(null);
  const [contact, setContact] = useState(null);
  const [message, setMessage] = useState("");
  const [formOpen, setForm] = useState(false);
  const [startTime, setStartTime] = useState("");
  const [vehicleList, setVehicleList] = useState(DrillsList);

  useEffect(() => {
    if (!selectedDate) return;
    const updatedTemplate = ` Date: ${formatTime(
      selectedDate
    )} \n Shift: ${shift} \n Vehicle: ${
      vehicleList[0].name
    } \n Start Time: ${startTime} \n ${
      vehicleList[0].name
    }: ${vehicle} \n Operator Name: ${operatorName} \n Contact: ${contact}`;
    setMessage(updatedTemplate);
  }, [
    selectedDate,
    shift,
    vehicle,
    startTime,
    operatorName,
    contact,
    vehicleList,
  ]);

  const formatTime = (date) => {
    if (!date) {
      return "";
    }
    const newDate = new Date(date);

    const options = {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    };

    const formattedDate = newDate.toLocaleString("en-IN", options);
    return formattedDate;
  };

  const handleOptions = (event) => {
    if (event === "Drills") {
      setVehicleList(DrillsList);
    } else if (event === "Jumbos") {
      setVehicleList(JumbosList);
    } else if (event === "LHD") {
      setVehicleList(LHDList);
    } else if (event === "LPDT") {
      setVehicleList(LPDTList);
    }else if (event === "Charmac") {
      setVehicleList(CharmacList);
    }else if (event === "Scalar") {
      setVehicleList(ScalarList);
    }
  };

  const sendEmail = (e) => {
    e.preventDefault();
    handleSubmit();

    emailjs
      .sendForm(
        "service_dg55h57",
        "template_pwdkrwb",
        form.current,
        "pUOFVenh-cRbYqL43"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    toast.success("Report Sent Successfully", { autoClose: 1000 });
    setTimeout(() => {
      window.location = "/";
    }, 2000);
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

  const handleSubmit = async () => {
    try {
      const data = {
        name: operatorName,
        contact: contact,
        vehicle: vehicle,
        shift: shift,
        date: selectedDate,
        startTime: startTime,
      };
      console.log(data);
      const response = await axios.post(
        // `http://localhost:5005/api/excavator`,
        `https://vedanta-services.onrender.com/api/excavator`,
        data
      );
      console.log(response);
      toast.success("Excavator Allocated Successfully", { autoClose: 1000 });
    } catch (error) {
      console.log(error);
      toast.error("Error Allocating Excavator", { autoClose: 1000 });
    }
  };

  return (
    <>
      <ToastContainer />
      <div className={Styles.container}>
        <div className={Styles.heading}>MACHINE ALLOCATION</div>
        <div className={Styles.List}>
          <div className={Styles.options}>
            <h3 onClick={() => handleOptions("Drills")}>Production Drills</h3>
            <h3 onClick={() => handleOptions("Jumbos")}>Development Drills/Jumbos</h3>
            <h3 onClick={() => handleOptions("LHD")}>LHD</h3>
            <h3 onClick={() => handleOptions("LPDT")}>LPDT</h3>
            <h3 onClick={() => handleOptions("Charmac")}>Charmac</h3>
            <h3 onClick={() => handleOptions("Scalar")}>Scalar</h3>
          </div>
        </div>
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
              <option value="1">A</option>
              <option value="2">B</option>
              <option value="3">C</option>
            </select>
          </div>
          <div className={Styles.content}>
            <p> {vehicleList[0].name} : </p>
            <select
              value={vehicle}
              onChange={handleVehicle}
              className={Styles.input}
              style={{ width: "7rem" }}
              required
            >
              <option value="">{vehicleList[0].name}</option>
              {vehicleList.slice(1).map((vehicle) => (
                <option key={vehicle._id} value={vehicle.name}>
                  {vehicle.name}
                </option>
              ))}
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
                  style={{ width: "10rem", marginTop: "1rem" }}
                  placeholder="operator name"
                  value={operatorName}
                  type="text"
                  name="user_name"
                  onChange={(e) => setOperatorName(e.target.value)}
                  required
                />
                <input
                  className={Styles.input}
                  style={{ width: "10rem", marginTop: "1rem" }}
                  placeholder="email address"
                  value={contact}
                  type="email"
                  name="user_email"
                  onChange={(e) => setContact(e.target.value)}
                  required
                />
                <textarea
                  className={Styles.input}
                  style={{
                    width: "120rem",
                    height: "55rem",
                    marginTop: "1rem",
                  }}
                  placeholder="message"
                  type="text"
                  name="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
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
          <div className={Styles.content}></div>
        </div>
      </div>
    </>
  );
}

export default Projects;
