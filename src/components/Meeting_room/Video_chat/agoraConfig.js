import { createClient, createMicrophoneAndCameraTracks } from "agora-rtc-react";

const appId = "7bf1c69c63f148cbb41e8ec120ec8a2a"; //ENTER APP ID HERE //Future Medical Meeting
const token = null;
const Dr_email_config = JSON.parse(
  JSON.stringify(localStorage.getItem("Dr_email"))
);

export const config = { mode: "rtc", codec: "vp8", appId: appId, token: token };
export const useClient = createClient(config);
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
// export const channelName = "video-chat"; // get dr_email from redux and put it in the channelName instead of video-chat
export const channelName = Dr_email_config;
