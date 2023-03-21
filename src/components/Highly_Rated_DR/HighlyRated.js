import React, { useState, useEffect } from "react";
import { HighlyRatedDr } from "../../data";
import "bootstrap/dist/css/bootstrap.min.css";
// import Carousel from "react-bootstrap/Carousel";
import "./custom.css";
import axios from "axios";
import Onedoctor from "./Onedoctor";

const HighlyRated = ({ Doctors }) => {
  console.log(Doctors);
  //const [doctors,setdoctors] =useState( Doctors );
  //console.log(doctors)
  /*useEffect(()=>{
Get_Doctors_Entity();
},[])*/

  return (
    <div>
      <section className="section-container">
        <div className="title-info">
          <h1 className="title-h1">Top Rated Doctors</h1>
        </div>
        <div className="doctors-container">
          {Doctors.length !== 0 &&
            Doctors.map(
              (doctor) =>
                doctor.rate >= 4 && (
                  <Onedoctor doctor={doctor} key={doctor.id} />
                )
            )}
        </div>
      </section>
    </div>
  );
};

// <div class="container-md py-6 update-font">
//   <div class="container">
//     <div class="text-center mx-auto mb-5" style={{ maxWidth: 500 + "px" }}>
//       <h1 class="display-4">Top Rated Doctors</h1>
//     </div>
//     {/* {HighlyRatedDr.map((doctor) => ( */}

//     {/* ))} */}
//   </div>
// </div>
{
  /* <Carousel class="owl-carousel team-carousel position-relative"> */
}
{
  /* <div className="inner-data"> */
}
{
  /* <Carousel.Item class="team-item" key={doctor.id}> */
}
{
  /* <div class="team-item" key={doctor.id}>
              <div class="row g-0 bg-light rounded overflow-hidden">
                <div class="col-10 col-sm-5 h-100">
                  <img
                    alt={doctor.name}
                    class="img-fluid h-80"
                    src={doctor.image}
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div class="col-12 col-sm-7 h-100 d-flex flex-column">
                  <div class="mt-auto p-4">
                    <h3>Dr. {doctor.name}</h3>
                    <h6 class="fw-normal fst-italic text-primary mb-4">
                      {doctor.specialization}
                    </h6>
                    <p class="m-0">
                      Dolor lorem eos dolor duo eirmod sea. Dolor sit magna
                      rebum clita rebum dolor
                    </p>
                  </div>
                </div>
              </div>
            </div> */
}

{
  /* </div> */
}
{
  /* </Carousel> */
}
{
  /* <div
          id="carouselExampleControls"
          class="carousel slide"
          data-bs-ride="carousel"
        >
          <div class="carousel-inner">
            {HighlyRatedDr.map((doctor) => (
              <div class="carousel-item" key={doctor.id}>
                <div class="row g-0 bg-light rounded overflow-hidden">
                  <div class="col-10 col-sm-5 h-100">
                    <img
                      alt={doctor.name}
                      class="img-fluid h-80"
                      src={doctor.image}
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div class="col-12 col-sm-7 h-100 d-flex flex-column">
                    <div class="mt-auto p-4">
                      <h3>Dr. {doctor.name}</h3>
                      <h6 class="fw-normal fst-italic text-primary mb-4">
                        {doctor.specialization}
                      </h6>
                      <p class="m-0">
                        Dolor lorem eos dolor duo eirmod sea. Dolor sit magna
                        rebum clita rebum dolor
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button
            class="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button
            class="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
        */
}

{
  /* <h5 class="d-inline-block text-primary text-uppercase border-bottom border-5">
            Our Doctors
          </h5> */
}

{
  /* <div class="d-flex mt-auto border-top p-4"> */
}
{
  /* <a
                    class="btn btn-lg btn-primary btn-lg-square rounded-circle me-3"
                    href="/"
                  >
                    <i class="fab fa-twitter"></i>
                  </a> */
}
{
  /* <a
                    class="btn btn-lg btn-primary btn-lg-square rounded-circle me-3"
                    href="/"
                  >
                    <i class="fab fa-facebook-f"></i>
                  </a> */
}
{
  /* <a
                    class="btn btn-lg btn-primary btn-lg-square rounded-circle"
                    href="/"
                  >
                    <i class="fab fa-linkedin-in"></i>
                  </a> */
}
{
  /* </div> */
}

export default HighlyRated;
