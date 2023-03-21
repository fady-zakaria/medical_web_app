import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class ActionProvider {
  constructor(createChatbotMessage, setStateFunc, createClientMessage) {
    this.createChatbotMessage = createChatbotMessage;
    this.setState = setStateFunc;
    this.createClientMessage = createClientMessage;
  }

  handlemess = async (message) => {
    try {
      // console.log("actionprovider", message);
      let { data } = await axios.post("https://chatbotmf.herokuapp.com/chat", {
        msg: message,
      });
      console.log("res", data);
      console.log("response:", data.response);

      const replybotmess = data.response;
      console.log("replybotmess", replybotmess);

      const lower_case_mess = replybotmess.toLowerCase();

      console.log(lower_case_mess);

      if (lower_case_mess.includes("hospitals")) {
        // console.log("hospitals 1");
        this.handlehospitaloption();
      }

      if (lower_case_mess.includes("clinics")) {
        // console.log("clinics 2");
        this.handlehclinicsoption();
      }
      if (lower_case_mess.includes("future")) {
        // console.log("home 9");
        this.handlehomeoption();
      }
      if (
        lower_case_mess.includes("pharmacies") ||
        lower_case_mess.includes("الادوية") ||
        lower_case_mess.includes("الدواء")
      ) {
        // console.log("pharmacies 3");
        this.handlepharmacyoption();
      }
      if (
        lower_case_mess.includes("تخصصات") ||
        lower_case_mess.includes("تخصص") ||
        lower_case_mess.includes("التخصص") ||
        // lower_case_mess.includes("دكاترة") ||
        lower_case_mess.includes("الكوبونات") ||
        lower_case_mess.includes("specialization") ||
        lower_case_mess.includes("reserve")
      ) {
        // console.log("specialization 4");
        this.handleSpecializationoption();
      }
      if (lower_case_mess.includes("location")) {
        // console.log("maps 5");
        this.handleMapsoption();
      }
      if (
        lower_case_mess.includes("appointment") ||
        lower_case_mess.includes("appointments") ||
        lower_case_mess.includes("orders") ||
        lower_case_mess.includes("profile")
      ) {
        // console.log("profile 7");
        this.handleprofileoption();
      }
      if (
        lower_case_mess.includes("register here") ||
        lower_case_mess.includes("الايميل")
      ) {
        // console.log("login 8");
        this.handleloginoption();
      }
      if (lower_case_mess.includes("logout")) {
        // console.log("logout 9");
        this.handlelogoutoption();
      }
      if (
        lower_case_mess.includes("الشكاوي") ||
        lower_case_mess.includes("الشكوي")
      ) {
        // console.log("complaints 6");
        this.handlecomplaintoption();
      }
      // const temp = "ممكن تضغط على زرار 'login'وبعد كده دوس 'Register'";

      // const temp2 =
      //   "محتاج تدور على دكتور اللى انت عاوزه و بعد كده تضغط على زرار 'Register'";
      // const temp3 =
      //   "ممكن تضغط على زرار login من فوق بعدها تضغط على زرار Register here وتملى بياناتك";

      // const temp =
      //   "معاد الميتنج بتاعك هيبقى  الساعة 6:34 و هيبقى يوم الاتنين و احنا شغالين 123123123 hours وبعد كده تقفل الميتنج يا مريض";

      const replymess = this.createChatbotMessage(replybotmess);
      console.log("replymessage:", replymess);
      this.addMessageToState(replymess);
    } catch (err) {
      if (err.res) {
        console.log(err.data.response);
        console.log(err.data.status);
        console.log(err.data.headers);
      } else {
        console.log(`Error ${err.message}`);
      }
    }
  };

  handlehospitaloption = () => {
    const optionmess = this.createChatbotMessage(
      "او ممكن تضغط على الزرار ده هيجبلك كل مستشفيات اللى عندنا",
      {
        widget: "hospital_option",
      }
    );
    setTimeout(() => {
      this.addMessageToState(optionmess);
    }, 2000);
  };

  handleprofileoption = () => {
    const optionmess = this.createChatbotMessage(
      "اضغط على الزرار ده هيوديك على ال profile بتاعك بس لازم تكون عامل login الاول 😀",
      {
        widget: "profile_option",
      }
    );
    setTimeout(() => {
      this.addMessageToState(optionmess);
    }, 2000);
  };

  handleMapsoption = () => {
    const optionmess = this.createChatbotMessage(
      "و ممكن تضغط على الزرار ده هيفتحلك الخريطة على طول",
      {
        widget: "maps_option",
      }
    );
    setTimeout(() => {
      this.addMessageToState(optionmess);
    }, 2000);
  };

  handleSpecializationoption = () => {
    const optionmess = this.createChatbotMessage(
      "و ممكن تضغط على الزرار ده هيجبلك كل تخصصات اللى عندنا ، اختار الدكتور اللى انت عايزه و احجز عنده 😀",
      {
        widget: "specialization_option",
      }
    );
    setTimeout(() => {
      this.addMessageToState(optionmess);
    }, 2000);
  };

  handlehclinicsoption = () => {
    const optionmess = this.createChatbotMessage(
      "و ممكن تضغط على الزرار ده هيجبلك كل العيادات اللى عندنا",
      {
        widget: "clinics_option",
      }
    );
    setTimeout(() => {
      this.addMessageToState(optionmess);
    }, 2000);
  };

  handlepharmacyoption = () => {
    const optionmess = this.createChatbotMessage(
      "و ممكن تضغط على الزرار ده هيجبلك كل الصيدليات اللى عندنا",
      {
        widget: "pharmacy_option",
      }
    );
    setTimeout(() => {
      this.addMessageToState(optionmess);
    }, 2000);
  };

  handleloginoption = () => {
    const optionmess = this.createChatbotMessage("او ممكن تضغط على الزرار ده", {
      widget: "login_option",
    });
    setTimeout(() => {
      this.addMessageToState(optionmess);
    }, 2000);
  };

  handlehomeoption = () => {
    const optionmess = this.createChatbotMessage(
      "و ممكن تضغط على الزرار ده هيوديك على ال Home على طول 😀",
      {
        widget: "home_option",
      }
    );
    setTimeout(() => {
      this.addMessageToState(optionmess);
    }, 2000);
  };

  handlecomplaintoption = () => {
    const optionmess = this.createChatbotMessage(
      "و ممكن تضغط على زرار ده هيوديك على صفحة الشكاوى ",
      {
        widget: "complaints_option",
      }
    );
    setTimeout(() => {
      this.addMessageToState(optionmess);
    }, 2000);
  };

  handlelogoutoption = () => {
    const optionmess = this.createChatbotMessage("او ممكن تضغط على الزرار ده", {
      widget: "logout_option",
    });
    setTimeout(() => {
      this.addMessageToState(optionmess);
    }, 2000);
  };

  // handleLogoutSuccess = () => {
  //   const optionmess = this.createChatbotMessage("تمت عملية ال logout بنجاح");
  //   setTimeout(() => {
  //     this.addMessageToState(optionmess);
  //   }, 2000);
  // };

  // hihandler = () => {
  //   const message = this.createChatbotMessage(
  //     "Hello,we are here for your care"
  //   );
  //   this.addMessageToState(message);
  // };

  addMessageToState = (message) => {
    this.setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }));
  };
}

export default ActionProvider;
