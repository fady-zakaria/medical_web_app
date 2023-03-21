import React from "react";
import "./navheader.css";
// import "./header.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Avatar from '@material-ui/core/Avatar';
import Badge from "@mui/material/Badge";
//import { Container, Navbar, Nav } from "react-bootstrap";
import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signin, logout } from "../../actions";
import { chart , info , info_doc} from "../../actions";
import Tooltip from "@mui/material/Tooltip";
// import { Button, Badge } from "react-bootstrap";

const Header = () => {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  const token = JSON.parse(useSelector((state) => state.auth)); //state of token
  const initstate = () => {
    ////GO BACK ALL STATES TO INIT STATES
    dispatch(logout());
    dispatch(chart());
    dispatch(info())
    dispatch(info_doc())
    navigate("/");
  };
  const [showNav, setShowNav] = useState(false);
  const linksContainerRef = useRef(null);
  const loginContainerRef = useRef(null);
  const linksRef = useRef(null);
  const loginRef = useRef(null);

  /*const handlerouting = (type) => {
    if (type === "owner") {
      navigate("/appadmin");
    } else if (type === "user") {
      navigate("/user");
    } else if (type === "c_admin") {
      navigate("/clinicdoctor");
    } else if (type === "p_admin") {
      navigate("/pharmacyadmin");
    } else if (type === "h_admin") {
      navigate("/hospitaladmin");
    } else if (type === "doctor") {
      navigate("/doctor");
    }
  };*/

  useEffect(() => {
    const linksHeight = linksRef.current.getBoundingClientRect().height;
    const loginHeight = loginRef.current.getBoundingClientRect().height;
    console.log(linksHeight);
    if (showNav) {
      //   const total = linksHeight + loginHeight;
      linksContainerRef.current.style.height = `${linksHeight}px`;
      loginContainerRef.current.style.height = `${loginHeight + 30}px`;
    } else {
      linksContainerRef.current.style.height = "0px";
      loginContainerRef.current.style.height = "0px";
    }
  }, [showNav]); // so for every time showNav changed useEffect will run

  return (
    <nav>
      <div className="nav-center">
        <div className="nav-header">
          <Link to="/" className="link-custom">
            <div className="logo-left">
              <img
                className="logo-image"
                alt="logo"
                src="/assets/images/Untitled-2.svg"
              />
              {/* <h3 className="logo-name">FUTURE MEDICAL</h3> */}
            </div>
          </Link>
          <button className="nav-toggle" onClick={() => setShowNav(!showNav)}>
            <i class="bi bi-list"></i>
          </button>
        </div>
        <div className="links-container" ref={linksContainerRef}>
          <ul className="links" ref={linksRef}>
            <Link to="/" className="link-custom">
              <li>Home</li>
            </Link>
            <Link to="/Entities/pharmacies" className="link-custom">
              <li>Pharmacies</li>
            </Link>
            <Link to="/Entities/hospitals" className="link-custom">
              <li>Hospitals</li>
            </Link>
            <Link to="/Entities/clinics" className="link-custom">
              <li>Clinics</li>
            </Link>
          </ul>
        </div>
        {!token.token ? (
          <div className="login-container" ref={loginContainerRef}>
            <ul className="links login-data" ref={loginRef}>
              <Link to="/login">
                <li>Log in</li>
              </Link>
            </ul>
          </div>
        ) : (
          <div className="login-container" ref={loginContainerRef}>
            {/* <div className="profile-icon"> */}
            <ul className="login-data" ref={loginRef}>
              <li
                className="profile-icon"
                onClick={() => {
                  navigate("/user");
                }}
              >
                <div className="icon-circle">
                  { <Badge color="primary"  > 
                <Avatar  style={{height:'40px',width:'40px'}} src={token.profilePic}  />

                  </Badge> }
                </div>
              </li>
              {/* </ul> */}
              {/* </div> */}
              {/* <div className="login-container"> */}
              {/* <ul className="links login-data"> */}
              {/* <li
                className="profile-icon"
                onClick={() => {
                  handlerouting(token.usertype);
                }}
              >
                <div className="icon-circle">
                  <Badge color="primary" badgeContent={2} showZero>
                    <AccountCircleIcon />
                  </Badge>
                </div>
              </li> */}
              {/* <Button
                style={{ backgroundColor: "#06a3da" }}
                onClick={() => {
                  handlerouting(token.usertype);
                }}
              >
                Profile{" "}
                <Badge bg="light" style={{ color: "black" }}>
                  9
                </Badge>
                <span className="visually-hidden">unread messages</span>
              </Button>
              <AccountCircleIcon /> */}
              {/* <a id="logout" href="/"> */}
              <li className="logout" onClick={initstate}>
                Logout
              </li>
              {/* </a> */}
            </ul>
            {/* </div> */}
          </div>
        )}
      </div>
    </nav>

    // <Navbar bg="light" variant="light">
    //   <Container>
    //     <Navbar.Brand href="/home">Future Medical</Navbar.Brand>
    //     <Nav className="me-auto">
    //       <Nav.Link href="/">Home</Nav.Link>
    //       <Nav.Link href="/features">Features</Nav.Link>
    //       <Nav.Link href="#pricing">Pricing</Nav.Link>
    //     </Nav>
    //   </Container>
    // </Navbar>
  );
};

export default Header;
