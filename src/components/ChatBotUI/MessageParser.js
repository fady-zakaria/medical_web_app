import axios from "axios";
import React, { useState, useEffect } from "react";

class MessageParser {
  constructor(actionProvider, state) {
    this.actionProvider = actionProvider;
    this.state = state;
  }

  parse(message) {
    console.log("user_mess", message);
    const lower_case_mess = message.toLowerCase();

    // console.log("after", lowercase);

    this.actionProvider.handlemess(message);

    // if (
    //   lower_case_mess.includes("hospitals") ||
    //   lower_case_mess.includes("hospital") ||
    //   lower_case_mess.includes("مستشفى") ||
    //   lower_case_mess.includes("مستشفيات")
    // ) {
    //   this.actionProvider.handlehospitaloption();
    // }
    // if (
    //   lower_case_mess.includes("clinics") ||
    //   lower_case_mess.includes("clinic") ||
    //   lower_case_mess.includes("عيادة") ||
    //   lower_case_mess.includes("عيادات")
    // ) {
    //   this.actionProvider.handlehclinicsoption();
    // }
    // if (
    //   lower_case_mess.includes("صيدلية") ||
    //   lower_case_mess.includes("pharmacy") ||
    //   lower_case_mess.includes("pharmacies") ||
    //   lower_case_mess.includes("صيدليات")
    // ) {
    //   this.actionProvider.handlepharmacyoption();
    // }
    // if (lower_case_mess.includes("specialization")) {
    //   this.actionProvider.handleSpecializationoption();
    // }
    // this.actionProvider.handleoptions(message);

    // if (lowercase.includes("hi")) {
    //   this.actionProvider.hihandler();
    // }
    // if (lowercase.includes("hospitals") || lowercase.includes("hosp")) {
    //   this.actionProvider.handlehospitaloption();
    // }
    console.log(this.state);
  }
}

export default MessageParser;
