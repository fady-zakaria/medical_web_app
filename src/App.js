import React, { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Home from "./pages/Home";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import alanBtn from "@alan-ai/alan-sdk-web";
import { useSelector } from "react-redux";
import Doctorscards from "./pages/Doctorspeacialiazation";
import { useNavigate } from "react-router-dom";
import Doctor from "./pages/profiles/Doctor_profile";
import Login from "./pages/Login & Sign Up/login_f";
import Signup from "./pages/Login & Sign Up/signup";
import { useLocation } from "react-router-dom";
import Privateroute from "./components/PrivateRoutes/Privateroute";
import Privateuser from "./components/PrivateRoutes/Privateuser";
import Privateclinicadmin from "./components/PrivateRoutes/Privateclinicadmin";
import Privatehospitaladmin from "./components/PrivateRoutes/Privatehospitaladmin";
import Privatepharmacyadmin from "./components/PrivateRoutes/Privatepharmacyadmin";
import Privatedoctor from "./components/PrivateRoutes/Privatedoctor";
import ScrollToTop from "./components/ScrollToTop/Scrolltop";
import HospitalsPage from "./pages/HospitalsPage/HospitalsPage";
import DoctorsHospitals from "./pages/DoctorsHospitals";
import Chatbotui from "./components/ChatBotUI/Chatbotui";
import Speech from "./components/SpeechRecoginition/Speech";
import Voice from "./components/SpeechRecoginition/Voice";
import ProfileUI from "./pages/profiles/ProfileUI";
import VideoCall from "./components/Meeting_room/Video_chat/VideoCall";
import Payment from "./components/Coupon/Coupon";
import Maps from "./components/Maps/Maps";
import Complaint from "./components/Complaints/complaints";
// import Reg_face from "./components/Facemodel/FaceModel_register";
// import Login_face from "./components/Facemodel/FaceModel";
import Login_face from "./components/faceModel/FaceModel";
import Reg_face from "./components/faceModel/FaceModel_register";

function App() {
  let navigate = useNavigate();
  const location = useLocation();
  console.log(location);
  const [clicked_department, setclicked_department] = useState("");
  const alan_key =
    "b94fcad9e16e84e2cfb67521c2729b4b2e956eca572e1d8b807a3e2338fdd0dc/stage";
  var greetingWasSaid = false;
  //var alanBtnInstance = alanBtn({ });
  useEffect(() => {
    /*var alanBtnInstance = alanBtn({
  key: alan_key , 
  onButtonState: async function(status) {
    if (status === 'ONLINE') {
      if (!this.greetingWasSaid) {
        await alanBtnInstance.activate();
        alanBtnInstance.playText("Hello! I'm Alan. How can I help you?");
        this.greetingWasSaid = true
      }
    }
  },
  onCommand : ({command , department})=>{
   switch(command){
     case "DepartmentDoctors" :
        console.log(department);
        setclicked_department(department)
         navigate(`/Doctors/${department}`);
        //navigate('/Doctors/1')
     default :
        break   
   }
  }
})*/
  }, []);

  const chosencomp = useSelector((state) => state.sidebarcomp);
  console.log(chosencomp);
  return (
    <>
      {location.pathname !== "/user/meetingroom" && <Header />}
      <ScrollToTop>
        <div
          className={
            location.pathname === "/user/meetingroom"
              ? "body-without-top"
              : "body"
          }
        >
          <Routes>
            {<Route path="/" element={<Home />}></Route>}
            {/*/<Route path="/" element={<Modelface/>}></Route>*/}

            {/*<Route path="/" element={<Payment />}></Route>*/}
            <Route path="/Doctors/:Deptname" element={<Doctorscards />}></Route>
            <Route path="/login_face" element={<Login_face />}>
              {" "}
            </Route>
            <Route path="/login" element={<Login />}>
              {" "}
            </Route>
            <Route path="/signup" element={<Signup />}>
              {" "}
            </Route>
            <Route path="/takeimage" element={<Reg_face />}>
              {" "}
            </Route>
            <Route path="/Entities/:entity" element={<HospitalsPage />}>
              {" "}
            </Route>
            <Route
              path="/DoctorsEntity/:entityname"
              element={<DoctorsHospitals />}
            >
              {" "}
            </Route>
            <Route path="/doctor/:docname" element={<Doctor />}>
              {" "}
            </Route>
            {/*<Route
              path="/doctor"
              element={
                <Privatedoctor>
                  {" "}
                  <Clinicdoctor />{" "}
                </Privatedoctor>
              }
            />*/}

            {/*<Route
              path="/user"
              element={
                <Privateuser>
                  {" "}
                  <Profile />{" "}
                </Privateuser>
              }
            />*/}
            <Route
              path="/user"
              element={
                <Privateuser>
                  <ProfileUI />
                </Privateuser>
              }
            />
            <Route path="/user/meetingroom" element={<VideoCall />}></Route>
            <Route path="/maps" element={<Maps />}></Route>
            <Route path="/complaint" element={<Complaint />}></Route>
          </Routes>
          {location.pathname !== "/user/meetingroom" && (
            <>
              <Chatbotui />
              <Speech />
              <Footer />
            </>
          )}
        </div>
      </ScrollToTop>
    </>
  );
}

export default App;
