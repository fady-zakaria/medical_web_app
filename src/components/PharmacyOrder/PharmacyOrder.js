import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../firebase";
import axios from "axios";
import { Row, Col } from "react-bootstrap";
import { useSelector , useDispatch} from "react-redux";
import "./pharmacyorder.css";
import PlaceholderLoading from "react-placeholder-loading";
import CircularProgress from "@mui/material/CircularProgress";
import Choose_pres from "../prescription/choose_pres";
import {logout} from '../../actions';
import { useNavigate } from "react-router-dom";

function PharmacyOrder(props) {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const token = JSON.parse(useSelector((state) => state.auth));
  console.log(token.token);
  //const [loading,setloading]=useState(false) //flag for getting downloaded link
  const d = new Date();
  const [FormValues, setFormvalues] = useState({}); //FORM VALUES
  const [Formerrors, setFormerrors] = useState({});
  const [issubmit, setissubmit] = useState(false);
  console.log(props);

  //buttons
  const [cancel1, setcancel] = useState(false);
  const [cancel2, setcancel2] = useState(false);

  //set_order from pres
  const [show_pres_order, setshow_pres] = useState(false);
  const [order, set_order] = useState([]);
  console.log(show_pres_order, order);
  var order_details = {};

  //const day_date = (d.getMonth()+1) +"-" +d.getDate()  + "-" + d.getFullYear();
  //console.log(day_date)

  const make_order_api = () => {
    const day_date =
      d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
    // const day_date = d.getDate() +"-" + (d.getMonth()+1) + "-" + d.getFullYear();
    console.log(day_date);
    console.log(FormValues);
    console.log(props.pharmacyadmin);
    if (cancel1 === true) {
      order_details = {
        adminEmail: props.pharmacyadmin,
        flag: "text",
        form: JSON.stringify(order),
        date: day_date,
        address: FormValues.address,
        phone: FormValues.number,
      };
    } else if (cancel2 === true) {
      order_details = {
        adminEmail: props.pharmacyadmin,
        flag: "image",
        form: FormValues.imageurl, //image
        date: day_date,
        address: FormValues.address,
        phone: FormValues.number,
      };
    }
    axios
      .post(
        "https://future-medical.herokuapp.com/user/pharmacy/order",
        order_details,
        {
          headers: {
            Authorization: `Bearer ${token.token}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        setFormvalues({}); // to make form empty

        alert(
          " The order added successfully , you can see it from your profile"
        );
        props.setfalseloading(); //REQUEST DONE NOT LOADING
      })
      .catch((err) => {
        if (err.response) {
          if(err.response.data === "not authorized, token is failed"){
            dispatch(logout());
            navigate("/login")
          }
        }
      });
  };
  useEffect(() => {
    console.log("render");
    if (props.loading) {
      props.setshow();
    }
  }, [props.loading]);

  useEffect(() => {
    console.log("render");
    if (props.show == false) {
      // lw at2flt n init values
      setFormerrors({});
      setFormvalues({});
    }
  }, [props.show]);

  const handlechange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    //console.log(e)
    setFormvalues({ ...FormValues, [name]: value });

    if (issubmit) {
      setFormerrors(validate({ ...FormValues, [name]: value }));
    }
  };

  function validate(values) {
    const errors = {};
    const regx = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

    if (!values.number) {
      errors.number = "Number is required!";
    } else if (values.number.length !== 11) {
      errors.number = "Not valid phone number";
    }
    if (!values.address) {
      errors.address = "Address is required!";
    }
    if (!values.image && order.length === 0) {
      errors.image = "prescription image is required!";
    }

    return errors;
  }
  const formHandler = (e) => {
    e.preventDefault();
    setFormerrors(validate(FormValues));
    setissubmit(true);
    if (Object.keys(validate(FormValues)).length === 0) {
      if (cancel2 === true) {
        upload(e.target[0].files[0]);
        props.setloading();
      } //make loading true
      else if (cancel1 === true) {
        make_order_api();
      }
      props.onHide(); //hide this modal to show modal with loading iteam
      // setcancel(false);
      // setcancel2(false);
    }
    //setloading(true)
  };

  const upload = (file) => {
    console.log("start of upload");
    // async magic goes here...
    const storageRef = ref(
      storage,
      `/files/prescription/${file.name}${d.getTime()}`
    );
    const uploadTask = uploadBytesResumable(storageRef, file);

    //initiates the firebase side uploading
    uploadTask.on(
      "state_changed",
      (snapShot) => {
        //takes a snap shot of the process as it is happening
        console.log(snapShot);
      },
      (err) => {
        //catches the errors
        console.log(err);
      },
      () => {
        // gets the functions from storage refences the image storage in firebase by the children
        // gets the download url then sets the image from firebase as the value for the imgUrl key:
        getDownloadURL(uploadTask.snapshot.ref).then((fireBaseUrl) => {
          console.log(fireBaseUrl);
          FormValues.imageurl = fireBaseUrl;
          props.onHide(); // When uploaded hide the modal
          make_order_api();
        });
      }
    );
  };

  console.log(props.loading);
  return (
    <>
      {props.loading === false && (
        <>
          <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <div style={{ color: "#064e68" }}>
                <Modal.Title id="contained-modal-title-vcenter">
                  <strong> Welcome to {props.pharmacyname} </strong>
                </Modal.Title>
                <span style={{ marginRight: "2rem" }}>
                  {" "}
                  <i class="bi bi-geo-alt-fill"></i> {props.pharmacyaddress}
                </span>
                <span>
                  {" "}
                  <i class="bi bi-telephone-fill"></i> {props.pharmacyphone}
                </span>
              </div>
            </Modal.Header>
            <Modal.Body>
              <>
                <h5 style={{ color: "#064e68" }}>Make Your Order</h5>
                <Form onSubmit={formHandler}>
                  {
                    <Form.Group className="mb-3">
                      <Form.Label>Upload your prescription</Form.Label>
                      <Row>
                        <Col>
                          <Form.Control
                            onChange={(e) => {
                              handlechange(e);
                              setcancel2(true);
                            }}
                            name="image"
                            type="file"
                            disabled={cancel1}
                            placeholder="Enter prescription image "
                          />
                          <p
                            style={{
                              padding: "0",
                              color: "red",
                              marginTop: "6px",
                            }}
                          >
                            {Formerrors.image}
                          </p>
                        </Col>
                        <Col className="or-container">
                          <p className="or_order">- or - </p>
                        </Col>
                        <Col>
                          <Button
                            style={{
                              backgroundColor: "#064e68",
                              borderColor: "#064e68",
                            }}
                            disabled={cancel2}
                            onClick={(e) => {
                              setcancel(true);
                              setshow_pres(true);
                            }}
                          >
                            Choose from your Prescriptions
                          </Button>
                          {show_pres_order && (
                            <Choose_pres
                              show={show_pres_order}
                              set_order={set_order}
                              setshow={setshow_pres}
                              cancel={setcancel}
                            />
                          )}
                        </Col>
                      </Row>
                    </Form.Group>
                  }
                  <Row>
                    <Col>
                      <Form.Group className="mb-3" controlId="formGridaddress">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                          onChange={(e) => handlechange(e)}
                          value={FormValues.address}
                          name="address"
                          type="text"
                          placeholder="Enter your address "
                        />
                        <p
                          style={{
                            padding: "0",
                            color: "red",
                            marginTop: "6px",
                          }}
                        >
                          {Formerrors.address}
                        </p>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group className="mb-3" controlId="formGridnumber">
                        <Form.Label>Phone number</Form.Label>
                        <Form.Control
                          onChange={(e) => handlechange(e)}
                          value={FormValues.number}
                          name="number"
                          type="text"
                          placeholder="Enter your phone number "
                        />
                        <p
                          style={{
                            padding: "0",
                            color: "red",
                            marginTop: "6px",
                          }}
                        >
                          {Formerrors.number}
                        </p>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button
                    style={{
                      backgroundColor: "#064e68",
                      borderColor: "#064e68",
                      marginRight: "1rem",
                    }}
                    type="submit"
                  >
                    Submit Your order
                  </Button>
                  <Button
                    style={{
                      backgroundColor: "#064e68",
                      borderColor: "#064e68",
                    }}
                    onClick={(e) => {
                      props.onHide();
                      setcancel(false);
                      setcancel2(false);
                    }}
                  >
                    Cancel
                  </Button>
                </Form>
              </>
            </Modal.Body>
            {/*<Modal.Footer>
        <Button type='submit'  onClick={props.onHide}>Close</Button>
</Modal.Footer>*/}
          </Modal>{" "}
        </>
      )}

      {props.loading === true && (
        <>
          <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <div style={{ color: "#064e68" }}>
                <Modal.Title id="contained-modal-title-vcenter">
                  <strong> Welcome to {props.pharmacyname} </strong>
                </Modal.Title>
                <span style={{ marginRight: "2rem" }}>
                  {" "}
                  <i class="bi bi-geo-alt-fill"></i> {props.pharmacyaddress}
                </span>
                <span>
                  {" "}
                  <i class="bi bi-telephone-fill"></i> {props.pharmacyphone}
                </span>
              </div>
            </Modal.Header>
            <Modal.Body>
              {/* <PlaceholderLoading shape="circle" width={100} height={100} /> {/* While uploading pic to firebase */}
              <CircularProgress />
            </Modal.Body>
          </Modal>{" "}
        </>
      )}
    </>
  );
}

export default PharmacyOrder;
