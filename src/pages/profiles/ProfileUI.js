import React, { useState, useEffect } from "react";
import SideBarUI from "../../components/SideBarUI/SideBarUI";
import "./profileui.css";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {  Button,  ButtonGroup,  useAccordionButton,} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import EditIcon from "@material-ui/icons/Edit";
import CancelIcon from "@material-ui/icons/Cancel";
import Avatar from "@material-ui/core/Avatar";
import { BsInfoCircleFill } from "react-icons/bs";
import { blueGrey } from "@material-ui/core/colors";

import { signin } from "../../actions";
import {logout} from '../../actions'
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../firebase";
import {
  info,
  history,
  appointments,
  myorders,
  prescription,
  order_status,
} from "../../actions";
import History from "../../components/User_History/History";
import { Link, useLocation, useNavigate } from "react-router-dom";
import VideoChat from "../../components/Meeting_room/Video_chat/VideoChat";
import Tooltip from "@mui/material/Tooltip";
import { channel_name, leave } from "./../../actions";


import Userappointments from "../../components/Userprofile/Userappointments";
import Userprescription from "../../components/Userprofile/Userprescription";
import Userorders from "../../components/Userprofile/Userorders";

const ProfileUI = () => {
  let navigate = useNavigate();
  const navigation = (docid) => {
    navigate("/clinicdoctor", { state: { Doctor_id: docid } });
  };
  const dispatch = useDispatch();
  dispatch(channel_name(""));
  // const no = useSelector(state => state.page_reducer);
  // console.log(no)
  // if(no>=1)
  // dispatch(leave());
  const action_state = JSON.parse(
    useSelector((state) => state.meeting_reducer)
  );
  console.log(action_state);

  const sidebar_profile = useSelector((state) => state.profile_reducer); //state of token
  const get_orders_store = JSON.parse(
    useSelector((state) => state.order_reducer)
  );
  console.log(get_orders_store);
  const token = JSON.parse(useSelector((state) => state.auth));
  console.log(token);
  var token_copy = token;
  

  const config = {
    headers: {
      Authorization: `Bearer ${token.token}`,
    },
  };

   const Edit_personal_info = async (info) => {
    try {
      const res = await axios.patch(
        "https://future-medical.herokuapp.com/user/edit/info",
        info,
        config
      );
      alert(res.data);
      console.log(res.data);
    } catch (err) {
      if (err.response) {
        if(err.response.data === "not authorized, token is failed"){
          dispatch(logout());
          navigate("/login")
        }
      }

    }
  };

  //edit personal info
  const [add, setadd] = useState(null);
  const [blood, setblood] = useState(null);
  const [gender, setGender] = useState(null);
  const [date, setDob] = useState(null);
  const [user_name, setuser_name] = useState(null);
  const [email, setemail] = useState(null);
  const [phone, setphone] = useState(null);

  //edit photo
  const [edit, setEdit] = useState(false);
  const [edit_photo, setEdit_photo] = useState(false);

  const Edit_profile_pic = async (url) => {
    try {
      const res = await axios.patch(
        "https://future-medical.herokuapp.com/user/edit/photo",
        { profilePic: url },
        config
      );
      alert(res.data);
      console.log(res.data);
    } catch (err) {
      if (err.response) {
        if(err.response.data === "not authorized, token is failed"){
          dispatch(logout());
          navigate("/login")
        }
      }

    }
  };

  const [temp, edit_pic_temp] = useState("");
  const edit_pic = (file) => {
    if (!file) return;
    console.log(file);
    console.log(file.name);
    const storageRef = ref(storage, `/files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on("state_changed", () => {
      getDownloadURL(uploadTask.snapshot.ref)
        .then((url) => {
          Edit_profile_pic(url);
          token_copy.profilePic = url;
          dispatch(signin(token_copy));
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };

  var Edit_data = {};
  const editted = {};

  const setdata = () => {
    editted.address = add;
    editted.gender = gender;
    editted.date = date;
    editted.blood = blood;
    editted.user_name = user_name;
    editted.email = email;
    editted.phone = phone;

    if (editted.address !== null) {
      Edit_data.address = editted.address;
      token_copy.address = editted.address;
    }
    if (editted.user_name !== null) {
      Edit_data.username = editted.user_name;
      token_copy.username = editted.user_name;
    }
    if (editted.email !== null) {
      Edit_data.email = editted.email;
      token_copy.email = editted.email;
    }
    if (editted.blood !== null) {
      Edit_data.blood = editted.blood;
      token_copy.blood = editted.blood;
    }
    if (editted.date !== null) {
      Edit_data.dateOfBirth = editted.date;
      token_copy.dateOfBirth = editted.date;
    }
    if (editted.gender !== null) {
      Edit_data.gender = editted.gender;
      token_copy.gender = editted.gender;
    }
    if (editted.phone !== null) {
      Edit_data.phone = editted.phone;
      token_copy.phone = editted.phone;
    }
    console.log(Edit_data);
    dispatch(signin(token_copy));
    Edit_personal_info(Edit_data);
    Edit_data = {};
    setEdit(false);
  };

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

  // Code of CompactName
  let compactName = "";
  const CompactNameHandler = () => {
    const spaceCondition = token.username.includes(" ");
    if (!spaceCondition) {
      compactName = token.username[0].toUpperCase();
    } else {
      const spaceIndex = token.username.indexOf(" ");
      console.log(spaceIndex);
      compactName = (
        token.username[0] + token.username[spaceIndex + 1]
      ).toUpperCase();
    }
    return <h3>{compactName}</h3>;
  };

  return (
    <div className="main-container">
      <SideBarUI compact={compact} oncompact={compacthandler}>
        <div>
          <div className="image-container">
            <Avatar
              className="profile_img"
              src={token.profilePic}
              style={{ height: "70px", width: "70px" }}
              sx={{ bgcolor: blueGrey[400] }}
            />
            {compact ? CompactNameHandler() : <h3>{token.username}</h3>}
          </div>
        </div>
        <div className="sidebar-links">
          {/* <ul className="sidebar-links"> */}
          {compact ? (
            <Tooltip title="Personnal Info" placement="right">
              <li onClick={() => dispatch(info())}>
                <i class="bi bi-info-circle-fill"></i>
              </li>
            </Tooltip>
          ) : (
            <li onClick={() => dispatch(info())}>
              <i class="bi bi-info-circle-fill"></i>
              <span> Personnal Info</span>
            </li>
          )}
          {compact ? (
            <Tooltip title="History" placement="right">
              <li onClick={() => dispatch(history())}>
                <i class="bi bi-chat-left-text-fill"></i>
              </li>
            </Tooltip>
          ) : (
            <li onClick={() => dispatch(history())}>
              <i class="bi bi-chat-left-text-fill"></i>
              <span> History</span>
            </li>
          )}
          {compact ? (
            <Tooltip title="Appointments" placement="right">
              <li onClick={() => dispatch(appointments())}>
                <i class="bi bi-clock-fill"></i>
              </li>
            </Tooltip>
          ) : (
            <li onClick={() => dispatch(appointments())}>
              <i class="bi bi-clock-fill"></i>
              <span> Appointments</span>
            </li>
          )}
          {compact ? (
            <Tooltip title="Orders" placement="right">
              <li onClick={() => dispatch(myorders())}>
                <i class="bi bi-bandaid-fill"></i>
              </li>
            </Tooltip>
          ) : (
            <li onClick={() => dispatch(myorders())}>
              <i class="bi bi-bandaid-fill"></i>
              <span> Orders</span>
            </li>
          )}
          {compact ? (
            <Tooltip title="Prescriptions" placement="right">
              <li onClick={() => dispatch(prescription())}>
                <i class="bi bi-file-medical-fill"></i>
              </li>
            </Tooltip>
          ) : (
            <li onClick={() => dispatch(prescription())}>
              <i class="bi bi-file-medical-fill"></i>
              <span> Prescriptions</span>
            </li>
          )}
        </div>
      </SideBarUI>
      <main>
        <div className="profile-container">
          {sidebar_profile === "info" ? (
            <div className="card">
              <div className="card-header bg-transparent">
                <h3 className="mb-0">
                  <BsInfoCircleFill /> Personal Information
                  <EditIcon
                    style={{ cursor: "pointer" }}
                    onClick={(e) => setEdit(true)}
                  ></EditIcon>
                </h3>
              </div>
              <div className="card-body pt-0">
                <div className="row personnal-image">
                  <Avatar
                    className="profile_img"
                    src={token.profilePic}
                    onClick={(e) => setEdit_photo(!edit_photo)}
                    style={{ height: "150px", width: "150px" }}
                    sx={{ bgcolor: blueGrey[400] }}
                  />
                  {edit_photo ? (
                    <>
                      <input
                        className="edit-photo"
                        type="file"
                        onChange={(e) => edit_pic_temp(e.target.files[0])}
                      ></input>
                      
                      {temp === "" ? (
                        <Button
                        variant="danger"
                        className="col-md-12 text-right"
                        onClick={(e) => setEdit_photo(false)}
                      >
                        Cancel
                      </Button>
                      ) : (
                        <ButtonGroup>
                          <Button
                            variant="outline-success"
                            className="col-md-12 text-right"
                            onClick={(e) => {
                              edit_pic(temp);
                              setEdit_photo(false);
                            }}
                          >
                            Submit
                          </Button>
                          <Button
                            variant="outline-danger"
                            className="col-md-12 text-right"
                            onClick={(e) => setEdit_photo(false)}
                          >
                            Cancel
                          </Button>
                        </ButtonGroup>
                      )}
                    </>
                  ) : (
                    ""
                  )}
                  {edit ? (
                    <input
                      style={{ cursor: "pointer" }}
                      placeholder={token.username}
                      type="text"
                      onChange={(e) => setuser_name(e.target.value)}
                    ></input>
                  ) : (
                    <h3
                      style={{
                        textAlign: "center",
                        textTransform: "capitalize",
                      }}
                    >
                      {token.username}
                    </h3>
                  )}
                </div>
                <div class="row mt-3">
                  <div class="col-sm-3" style={{ width: "20%" }}>
                    <h6 class="mb-0">Email</h6>
                  </div>
                  <div class="col-sm-9 text-secondary" style={{ width: "80%" }}>
                    {edit ? (
                      <input
                        style={{ cursor: "pointer" }}
                        placeholder={token.email}
                        type="text"
                        onChange={(e) => setemail(e.target.value)}
                      ></input>
                    ) : (
                      token.email
                    )}
                  </div>
                </div>
                <hr id="profile-hr" />
                <div class="row mt-3">
                  <div class="col-sm-3" style={{ width: "20%" }}>
                    <h6 class="mb-0">Address</h6>
                  </div>
                  <div class="col-sm-9 text-secondary" style={{ width: "80%" }}>
                    {edit ? (
                      <input
                        placeholder={token.address}
                        onChange={(e) => setadd(e.target.value)}
                      ></input>
                    ) : (
                      token.address
                    )}
                  </div>
                </div>
                <hr id="profile-hr" />
                <div class="row mt-3">
                  <div class="col-sm-3" style={{ width: "20%" }}>
                    <h6 class="mb-0">Phone</h6>
                  </div>
                  <div class="col-sm-9 text-secondary" style={{ width: "80%" }}>
                    {edit ? (
                      <input
                        placeholder={token.phone}
                        onChange={(e) => setphone(e.target.value)}
                      ></input>
                    ) : (
                      token.phone
                    )}
                  </div>
                </div>
                <hr id="profile-hr" />
                <div class="row mt-3">
                  <div class="col-sm-3" style={{ width: "20%" }}>
                    <h6 class="mb-0">Date of Birth</h6>
                  </div>
                  <div class="col-sm-9 text-secondary" style={{ width: "80%" }}>
                    {edit ? (
                      <input
                        style={{ cursor: "pointer" }}
                        placeholder={token.dateOfBirth}
                        type="date"
                        onChange={(e) => setDob(e.target.value)}
                      ></input>
                    ) : token.dateOfBirth ? (
                      token.dateOfBirth
                        .split("T")[0]
                        .split("-")
                        .reverse()
                        .join("-")
                    ) : (
                      token.dateOfBirth
                    )}
                  </div>
                </div>
                <hr id="profile-hr" />
                <div class="row mt-3">
                  <div class="col-sm-3" style={{ width: "20%" }}>
                    <h6 class="mb-0">Gender</h6>
                  </div>
                  <div class="col-sm-9 text-secondary" style={{ width: "80%" }}>
                    {edit ? (
                      <div>
                        <input
                          style={{ cursor: "pointer" }}
                          type="radio"
                          id="gender1"
                          name="gender"
                          value="Male"
                          onChange={(e) => setGender(e.target.value)}
                        />
                        <label for="gender1"> Male</label>
                        <br />
                        <input
                          style={{ cursor: "pointer" }}
                          type="radio"
                          id="gender2"
                          name="gender"
                          value="Female"
                          onChange={(e) => setGender(e.target.value)}
                        ></input>
                        <label for="gender2"> Female</label>
                      </div>
                    ) : (
                      token.gender
                    )}
                  </div>
                </div>
                <hr id="profile-hr" />
                <div class="row mt-3">
                  <div class="col-sm-3" style={{ width: "20%" }}>
                    <h6 class="mb-0">Blood</h6>
                  </div>
                  <div class="col-sm-9 text-secondary" style={{ width: "80%" }}>
                    {edit ? (
                      <div>
                        <select
                          style={{ cursor: "pointer" }}
                          onChange={(e) => setblood(e.target.value)}
                        >
                          <option value="" selected hidden disabled>
                            Choose
                          </option>
                          <option value="A+">A+</option>
                          <option value="A-">A-</option>
                          <option value="B+">B+</option>
                          <option value="B-">B-</option>
                          <option value="AB+">AB+</option>
                          <option value="AB-">AB-</option>
                          <option value="O+">O+</option>
                          <option value="O-">O-</option>
                        </select>
                      </div>
                    ) : (
                      token.blood
                    )}
                  </div>
                </div>
                {edit ? (
                  <ButtonGroup>
                    <Button
                      variant="outline-success"
                      className="col-md-12 text-right"
                      onClick={setdata}
                    >
                      Submit
                    </Button>
                    <Button
                      variant="outline-danger"
                      className="col-md-12 text-right"
                      onClick={(e) => setEdit(false)}
                    >
                      Cancel
                    </Button>
                  </ButtonGroup>
                ) : (
                  ""
                )}
                {/* {edit ? <Button variant="outline-danger" className="col-md-12 text-right" onClick={(e)=>setEdit(false)}>Cancel</Button>:""} */}
              </div>
            </div>
          ) : (
            ""
          )}

          {sidebar_profile === "history" ? <History /> : ""}
        </div>
        {sidebar_profile === "appointments" ? 
                                      
          (<Userappointments/>):
                           
         (
          ""
        )}

        {sidebar_profile === "myorders" ? (
          <Userorders/>
        ) : (
          ""
        )}

        {sidebar_profile === "prescription" ? (
          <Userprescription/>
        ) : (
          // </CardGroup>
          ""
        )}
      </main>
    </div>
  );
};

export default ProfileUI;
