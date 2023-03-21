import sidebarstate_reducer from "./sidebarcomp";

import auth_reducer from "./islogged";
import meeting_reducer from './meeting';
import {combineReducers} from 'redux'
import profile_reducer from "./Profilesidebar";
import order_reducer from "./order";
import Doctor_reducer from "./DoctorSide"
import reserving_reducer from "./Reserving";
import page_reducer from './page';

const allreducers = combineReducers ({
   sidebarcomp:sidebarstate_reducer,
   auth:auth_reducer,
   profile_reducer:profile_reducer,
  meeting_reducer:meeting_reducer,
   order_reducer:order_reducer ,
  Doctor_reducer : Doctor_reducer , 
  reserving_reducer : reserving_reducer,
  page_reducer : page_reducer
   
})

export default allreducers ;