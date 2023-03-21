import { React, useRef, useEffect, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const Notify = (props) => {
  // Notification
  const [notification, setNotification] = useState({
    open: false,
    vertical: "top",
    horizontal: "right",
  });
  const { vertical, horizontal, open } = notification;

  //   const handleopennotify = () => {
  //     setNotification({ ...notification, open: true });
  //   };

  const Closing_notify = () => {
    setNotification({ ...notification, open: false });
  };

  return (
    <>
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
          {props.alertdata}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Notify;
