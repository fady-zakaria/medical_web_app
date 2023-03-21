import React, { useState, useEffect } from "react";
import HighlyRated from "../components/Highly_Rated_DR/HighlyRated";
import { useParams } from "react-router-dom";
import { DoctorsSpecialization } from "../data";
import Onedoctor from "../components/Highly_Rated_DR/Onedoctor";
import axios from "axios";
import { Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Spinner from "react-bootstrap/Spinner";

function Doctorscards() {
  const [doctors, setdoctors] = useState([]);
  const [loading, setloading] = useState(false);
  const params = useParams();
  const Deptname = params.Deptname; ///TO GET DOCTORS IN THIS DEPARTMENT
  console.log("Doctors Dep page", Deptname);
  const arr = Deptname.split(" ");
  for (var i = 0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
  }

  //Join all the elements of the array back into a string
  //using a blankspace as a separator
  const str2 = arr.join(" ");

  const Get_Doctors_Department = () => {
    axios
      .get(`https://future-medical.herokuapp.com/user/department/${str2}`)
      .then((res) => {
        console.log(res.data);
        if (res.data !== "no doctors found in this department") {
          setdoctors(res.data);
        }
        setloading(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    Get_Doctors_Department();
  }, [Deptname]);

  return (
    <>
      <div>
        <section className="section-container">
          <div className="doctors-container">
            {loading ? (
              doctors.length === 0 ? (
                <>
                  <Alert
                    key="primary"
                    variant="primary"
                    style={{ margin: "1rem 2rem" }}
                  >
                    There are no doctors in this Department yet.
                  </Alert>
                </>
              ) : (
                doctors.map((doctor) => (
                  <Onedoctor doctor={doctor} key={doctor.id} />
                ))
              )
            ) : (
              <div className="loading_position">
                <Spinner animation="border" variant="primary" />
              </div>
            )}

            {/* {doctors.length !== 0 &&
              doctors.map((doctor) => (
                <Onedoctor doctor={doctor} key={doctor.id} />
              ))} */}
          </div>
        </section>
      </div>
    </>
  );
}

export default Doctorscards;
