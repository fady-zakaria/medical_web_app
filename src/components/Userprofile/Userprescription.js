import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import "../../pages/profiles/profileui.css"
import { channel_name, leave } from "./../../actions";
import {  Button,  ButtonGroup,  Form,  Table,  Card,  Accordion,  useAccordionButton,  Row,  Col,  Alert,} from "react-bootstrap";
import {logout} from '../../actions'
import { AiFillClockCircle } from "react-icons/ai";
import Spinner from "react-bootstrap/Spinner";


function Userprescription() {
     const [pres, setpres] = useState([]);
     const [loading,setloading]=useState(true)
         let navigate = useNavigate();
  const dispatch = useDispatch();
       const token = JSON.parse(useSelector((state) => state.auth));
    const config = {
    headers: {
      Authorization: `Bearer ${token.token}`,
    },
  };
  const get_pres = async () => {
    try {
      const res = await axios.get(
        "https://future-medical.herokuapp.com/user/prescriptions",
        config
      );

      console.log(res.data);
      if (res.data === "you have no prescriptions yet") {
      setloading(false)
      return;}
      setpres(res.data);
      setloading(false)
    } catch (err) {
      if (err.response) {
        if(err.response.data === "not authorized, token is failed"){
          dispatch(logout());
          navigate("/login")
        }
      }

    }
  };
useEffect(()=>{
    get_pres();
},[])
  return (
    
    pres.length === 0 ? (
        loading ?(
                <div style={{ 'position': 'absolute',  'top': '40%', 'left': '60%',  'margin': '-25px 0 0 -25px'}}>
                <Spinner animation="border" variant="primary" />
              </div>
        ):(
            <>
              <Alert
                key="primary"
                variant="primary"
                style={{ margin: "1rem 2rem" }}
              >
                There are no prescriptions yet.
              </Alert>
            </>)
          ) : (
            // <CardGroup>
            loading ?(
                  <div style={{ 'position': 'absolute',  'top': '40%', 'left': '60%',  'margin': '-25px 0 0 -25px'}}>
                <Spinner animation="border" variant="primary" />
              </div>
            ):(
            <Row xs={1} md={3} className="g-4">
              {pres.map((p) => (
                <Col>
                  <Card className="pres-container">
                    <Card.Body>
                      <Card.Title>Prescriptions</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">
                        {p.Date.split("T")[0].split("-").reverse().join("-")}
                      </Card.Subtitle>
                      <Card.Subtitle className="mb-2 text-muted">
                        Dr {p.doctor.username}
                      </Card.Subtitle>
                      <Card.Subtitle className="mb-2 text-muted">
                        {p.doctor.email}
                      </Card.Subtitle>
                      <Card.Text>
                        {p.medicines.map((m) => (
                          <li>{m}</li>
                        ))}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>)
          )
        
  )
}

export default Userprescription