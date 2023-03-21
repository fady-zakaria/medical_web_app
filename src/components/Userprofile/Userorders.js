import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { channel_name, leave } from "./../../actions";
import {
  Button,
  Table,
  useAccordionButton,
  Alert,
  Card,
  ButtonGroup,
  Accordion,
} from "react-bootstrap";
import { AiFillClockCircle } from "react-icons/ai";
import Spinner from "react-bootstrap/Spinner";
import { logout } from "../../actions";
import Table_mui from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ModalImage from "react-modal-image";
import { BiMessageDetail } from "react-icons/bi";
import { GiMedicines } from "react-icons/gi";
import { MdOutlineDone, MdCancel } from "react-icons/md";
import { order_status } from "../../actions";
function Userorders() {
  function CustomToggle({ children, eventKey }) {
    const decoratedOnClick = useAccordionButton(eventKey, () =>
      console.log(" ")
    );
    return (
      <Button type="button" onClick={decoratedOnClick} variant="primary">
        {children}
      </Button>
    );
  }

  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setloading] = useState(true);
  const get_orders_store = JSON.parse(
    useSelector((state) => state.order_reducer)
  );
  console.log(get_orders_store);
  const token = JSON.parse(useSelector((state) => state.auth));

  const [orders, setorders] = useState([]);

  const config = {
    headers: {
      Authorization: `Bearer ${token.token}`,
    },
  };

  const get_ph_order = async () => {
    try {
      const res = await axios.get(
        "https://future-medical.herokuapp.com/user/orders",
        config
      );

      console.log(res.data);
      if (res.data === "you have no orders yet") {
        dispatch(order_status([]));
        setloading(false);
        return;
      }
      setorders(res.data);
      dispatch(order_status(res.data));
      setloading(false);
    } catch (err) {
      if (err.response) {
        if (err.response.data === "not authorized, token is failed") {
          dispatch(logout());
          navigate("/login");
        }
      }
    }
  };

  const cancel_order = async (id) => {
    try {
      const res = await axios.patch(
        "https://future-medical.herokuapp.com/user/order/cancel",
        { id: id },
        config
      );
      console.log(res.data);
      alert("Order cancelled successfully");
      var o = [];
      for (var i = 0; i < get_orders_store.length; i++) {
        if (get_orders_store[i]._id !== id) o.push(get_orders_store[i]);
      }
      dispatch(order_status(o));
    } catch (err) {
      if (err.response) {
        if (err.response.data === "not authorized, token is failed") {
          dispatch(logout());
          navigate("/login");
        }
      }
    }
  };

  const approve_order = async (id) => {
    try {
      const res = await axios.patch(
        "https://future-medical.herokuapp.com/user/order/approve",
        { id: id },
        config
      );
      console.log(res.data);
      alert("Order approved");
      var o = [];
      for (var i = 0; i < get_orders_store.length; i++) {
        if (get_orders_store[i]._id === id) {
          o.push(get_orders_store[i]);
          o[i]["status"] = "preparing";
        } else o.push(get_orders_store[i]);
      }
      console.log(o);
      dispatch(order_status(o));
    } catch (err) {
      if (err.response) {
        if (err.response.data === "not authorized, token is failed") {
          dispatch(logout());
          navigate("/login");
        }
      }
    }
  };

  useEffect(() => {
    get_ph_order();
  }, []);
  return (
    <div className="card shadow-sm">
      <div className="card-header bg-transparent border-0">
        <h3 className="mb-0">
          <GiMedicines /> Orders
        </h3>
      </div>
      {loading ? (
        <div style={{ margin: "auto" }}>
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <div className="card-body pt-0">
          <div>
            <Table responsive="sm">
              <thead>
                <tr>
                  <th>Pharmacy Name</th>
                  <th>Date</th>
                  {/* <th>Time</th> */}
                  <th>Price</th>
                  <th>Order</th>
                  <th>State</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {get_orders_store.length === 0 ? (
                  <>
                    <Alert
                      key="primary"
                      variant="primary"
                      style={{ margin: "1rem 2rem" }}
                    >
                      There are no Orders yet.
                    </Alert>
                  </>
                ) : (
                  <>
                    {get_orders_store.map((item) => (
                      <tr key={item._id}>
                        <td>{item.pharmacy.name}</td>

                        {/*<td>{item.order_data.Date}</td>*/}
                        {<td>{item.order_data.Date.split("T")[0]}</td>}
                        <td>{item.price}</td>
                        <td>
                          <Accordion defaultActiveKey="0">
                            <CustomToggle eventKey={item._id}>
                              Show order
                            </CustomToggle>

                            <Accordion.Collapse eventKey={item._id}>
                              <Card.Body>
                                {item.flag == "image" ? (
                                  <div size="small">
                                    <div>
                                      <ModalImage
                                        small={item.order_data.form}
                                        large={item.order_data.form}
                                        alt={"Order Image"}
                                        hideDownload={true}
                                        hideZoom={true}
                                        className="modal-image"
                                      />
                                    </div>
                                  </div>
                                ) : (
                                  <div>
                                    <TableContainer
                                      component={Paper}
                                      style={{
                                        margin: 0,
                                        marginLeft: "auto",
                                        width: "60%",
                                      }}
                                    >
                                      <Table_mui
                                        sx={{ minWidth: 250 }}
                                        size="small"
                                        aria-label="a dense table"
                                      >
                                        <TableHead>
                                          <TableRow>
                                            <TableCell
                                              style={{
                                                paddingBottom: 5,
                                                paddingTop: 5,
                                                fontWeight: "bold",
                                              }}
                                            >
                                              Medicine Name
                                            </TableCell>
                                            <TableCell
                                              style={{
                                                paddingBottom: 5,
                                                paddingTop: 0,
                                                fontWeight: "bold",
                                              }}
                                            >
                                              Q
                                            </TableCell>
                                          </TableRow>
                                        </TableHead>
                                        <TableBody>
                                          {JSON.parse(item.order_data.form).map(
                                            (f) => (
                                              <TableRow
                                                key="Medicinies"
                                                sx={{
                                                  "&:last-child td, &:last-child th":
                                                    {
                                                      border: 0,
                                                    },
                                                }}
                                              >
                                                <TableCell
                                                  component="th"
                                                  scope="row"
                                                >
                                                  {f.medicine}
                                                </TableCell>
                                                <TableCell>
                                                  {f.quanity}
                                                </TableCell>
                                              </TableRow>
                                            )
                                          )}
                                        </TableBody>
                                      </Table_mui>
                                    </TableContainer>
                                  </div>
                                )}
                              </Card.Body>
                            </Accordion.Collapse>
                          </Accordion>
                        </td>
                        <td>
                          {item.status !== "pending" &&
                            item.status !== "approved" && (
                              <td>{item.status}</td>
                            )}
                          {item.status === "pending" && (
                            <Button
                              variant="outline-danger"
                              className="col-md-12 text-right"
                              onClick={(e) => cancel_order(item._id)}
                            >
                              <MdCancel />
                            </Button>
                          )}
                        </td>
                        {item.status === "approved" && (
                          <td>
                            {" "}
                            <ButtonGroup>
                              <Button
                                variant="outline-success"
                                className="col-md-12 text-right"
                                onClick={(e) => approve_order(item._id)}
                              >
                                <MdOutlineDone />
                              </Button>
                              <Button
                                variant="outline-danger"
                                className="col-md-12 text-right"
                                onClick={(e) => cancel_order(item._id)}
                              >
                                <MdCancel />
                              </Button>
                            </ButtonGroup>
                          </td>
                        )}
                      </tr>
                    ))}
                  </>
                )}
              </tbody>
            </Table>
          </div>
        </div>
      )}
    </div>
  );
}

export default Userorders;
