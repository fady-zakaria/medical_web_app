import React, { useState } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Figure,
  Carousel,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaUser, FaLock, FaBirthdayCake } from "react-icons/fa";
import { BsFillTelephoneFill } from "react-icons/bs";
import { MdBloodtype, MdLocationOn, MdEmail } from "react-icons/md";
import { BiMessageRoundedDetail } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { signin, logout } from "../../actions";
import { Link, useNavigate } from "react-router-dom";
//import dr1 from './../../images/dr2.png';
import Spinner from "react-bootstrap/Spinner";
import "./login.css";


const Signup = () => {
  const token = JSON.parse(useSelector((state) => state.auth)); //state of token
  const dispatch = useDispatch();
  let navigate = useNavigate();
   const [loading, setloading] = useState(false);
  const routing_login = (type) => {
    navigate("/");
  };

  // const register_api = () => {
  //   //console.log("MADONNAAAA" , data);
  //   axios
  //     .post("https://future-medical.herokuapp.com/register", {
  //       username: data.username,
  //       email: data.email,
  //       password: data.password,
  //       address: data.add,
  //       blood: data.blood,
  //       dateOfBirth: data.dob,
  //       phone: data.phone,
  //       gender: data.gender,
  //     })
  //     .then((res) => {
  //       console.log(res.data);
  //       dispatch(signin(res.data)); //save the data
  //       navigate("/"); //Go to Home
  //     })
  //     .catch(function (error) {
  //       setloading(false)
  //       if (error.response) {
  //         console.log(error.response.data);
  //         console.log(error.response.status);
  //       }
  //     });
  // };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpass, setcPassword] = useState("");
  const [dob, setDob] = useState("");
  const [phone, setphone] = useState("");
  const [add, setadd] = useState("");
  const [blood, setblood] = useState("Don't Know");
  const [history, seth] = useState("");
  const [gender, setgender] = useState("");
  const [msg, setmsg] = useState("");
  const [username, setusername] = useState("");
  const[data, setdata] = useState(
    {
      email: "",
      password: "",
      dob: "",
      add: "",
      phone: "",
      history: "",
      blood: "",
      username: "",
      gender: "",
    },
  );
  // const data = [
  //   {
  //     email: "",
  //     password: "",
  //     dob: "",
  //     add: "",
  //     phone: "",
  //     history: "",
  //     blood: "",
  //     username: "",
  //     gender: "",
  //   },
  // ];

  const [e_u, sete_u] = useState("");
  const [e_p, sete_p] = useState("");
  const [e_a, sete_a] = useState("");
  const [e_e, sete_e] = useState("");
  const [e_c, sete_c] = useState("");
  const [e_dob, sete_dob] = useState("");
  const [e_ph, sete_ph] = useState("");
  const [e_g, sete_g] = useState("");
  const submit_value = (e) => {
    e.preventDefault();
    var flag = 0;
    //submit(email,password);
    if (username === "") {
      flag = 1;
      sete_u("!! required username");
      setloading(false)
    }
    if (email === "") {
      flag = 1;
      sete_e("!! required Email");
      setloading(false)
    }
    if (dob === "") {
      flag = 1;
      sete_dob("!! required Date of Birth");
      setloading(false)
    }
    if (password === "") {
      flag = 1;
      sete_p("!! required Password");
      //setflag("true");
      console.log(flag);
      setloading(false)
    }
    if (password.length < 8 && password != "") {
      flag = 1;
      sete_p("!! at least 8 numbers or charaters");
      //setflag("true");
      console.log(flag);
      setloading(false)
    }
    if (phone.length !== 11 && phone != "") {
      flag = 1;
      sete_ph("!! required 11 numbers");
      //setflag("true");
      console.log(flag);
      setloading(false)
    }
    if (cpass === "") {
      flag = 1;
      sete_c("!! confirm the password");
      //setflag("true");
      console.log(flag);
      setloading(false)
    }
    // if (dob === "")
    // {
    //   flag=1;
    //   sete_b("!! required Date of Birth");
    //   //setflag("true");
    // }
    if (gender === "") {
      flag = 1;
      sete_g("!! required gender");
      setloading(false)
      //setflag("true");
    }
    // if (phone === "")
    // {
    //   flag=1;
    //   sete_ph("!! required Phone Number");
    //   //setflag("true");
    // }
    console.log(flag);
    if (password === cpass && flag === 0) {
      data.email = email;
      data.password = password;
      data.dob = dob;
      data.phone = phone;
      data.add = add;
      data.blood = blood;
      data.history = history;
      data.username = username;
      data.gender = gender;
      console.log(data);
      //register_api();
      setdata(data);
      setloading(true)
      navigate(`/takeimage`, { state: { data: data } });
      //navigate('/takeimage');
    } else if (flag === 0) {
      setmsg("!! not matching passwords");
       setloading(false)
    }
  };

  return (
    <>
    {!loading ?(<div className="login_sigup_container">
      <Container>
        {/* <h1 className="shadow-sm text-primary mt-5 p-3 text-center rounded">Login</h1> */}
        <div className="form-container_signup">
          {/* <Row
            className="mt-5 p-5 m-auto shadow-sm rounded-lg"
            lg={4}
            md={6}
            sm={12}
          >
            <Col lg={4} md={6} sm={12}> */}
          <h1
            // className="shadow-sm mt-5 p-3 text-center rounded"
            style={{ color: "#06a3da", marginTop: "30px" }}
          >
            Welcome To Future Medical
          </h1>
          <br />
          <div className="Total_form_signup">
            <Form onSubmit={submit_value}>
              <div className="form-details_signup">
                <div style={{ gridArea: "1 / 1 / 2 / 2" }}>
                  <Form.Group controlId="formBasicusername">
                    <FaUser style={{ color: "#06a3da" }} />{" "}
                    <Form.Label> User name </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter username"
                      value={username}
                      onChange={(e) => {
                        setusername(e.target.value);
                        sete_u("");
                      }}
                    />
                    <h6 style={{ color: "red" }}>{e_u}</h6>
                  </Form.Group>
                </div>
                <br />
                <div style={{ gridArea: "1 / 2 / 2 / 3" }}>
                  <Form.Group controlId="formBasicEmail">
                    <MdEmail style={{ color: "#06a3da" }} />{" "}
                    <Form.Label> Email address </Form.Label>
                    <Form.Control
                      type="email"
                      value={email}
                      placeholder="Enter email"
                      onChange={(e) => {
                        setEmail(e.target.value);
                        sete_e("");
                      }}
                    />
                    <h6 style={{ color: "red" }}>{e_e}</h6>
                  </Form.Group>
                </div>
                <br />
                <div style={{ gridArea: "2 / 1 / 3 / 2" }}>
                  <Form.Group controlId="formBasicPassword">
                    <FaLock style={{ color: "#06a3da" }} />{" "}
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        sete_p("");
                      }}
                    />
                    <h6 style={{ color: "red" }}>{e_p}</h6>
                  </Form.Group>
                </div>
                <br />
                <div style={{ gridArea: "2 / 2 / 3 / 3" }}>
                  <Form.Group controlId="formBasicPassword">
                    <FaLock style={{ color: "#06a3da" }} />{" "}
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      value={cpass}
                      placeholder="Password"
                      onChange={(e) => {
                        setcPassword(e.target.value);
                        sete_c("");
                      }}
                    />
                    <h6 style={{ color: "red" }}>{e_c}</h6>
                    <h6 style={{ color: "red" }}>{msg}</h6>
                  </Form.Group>
                </div>
                <br />
                <div style={{ gridArea: "3 / 1 / 4 / 2" }}>
                  <Form.Group controlId="formBasicPassword">
                    <FaBirthdayCake style={{ color: "#06a3da" }} />{" "}
                    <Form.Label>Date of Birth</Form.Label>
                    <Form.Control
                      type="date"
                      value={dob}
                      onChange={(e) => {
                        setDob(e.target.value);
                        sete_dob("");
                      }}
                    />
                    <h6 style={{ color: "red" }}>{e_dob}</h6>
                  </Form.Group>
                </div>
                <br />
                <div style={{ gridArea: " 3 / 2 / 4 / 3" }}>
                  <Form.Group controlId="formBasicPassword">
                    <BsFillTelephoneFill style={{ color: "#06a3da" }} />{" "}
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                      placeholder="Phone"
                      value={phone}
                      type="text"
                      onChange={(e) => {
                        setphone(e.target.value);
                        sete_ph("");
                      }}
                    />
                    <h6 style={{ color: "red" }}>{e_ph}</h6>
                  </Form.Group>
                </div>

                <br />
                <div style={{ gridArea: " 4 / 1 / 5 / 2" }}>
                  <Form.Group controlId="formBasicPassword">
                    <MdLocationOn style={{ color: "#06a3da" }} />{" "}
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      placeholder="Address"
                      type="text"
                      value={add}
                      onChange={(e) => {
                        setadd(e.target.value);
                        sete_a("");
                      }}
                    />
                    <h6 style={{ color: "red" }}>{e_a}</h6>
                  </Form.Group>
                </div>
                <br />
                <div style={{ gridArea: " 4 / 2 / 5 / 3" }}>
                  <Form.Group controlId="formBasicPassword">
                    <MdBloodtype style={{ color: "#06a3da" }} />{" "}
                    <Form.Label>Blood Type</Form.Label>
                    <div>
                      <select onChange={(e) => setblood(e.target.value)} value={blood}>
                        <option value="" selected disabled hidden>Don't Know</option>
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
                  </Form.Group>
                </div>

                <br />
                <div style={{ gridArea: " 5 / 1 / 6 / 2" }}>
                  <Form.Group controlId="formBasicPassword">
                    <MdBloodtype style={{ color: "#06a3da" }} />{" "}
                    <Form.Label>Gender</Form.Label>
                    <div>
                      <select
                        onChange={(e) => {
                          setgender(e.target.value);
                          sete_g("");
                        }}
                        value={gender}
                      >
                        <option value="" selected disabled hidden>
                          Choose Gender ...
                        </option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </div>
                    <h6 style={{ color: "red" }}>{e_g}</h6>
                  </Form.Group>
                </div>

                <br />

                <div className="d-grid" style={{ gridArea: " 6 / 1 / 7 / 3" }}>
                  <Button
                    variant="primary btn-block"
                    type="submit"
                    onSubmit={(e)=>submit_value()}
                    //data={data}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </Form>
          </div>
          <br />
        </div>
      </Container>
    </div>):(
       <div style={{margin:'auto'}}>
            <Spinner animation="border" variant="primary" />
       </div>
    )}
    </>
  );
};
export default Signup;
