import React from "react";
import "./custom.css";
import { Link, useNavigate } from "react-router-dom";
function Onedoctor(props) {
  let navigate = useNavigate();
  const navigation = (docid,name) => {
    navigate(`/doctor/${name}`, { state: { Doctor_id: docid } }); //Send doc email despite doc id
  };

  const doctor = props.doctor;
  console.log(doctor);
  return (
    <div>
      <div className="doctor-item">
        <div className="img-container">
          {/*<Link to={`/clinicdoctor/${doctor._id}`}>
                  <img src={doctor.image} alt={doctor.username} />
  </Link>*/}
          <img
            src={doctor.profilePic}
            alt={doctor.username}
            style={{ cursor: "pointer" }}
            onClick={() => {
              navigation(doctor.email,doctor.username);
            }}
          />
        </div>
        <div className="bottom-data">
          {/*<Link to={`/clinicdoctor/${doctor._id}`}>
                  <p className="doctor-name">Dr. {doctor.username}</p>
</Link>*/}
          <p
            className="doctor-name"
            style={{ cursor: "pointer" }}
            onClick={() => {
              navigation(doctor.email,doctor.username);
            }}
          >
            Dr. {doctor.username}{" "}
          </p>

          <p className="doctor-spec">{doctor.arabic_specialization}</p>
          {/* <span className="rate-star"> */}
          <p className="doctor-spec">{doctor.entity_id.arabic_name}</p>
          {[...Array(doctor.rate)].map((star) => {
            return (
              <span className="rate-star">
                <i class="bi bi-star-fill"></i>
              </span>
            );
          })}
          {[...Array(5 - doctor.rate)].map((star) => {
            return (
              <span className="rate-star">
                <i class="bi bi-star"></i>
              </span>
            );
          })}
          {/* </span> */}
        </div>
      </div>
    </div>
  );
}

export default Onedoctor;
