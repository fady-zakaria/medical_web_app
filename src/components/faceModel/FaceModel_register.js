import axios from "axios";
import "./login.css";
import { Button, Container, Row, Col } from "react-bootstrap";
import Webcam from "react-webcam";
import { useRef, useState } from "react";
import { db } from "./firebase";
import {
  doc,
  setDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { Spinner } from "react-bootstrap";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signin } from "../../actions";
const FaceModel_register = () => {
  // let [imgCount, setImgCount] = useState(0);
  // let img = "No Image";
  // // 1)

  const { state } = useLocation();
  const { data } = state;
  console.log(data);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const register_api = (data) => {
    console.log("MADONNAAAA", data);
    axios
      .post("https://future-medical.herokuapp.com/register", {
        username: data.username,
        email: data.email,
        password: data.password,
        address: data.add,
        blood: data.blood,
        dateOfBirth: data.dob,
        phone: data.phone,
        gender: data.gender,
      })
      .then((res) => {
        console.log(res.data);
        dispatch(signin(res.data)); //save the data
        navigate("/"); //Go to Home
      })
      .catch(function (error) {
        setloading(false);
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
        }
      });
  };
  let allImages = [];
  let imgCount = 0;
  const [counter, setcounter] = useState(0);
  const [loading, setloading] = useState(false);
  const webRef = useRef(null);
  let img = "No Image";
  const showImage = () => {
    img = webRef.current.getScreenshot();
    //console.log(img);
    imgCount++;
    upload(img, `${imgCount}`); // sec argument unique id
    get_all_data();
    //get_specific_data("tharwat") // parameter key value to search
    setcounter(parseInt(counter) + 1);
    if (counter == 10) setdone(true);
  };
  const [done, setdone] = useState(false);

  // 2)
  const upload = async (image, uniqueid) => {
    await setDoc(doc(db, "login@gmail.com", uniqueid), {
      key: "login@gmail.com",
      base64: `${image}`,
    });
  }; //we may add key {key:"gg",base64:image}

  const get_all_data = async () => {
    const querySnapshot = await getDocs(collection(db, "model images"));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data().base64);
    });
  };

  const get_specific_data = async (key) => {
    const q = query(
      collection(db, "model images"),
      where("key", "==", `${key}`)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data().base64);
    });
  };

  return (
    <>
      {!loading ? (
        <div className="login_sigup_container">
          <Container>
            <div className="form-container_login">
              <h1
                // className="shadow-sm mt-5 p-3 text-center rounded"
                style={{ color: "#06a3da", marginTop: "30px" }}
              >
                Image
              </h1>
              <br />
              <div className="form-details_login">
                <div className="login_camera_container">
                  <Webcam
                    ref={webRef}
                    className="CameraDim"
                    videoConstraints={{
                      width: 480,
                      height: 480,
                      aspectRatio: 1,
                    }}
                  />
                </div>
                <br />
                <div className="d-grid">
                  {!done ? (
                    <Button
                      variant="primary btn-block"
                      type="submit"
                      onclick={showImage}
                    >
                      Take Image {counter}
                    </Button>
                  ) : (
                    <Button
                      variant="primary btn-block"
                      type="submit"
                      onSubmit={(e) => register_api(data)}
                    >
                      Register
                    </Button>
                  )}
                </div>
                <br />
              </div>
            </div>
          </Container>
        </div>
      ) : (
        <div style={{ margin: "auto" }}>
          <Spinner animation="border" variant="primary" />
        </div>
      )}
    </>
    // <div className="App">
    // 	<h1> Welcome </h1>

    // 	<Webcam
    // 		ref={webRef}
    // 		className="CameraDim"
    // 		videoConstraints={{
    // 			width: 720,
    // 			height: 720,
    // 			aspectRatio: 1,
    // 		}}
    // 	/>
    // 	<Button
    //           variant="primary btn-block"
    //           type="submit"
    //           onclick={showImage}
    //         >
    //           Login
    //         </Button>
    // </div>
  );
};

export default FaceModel_register;
