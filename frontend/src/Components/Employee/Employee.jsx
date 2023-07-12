import React, { useEffect } from "react";

function Employee() {

    useEffect(() => {
        const response = fetch(
            "http://localhost:5005/api/auth/login",
            // "https://vedanta-services.onrender.com/api/auth/login",
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        const json = response.json();
        console.log(json);
    }, []);


  return (
    <>

    </>
  );
}

export default Employee;
