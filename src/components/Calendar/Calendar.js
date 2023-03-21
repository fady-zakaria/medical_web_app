import { React, useRef, useEffect, useState } from "react";
import { ListGroup, Row, Col, Button } from "react-bootstrap";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import "./cal.css";
import mom from "moment-timezone";
import { BsFillSunFill, BsMoonStarsFill, BsClockFill } from "react-icons/bs";
import { selected_slot, signin } from "../../actions";
import axios from "axios";
import Carousel from "react-grid-carousel";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Reserve_Date from "./Reserve_Date";
import Backdrop from "@mui/material/Backdrop";
import Coupon from "../Coupon/Coupon";
import { useNavigate } from "react-router-dom";
import Login from "../../pages/Login & Sign Up/login_f";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import {logout} from '../../actions';
import {
  Route,
  BrowserRouter,
  Link,
  Navigate as Router,
  Routes,
} from "react-router-dom";
//import {Link , BrowserRouter} from "react-dom"
const Calendar = (props) => {
  //console.log(props);
  const navigate = useNavigate();
  const login = () => {
    navigate("/login");
  };
  useEffect(() => {
    dispatch(selected_slot({})); //EMPTY
  }, []);
  console.log(props.data.timetable);
  const dispatch = useDispatch();
  const slot_state = JSON.parse(
    useSelector((state) => state.reserving_reducer)
  );
  console.log("slot_state", slot_state);
  console.log(props.data.id);
  const config = { headers: { Authorization: `Bearer ${props.data.token}` } };
  var reserved_slots = [];
  const Get_timetable = async (date) => {
    try {
      const res = await axios.get(
        `https://future-medical.herokuapp.com/user/timetable/${props.data.id}/${date}`
      );
      const data = await res.data;
      console.log(data);
      if (data == "no reservations in this date") {
        return [];
      }

      for (var i = 0; i < data.length; i++) {
        reserved_slots.push(data[i].slot);
      }

      return reserved_slots;
    } catch (err) {
      console.error(err);
    }
  };

  const Get_Reserve = async (r) => {
    try {
      const res = await axios.post(
        `https://future-medical.herokuapp.com/user/reservation/meeting`,
        { doctorEmail: r.doctorEmail, date: r.date, day: r.day, slot: r.slot },
        config
      );
      const data = await res.data;
      console.log(data);
      // alert(data);
      dispatch(selected_slot({})); //EMPTY
    } catch (err) {
      if (err.response) {
        if(err.response.data === "not authorized, token is failed"){
          dispatch(logout());
          navigate("/login")
        }
      }
    }
  };

  let momentObject = moment();
  mom.tz.setDefault("Egypt/Cairo");

  var dr_app = [];
  for (var i = 0; i < props.data.timetable.length; i++) {
    const f = props.data.timetable[i].from.split(":");
    const t = props.data.timetable[i].to.split(":");
    dr_app.push({ day: props.data.timetable[i].day, from: f[0], to: t[0] });
  }
  var days = [];

  for (var i = 0; i < 7; i++) {
    const day = moment().add(i, "day");
    for (var j = 0; j < dr_app.length; j++) {
      if (day.format("dddd") === dr_app[j].day) {
        days.push(day);
        break;
      }
    }
  }

  const [mor, setmor] = useState([]);
  const [eve, seteve] = useState([]);
  const [data, setdata] = useState("");

/*useEffect(()=>{
  handle_slots();
},[])*/  
  const handle_slots =(list , flag_timing,date)=>{
    //console.log("coming list",list)
    console.log("day date",date.split("-"))
    var return_list = [];
    var current = new Date();
     console.log("timenow",`${current.getHours()}:${current.getMinutes()}`)
     console.log("datenow",`${current.getMonth()+1}:${current.getDate()}`)
     console.log("given date",`${date.split("-")[1]}:${date.split("-")[2]}`)
     if (!(date.split("-")[2] == current.getDate() && date.split("-")[1] == current.getMonth()+1))
     {
      console.log("nottt same dateeeeeeeeeeeeeeeeee")
      if(flag_timing == "morning")
    {
      setmor(list)
    }
    else if (flag_timing == "night")
    {
      seteve(list)
    }
    return ;
     }
    else { 
    for (var i = 0 ; i < list.length ; i++)
    {
      var compared_slot = list[i].slot.split('-')[1].split(':')  ; 
      var compared_hour = compared_slot[0]
      var compared_mins = compared_slot[1]
       console.log("compared_slot",`${compared_hour}:${compared_mins}`)
        if (current.getHours()>compared_hour)
     {
      console.log("not pushed")
     }
     else if (current.getHours()==compared_hour && current.getMinutes() > compared_mins)
     {
         console.log("not pushed")
     }
     else{
       return_list.push(list[i])
     }
      
    }
    console.log("return list ",return_list);
    if(flag_timing == "morning")
    {
      setmor(return_list)
    }
    else if (flag_timing == "night")
    {
      seteve(return_list)
    }
  }
  }


  const get_slots = (e, item) => {
    setdone_reserve(false);
    setdata(item); //to know the day and date clicked

    var morning_shifts = [];
    var evening_shifts = [];
    const day = item.format("dddd");
    //const date = `${item.format("dd-MM-YYYY")}`
    const date = `${
      item.format("YYYY") + "-" + item.format("MM") + "-" + item.format("D")
    }`; //to api

    console.log(date);
    //const d= new Date();
    //const date_test = `${ite.getFullYear() +"-"+(d.getMonth()+1)+ "-"+ d.getDate()}`
    //d.getFullYear() +"-"+(d.getMonth()+1)+ "-"+ d.getDate()
    dispatch(selected_slot({ slot: slot_time, date: date })); //WHEN CHANGE THE DAY
    (async () => {
      var reserved = await Get_timetable(date);
      console.log(reserved);

      for (var i = 0; i < dr_app.length; i++) {
        if (dr_app[i].day === day) {
          //check day
          if (dr_app[i].from < 12 && dr_app[i].to <12) {
            const num_slots =
              parseInt(parseInt(dr_app[i].to) - parseInt(dr_app[i].from)) * 2;
            console.log(num_slots);
            var c = parseInt(dr_app[i].from);
            var d = parseInt(dr_app[i].from) + 1;

            for (var k = 0; k < num_slots; k++) {
              //check for slot state
              if (k % 2 === 0) {
                if (reserved.includes(`${c}:00 - ${c}:30`)) {
                  morning_shifts.push({
                    slot: `${c}:00 - ${c}:30`,
                    state: true,
                  });
                } else {
                  morning_shifts.push({
                    slot: `${c}:00 - ${c}:30`,
                    state: false,
                  });
                }
              } else {
                if (reserved.includes(`${c}:30 - ${d}:00`)) {
                  morning_shifts.push({
                    slot: `${c}:30 - ${d}:00`,
                    state: true,
                  });
                } else {
                  morning_shifts.push({
                    slot: `${c}:30 - ${d}:00`,
                    state: false,
                  });
                }

                c += 1;
                d += 1;
              }
            }
          } else if (dr_app[i].from >= 12 ) {
            const num_slots =
              parseInt(parseInt(dr_app[i].to) - parseInt(dr_app[i].from)) * 2;
            console.log(num_slots);
            var c = parseInt(dr_app[i].from);
            var d = parseInt(dr_app[i].from) + 1;
            for (var k = 0; k < num_slots; k++) {
              if (k % 2 === 0) {
                if (reserved.includes(`${c}:00 - ${c}:30`)) {
                  evening_shifts.push({
                    slot: `${c}:00 - ${c}:30`,
                    state: true,
                  });
                } else {
                  evening_shifts.push({
                    slot: `${c}:00 - ${c}:30`,
                    state: false,
                  });
                }
              } else {
                if (reserved.includes(`${c}:30 - ${d}:00`)) {
                  evening_shifts.push({
                    slot: `${c}:30 - ${d}:00`,
                    state: true,
                  });
                  c += 1;
                  d += 1;
                } else {
                  evening_shifts.push({
                    slot: `${c}:30 - ${d}:00`,
                    state: false,
                  });
                  c += 1;
                  d += 1;
                }
              }
            }
          }
          else if (dr_app[i].from < 12 && dr_app[i].to >= 12) {
            const num_slots =
              parseInt(parseInt(dr_app[i].to) - parseInt(dr_app[i].from)) * 2;
            console.log(num_slots);
            var c = parseInt(dr_app[i].from);
            var d = parseInt(dr_app[i].from) + 1;
            for (var k = 0; k < num_slots; k++) {
              if (k % 2 === 0) {
                if (reserved.includes(`${c}:00 - ${c}:30`)) {
                  if(c<12)
                  {morning_shifts.push({
                    slot: `${c}:00 - ${c}:30`,
                    state: true,
                  });}
                  else
                  {evening_shifts.push({
                    slot: `${c}:00 - ${c}:30`,
                    state: true,
                  });}
                } else {
                  if(c<12)
                  {morning_shifts.push({
                    slot: `${c}:00 - ${c}:30`,
                    state: false,
                  });}
                  else{
                    evening_shifts.push({
                      slot: `${c}:00 - ${c}:30`,
                      state: false,
                    });
                  }
                }
              } else {
                if (reserved.includes(`${c}:30 - ${d}:00`)) {
                  if(c<12){morning_shifts.push({
                    slot: `${c}:30 - ${d}:00`,
                    state: true,
                  });}
                  else{
                    evening_shifts.push({
                      slot: `${c}:30 - ${d}:00`,
                      state: true,
                    });
                  }
                  c += 1;
                  d += 1;
                } else {
                  if(c<12)
                  {morning_shifts.push({
                    slot: `${c}:30 - ${d}:00`,
                    state: false,
                  });}
                  else{
                    evening_shifts.push({
                      slot: `${c}:30 - ${d}:00`,
                      state: false,
                    });
                  }
                  c += 1;
                  d += 1;
                }
              }
            }
          }
        }
      }
      handle_slots(morning_shifts,"morning",date);
      handle_slots(evening_shifts,"night",date);
      //setmor(morning_shifts);
      //seteve(evening_shifts);
    })();
  };

  // Notification
  const [notification, setNotification] = useState({
    open: false,
    vertical: "top",
    horizontal: "right",
  });

  const { vertical, horizontal, open } = notification;

  const [can, setcan] = useState(false);
  const [slot_time, setslot] = useState("");
  let r = {};
  const reserve = (e, slot) => {
    console.log("event", e);
    console.log("time_slot", slot_time);
    e.preventDefault();
    //let y = `${data.format("DD-MM-YYYY")}`;
    let y = `${
      data.format("YYYY") + "-" + data.format("MM") + "-" + data.format("D")
    }`;
    r.doctorEmail = props.data.email;
    r.date = y;
    y = `${data.format("dddd")}`;
    r.day = y;
    r.slot = slot;
    console.log(r);
    Get_Reserve(r);
    setdone_reserve(true);
    setcan(false);
    setslot("");
    // handleopennotify();

    console.log("reversed is done from coupon");
  };

  const reserve_button = (e) => {
    setNotification({ ...notification, open: true });
    setTimeout(() => {
      reserve(e, slot_time);
    }, 2000);
    setTimeout(() => {
      SetValidCode(false);
      Closing_notify();
    }, 5000);
  };

  const handleopennotify = () => {
    setNotification({ ...notification, open: true });
  };

  const Closing_notify = () => {
    setNotification({ ...notification, open: false });
  };

  const [done_reserve, setdone_reserve] = useState(false);

  // Backdrop code
  const [open_back, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  // Coupon_Code
  const [valid_code, SetValidCode] = useState(false);

  return (
    <ListGroup variant="flush">
      <div>
        <ListGroup.Item>
          <Row>
            <Col>
              <div className="Calender_buttons">
                <Carousel
                  cols={7}
                  rows={1}
                  gap={1}
                  responsiveLayout={[
                    {
                      breakpoint: 1200,
                      cols: 5,
                    },
                    {
                      breakpoint: 990,
                      cols: 3,
                    },
                    {
                      breakpoint: 550,
                      cols: 1,
                    },
                  ]}
                  mobileBreakpoint={670}
                  arrowRight={<ChevronRightIcon className="right-arrow" />}
                  arrowLeft={<ChevronLeftIcon className="left-arrow" />}
                >
                  {days.map((item, index) => (
                    <Carousel.Item key={index}>
                      <button
                        type="button"
                        id="calender-btn"
                        class="btn"
                        onClick={(e) => get_slots(e, item)}
                      >
                        <Reserve_Date
                          day={item.format("DD")}
                          month={item.format("MMM")}
                          date={item.format("dddd")}
                          year={item.format("YYYY")}
                        />
                      </button>
                    </Carousel.Item>
                  ))}
                </Carousel>
              </div>
            </Col>
          </Row>
          <br />
          <Row>
            <h6>
              <BsFillSunFill style={{ color: "#ffe135" }} />
              {done_reserve ? (
                <strong>0 Slots</strong>
              ) : (
                <strong>{mor.length} Slots</strong>
              )}
            </h6>
            <Col>
              <div className="slots-UI">
                {done_reserve
                  ? ""
                  : mor.map((item) => (
                      <Button
                        onClick={() => {
                          !props.data.token
                            ? login()
                            :
                          dispatch(
                            selected_slot({
                              slot: item.slot,
                              date: `${data.format("DD-MM-YYYY")}`,
                            })
                          );
                          setslot(item.slot);
                          setcan(true);
                          console.log("MADONNA", item);
                        }}
                        variant="outline-primary"
                        disabled={item.state}
                        style={{ color: "black", marginRight: "10px" }}
                      >
                        {item.slot}
                      </Button>
                    ))}
              </div>
            </Col>
          </Row>
          <br />
          <Row>
            <h6>
              <BsMoonStarsFill style={{ color: "#273be2" }} />
              {done_reserve ? (
                <strong>0 Slots</strong>
              ) : (
                <strong>{eve.length} Slots</strong>
              )}
            </h6>
            <Col>
              <div className="slots-UI">
                {done_reserve
                  ? ""
                  : eve.map((item) => (
                      <Button
                        onClick={() => {
                          !props.data.token
                            ? login()
                            : dispatch(
                                selected_slot({
                                  slot: item.slot,
                                  date: `${data.format("DD-MM-YYYY")}`,
                                })
                              );
                          setslot(item.slot);
                          setcan(true);
                          console.log("MADONNA", item);
                        }}
                        variant="outline-primary"
                        style={{ color: "black", marginRight: "1px" }}
                        disabled={item.state}
                      >
                        {item.slot}
                      </Button>
                    ))}
              </div>
            </Col>
          </Row>
          <br />
          {slot_state.slot != "" &&
          slot_state.date != "" &&
          slot_state.slot &&
          slot_state.date &&
          !done_reserve &&
          props.data.token ? (
            <>
              <Row>
                <Col>
                  <BsClockFill />{" "}
                  {/*<label>{`${data.format("DD-MM-YYYY")}`} {slot_time}</label>*/}
                  {
                    <label>
                      {slot_state.date} {slot_state.slot}
                    </label>
                  }
                </Col>
                <Col>
                  {/* <Button onClick={(e) => reserve(e, slot_time)}>
                    Reserve
                  </Button> */}
                  {valid_code && (
                    <h6 style={{ color: "green", marginLeft: "-20px" }}>
                      Coupon Added ✔
                    </h6>
                  )}
                  {valid_code && (
                    <div>
                      <Button onClick={reserve_button}>Reserve</Button>
                      <Snackbar
                        anchorOrigin={{ vertical, horizontal }}
                        open={open}
                        onClose={Closing_notify}
                        key={vertical + horizontal}
                      >
                        <Alert
                          onClose={Closing_notify}
                          severity="success"
                          variant="filled"
                          sx={{ width: "100%" }}
                        >
                          Reserving Meeting is Done succufully
                        </Alert>
                      </Snackbar>
                    </div>
                  )}
                  {!valid_code && <Button onClick={handleOpen}>Reserve</Button>}

                  <Backdrop
                    sx={{
                      color: "#fff",
                      zIndex: (theme) => theme.zIndex.drawer + 1,
                    }}
                    open={open_back}
                  >
                    <Coupon validcode={SetValidCode} close={handleClose} />
                  </Backdrop>
                </Col>
              </Row>
            </>
          ) : (
            ""
          )}
        </ListGroup.Item>
      </div>
      <br />
    </ListGroup>
  );
};
export default Calendar;
