import React, { useState, useEffect } from "react";
//import "./profileui.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
    Form,
    Button,
    Container,
  } from "react-bootstrap";
import { FaUser, FaLock, FaBirthdayCake } from "react-icons/fa";
import { BsFillTelephoneFill } from "react-icons/bs";
import {AiFillMessage} from "react-icons/ai";
import { MdBloodtype, MdLocationOn, MdEmail } from "react-icons/md";
import "./complaint.css"
import axios from "axios";
import { async } from "@firebase/util";
import { useSelector , useDispatch} from "react-redux";
import { useNavigate } from "react-router-dom";
import {logout} from '../../actions';
const Complaint = () => {
  const dispatch = useDispatch();
  const d = new Date();
  const token = JSON.parse(useSelector((state) => state.auth));
  const navigate = useNavigate();
  const login = () => {
      navigate("/login");
    }
  const complaint_api = () => {
    //console.log("MADONNAAAA" , data);
    const day_date =
      d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
    axios
    .post('https://future-medical.herokuapp.com/user/complaint',{
      form : data.complaint,
      number : data.phone,
      mail : data.email ,
      date : day_date
    },{
      headers: {
    'Authorization': `Bearer ${token.token}`
    }})
    .then((res) => {
      console.log(res.data);
      alert("Complaint has been added Successfully");
    })
    .catch(function (err) {
      if (err.response) {
        if(err.response.data === "not authorized, token is failed"){
          dispatch(logout());
          navigate("/login")
        }
      }
    });
  }
  
  const data = [
    {
      email: "",
      phone: "",
      complaint : ""
    },
  ];
  const [email, setEmail] = useState("");
  const [phone, setphone] = useState("");
  const [comp, setComp] = useState("");
  const [e_ph, sete_ph] = useState("");
  //const [e_u, sete_u] = useState("");
  const [e_c, sete_c] = useState("");
  const [e_e, sete_e] = useState("");
  const submit_value = (e) => {
    e.preventDefault();
    var flag = 0;
    //submit(email,password);
    // if (username === "") {
    //   flag = 1;
    //   sete_u("!! required username");
    // }
    if (email === "") {
      flag = 1;
      sete_e("Required Email !!");
    }
    if (phone.length !== 11 && phone != "") {
      flag = 1;
      sete_ph("Required 11 numbers !!");
      //setflag("true");
      console.log(flag);
    }
    // if (phone === "")
    // {
    //   flag=1;
    //   sete_ph("!! required Phone Number");
    //   //setflag("true");
    // }
    console.log(flag);
    if (flag === 0) {
      data.email = email;
      data.phone = phone;
      //data.username = username;
      data.complaint = comp;
      console.log(data);
      if(token.token){
        complaint_api();
        navigate("/");
      }
      else{
        login();
      }
    }
  };
  // useEffect(() => {
  //   complaint_api(email,phone,comp);
  // }, []);
 
  return (
    <div className="login_sigup_container">
      <Container>
        <div className="form-container_signup">
          <h1 style={{ color: "#06a3da", marginTop: "30px" }}>
            Complaint Form
          </h1>
          <br />
          <div className="Total_form_signup">
            <Form onSubmit={submit_value}>
              <div className="form-details_signup2">
                {/* <div style={{ gridArea: "1 / 1 / 2 / 2" }}>
                  <Form.Group controlId="formBasicusername">
                    <FaUser style={{ color: "#06a3da" }} />{" "}
                    <Form.Label> Full Name </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your name"
                      required
                    />
                  </Form.Group>
                </div>
                <br /> */}
                <div style={{ gridArea: "1 / 1 / 2 / 3" }}>
                  <Form.Group controlId="formBasicEmail">
                    <MdEmail style={{ color: "#06a3da" }} />{" "}
                    <Form.Label> Email address </Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      required
                      onChange={(e) => {
                        setEmail(e.target.value);
                        sete_e("");
                      }}
                    />
                    <h6 style={{ color: "red" }}>{e_e}</h6>
                  </Form.Group>
                </div>
                <br />
                <div style={{ gridArea: "2 / 1 / 3 / 3" }}>
                  <Form.Group controlId="formBasicPassword">
                    <BsFillTelephoneFill style={{ color: "#06a3da" }} />{" "}
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                      placeholder="Phone"
                      type="text"
                      required
                      onChange={(e) => {
                        setphone(e.target.value);
                        sete_ph("");
                      }}
                    />
                    <h6 style={{ color: "red" }}>{e_ph}</h6>
                  </Form.Group>
                </div>
                <br />
                <div style={{ gridArea: "3 / 1 / 4 / 3" }}>
                  <Form.Group controlId="formBasicPassword">
                    <AiFillMessage style={{ color: "#06a3da" }} />{" "}
                    <Form.Label>Complaint</Form.Label>
                    <Form.Control
                      placeholder="Type your complaint"
                      as="textarea"
                      required
                      onChange={(e) => {
                        setComp(e.target.value);
                        sete_c("");
                      }}
                    />
                    <h6 style={{ color: "red" }}>{e_c}</h6>
                  </Form.Group>
                </div>
                <br/>
                <div className="d-grid" style={{ gridArea: " 4 / 1 / 5 / 3" }}>
                  <Button
                    variant="primary btn-block"
                    type="submit"
                    onSubmit={submit_value}
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </Form>
          </div>
          <br />
        </div>
      </Container>
    </div>
  );
};

export default Complaint;
