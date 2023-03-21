import React, { useState, useEffect } from "react";
import SideBarUI from "../../components/SideBarUI/SideBarUI";
import "./profileui.css";
import { ListGroup, Form, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Avatar from "@material-ui/core/Avatar";
import { BsInfoCircleFill } from "react-icons/bs";
import { AiOutlineComment } from "react-icons/ai";
import {MdOutlineStarRate} from 'react-icons/md';
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { GiNotebook } from "react-icons/gi";
import { useLocation } from "react-router-dom";
import SendIcon from "@mui/icons-material/Send";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Calender from "./../../components/Calendar/Calendar";
import { info_doc, meetings , reviews_doc } from "../../actions";
import { blueGrey } from "@material-ui/core/colors";
import Tooltip from "@mui/material/Tooltip";
import Star from './../../components/rating_stars/stars';
//import {info , reviews , meetings} from "../../actions" ; 
const Doctor = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const sidebar_profile = useSelector((state) => state.Doctor_reducer);
  const [Docid, setdoctorid] = useState(location.state ? location.state : "");
  const[rating,setrating]=useState(0);
  console.log(Docid);

  //const token = useSelector(state => state.auth);
  const token = JSON.parse(useSelector((state) => state.auth));
  console.log(token);
  let [doctor_data, setdoctor_data] = useState({});
  let Doctor_Api = {};
  let rr = [];
  let [show_rev, setshoe_rev] = useState([]);
  let [dr_timetable, setdr_timetable] = useState([]);
  const[rate,setrate]=useState(0);
  const[count, setcount] = useState(0);
  console.log(doctor_data);
  const Get_info_api = async () => {
    try {
      const res = await axios.get(
        `https://future-medical.herokuapp.com/user/doctor/${Docid.Doctor_id}`
      );
      const data = await res.data;
      console.log("data of doctors", data);
      Doctor_Api.username = data.username;
      Doctor_Api.email = data.email;
      Doctor_Api.profilePic = data.profilePic;
      Doctor_Api.specialization = data.specialization;
      Doctor_Api.telephone = data.telephone[0];
      Doctor_Api.entityflag = data.entity_id.flag;
      Doctor_Api.entityname = data.entity_id.name;
      Doctor_Api.rate_count = data.rate_count;
      Doctor_Api.meeting_price = data.meeting_price;
      Doctor_Api.university = data.university;

      // Doctor_Api.reviews = data.reviews;

      for (var i = 0; i < data.reviews.length; i++) {
        rr.push(data.reviews[i]);
      }
      setshoe_rev(rr);
      rr = [];
      for (var i = 0; i < data.timetable.length; i++) {
        rr.push(data.timetable[i]);
      }
      setdr_timetable(rr);
      setdoctor_data(Doctor_Api);
      setrate(data.rate);
      setcount(data.rate_count);
      //setdoctor_data(data);
    } catch (err) {
      console.error(err);
    }
  };

  const [rev, setreview] = useState("");
  //const [revf,setreviewf] = useState({review:""});
  const r = { review: "" };
  const Write = (e) => {
    e.preventDefault();
    console.log(rev);
    if(rev !== "")
    {r.review = rev;
    //console.log(r)
    //setreviewf(r);
    sets(false);
    //console.log(revf);
    write_review(r);
    show_rev.push(rev);}
  };

  const write_review = async (r) => {
    try {
      const res = await axios.patch(
        `https://future-medical.herokuapp.com/user/review/doctor/${Docid.Doctor_id}`,
        r
      );
      console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    Get_info_api();
  }, []);

  const [s, sets] = useState(false);

  const [compact, setCompact] = useState(false);

  const compacthandler = () => {
    setCompact(!compact);
  };
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1065) {
        setCompact(true);
      } else if (window.innerWidth > 1065) {
        setCompact(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  let compactName = "";
  const CompactNameHandler = () => {
    const spaceCondition = doctor_data.username.includes(" ");
    if (!spaceCondition) {
      compactName = doctor_data.username[0].toUpperCase();
    } else {
      const spaceIndex = doctor_data.username.indexOf(" ");
      console.log(spaceIndex);
      compactName = (
        doctor_data.username[0] + doctor_data.username[spaceIndex + 1]
      ).toUpperCase();
    }
    return <h3>{compactName}</h3>;
  };

  console.log("doctor helo", doctor_data);

  return (
    <div className="main-container">
      <SideBarUI compact={compact} oncompact={compacthandler}>
        <div>
          <div className="image-container">
            <Avatar
              className="profile_img"
              src={doctor_data.profilePic}
              style={{height:'70px',width:'70px'}}
              sx={{  bgcolor: blueGrey[400] }}
            />
            {compact ? CompactNameHandler() : <h3>{doctor_data.username}</h3>}
            <div
              className={
                compact ? "rate_star_container_compact" : "rate_star_container"
              }
            >
              {[...Array(rate)].map((star) => {
                return (
                  <span className="rate-star">
                    <i class="bi bi-star-fill"></i>
                  </span>
                );
              })}
              {[...Array(5 - rate)].map((star) => {
                return (
                  <span className="rate-star">
                    <i class="bi bi-star"></i>
                  </span>
                );
              })}
              {/* <small className="text-muted"> ({doctor_data.rate_count} verified ratings)</small> */}
            </div>
          </div>
        </div>
        {compact ? (
          <div className="sidebar-links">
            <Tooltip title="Personnal Info" placement="right">
              <li onClick={() => dispatch(info_doc())}>
                <i class="bi bi-info-circle-fill"></i>
              </li>
            </Tooltip>
            <Tooltip title="Reviews" placement="right">
              <li onClick={() => dispatch(reviews_doc())}>
                <i class="bi bi-chat-left-text-fill"></i>
              </li>
            </Tooltip>
            <Tooltip title="Reseve meeting" placement="right">
              <li onClick={() => dispatch(meetings())}>
                <i class="bi bi-clock-fill"></i>
              </li>
            </Tooltip>
          </div>
        ) : (
          <div className="sidebar-links">
            <li onClick={() => dispatch(info_doc())}>
              <i class="bi bi-info-circle-fill"></i>
              <span> Personnal Info</span>
            </li>
            <li onClick={() => dispatch(reviews_doc())}>
              <i class="bi bi-chat-left-text-fill"></i>
              <span> Reviews</span>
            </li>
            <li onClick={() => dispatch(meetings())}>
              <i class="bi bi-clock-fill"></i>
              <span> Reseve meeting</span>
            </li>
          </div>
        )}
      </SideBarUI>
      <main>
        <div className="profile-container">
          {sidebar_profile === "info_doc" ? (
            <div className="card">
              <div className="card-header bg-transparent">
                <h3 className="mb-0">
                  <BsInfoCircleFill /> Personal Information
                </h3>
              </div>
              <div className="card-body pt-0">
                <div className="row personnal-image">
                  <Avatar
                    className="profile_img"
                    src={doctor_data.profilePic}
                    style={{height:'150px',width:'150px'}}
                    sx={{ bgcolor: blueGrey[400] }}
                  />

                  <h3
                    style={{ textAlign: "center", textTransform: "capitalize" }}
                  >
                    {doctor_data.username}
                  </h3>
                </div>
                <div class="row mt-3">
                  <div class="col-sm-3">
                    <h6 class="mb-0">Email</h6>
                  </div>
                  <div class="col-sm-9 text-secondary">{doctor_data.email}</div>
                </div>

                <hr id="profile-hr" />
                <div class="row mt-3">
                  <div class="col-sm-3">
                    <h6 class="mb-0">Spectialization</h6>
                  </div>
                  <div class="col-sm-9 text-secondary">
                    {doctor_data.specialization}
                  </div>
                </div>

                <hr id="profile-hr" />
                <div class="row mt-3">
                  <div class="col-sm-3">
                    <h6 class="mb-0">University</h6>
                  </div>
                  <div class="col-sm-9 text-secondary">
                    {doctor_data.university}
                  </div>
                </div>

                <hr id="profile-hr" />
                <div class="row mt-3">
                  <div class="col-sm-3">
                    <h6 class="mb-0">
                      {doctor_data.entityflag === "H" && "Hospital"}
                    </h6>
                    <h6 class="mb-0">
                      {doctor_data.entityflag === "C" && "Clinic"}
                    </h6>
                  </div>
                  <div class="col-sm-9 text-secondary">
                    {doctor_data.entityname}
                  </div>
                </div>
                <hr id="profile-hr" />
                <div class="row mt-3">
                  <div class="col-sm-3">
                    <h6 class="mb-0">Meeting Fees</h6>
                  </div>
                  <div class="col-sm-9 text-secondary">
                    {doctor_data.meeting_price}
                  </div>
                </div>
                <hr id="profile-hr" />
                <div class="row mt-3">
                  <div class="col-sm-3">
                    <h6 class="mb-0">Phone Number</h6>
                  </div>
                  <div class="col-sm-9 text-secondary">
                    {doctor_data.telephone}
                  </div>
                </div>

                               
              </div>
            </div>
          ) : (
            ""
          )}
          {sidebar_profile === "reviews_doc" ? (
            <>
           {
             token.token && 
             <>
             <div className="card shadow-sm">
             <div className="card-header bg-transparent">
             <p className="mb-0"><strong className="pr-1"> <MdOutlineStarRate /> Ratings: </strong>  <small className="text-muted"> ({count} verified ratings)</small></p> 
                 <Star setrating={setrating} dr_id={Docid.Doctor_id} setcount={setcount} count={count}/>
               </div>
             </div>
             <br/>
             </>
           }
            
            <div className="card shadow-sm">
              <div className="card-header bg-transparent">
                <Row>
                  <Col>
                    <p className="mb-0">
                      <strong className="pr-1">
                        {" "}
                        <AiOutlineComment /> Reviews:{" "}
                      </strong>{" "}
                    </p>
                  </Col>
                  {token.token && (
                    <Col>
                      <button
                        style={{
                          cursor: "pointer",
                          borderRadius: "50%",
                          background: "white",
                          border: "None",
                        }}
                        onClick={() => sets(true)}
                      >
                        <AddCircleIcon />
                      </button>
                    </Col>
                  )}
                </Row>

                <br />

                {s ? (
                  <div>
                    <Row>
                      <Col>
                        <Form.Control
                          as="textarea"
                          placeholder="Write your Review here ..."
                          onChange={(e) => setreview(e.target.value)}
                          style={{ height: "40px" }}
                        />
                      </Col>
                      <Col>
                        <button
                          style={{
                            cursor: "pointer",
                            borderRadius: "50%",
                            background: "white",
                            border: "None",
                          }}
                          type="button"
                          onClick={Write}
                        >
                          <SendIcon />
                        </button>
                      </Col>
                    </Row>
                    <br />
                  </div>
                 
                ) : (
                  ""
                )}

                {show_rev.map((r) => (
                  <ListGroup variant="flush">
                    <div>
                      <ListGroup.Item> {r}</ListGroup.Item>
                    </div>
                    <br />
                  </ListGroup>
                ))}
              </div>
            </div>
            </>
          ) : (
            ""
          )}
        </div>
        {sidebar_profile === "meetings" ? (
          <div className="card shadow-sm">
            <div className="card-header bg-transparent border-0">
              <h3 className="mb-0">
                <GiNotebook /> Reserve your meeting{" "}
              </h3>
            </div>
            <div className="card-body pt-0">
              <div>
                <Calender
                  data={{
                    email: doctor_data.email,
                    timetable: dr_timetable,
                    id: Docid.Doctor_id,
                    token: token.token,
                    username: doctor_data.username,
                  }}
                />
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </main>
    </div>
  );
};

export default Doctor;
