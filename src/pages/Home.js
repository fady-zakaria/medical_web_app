import React, { useEffect, useState, useRef } from "react";
import Slider from "../components/Home_Slider/Slider";
import Announcment from "../components/Home_Announcment/Announcment";
import HighlyRated from "../components/Highly_Rated_DR/HighlyRated";
import Departmets from "../components/Specialization/Departmets";
import axios from "axios";
const Home = (props) => {
  const ScrollRef = useRef(null);

  const [doctors, setdoctors] = useState([]);
  const [announcments, setannouncments] = useState([]);
  const Get_Home_Components = () => {
    axios
      .get(`https://future-medical.herokuapp.com/home`)
      .then((res) => {
        console.log(res.data);
        setdoctors(res.data.doctors);
        setannouncments(res.data.announcements);
        /*if(res.data !== "this entity has no doctors right now") //not rated 
{
setdoctors(res.data)}*/
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    Get_Home_Components();
  }, []);

  return (
    <>
      <Slider refProp={ScrollRef} />
      <Announcment Announcments={announcments} />
      <Departmets refProp={ScrollRef} />
      <HighlyRated Doctors={doctors} />
    </>
  );
};

export default Home;
