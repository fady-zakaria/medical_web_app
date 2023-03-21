import React, { useState, useEffect } from "react";
import { BiMessageDetail } from "react-icons/bi";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, ButtonGroup, Form } from "react-bootstrap";
import EditIcon from "@material-ui/icons/Edit";
import { useSelector, useDispatch } from "react-redux";
import { signin , logout} from "../../actions";
import { history } from "../../actions";

import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import TabPanel from "../Floating_Buttons/TabPanel";
import { useNavigate } from "react-router-dom";

const History = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const token = JSON.parse(useSelector((state) => state.auth));
  console.log(token.token);
  var token_copy = token;

  const config = {
    headers: {
      Authorization: `Bearer ${token.token}`,
    },
  };

  const Edit_history = async (history) => {
    try {
      const res = await axios.patch(
        "https://future-medical.herokuapp.com/user/edit/history",
       history,
        config
      );
      alert(res.data);
      console.log(res.data);
    } catch (err) {
      if (err.response) {
        if(err.response.data === "not authorized, token is failed"){
          dispatch(logout());
          navigate("/login")
        }
      }
    }
  };
  

  // Floating Buttons Code
  const labels = [
    "Surgeries",
    "Diseases - allergies",
    "Family history",
    "Medications",
  ];

  const a11yProps = (index) => {
    return {
      id: `action-tab-${index}`,
      "aria-controls": `action-tabpanel-${index}`,
    };
  };

  const theme = useTheme();
  const [value, setValue] = React.useState(0);
console.log("value", value);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };
  //edit flags
  const [edit_surgeries, setedit_surgeries] = useState(false);
  const [edit_diseases, setedit_diseases] = useState(false);
  const [edit_familyhist, setedit_familyhist] = useState(false);
  const [edit_medications, setedit_medications] = useState(false);
  const edit_history_flags=()=>{
    if(value===0) setedit_surgeries(true);
  else if(value===1) setedit_diseases(true);
  else if(value===2) setedit_familyhist(true);
  else if(value===3) setedit_medications(true);
  }
  const cancel_edits=()=>{
    if(value===0) setedit_surgeries(false);
  else if(value===1) setedit_diseases(false);
  else if(value===2) setedit_familyhist(false);
  else if(value===3) setedit_medications(false);
  }

  //edit history
  const [news, setnews] = useState(token.history.surgeries);
  const [newd, setnewd] = useState(token.history.diseases);
  const [newf, setnewf] = useState(token.history.family_history);
  const [newm, setnewm] = useState(token.history.medications);
 
  const setedit_history = (e) => {
    if(value===0) {token_copy.history.surgeries=news; Edit_history({"history.surgeries":news}); setedit_surgeries(false);}
  else if(value===1) {token_copy.history.diseases=newd; Edit_history({"history.diseases":newd});setedit_diseases(false);}
  else if(value===2) {token_copy.history.family_history=newf; Edit_history({"history.family_history":newf});setedit_familyhist(false);}
  else if(value===3) {token_copy.history.medications=newm; Edit_history({"history.medications":newm}); setedit_medications(false); }
    dispatch(signin(token_copy));
    
  };
  

  return (
    <div className="card">
      <div className="card-header bg-transparent border-0">
        <h3 className="mb-0">
          <BiMessageDetail /> History
          {
            <EditIcon
              style={{ cursor: "pointer" }}
              onClick={(e) => edit_history_flags()}
            />
          }
        </h3>
      </div>
      <div className="card-body pt-2">
        <Box
          sx={{
            // bgcolor: "background.paper",
            bgcolor: "transparent",
            width: "100%",
            position: "relative",
            minHeight: 200,
            fontWeight: "bold",
            fontSize: 19,
          }}
        >
          <AppBar position="static" color="default">
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
              aria-label="action tabs example"
            >
              {labels.map((eachlabel, index) => (
                <Tab
                  key={index}
                  label={eachlabel}
                  {...a11yProps({ index })}
                  sx={{
                    fontWeight: "bold",
                  }}
                />
              ))}
            </Tabs>
          </AppBar>
          <SwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={value}
            onChangeIndex={handleChangeIndex}
          >
            <TabPanel value={value} index={0} dir={theme.direction}>
              <p>
                {edit_surgeries ? (
                  <Form.Control
                    as="textarea"
                    placeholder="Update Surgeries history"
                    value={news}
                    onChange={(e) => setnews(e.target.value)}
                    style={{ height: "100px" }}
                  />
                ) : (
                  //   <input onChange={(e)=>setnewh(e.target.value)}></input>
                  token.history.surgeries
                )}
              </p>

              {edit_surgeries ? (
                //   <Button variant="outline-success" className="col-md-12 text-right" onClick={setedit_history}>Submit</Button>
                <ButtonGroup>
                  <Button
                    variant="outline-success"
                    className="col-md-12 text-right"
                    onClick={(e)=>setedit_history()}
                  >
                    Submit
                  </Button>
                  <Button
                    variant="outline-danger"
                    className="col-md-12 text-right"
                    onClick={(e) => cancel_edits()}
                  >
                    Cancel
                  </Button>
                </ButtonGroup>
              ) : (
                ""
              )}
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
              <p>
                {edit_diseases ? (
                  <Form.Control
                    as="textarea"
                    placeholder="Update Diseases history"
                    value={newd}
                    onChange={(e) => setnewd(e.target.value)}
                    style={{ height: "100px" }}
                  />
                ) : (
                  //   <input onChange={(e)=>setnewh(e.target.value)}></input>
                  token.history.diseases
                )}
              </p>

              {edit_diseases ? (
                //   <Button variant="outline-success" className="col-md-12 text-right" onClick={setedit_history}>Submit</Button>
                <ButtonGroup>
                  <Button
                    variant="outline-success"
                    className="col-md-12 text-right"
                    onClick={(e)=>setedit_history()}
                  >
                    Submit
                  </Button>
                  <Button
                    variant="outline-danger"
                    className="col-md-12 text-right"
                    onClick={(e) => cancel_edits()}
                  >
                    Cancel
                  </Button>
                </ButtonGroup>
              ) : (
                ""
              )}
            </TabPanel>
            <TabPanel value={value} index={2} dir={theme.direction}>
              <p>
                {edit_familyhist ? (
                  <Form.Control
                    as="textarea"
                    placeholder="Update family history"
                    value={newf}
                    onChange={(e) => setnewf(e.target.value)}
                    style={{ height: "100px" }}
                  />
                ) : (
                  //   <input onChange={(e)=>setnewh(e.target.value)}></input>
                  token.history.family_history
                )}
              </p>

              {edit_familyhist ? (
                //   <Button variant="outline-success" className="col-md-12 text-right" onClick={setedit_history}>Submit</Button>
                <ButtonGroup>
                  <Button
                    variant="outline-success"
                    className="col-md-12 text-right"
                    onClick={(e)=>setedit_history()}
                  >
                    Submit
                  </Button>
                  <Button
                    variant="outline-danger"
                    className="col-md-12 text-right"
                    onClick={(e) => cancel_edits()}
                  >
                    Cancel
                  </Button>
                </ButtonGroup>
              ) : (
                ""
              )}
            </TabPanel>
            <TabPanel value={value} index={3} dir={theme.direction}>
              <p>
                {edit_medications ? (
                  <Form.Control
                    as="textarea"
                    placeholder="Update Medicines"
                    value={newm}
                    onChange={(e) => setnewm(e.target.value)}
                    style={{ height: "100px" }}
                  />
                ) : (
                  //   <input onChange={(e)=>setnewh(e.target.value)}></input>
                  token.history.medications
                )}
              </p>

              {edit_medications ? (
                //   <Button variant="outline-success" className="col-md-12 text-right" onClick={setedit_history}>Submit</Button>
                <ButtonGroup>
                  <Button
                    variant="outline-success"
                    className="col-md-12 text-right"
                    onClick={(e)=>setedit_history()}
                  >
                    Submit
                  </Button>
                  <Button
                    variant="outline-danger"
                    className="col-md-12 text-right"
                    onClick={(e) => cancel_edits()}
                  >
                    Cancel
                  </Button>
                </ButtonGroup>
              ) : (
                ""
              )}
            </TabPanel>
          </SwipeableViews>
        </Box>
      </div>
    </div>
  );
};

export default History;
