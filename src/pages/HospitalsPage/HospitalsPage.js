import React, { useEffect, useState } from "react";
import "./hospitals.css";
import { hospitals } from "../../data";
import { Link, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import axios from "axios";
import PharmacyOrder from "../../components/PharmacyOrder/PharmacyOrder";
import Spinner from "react-bootstrap/Spinner";
//import Login from "../Login & Sign Up/login_f"
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const HospitalsPage = () => {
  const token = JSON.parse(useSelector((state) => state.auth));
  console.log(token);
  let clicked_pharmacy = {};
  const [pharmacy_details, setpharmacy_details] = useState({
    pharmacyname: "",
    pharmacyaddress: "",
    pharmacyphone: "",
    pharmacyadmin: "",
  });
  const [modalShow, setModalShow] = useState(false); //for pharmacy card
  const [loading, setloading] = useState(false);
  const [entity_loading,set_entity_loading] = useState(true);
  //const [modalShowload, setModalShowload] = useState(false); //for pharmacy card
  const navigate = useNavigate();
  const login = () => {
    navigate("/login");
  };
  const handle_order = (pharmacy_details) => {
    //check of logined
    if (token.token) {
      console.log(pharmacy_details);
      setModalShow(true);
      clicked_pharmacy.pharmacyname = pharmacy_details.name;
      clicked_pharmacy.pharmacyaddress = pharmacy_details.address[0];
      clicked_pharmacy.pharmacyphone = pharmacy_details.telephone[0];
      clicked_pharmacy.pharmacyadmin = pharmacy_details.admin.email;
      setpharmacy_details(clicked_pharmacy);
    } else {
      {
        login();
      }
      //alert("you must be logined first to make order")
    }
  };

  let params = useParams();
  const entity = params.entity; //hospitals or clinics or pharmacies
  const [hospitalsdata, sethospitalsdata] = useState([]);
  const Get_Hospitals_Api = () => {
    axios
      .get("https://future-medical.herokuapp.com/hospitals")
      .then((res) => {
        console.log(res.data);
        sethospitalsdata(res.data);
        set_entity_loading(false)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const Get_Clinics_Api = () => {
    axios
      .get("https://future-medical.herokuapp.com/clinics")
      .then((res) => {
        console.log(res.data);
        sethospitalsdata(res.data);
        set_entity_loading(false)
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const Get_Pharmacies_Api = () => {
    axios
      .get("https://future-medical.herokuapp.com/pharmacies")
      .then((res) => {
        console.log(res.data);
        sethospitalsdata(res.data);
        set_entity_loading(false)
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    sethospitalsdata([]);
    if (entity === "hospitals") {
      Get_Hospitals_Api();
    } else if (entity === "clinics") {
      Get_Clinics_Api();
    } else if (entity === "pharmacies") {
      Get_Pharmacies_Api();
    }
    set_entity_loading(true)
  }, [entity]);
  return (
    <div>
      <section className="section-container">
        <div className="hosp-title-info">
          {entity === "hospitals" && <h1 className="hosp-title">HOSPITALS</h1>}
          {entity === "clinics" && <h1 className="hosp-title">CLINICS</h1>}
          {entity === "pharmacies" && (
            <h1 className="hosp-title">Pharmacies</h1>
          )}
          <hr />
        </div>
        {!entity_loading ?(
        <div className="hosp-container">
          {hospitalsdata.map((hospital) => (
            <div className="hosp-item" key={hospital.id}>
              {entity !== "pharmacies" ? (
                <Link to={`/DoctorsEntity/${hospital.name}`}>
                  <div className="hosp-image-container">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-hospital"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8.5 5.034v1.1l.953-.55.5.867L9 7l.953.55-.5.866-.953-.55v1.1h-1v-1.1l-.953.55-.5-.866L7 7l-.953-.55.5-.866.953.55v-1.1h1ZM13.25 9a.25.25 0 0 0-.25.25v.5c0 .138.112.25.25.25h.5a.25.25 0 0 0 .25-.25v-.5a.25.25 0 0 0-.25-.25h-.5ZM13 11.25a.25.25 0 0 1 .25-.25h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5a.25.25 0 0 1-.25-.25v-.5Zm.25 1.75a.25.25 0 0 0-.25.25v.5c0 .138.112.25.25.25h.5a.25.25 0 0 0 .25-.25v-.5a.25.25 0 0 0-.25-.25h-.5Zm-11-4a.25.25 0 0 0-.25.25v.5c0 .138.112.25.25.25h.5A.25.25 0 0 0 3 9.75v-.5A.25.25 0 0 0 2.75 9h-.5Zm0 2a.25.25 0 0 0-.25.25v.5c0 .138.112.25.25.25h.5a.25.25 0 0 0 .25-.25v-.5a.25.25 0 0 0-.25-.25h-.5ZM2 13.25a.25.25 0 0 1 .25-.25h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5a.25.25 0 0 1-.25-.25v-.5Z" />
                      <path d="M5 1a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1a1 1 0 0 1 1 1v4h3a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h3V3a1 1 0 0 1 1-1V1Zm2 14h2v-3H7v3Zm3 0h1V3H5v12h1v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3Zm0-14H6v1h4V1Zm2 7v7h3V8h-3Zm-8 7V8H1v7h3Z" />
                    </svg>
                  </div>
                </Link>
              ) : (
                <div
                  className="hosp-image-container"
                  style={{ cursor: "default" }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-hospital"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8.5 5.034v1.1l.953-.55.5.867L9 7l.953.55-.5.866-.953-.55v1.1h-1v-1.1l-.953.55-.5-.866L7 7l-.953-.55.5-.866.953.55v-1.1h1ZM13.25 9a.25.25 0 0 0-.25.25v.5c0 .138.112.25.25.25h.5a.25.25 0 0 0 .25-.25v-.5a.25.25 0 0 0-.25-.25h-.5ZM13 11.25a.25.25 0 0 1 .25-.25h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5a.25.25 0 0 1-.25-.25v-.5Zm.25 1.75a.25.25 0 0 0-.25.25v.5c0 .138.112.25.25.25h.5a.25.25 0 0 0 .25-.25v-.5a.25.25 0 0 0-.25-.25h-.5Zm-11-4a.25.25 0 0 0-.25.25v.5c0 .138.112.25.25.25h.5A.25.25 0 0 0 3 9.75v-.5A.25.25 0 0 0 2.75 9h-.5Zm0 2a.25.25 0 0 0-.25.25v.5c0 .138.112.25.25.25h.5a.25.25 0 0 0 .25-.25v-.5a.25.25 0 0 0-.25-.25h-.5ZM2 13.25a.25.25 0 0 1 .25-.25h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5a.25.25 0 0 1-.25-.25v-.5Z" />
                    <path d="M5 1a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1a1 1 0 0 1 1 1v4h3a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h3V3a1 1 0 0 1 1-1V1Zm2 14h2v-3H7v3Zm3 0h1V3H5v12h1v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3Zm0-14H6v1h4V1Zm2 7v7h3V8h-3Zm-8 7V8H1v7h3Z" />
                  </svg>
                </div>
              )}
              {entity !== "pharmacies" ? (
                <div className="hosp-data">
                  <Link to={`/DoctorsEntity/${hospital.name}`}>
                    <p className="hosp-name">{hospital.arabic_name}</p>
                    <p className="hosp-address">
                      {/* <strong>Address:</strong>*/}
                      <i class="bi bi-geo-alt-fill"></i> {hospital.address[0]}
                    </p>
                    <p className="hosp-tele">
                      <i class="bi bi-telephone-fill"></i>{" "}
                      {hospital.telephone[0]}
                    </p>
                  </Link>
                </div> //Pharmacy Card
              ) : (
                <div className="hosp-data">
                  <p className="hosp-name">{hospital.arabic_name}</p>
                  <p className="hosp-address">
                    {/* <strong>Address: </strong> */}
                    <i class="bi bi-geo-alt-fill"></i> {hospital.address[0]}
                  </p>
                  <p className="hosp-tele">
                    <i class="bi bi-telephone-fill"></i> {hospital.telephone[0]}
                  </p>
                  <div className="order-btn-cont">
                    <Button
                      className="OrderButton"
                      onClick={() => handle_order(hospital)}
                    >
                      Make order
                    </Button>
                  </div>
                  <PharmacyOrder
                    pharmacyname={pharmacy_details.pharmacyname}
                    pharmacyaddress={pharmacy_details.pharmacyaddress}
                    pharmacyphone={pharmacy_details.pharmacyphone}
                    pharmacyadmin={pharmacy_details.pharmacyadmin}
                    show={modalShow}
                    loading={loading}
                    setloading={() => {
                      setloading(true);
                    }}
                    setfalseloading={() => {
                      setloading(false);
                    }}
                    setshow={() => {
                      setModalShow(true);
                    }}
                    onHide={() => setModalShow(false)}
                  />
                </div>
              )}
            </div>
          ))}
        </div>):(
            <div style={{ 'position': 'absolute',  'top': '80%', 'left': '50%',  'margin': '-25px 0 0 -25px'}}>
                             <Spinner animation="border" variant="primary" />
            </div>
        )}
      </section>
    </div>
  );
};

export default HospitalsPage;
