import { createChatBotMessage } from "react-chatbot-kit";
import Options from "./Options/Options";
import FMBotAvatar from "./FMBotAvatar";
import OneOption from "./Options/OneOption";
import LogoutOption from "./Options/LogoutOption";

const botName = "Future Medical Bot";

const config = {
  botName: botName,
  initialMessages: [
    createChatBotMessage(
      `Hi I'm ${botName},
      How can i help you?  اقدر اسعادك ازاى`,
      {
        widget: "options",
      }
    ),
  ],
  customComponents: { botAvatar: (props) => <FMBotAvatar {...props} /> },
  widgets: [
    {
      widgetName: "options",
      widgetFunc: (props) => <Options {...props} />,
      props: {
        id: 0,
      },
    },
    {
      widgetName: "hospital_option",
      widgetFunc: (props) => <Options {...props} />,
      props: {
        id: 1,
      },
    },
    {
      widgetName: "specialization_option",
      widgetFunc: (props) => <Options {...props} />,
      props: {
        id: 2,
      },
    },
    {
      widgetName: "clinics_option",
      widgetFunc: (props) => <Options {...props} />,
      props: {
        id: 3,
      },
    },
    {
      widgetName: "pharmacy_option",
      widgetFunc: (props) => <Options {...props} />,
      props: {
        id: 4,
      },
    },
    {
      widgetName: "maps_option",
      widgetFunc: (props) => <Options {...props} />,
      props: {
        id: 5,
      },
    },
    {
      widgetName: "complaints_option",
      widgetFunc: (props) => <Options {...props} />,
      props: {
        id: 6,
      },
    },
    {
      widgetName: "profile_option",
      widgetFunc: (props) => <OneOption {...props} />,
      props: {
        id: 7,
      },
    },
    {
      widgetName: "login_option",
      widgetFunc: (props) => <OneOption {...props} />,
      props: {
        id: 8,
      },
    },
    {
      widgetName: "home_option",
      widgetFunc: (props) => <OneOption {...props} />,
      props: {
        id: 9,
      },
    },
    {
      widgetName: "logout_option",
      widgetFunc: (props) => <LogoutOption {...props} />,
    },
  ],
};

export default config;
