import React, { useEffect, useState } from "react";
import "./videochat.css";
import { AgoraVideoPlayer } from "agora-rtc-react";
import Grid from "@mui/material/Grid";

const Video = (props) => {
  const { users, tracks } = props;
  // const [gridSpacing, setGridSpacing] = useState(3);

  // useEffect(() => {
  //   setGridSpacing(Math.max(Math.floor(12 / (users.length + 1)), 4));
  // }, [users, tracks]);

  return (
    <div className="video-container">
      <div className="video">
        <AgoraVideoPlayer
          videoTrack={tracks[1]}
          style={{ height: "100%", width: "100%" }}
        />
      </div>

      {users.length > 0 &&
        users.map((user) => {
          if (user.videoTrack) {
            return (
              <div className="video">
                <AgoraVideoPlayer
                  key={user.uid}
                  videoTrack={user.videoTrack}
                  style={{ height: "100%", width: "100%" }}
                />
              </div>
            );
          } else {
            return null;
          }
        })}
    </div>
    // <Grid container style={{ height: "100%" }}>
    //   <Grid item xs={gridSpacing} className="grid-edit">
    //     <AgoraVideoPlayer
    //       videoTrack={tracks[1]}
    //       style={{ height: "100%", width: "100%" }}
    //     />
    //   </Grid>
    //   {users.length > 0 &&
    //     users.map((user) => {
    //       if (user.videoTrack) {
    //         return (
    //           <Grid item xs={gridSpacing}>
    //             <AgoraVideoPlayer
    //               key={user.uid}
    //               videoTrack={user.videoTrack}
    //               style={{ height: "100%", width: "100%" }}
    //             />
    //           </Grid>
    //         );
    //       } else {
    //         return null;
    //       }
    //     })}
    // </Grid>
  );
};

export default Video;
