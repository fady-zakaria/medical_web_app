import React, { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useSpeechSynthesis } from 'react-speech-kit';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import './Voice.css'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import moment from "moment";


import axios from 'axios';
import { info ,myorders , order_status ,appointments , meetings , selected_slot, logout , chart , info_doc , channel_name} 
from '../../actions';
import { CountertopsOutlined } from '@mui/icons-material';
import { list } from 'firebase/storage';

const Speech = () => {

 const dispatch = useDispatch();
 const get_orders_store = JSON.parse(useSelector((state) => state.order_reducer)); //User Order 
const token = JSON.parse(useSelector((state) => state.auth)); //state of token
let handle_speak=''; // What to say 
var flag_speicific_dep = false ; // if ask about specific order
var flag_order = false ; // if wants to make order

var counter_var = 0 ;
//var approved_count = 0 ; 
const [approved_count,set_approved_count] =useState(0) //THE COUNT OF APPROVED ORDERS
const [counter_state,set_counter_state]=useState(0) //COUNTER OF READING THE APPROVED ORDERS
//////// USER ORDER PROFILE
const [flag_kind_orders,set_flag_kind_orders]= useState(false);
const [approved_array_orders,set_approved_array_orders] = useState([]); //Array of approved array of use
const [current_order_id,set_current_id]=useState("");
const [flag_approve_my_order ,set_approve_my_order] =useState(false); // if wants to make action to order 
const [pending_orders_array , set_pending_orders_array] = useState([]); //To complete reading meetings
const [count_pending_order , set_count_pending_order] = useState(0)
const [counter_pending_order , set_counter_pending_order] = useState(0)
const [reply_pending_order,set_reply_pending_order] = useState(false);


/////Reserve meetings
const [flag_reserve_meeting,set_flag_reserve_meeting] = useState(false) ; //if wants to ask to reserve

const [flag_meeting_time,set_flag_meeting_time] = useState(false) ; //if wants to reply 1 - am / 2 = pm 
const [wanted_slot,set_wanted_slot]=useState(""); //AM OR PM 
const [wanted_dep,set_wanted_dep]=useState(""); //wanted department for reservation 
const [flag_sure_reserve,set_sure_reserve] = useState(false); // TO MAKE RESERVATION ACTION

//// profile meetings 
const [pendig_array_Meetings, set_pending_array_meetings] = useState([]); //Pending Arrays of meetings
const [today_array_Meetings, set_today_array_meetings] = useState([]); //Pending Arrays of meetings
const [flag_enter_meeting , set_enter_meeting] = useState(false) //If he desides to enter the meeting
const [flag_complete_reading , set_complete_reading] = useState(false); //To complete reading meetings
const [count_today_meetings , set_count_today_meetings] = useState(0)
const [counter_today_meetings , set_counter_today_meetings] = useState(0)
const [current_meeting_id,set_current_meeting]=useState(""); // to detect dr email & slot 


const [flag_logout,set_flag_logout] = useState(false); //To make logout 

const [flag_ask_my_order ,set_my_order] =useState(false); // if wants to ask about his orders
const [wanted_sentence,set_wanted]=useState("");


const [selected_voice,set_voice]=useState(0);

let wanted_sentece = ""; //to send to model api   
const [meeting_data,set_meeting_data] = useState({});
//TO DETECED KEY PRESS
var press_var = false ; // Key press handle 
const [press_state,set_press_state]=useState(false)
const [key_sound,set_key]=useState(0)
  const [transcript_index , setindex] = useState(0);

let navigate = useNavigate();
  const onEnd = () => {
    // You could do something here after speaking has finished
     listenContinuously();
     set_wanted(""); // to make text_box empty
     handle_speak='';
     flag_speicific_dep = false;
     //specialization = '';
     flag_order = false;
  };

  const { speak, voices ,speaking ,supported ,cancel} = useSpeechSynthesis({
    onEnd,
  });

const get_arabic = () =>{
  for (var i = 0 ; i < voices.length ; i++)
  {
    if (voices[i].lang == "ar-EG" || voices[i].lang == "ar-SA")
    {
      set_voice(i)
    }   
  }
}  
var voice = voices[selected_voice] || null; 

  const handleKeyDown = (event) => {
    
    //console.log('A key was pressed', event.keyCode);
    set_key(event.keyCode)
    if (press_var)
    {
      press_var = false ;
      set_press_state(false)
    }
    else{
      press_var = true ;
      set_press_state(true)
    }

  };



 const handle_response = (response)=>{
   console.log("handle",response)
   switch(response) {
  case "Read The departments":
    read_departments(); 
    break;
  case "Go to hospitals":
     Get_Hospitals_Api();
     //go_hospitals();
    break;    
  case "Go to pharmacies":
     Get_Pharmacies_Api();
    break;   
  case "Go to clinics":
     Get_Clinics_Api();
    break;
 case "orders":
      flag_order = true;
      Get_Pharmacies_Api();
  break;  
   case "account":
     if(!token.token){
     SpeechRecognition.stopListening();
     handle_speak = 'أنا لاا أستطيعُ مساعدتكَ في عمليةِ الدخولِ لأنها تحتاجُ إلى كتابةٍ'
     navigate('/login')
     speak({ text: handle_speak , voice : voice , rate : 0.9}) //What to say
     }
     else{
       SpeechRecognition.stopListening();
     handle_speak = 'حضرتكَ فاتحَ حسابكَ الآنَ'
     speak({ text: handle_speak , voice : voice , rate : 0.9}) //What to say

     }




  break;  
  case "profile information":
     SpeechRecognition.stopListening();
     if(!token.token){
        //Not login 
        handle_speak = 'لازم تكونُ فاتحَ حسابكَ الأولِ'
        speak({ text: handle_speak , voice : voice , rate : 0.9}) //What to say 
     }
     else{
     handle_speak = 'أنا لااا أستطيعُ مساعدتكَ في عمليةِ الدخولِ لأنها تحتاجُ إلى كتابةٍ لكنني قمتُ بفتحِ البرووفاايلْ'
     dispatch(info());
     navigate('/user');
     speak({ text: handle_speak , voice : voice , rate : 0.9}) 
     }//What to say 
  break;  

  case 'ازيك ، يارب يومك يكون كويس.ازاي اقدر اساعدك؟' :
     SpeechRecognition.stopListening();
     handle_speak = ' كيفَ حالكَ أتمنى يومكَ يكونُ بخيرِ. كيفَ أقدرُ أساعدكُ ؟'
     speak({ text: handle_speak , voice : voice , rate : 0.9}) //What to say 
    break;
    case 'عفوا في خدمتك أي وقت' :
     SpeechRecognition.stopListening();
     handle_speak = 'عفوا. في خدمتكَ أيَ وقتٍ'
     speak({ text: handle_speak , voice : voice , rate : 0.9}) //What to say 
    break;  
    case 'My orders' :
      my_orders();
    break;  
    case 'my meetings' :
      my_meetings();
    break; 
    case 'reserve meeting' :
      reserve_meeting();
    break; 
    case "logout":
      if (token.token){
      SpeechRecognition.stopListening();
      handle_speak = 'إذا تريدَ تنفيذَ " تسجيلِ الخروجِ " قُلْ واحدٌ'
     speak({ text: handle_speak , voice : voice , rate : 0.9}) //What to say 
     set_flag_logout(true);
      }
      else{
        SpeechRecognition.stopListening();
      handle_speak = 'حسابكَ ليسَ مفتوحٌ . يجبَ عليكَ أنْ تفتحهُ'
     speak({ text: handle_speak , voice : voice , rate : 0.9}) //What to say 
      }
      break;
        

  default:
    // code block
}
 }
 
 //// API VOICE MODEL
 const Get_Voice_model = async (message)=>{
 try {
        const res = await axios.post('https://chatbotmf.herokuapp.com/voice',
        {
          "msg":message
        })
        const data = await res.data;
        console.log(data)
        //set_model_response(data.response); //response out of model 
        handle_response(data.response); //handle model response 
       
    } 
    catch (err) {
        console.error(err);
    }
} 
//GET USER MEETINGS 

// GET USER ORDERS PROFILE 
const Get_User_meetings =()=>{
  
axios.get(`https://future-medical.herokuapp.com/user/meetings`,
{
  headers : { 'Authorization': `Bearer ${token.token}` }
}).then((res)=>{
console.log(res.data);
if (res.data != "you have no meetings yet"){
  //variables to control cuurent time 
const local_date = new Date();
var utc_offset = local_date.getTimezoneOffset()/60;
  //console.log(utc_offset)
var utc = (2+utc_offset)*60;
var hour = local_date.getHours();
var min = local_date.getMinutes();
local_date.setMinutes(min+utc);
hour = local_date.getHours();
min = local_date.getMinutes();
  //console.log(hour, min);
  //console.log(local_date);

var meetings_api = res.data ;
/*                meet_date = x.Date.split('-');
                meet_day = meet_date[2].split('T')
                meeting_date =  meet_day[0]+'-'+meet_date[1]+'-' +meet_date[0] ;*/
  for (var i = 0; i < meetings_api.length; i++) {
      var meet_date = meetings_api[i].Date.split('-');
      var meet_day = meet_date[2].split('T')
    meetings_api[i].Date =  meet_day[0]+'-'+meet_date[1]+'-' +meet_date[0]
  }                
console.log("dates meetings",meetings_api)
var state = "Pending"
 const current = new Date();

// Get the State of the meeting 
  for (var i = 0; i < meetings_api.length; i++) {
    const day = meetings_api[i].Date.split("-");
    if (parseInt(day[2]) < current.getFullYear()) state = "Done"; //year check
    else if (parseInt(day[2]) > current.getFullYear())
      state = "Pending"; //next year
    else if ( parseInt(day[1]) === current.getMonth() + 1 &&  parseInt(day[0]) === current.getDate() && parseInt(day[2]) === current.getFullYear() )
    {
      //today
      
      if( hour === parseInt(meetings_api[i].slot.split('-')[0].split(':')[0]))
      {
        if(min < 30 &&  parseInt(meetings_api[i].slot.split('-')[0].split(':')[1]) === 0)
      {
        state = "now";
      }
      else if (min >= 30 &&  parseInt(meetings_api[i].slot.split('-')[0].split(':')[1]) === 30)
      {
        state = "now";
      }
      else {
        state = "Pending"
      }
      }
      else {
        state = "Pending"
       
      }
    }
      
    else if (parseInt(day[1]) < current.getMonth() + 1)
      {state = "Done";} //month check
    else if (
      parseInt(day[1]) === current.getMonth() + 1 && parseInt(day[0]) < current.getDate()
    )
      {state = "Done";} //month check
    else {state = "Pending";}
    meetings_api[i].state = state;
  }
  console.log(meetings_api)


  SpeechRecognition.stopListening();
   //specialization = res.data[0].specialization ;
  //handle_speak = ` الطلبات بتاعتك هى  ` ;  
  var pending_meetings = "" ; var flag_pending = false;
  var Today_meetings = ""; var flag_Today_meetings = false;
  var flag_now_meeting = false;
  var now_meeting = {};
  var Today_meetings_List = [] ;
  var pending_meetings_list = [];
  //var disapproved_orders = ""; var flag_disapproved = false;
  //var app_order_list = []
  meetings_api.forEach((x) => {
           if (x.state === "Pending")
           {
             flag_pending =true ;
             pending_meetings_list.push(x);
             var time_slot =  x.slot.split("-");
               pending_meetings+="مقابلة بالتاريخ"+ " " + x.Date+ " معَ دكتورٍ" + x.doctor.arabic_username + " منْ الساعةِ" + time_slot[0] + " الى"+time_slot[1] + " . ";
           }
           else if (x.state === "Today")
           {
              flag_Today_meetings = true ;
              Today_meetings_List.push(x);
           }
           else if (x.state === "now")
           {
              flag_now_meeting = true ;              
              now_meeting = x
           }
           
          }  
          )

if (flag_now_meeting ) 
{
     set_pending_array_meetings(pending_meetings_list); //TO READ IT AFTER IF HE WANT IT 
    var time_slot =  now_meeting.slot.split("-");
    handle_speak +=   "مقابلة الأن"+ " معَ دكتورٍ"+ " " + now_meeting.doctor.arabic_username + " منْ الساعةِ" +" "+ time_slot[0]+ " " + " الى" + " "+time_slot[1] + " " + 'إذا تريدَ ان تدخل المقابلة قُلْ واحدٌ' ;
    set_enter_meeting(true);
    set_current_meeting(now_meeting);
}          
else if(Today_meetings_List.length != 0 )
{
  set_pending_array_meetings(pending_meetings_list); //TO READ IT AFTER IF HE WANT IT 
  var time_slot =  Today_meetings_List[0].slot.split("-");
  handle_speak += "مقابلة اليوم" + " مع دكتور " + Today_meetings_List[0].doctor.arabic_username + " من الساعة " + time_slot[0] + " الى"+time_slot[1] 
  //set_enter_meeting(true);
  //set_current_meeting(Today_meetings_List[0]);
  if (Today_meetings_List.length > 1){ //SET COUNT OF LIST AND CURRENT COUNT
    
    set_count_today_meetings(Today_meetings_List.length - 1);
    set_counter_today_meetings(0);
    set_today_array_meetings(Today_meetings_List);
   }
}

else if (flag_pending && (flag_Today_meetings == false))
{
  //Pending Only
  handle_speak+=" مقابلات في الانتظارِ ولمْ يأتيَ موعدها بعد " +" . "+ pending_meetings;
} 

else if (flag_pending == false && flag_Today_meetings == false )
{
   handle_speak += 'لا يوجدُ مقابلاتٍ لكيْ تتابعها'
}

        speak({ text: handle_speak , voice : voice , rate : 0.9}) //What to say 
}
else {
  //NO MEETINGS
  SpeechRecognition.stopListening();
  handle_speak += 'لا يوجدُ مقابلاتٍ لكيْ تتابعها'
  speak({ text: handle_speak , voice : voice , rate : 0.9}) //What to say 
}

}).catch((err)=>{console.log(err)})
}

const complete_today_meetings = (today_list) =>{
  SpeechRecognition.stopListening();
  var time_slot =  today_list[counter_today_meetings+1].slot.split("-");
  handle_speak += "مقابلة اليوم" + " مع دكتور " + today_list[counter_today_meetings+1].doctor.arabic_username + " من الساعة " + time_slot[0] + " الى"+time_slot[1] + " لو عاوز تدخل المقابلة اوول واحد "
  set_enter_meeting(true);
  set_current_meeting(today_list[counter_today_meetings+1]);
  set_counter_today_meetings(count_today_meetings+1) ; 
  speak({ text: handle_speak , voice : voice , rate : 0.9}) //What to say 
} 


const complete_reading_meetings = (list) =>{
  var pending_meetings = "";
  SpeechRecognition.stopListening();
for (var x = 0 ; x < list.length ; x++)
{
  var time_slot =  list[x].slot.split("-");
  pending_meetings+="مقابلة بالتاريخ"+ " " + list[x].Date+ " معَ دكتورٍ" + list[x].doctor.arabic_username + " منْ الساعةِ" + time_slot[0] + " الى"+time_slot[1] + " . ";
}
handle_speak+=" مقابلات في الانتظارِ ولمْ يأتيَ موعدها بعد " +" . "+ pending_meetings;
speak({ text: handle_speak , voice : voice , rate : 0.9}) //What to say 
}


// GET USER ORDERS PROFILE 
const Get_User_Orders =(kind_order)=>{
  
axios.get(`https://future-medical.herokuapp.com/user/orders`,
{
  headers : { 'Authorization': `Bearer ${token.token}` }
}).then((res)=>{
console.log(res.data);
if(res.data !== "you have no orders yet"){
  SpeechRecognition.stopListening();
   //specialization = res.data[0].specialization ;
  //handle_speak = ` الطلبات بتاعتك هى  ` ;  
  var pending_oders = "" ; var flag_pending = false;
  var approved_orders = ""; var flag_approved = false;
  var disapproved_orders = ""; var flag_disapproved = false;
  var app_order_list = []
  var pending_order_list =[]
  if (kind_order == "disapproved"){
   res.data.forEach((x) => {
       if (x.status === "disapproved")
           {
               flag_disapproved = true ;
               disapproved_orders+="طلب بالتاريخ"+ " " + x.order_data.Date.split("T")[0]+ " من " + x.pharmacy.arabic_name + " . " ;
           } 
   } )
  }
  else if (kind_order == "approved"){
    res.data.forEach((x) => {
       if (x.status === "approved")
           {
               app_order_list.push(x);
               flag_approved = true ;
               //disapproved_orders+="طلب بالتاريخ"+ " " + x.order_data.Date+ " من " + x.pharmacy.arabic_name + " . " ;
           } 
   } )
 }
 else{
     res.data.forEach((x) => {
           if (x.status === "pending")
           {
             pending_order_list.push(x);
             flag_pending =true ;
               //pending_oders+="طلب بالتاريخ"+ " " + x.order_data.Date+ " من " + x.pharmacy.arabic_name + " . " ;
           } })
 }
  /*res.data.forEach((x) => {
           if (x.status === "pending")
           {
             flag_pending =true ;
               pending_oders+="طلب بالتاريخ"+ " " + x.order_data.Date+ " من " + x.pharmacy.arabic_name + " . " ;
           }   
           if (x.status === "approved")
           {
             app_order_list.push(x);
             
              /*if (flag_approved = false)
              { //Fisrt approved order
              approved_orders+="طلب بالتاريخ"+ " " + x.order_data.Date+ " من " + x.pharmacy.arabic_name + " . " + " السعر " + x.price + " . ";
              }
               flag_approved = true ;
            }   
               
     })*/
//set_approved_array_orders(app_order_list); //Approved order List      
if (kind_order == "pending")
{ 
  if (flag_pending)
  {
    if(pending_order_list.length == 1){
       pending_oders="طلب بالتاريخ"+ " " + pending_order_list[0].order_data.Date.split("T")[0]+ " من " + pending_order_list[0].pharmacy.arabic_name +" لو عاوز تلغى الطلب اوول واحد "+ " . " ;
       handle_speak=" الطلبات التي لمْ يتمْ الردُ عليها منْ الصيدليةِ" +" . "+ pending_oders;
       set_reply_pending_order(true);
       set_current_id(pending_order_list[0]._id)
    }
   else{
     pending_oders="طلب بالتاريخ"+ " " + pending_order_list[0].order_data.Date.split("T")[0]+ " من " + pending_order_list[0].pharmacy.arabic_name +" لو عاوز تلغى الطلب اوول واحد "+ " . " ;
       handle_speak=" الطلبات التي لمْ يتمْ الردُ عليها منْ الصيدليةِ" +" . "+ pending_oders;
       set_reply_pending_order(true);
     set_pending_orders_array(pending_order_list)
     set_count_pending_order(pending_order_list.length-1);
     set_counter_pending_order(0);
     set_current_id(pending_order_list[0]._id) //id if first order
   }

}
  else{
    //no pending 
    handle_speak ='لا يوجدُ طلباتٍ لمْ يتمْ الردُ عليها'
  }
} 
if (kind_order == "disapproved")
{
  if(flag_disapproved){
  handle_speak+='الطلبات المرفوضةِ منْ الصيدليةِ' + ". " +disapproved_orders;
  }
  else{
    //no disapproved 
     handle_speak ='لا يوجدُ طلباتٍ مرفوضةً'
  }
} 
if (kind_order == "approved")
{
    if (flag_approved)
  {
    if(pending_order_list.length == 1){
       handle_speak=" الطلبات التي تمتْ الموافقةُ عليها منْ الصيدليةِ" + " . "
       handle_speak+="طلب بالتاريخ "+ " " + app_order_list[0].order_data.Date.split("T")[0]+ " من " + app_order_list[0].pharmacy.arabic_name + " . " + " السعر " + app_order_list[0].price + " . ";
       handle_speak += 'إذا كنتُ تريدُ الموافقةُ على الطلبِ قُلْ واحد أما إذا كنتُ تريدُ إلغاءَ الطلبِ قُلْ اثنين'
       set_approve_my_order(true)
       set_current_id(app_order_list[0]._id)
    }
   else{
     handle_speak+="طلب بالتاريخ "+ " " + app_order_list[0].order_data.Date.split("T")[0]+ " من " + app_order_list[0].pharmacy.arabic_name + " . " + " السعر " + app_order_list[0].price + " . ";
       handle_speak += 'إذا كنتُ تريدُ الموافقةُ على الطلبِ قُلْ واحد أما إذا كنتُ تريدُ إلغاءَ الطلبِ قُلْ اثنين'
       set_approve_my_order(true)
       set_current_id(app_order_list[0]._id)

     set_approved_array_orders(app_order_list);
     set_approved_count( app_order_list.length-1);
       set_counter_state(0);
     //set_count_pending_order(pending_order_list.length-1);
     //set_counter_pending_order(0);
     //set_current_id(pending_order_list[0]._id) //id if first order
   }

}
else {
  handle_speak ='لا يوجدُ طلباتٍ تمتْ الموافقةُ عليها'
}}      
}
else{
  SpeechRecognition.stopListening();
  handle_speak =" لا يوجد طلبات للمتابعة"
}
 speak({ text: handle_speak , voice : voice , rate : 0.9}) //What to say 
}).catch((err)=>{console.log(err)})
}

const complete_pending_orders =(cancel_flag)=>{
  // "  تمت العملية بنجاح " + " "
      console.log("here",cancel_flag);
      SpeechRecognition.stopListening();
      if (cancel_flag == "done cancel"){
        handle_speak = "  تمتْ العمليةُ بنجاحٍ" + " . " 
      }
      var pending_oders="طلب بالتاريخ"+ " " + pending_orders_array[counter_pending_order+1].order_data.Date+ " من " + pending_orders_array[counter_pending_order+1].pharmacy.arabic_name +" لو عاوز تلغى الطلب اوول واحد "+ " . " ;
       handle_speak += " . "+ pending_oders;
       speak({ text: handle_speak , voice : voice , rate : 0.9}) //What to say 
       set_reply_pending_order(true);
       set_counter_pending_order(counter_pending_order+1);
       set_current_id(pending_orders_array[counter_pending_order+1]._id) //Current order id 
}

/// HANDLE THE REST OF APPROVED ORDERS 
const handle_rest_approved = (cancel_flag)=>{
   SpeechRecognition.stopListening();

  if (cancel_flag == "done cancel"){
        handle_speak += "  تمتْ العمليةُ بنجاحٍ" + " . " 
      }
  //console.log("approved array" ,approved_array_orders)
  //console.log("counter var ",counter_var )
  //console.log("counter state ",counter_state ) 
 
  handle_speak +="طلب بالتاريخ "+ " " + approved_array_orders[counter_state+1].order_data.Date+ " من " + approved_array_orders[counter_state+1].pharmacy.arabic_name + " . " + " السعر " + approved_array_orders[counter_state+1].price + " . ";
  handle_speak += 'إذا كنتُ تريدُ الموافقةُ على الطلبِ قُلْ واحد أما إذا كنتُ تريدُ إلغاءَ الطلبِ قُلْ اثنين'
   set_approve_my_order(true)
   //console.log(app_order_list[0])
   set_current_id(approved_array_orders[counter_state+1]._id)
   //counter_var = counter_var + 1 ;
   set_counter_state(counter_state + 1);
    speak({ text: handle_speak , voice : voice , rate : 0.9}) //What to say 
} 
//// GET THE DOCTORS FOR SPECIFIC DEPARTMENT 
const Get_Doctors_Department =(dep)=>{
  console.log(dep);
  flag_speicific_dep = false ; ///// initial 
axios.get(`https://future-medical.herokuapp.com/user/department/${dep}`).then((res)=>{
console.log(res.data);
if(res.data !== "no doctors found in this department"){
  SpeechRecognition.stopListening();
   //specialization = res.data[0].specialization ;
  navigate(`/Doctors/${res.data[0].specialization }`)
  handle_speak = ` دكاترة قسم ${dep} ` ;  
  res.data.forEach((x) => {
           handle_speak+="دكتور"+ " " + x.arabic_username+ " من " + x.entity_id.arabic_name + " . " ;
     })
        speak({ text: handle_speak , voice : voice , rate : 0.8}) //What to say 
}
else {
  SpeechRecognition.stopListening();
   handle_speak = ` لا يوجدُ دكاترةٌ متاحةٌ في هذا القسمَ الآنِ` ;  
  speak({ text: handle_speak , voice : voice , rate : 0.9}) //What to say 

}
}).catch((err)=>{console.log(err)})
}

//////////////////// Get all hospitals 
 const Get_Hospitals_Api = async ()=>{
 try {
        const res = await axios.get('https://future-medical.herokuapp.com/hospitals/arabic',
      )
        const data = await res.data;
        console.log(data)
         // sethospitals(data); //Save it  
        navigate('/Entities/hospitals');
        SpeechRecognition.stopListening();
        handle_speak = "المستشفيات الموجودة هى" ;  
        for (let i = 0 ; i < data.length ; i++) 
        {
            //await sleepNow (2500)
          handle_speak+=data[i].arabic_name+ "  . ";
        }
        speak({ text: handle_speak , voice : voice , rate : 0.8}) //What to say 
        //speak({ text: "مستشفيات" , voice : voice }) //What to say 
        
       
    } 
    catch (err) {
        console.error(err);
    }
} 

//////////////// GET ALL CLINICS
 const Get_Clinics_Api = async ()=>{
 try {
        const res = await axios.get('https://future-medical.herokuapp.com/clinics/arabic',
      )
        const data = await res.data;
        console.log(data)
        navigate('/Entities/clinics');
        SpeechRecognition.stopListening();
        handle_speak = "العيادات الموجودة هى" ;  
         data.forEach((x) => {
           handle_speak+=x.arabic_name+ "  . ";
         })
        speak({ text: handle_speak , voice : voice , rate : 0.8}) //What to say 
    } 
    catch (err) {
        console.error(err);
    }
} 

//////////////// GET ALL PHARMACIES 
 const Get_Pharmacies_Api = async ()=>{
 try {
        const res = await axios.get('https://future-medical.herokuapp.com/pharmacies/arabic',
      )
        const data = await res.data;
        console.log(data)
        navigate('/Entities/pharmacies');
        SpeechRecognition.stopListening();
        if (flag_order){
          handle_speak = "يمكنكَ أنْ تضعَ صورةُ الروشتةِ أوْ تختارُ منْ الروشتاتِ الموجودةِ لديكَ وتطلبها منْ أيِ صيدليةٍ منْ الصيدلياتِ الموجودةِ" + " "; 
          
         /*data.forEach((x) => {
           handle_speak+=x.arabic_name+ "  . ";
         })*/
        speak({ text: handle_speak , voice : voice , rate : 0.9}) //What to say 
        }
        else{
          handle_speak = " الصيدليات الموجودة هى" + " ";  
         data.forEach((x) => {
           handle_speak+=x.arabic_name+ "  . ";
         })
        speak({ text: handle_speak , voice : voice , rate : 0.8}) //What to say 
        }
        
    } 
    catch (err) {
        console.error(err);
    }
}


///////////////// APRROVE ORDER USER 
const Approve_Order_Api = async(id)=>{
  console.log("Order Id" , id)
  try {
        const res = await axios.patch('https://future-medical.herokuapp.com/user/order/approve',{
            id : id 
        },{
  headers : { 'Authorization': `Bearer ${token.token}` }
})
        const data = await res.data;
        SpeechRecognition.stopListening();
         //handle_speak = " تمت العملية بنجاح " + " ";  
         //speak({ text: handle_speak , voice : voice , rate :1 }) //What to say 
        //alert('Order approved')
           var o=[];
           for(var i=0; i<get_orders_store.length;i++)
           {
             if(get_orders_store[i]._id === id) {o.push(get_orders_store[i]); o[i]["status"]="preparing";}
             else o.push(get_orders_store[i]);
           }
           console.log(o)
           dispatch(order_status(o));
           if(counter_state!=approved_count)
             {
               //complete pending 
               handle_rest_approved("done cancel");
             }
             else {
               //Last order 
               handle_speak = "  تمتْ العمليةُ بنجاحٍ" + " . ";  
               speak({ text: handle_speak , voice : voice , rate : 1}) //What to say 
               set_counter_state(0)
               set_approved_count(0)
             }
        
        console.log(data)       

    } 
    catch (err) {
        console.error(err);
    }

}

///////////////// Cancel ORDER USER 
const Cancel_Order_Api = async(id,type)=>{
  console.log("Order Id" , id)
  try {
        const res = await axios.patch('https://future-medical.herokuapp.com/user/order/cancel',{
            id : id 
        },{
  headers : { 'Authorization': `Bearer ${token.token}` }
})
        const data = await res.data;
        SpeechRecognition.stopListening();
        //alert('Order cancelled successfully');
           var o=[];
           for(var i=0; i<get_orders_store.length;i++)
           {
             if(get_orders_store[i]._id !== id) o.push(get_orders_store[i]);
           }
           dispatch(order_status(o));
           console.log(counter_pending_order)
           if (type == "pending"){
            if(count_pending_order!=counter_pending_order)
             {
               //complete pending 
               complete_pending_orders("done cancel");
             }
             else {
               //Last order 
                handle_speak = "  تمتْ العمليةُ بنجاحٍ" + " . "  
                speak({ text: handle_speak , voice : voice , rate : 1}) //What to say 
               set_counter_pending_order(0);
               set_count_pending_order(0)
             }
           }
           else if (type ="approved"){
            if(counter_state!=approved_count)
             {
               //complete pending 
               handle_rest_approved("done cancel");
             }
             else {
               //Last order 
              handle_speak = "  تمتْ العمليةُ بنجاحٍ" + " . "
         speak({ text: handle_speak , voice : voice , rate : 1}) //What to say 
               set_counter_state(0)
               set_approved_count(0)
             }
            }
         //handle_speak = "  تمت العملية بنجاح " + " ";  
        // speak({ text: handle_speak , voice : voice , rate : 1}) //What to say 
        console.log(data)       
    } 
    catch (err) {
        console.error(err);
    }

}




/*const sleepNow = (delay) => new Promise ((resolve) => setTimeout (resolve, delay ))*/


//console.log("Voices Available" ,voices[1].lang); //////////See voices   


///////////////// departments tag 
const departments_format = ['جلدية','قلب','صدر و التنفس','تغذية','مسالك بولية','اطفال','نفسي'];
const departments = ['الجلدية','القلب','الصدر و التنفس','التغذية','مسالك بولية','طب الاطفال','الطب النفسي'];
//const departments = ['طب الاطفال','جراحة عامة','طب الاطفال','جراحة عامة','طب الاطفال','جراحة عامة'] ;
const read_departments = async ()=>{
  var word = wanted_sentece;
  console.log(word);
  for (let i = 0 ; i < departments.length ; i++)
{
    //await sleepNow (2500)
  var n = word.includes(departments[i]);
  if (n == true)
  {console.log("department is :" ,departments[i] ) ;
  Get_Doctors_Department(departments[i])
  flag_speicific_dep = true ;
   break;}
 
  var y = word.includes(departments_format[i]);
  console.log(y)
  if (y == true)
  {console.log("department is :" ,departments_format[i] ) ;
  Get_Doctors_Department(departments[i])
  flag_speicific_dep = true ;
   break;}
 
}
  
  if (flag_speicific_dep == false){
  //SpeechRecognition.stopListening();
  SpeechRecognition.stopListening();
  handle_speak = "الأقسام الموجودة هى"+ " . " ;  
for (let i = 0 ; i < departments.length ; i++)
{
    //await sleepNow (2500)
  handle_speak+=departments[i]+ "  . ";
}
   speak({ text: handle_speak , voice : voice , rate : 0.8}) //What to say 
console.log("end")
}
}


const my_orders = ()=>{
   SpeechRecognition.stopListening(); 
   if (token.token)
   {
           handle_speak ='إذا كنتُ تريدُ معرفةَ الطلباتِ التي تمتْ الموافقةُ عليها قُلْ واحد , أما إذا كنتُ تريدُ معرفةَ الطلباتِ التي لمْ تتمْ الموافقةُ عليها قُلْ اتنينْ , أما إذا كنتُ تريدُ معرفةَ الطلباتِ التي لمْ يتمْ الردُ عليها قُلْ تلاتة ' 
           dispatch(myorders())
           navigate('/user')
           speak({ text: handle_speak , voice : voice , rate : 1}) //What to say 
           set_flag_kind_orders(true);
           //Get_User_Orders();
   }
   else { //not logined 
    
  handle_speak = 'لازم تكونُ فاتحَ حسابكَ الأولِ'
  speak({ text: handle_speak , voice : voice , rate : 0.9}) //What to say 
  }
}
const my_meetings = ()=>{
   SpeechRecognition.stopListening(); 
   if (token.token)
   {
           dispatch(appointments())
           navigate('/user')
           Get_User_meetings();
   }
   else { //not logined 
    
  handle_speak = 'لازم تكونُ فاتحَ حسابكَ الأولِ'
  speak({ text: handle_speak , voice : voice , rate : 0.9}) //What to say 
  }
}

const reserve_meeting = ()=>{
     SpeechRecognition.stopListening(); 
     navigate('/'); //home page departments 
     set_wanted_slot(""); // initial when start
     set_wanted_dep("");
   if (token.token)
   {
             handle_speak = "الأقسام الموجودة هى" + " . ";  
             for (let i = 0 ; i < departments.length ; i++)
             {
               //await sleepNow (2500)
                handle_speak+=departments[i]+ "  . ";
             }
           handle_speak += 'ما القسمُ الذي تريدُ أنْ تَحْجُزَ فيهِ معَ دكتورٍ؟'
           speak({ text: handle_speak , voice : voice , rate : 0.9}) //What to say 
          set_flag_reserve_meeting(true); // TO WAIT DEPT TO RESERVE 
   }
   else { //not logined 
    
  handle_speak = 'لازم تكونُ فاتحَ حسابكَ الأولِ'
  speak({ text: handle_speak , voice : voice , rate : 0.9}) //What to say 
  }
}

  var dr_app = [];

const GET_DATES_DOCTORS = (timetable) =>{
  //let momentObject = moment();
  //mom.tz.setDefault("Egypt/Cairo");

  for (var i = 0; i < timetable.length; i++) {
    const f = timetable[i].from.split(":");
    const t = timetable[i].to.split(":");
    dr_app.push({ day:timetable[i].day, from: f[0], to: t[0] });
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
  /*var dates = []
  var date = "";
  for (var i = 0 ; i < days.length ; i++)
  {
     //date = days[i].format("DD") +"/"+days[i].format("MMM")+"/"+days[i].format("YYYY");
     date = days[i].format("DD-MM-YYYY")
     dates.push(date);      
  }*/
  return days ; 
}

//const Get_Date_Slots = (date,dr_name) =>{
  
  const Get_Slots = async (item,dr_name,slot) => {
    var reserved_slots = [];
    const day = item.format("dddd");
    const date = `${item.format("YYYY")+"-"+item.format("MM")+"-"+item.format("D")}`
    var reserved = [];
    var morning_shifts = [] ;
    var evening_shifts = [];
    //const dd= new Date();
    //const date_test = `${dd.getFullYear() +"-"+(dd.getMonth()+1)+ "-"+ dd.getDate()}`
    try {
      const res = await axios.get(
        `https://future-medical.herokuapp.com/user/timetable/${dr_name}/${date}`
      );
      const data = await res.data;
      console.log(data);
      if (data == "no reservations in this date") {
        reserved = [];
      }
      else 
      {for (var i = 0; i < data.length; i++) {
        reserved_slots.push(data[i].slot);
      }

     reserved = reserved_slots; }

     console.log(reserved);

      for (var i = 0; i < dr_app.length; i++) {
        if (dr_app[i].day === day) {
          //check day
          if (dr_app[i].from <= 12) {
            const num_slots =
              parseInt(parseInt(dr_app[i].to) - parseInt(dr_app[i].from)) * 2;
            console.log(num_slots);
            var c = parseInt(dr_app[i].from);
            var d = parseInt(dr_app[i].from) + 1;

            for (var k = 0; k < num_slots; k++) {
              //check for slot state
              if (k % 2 === 0) 
              {
                if (!(reserved.includes(`${c}:00 - ${c}:30`)))
              {  morning_shifts.push(`${c}:00 - ${c}:30`);}
              }
              else 
                {
                  if (!(reserved.includes(`${c}:30 - ${d}:00`)))
                  {morning_shifts.push(`${c}:30 - ${d}:00`);}
                  c += 1;
                  d += 1;
              }
              }
            
          } else if (dr_app[i].from > 12) {
            const num_slots =
              parseInt(parseInt(dr_app[i].to) - parseInt(dr_app[i].from)) * 2;
            console.log(num_slots);
            var c = parseInt(dr_app[i].from);
            var d = parseInt(dr_app[i].from) + 1;
            for (var k = 0; k < num_slots; k++) {
                          if (k % 2 === 0) {
                if (reserved.includes(`${c}:00 - ${c}:30`)) {
                  if(c<12)
                  {morning_shifts.push(`${c}:00 - ${c}:30`                  
                  );}
                  else
                  {evening_shifts.push( `${c}:00 - ${c}:30`
                    
                  );}
                } else {
                  if(c<12)
                  {morning_shifts.push(
                     `${c}:00 - ${c}:30`
                    
                  );}
                  else{
                    evening_shifts.push( `${c}:00 - ${c}:30`
                      
                    );
                  }
                }
              } else {
                if (reserved.includes(`${c}:30 - ${d}:00`)) {
                  if(c<12){morning_shifts.push(
                     `${c}:30 - ${d}:00`,
                    
                  );}
                  else{
                    evening_shifts.push(
                      `${c}:30 - ${d}:00`
                      
                    );
                  }
                  c += 1;
                  d += 1;
                } else {
                  if(c<12)
                  {morning_shifts.push(
                     `${c}:30 - ${d}:00`                    
                  );}
                  else{
                    evening_shifts.push(
                      `${c}:30 - ${d}:00`,                      
                    );
                  }
                  c += 1;
                  d += 1;
                }
              }
              }
            }
          }
        }
        //Check if time gone 
    console.log("evening speech",evening_shifts)    
    var return_list = [];
    var current = new Date();
     //console.log("timenow",`${current.getHours()}:${current.getMinutes()}`)
     //console.log("datenow",`${current.getMonth()+1}:${current.getDate()}`)
     //console.log("given date",`${date.split("-")[1]}:${date.split("-")[2]}`)
     if (!(date.split("-")[2] == current.getDate() && date.split("-")[1] == current.getMonth()+1))
     {
      console.log("nottt same dateeeeeeeeeeeeeeeeee")
      if(slot == "AM")
    {
      
      return morning_shifts ;
      
    }
    else if (slot == "PM")
    {
      return evening_shifts ;
    }
    return ;
     }
    else { 
      if (slot == "AM"){
    for (var i = 0 ; i < morning_shifts.length ; i++)
    {
      var compared_slot = morning_shifts[i].split('-')[1].split(':')  ; 
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
       return_list.push(morning_shifts[i])
     }
      
    }
    return return_list;
  }
  else if (slot =="PM")
  {
        for (var i = 0 ; i < evening_shifts.length ; i++)
    {
      var compared_slot = evening_shifts[i].split('-')[1].split(':')  ; 
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
       return_list.push(evening_shifts[i])
     }
      
    }
    return return_list;
  }
  
  
  }

      /* console.log(morning_shifts)
      if(slot == "AM")
      {return morning_shifts ;}
      if(slot == "PM")
      {return evening_shifts ;}*/

      }
     
     catch (err) {
      console.error(err);
    }
  };


const handle_reserve_meeting = (dept_name)=>{
 var flag_exist = false ;
  for (let i = 0 ; i < departments.length ; i++)
{
    //await sleepNow (2500)
  var n = dept_name.includes(departments[i]);
  if (n == true)
  {console.log("department is :" ,departments[i] ) ;
    set_wanted_dep(departments[i])
    navigate(`/Doctors/${departments[i] }`)
    SpeechRecognition.stopListening();
  handle_speak +='إذا كنتُ تريدُ ميعادَ صباحا قُلْ واحدٌ أما إذا كنتُ تريدُ ميعادَ مساءً قُلْ اتنينْ'
  speak({ text: handle_speak , voice : voice , rate : 0.9}) //What to say 
  set_flag_meeting_time(true)
    flag_exist = true ;
   break;}
 
  var y = dept_name.includes(departments_format[i]);
  //console.log(y)
  if (y == true)
  {console.log("department is :" ,departments_format[i] ) ;
  SpeechRecognition.stopListening();
  set_wanted_dep(departments[i])
  handle_speak +='إذا كنتُ تريدُ ميعادَ صباحا قُلْ واحدٌ أما إذا كنتُ تريدُ ميعادَ مساءً قُلْ اتنينْ'
  speak({ text: handle_speak , voice : voice , rate : 0.9}) //What to say 
  set_flag_meeting_time(true)
     flag_exist = true ;
    navigate(`/Doctors/${departments[i] }`)
   break;}
}
if (flag_exist == false)
{
  SpeechRecognition.stopListening();
  handle_speak +="لا يوجد هذا القسم"
  speak({ text: handle_speak , voice : voice , rate : 0.9}) //What to say 
}

}
const config = { headers: { Authorization: `Bearer ${token.token}` } };

  const Get_Reserve = async (meeting_data) => {
    try {
      SpeechRecognition.stopListening();
      const res = await axios.post(
        `https://future-medical.herokuapp.com/user/reservation/meeting`,
        { doctorEmail: meeting_data.doctorEmail, date: meeting_data.date, day: meeting_data.day, slot: meeting_data.slot },
        config
      );
      const data = await res.data;
      console.log(data);
      handle_speak ="  تمتْ العمليةُ بنجاحٍ" + " . "
      //alert(data);
      speak({ text: handle_speak , voice : voice , rate : 0.9}) //What to say 
      dispatch(selected_slot({})); //EMPTY 
    } catch (err) {
      console.error(err);
    }
  };

const reserve_doctor = async (dep,slot) =>{

console.log(dep);
console.log("wanted",slot)
try{
 var res =  await axios.get(`https://future-medical.herokuapp.com/user/department/${dep}`);
 var data = await res.data ;
console.log(data);
if(data !== "no doctors found in this department"){
  SpeechRecognition.stopListening();
     // const day = item.format("dddd");
    //const date = `${item.format("DD-MM-YYYY")}`;
  //const items = ['a', 'b', 'c'];
  
  (async () => {
  for (var j = 0 ; j < data.length ; j++) {
     var items = GET_DATES_DOCTORS(data[j].timetable)  ;  //ALL DATES FOR DOCTORS
    //const uppercaseItem = await asyncUppercase(items[i]);
     var flag_found_slot = false ;
    await (async () => {
     for (var i = 0 ; i < items.length ; i++ )
     {
       var required_slots = [] ; 
        required_slots = await Get_Slots( items[i],data[j].email ,slot )
        console.log("slots",required_slots)
            if (required_slots.length != 0) //GET SLOTS FOR EACH DATE
                 {
                   flag_found_slot = true ;
                   var time_slot =  required_slots[0].split("-");
                     console.log("err slot",time_slot[1])
                     console.log(required_slots[0]) ;                     
                     navigate(`/doctor/${data[j].username}`, { state: { Doctor_id: data[j].email } });
                     dispatch(meetings());
                     handle_speak = "أولُ ميعادٍ متاحٍ معَ أحسنِ الدكاترةِ يوم" + `${items[i].format("dddd")}` + " " + `${items[i].format("DD/MM/YYYY")}` +" "+ " مع دكتور" +" "+ `${data[j].arabic_username}` ;
                     handle_speak +=  " من الساعة " + time_slot[0] + " الى"+ " " + time_slot[1] + " "; 
                     handle_speak += 'إذا كنتُ تريدُ حَجِزَ هذا الميعادِ قُلْ واحدٌ'
                     console.log(handle_speak)
                     //${data.format("YYYY")+"-"+data.format("MM")+"-"+data.format("D")}
                     //dispatch(selected_slot({"slot":required_slots[0] , "date" : `${items[i].format("DD/MM/YYYY")}` }))
                     set_meeting_data({"doctorEmail":data[j].email , "date" : items[i].format("YYYY")+"-"+items[i].format("MM")+"-"+items[i].format("D") , "day" : items[i].format("dddd") ,"slot" : required_slots[0]})
                      speak({ text: handle_speak , voice : voice , rate : 0.9}) //What to say 
                       dispatch(selected_slot({"slot":required_slots[0], "date" : `${items[i].format("DD-MM-YYYY")}` }));
                      set_sure_reserve(true);
                     break;
                 } 
     }
     })()
     ///////*/////// Break of doctors List if we found a slot 
       if(flag_found_slot)
       {
         break ;
       }
       if(flag_found_slot == false && j == data.length - 1)
       {
          handle_speak += 'لا يوجدُ مواعيدَ متاحةً'
           speak({ text: handle_speak , voice : voice , rate : 0.9}) //What to say 
       }
    }       
})()
}
       
            
else {
  SpeechRecognition.stopListening();
   handle_speak = 'لا يوجدُ دكاترةٌ متاحةٌ في هذا القسمَ الآنِ' ;  
  speak({ text: handle_speak , voice : voice , rate : 0.9}) //What to say 

}
}
catch(err){
console.log(err)
}
//.catch((err)=>{})

}
 const [message, setMessage] = useState('');
 /*const commands = [
   {
     command: 'reset',
     callback: () => resetTranscript()
   },
   {
     command: 'shut up',
     callback: () => setMessage('I wasn\'t talking.')
   },     
   {
     command: ['عرفني الأقسام الموجودة.','hi'],
     callback : () => read_departments()
   },
   { 
     command: 'عرفني المستشفيات الموجودة.',
     callback : () => go_hospitals()
   },
   {
     command: 'صباح الخير.',
     callback: () => speak({ text: 'صباح النور' , voice : voice })     
   },
 ]*/
const {
   transcript,
   interimTranscript,
   finalTranscript,
   resetTranscript,
   listening,
 } = useSpeechRecognition();


  const listenContinuously = () => {
   SpeechRecognition.startListening({
     continuous: true,
     language: 'ar-EG',
   });
 };

  React.useEffect(() => {
    
    window.addEventListener('keydown', (event)=>{handleKeyDown(event)});
    

    // cleanup this component

    return () => {

      window.removeEventListener('keydown', handleKeyDown);

    };

  }, []);





 useEffect(()=>{
  if (listening){
  get_arabic();//get arabic voice first time 
  }
 },[listening])

 useEffect(()=>{  
get_arabic();//get arabic voice first time 
   if(key_sound == 32)  
   {
     if(listening)
     {SpeechRecognition.stopListening();}
     else{listenContinuously();}
     set_approved_count(0)
     set_counter_state(0)
     set_complete_reading(false)
     set_flag_reserve_meeting(false)
     set_flag_meeting_time(false)
     set_sure_reserve(false);
     set_count_today_meetings(0)
     set_counter_today_meetings(0)
     set_count_pending_order(0)
     set_counter_pending_order(0)
     set_enter_meeting(false);
   }
   if(key_sound == 27)  
   {
     set_approved_count(0)
     set_counter_state(0)
     set_complete_reading(false)
     set_flag_reserve_meeting(false)
     set_flag_meeting_time(false)
     set_sure_reserve(false);
     set_count_today_meetings(0)
     set_counter_today_meetings(0)
     set_count_pending_order(0)
     set_counter_pending_order(0)
     set_enter_meeting(false);
     cancel(); //Stop speaking
   }
 },[press_state])



 const Trial = ()=>{
   console.log("hii")
   //set_first_render(true)
   SpeechRecognition.stopListening();    
   handle_speak = "انا بوت هحاول اساعدك لو عاوز توقفنى و انا بتكلم دوس سكيب و لو محتاج تفتح أو تقفل المايك دوس سبيس"
  speak({ text: handle_speak , voice : voice , rate : 1})} //What to say }
 
 // Didmount(Trial,[])

 /*useEffect(()=>{
   console.log("hii")
   SpeechRecognition.stopListening();    
   handle_speak = "انا بوت هحاول اساعدك لو عاوز توقفنى و انا بتكلم دوس سكيب و لو محتاج تفتح أو تقفل المايك دوس سبيس"
  speak({ text: handle_speak , voice : voice , rate : 1}) //What to say 
 },[])*/


const replies_my_order = [" واحد."," إتنين."," اثنان."," واحد"," إتنين"," اثنان"," تلاتة."," تلاتة"]; 
 useEffect(() => {

    //console.log("first Done",handle_first_render)
    //if(handle_first_render){listenContinuously();}
    //console.log("malkkkkkkkkk")
     //listenContinuously();
     
   if (finalTranscript !== '') {
    // console.log("my odrer",flag_ask_my_order);
    //get_arabic(); //get arabic voice
     set_wanted('');
     wanted_sentece ='';
     //console.log("index",transcript_index)
     for (let i = transcript_index ; i < finalTranscript.length; i++ )
     {
       wanted_sentece+=finalTranscript[i];
       //console.log('sentece', wanted_sentece);
     }
     console.log('sentece', wanted_sentece); //GO TO THE MODEL 
     set_wanted(wanted_sentece)
     if (reply_pending_order){
         set_reply_pending_order(false)
         //wait one to cancel 
          if(replies_my_order.includes(wanted_sentece)){
          var index_reply = replies_my_order.indexOf(wanted_sentece);
          if (index_reply == 0 || index_reply == 3)
           { 
             ///Cancel 
             //Cancel_Order_Api
             Cancel_Order_Api(current_order_id,"pending");
           }}
           else{
             if(count_pending_order!=counter_pending_order)
             {
               //complete pending 
               complete_pending_orders();
             }
             else{
               set_count_pending_order(0); //Initial state
               set_counter_pending_order(0);
               Get_Voice_model(wanted_sentece); //voice moedl 
              setindex(finalTranscript.length); //Update the index 

             }
           }

     }
     else if(flag_kind_orders)
     {
       set_flag_kind_orders(false);
          //one approved 2 disapproved // 3 pending
          if(replies_my_order.includes(wanted_sentece)){
          var index_reply = replies_my_order.indexOf(wanted_sentece);
          if (index_reply == 0 || index_reply == 3)
           { 
                   //one 
                   console.log("one")
                   Get_User_Orders("approved");

           }
           else if (index_reply == 6 || index_reply == 7){
             //3
             console.log("three")
             Get_User_Orders("pending");
           }
           else{
             //two
             console.log("two")
             Get_User_Orders("disapproved");
           } 
          }
           else{
              //model
           Get_Voice_model(wanted_sentece); //voice moedl 
          setindex(finalTranscript.length); //Update the index 
           }

     }
     else if(flag_logout){
      set_flag_logout(false)
         //wait one to execute logout
               if(replies_my_order.includes(wanted_sentece)){
          var index_reply = replies_my_order.indexOf(wanted_sentece);
          if (index_reply == 0 || index_reply == 3)
           { 
                   dispatch(logout());
                   dispatch(chart());
                   dispatch(info())
                   dispatch(info_doc())
                   navigate("/");
           }}
           else{
              //model
           Get_Voice_model(wanted_sentece); //voice moedl 
          setindex(finalTranscript.length); //Update the index 
           } 
    }
    else if (flag_complete_reading)
    {
      //Wait one if wants to complete reading 
      set_complete_reading(false)
      if(replies_my_order.includes(wanted_sentece)){
          var index_reply = replies_my_order.indexOf(wanted_sentece);
          if (index_reply == 0 || index_reply == 3)
           { 
               console.log("complete")
               if (count_today_meetings != counter_today_meetings)
               {
                 complete_today_meetings(today_array_Meetings);
               }
               else if (count_today_meetings == counter_today_meetings && pendig_array_Meetings.length !=0 )
               { 
                 //if equal complete pending
                 complete_reading_meetings(pendig_array_Meetings)}
                 set_counter_today_meetings(0);
                 set_count_today_meetings(0); //Return to the initial state 
               
              }
          }
      else{
           //model
           Get_Voice_model(wanted_sentece); //voice moedl 
          setindex(finalTranscript.length); //Update the index 
      }
    }

    else if (flag_enter_meeting){
      //WAIT ONE IF WANT TO ENTER THE MEETING
      set_enter_meeting(false);

      if(replies_my_order.includes(wanted_sentece)){
          var index_reply = replies_my_order.indexOf(wanted_sentece);
          if (index_reply == 0 || index_reply == 3)
           { // One enter 
               console.log(current_meeting_id) //CHECK 
               var saved_channel = current_meeting_id.doctor.email
              // dispatch(channel_name(`${props.dr_email} ${props.slot}`));
               dispatch(channel_name(`${saved_channel} ${current_meeting_id.slot}`));//dr email & slot
              navigate('/user/meetingroom') ; //return to init state lw d5l meeting 
              set_counter_today_meetings(0);
              set_count_today_meetings(0); //Return to the initial state 
            }
          }
      else
          {
            console.log(pendig_array_Meetings)
            if (pendig_array_Meetings.length != 0 || today_array_Meetings.length > 1)
                {
                  SpeechRecognition.stopListening();
                  var speaking_ask = 'إذا كنتُ تريدُ معرفةَ باقي المواعيدِ قُلْ واحدٌ'
                   speak({ text: speaking_ask , voice : voice , rate : 1}) //What to say }
                   set_complete_reading(true)
                }
                else{
                  // mfesh meetings tt2ry 
                   Get_Voice_model(wanted_sentece); //voice moedl 
                setindex(finalTranscript.length); //Update the index 
                } 
                
              }
    }


    else if (flag_sure_reserve){
      //wait one to make reservation 
      set_sure_reserve(false)
      if(replies_my_order.includes(wanted_sentece)){
          var index_reply = replies_my_order.indexOf(wanted_sentece);
          if (index_reply == 0 || index_reply == 3)
           { //AM 
            //sMAKE RESERVATION
            console.log(meeting_data)
              Get_Reserve(meeting_data);
            }
              }
              else
              {
                // CALL THE MODEL 
                Get_Voice_model(wanted_sentece); //voice moedl 
                setindex(finalTranscript.length); //Update the index 
              }
    }
    else if (flag_meeting_time)
          { 
            // waiting 1 for am .. & 2 for pm 
            set_flag_meeting_time(false)
              if(replies_my_order.includes(wanted_sentece)){

                    var index_reply = replies_my_order.indexOf(wanted_sentece);
                     if (index_reply == 0 || index_reply == 3)
                     { //AM 
                      //set_wanted_slot("AM")
                      reserve_doctor(wanted_dep,"AM")
                     }
                     else{
                      //set_wanted_slot("PM")
                      reserve_doctor(wanted_dep,"PM")
                       //PM
                     }
              }
              else
              {
                // CALL THE MODEL 
                Get_Voice_model(wanted_sentece); //voice moedl 
                setindex(finalTranscript.length); //Update the index 
              }
          } 
    else if (flag_reserve_meeting)
     {
          //waiting department name 
          handle_reserve_meeting(wanted_sentece);
          set_flag_reserve_meeting(false)
     }
    else if(flag_approve_my_order)
     {

      set_approve_my_order(false)
         //wait one to cancel 
          if(replies_my_order.includes(wanted_sentece)){
          var index_reply = replies_my_order.indexOf(wanted_sentece);
          if (index_reply == 0 || index_reply == 3)
           { 
             ///Cancel 
             //Cancel_Order_Api
              Approve_Order_Api(current_order_id);
            
           }
           else if (index_reply == 1 || index_reply == 2 || index_reply == 5)
           {//two //cancel order
              Cancel_Order_Api(current_order_id,"approved");
           }
          }
           else{
             if(counter_state != approved_count)
             {
               //complete approved 
               handle_rest_approved();   
             }
             else{
                set_counter_state(0) //initial state
              set_approved_count(0)
               Get_Voice_model(wanted_sentece); //voice moedl 
              setindex(finalTranscript.length); //Update the index 

             }
           }

       /*set_approve_my_order(false) 
       if(replies_my_order.includes(wanted_sentece))
       {
         console.log("yes")
         var index_reply = replies_my_order.indexOf(wanted_sentece);
         if (index_reply == 0 || index_reply == 3)
         { //ALL orders
           console.log("Aprroveeeeeee The order ")
           //console.log(current_order_id)
          Approve_Order_Api(current_order_id);
         }
         else{
           //Specific order 
           Cancel_Order_Api(current_order_id);
           console.log("Disprroveeeeeee The order ")    
           }
       }
       else{
         if (counter_state == approved_count){
            Get_Voice_model(wanted_sentece);
             setindex(finalTranscript.length); //Update the index 
             console.log("model")
            ////////////////////m3nah ano b3dha mosh hykml orders
            }
            }
           
      console.log("counter",counter_state)
      console.log("approved count",approved_count)
      if (counter_state !== approved_count){
               handle_rest_approved();    
            }
      else{ 
              counter_var = 0 ; 
              set_counter_state(0)
              set_approved_count(0)
            }*/
        
     }
     else{
     Get_Voice_model(wanted_sentece); //voice model 
     set_wanted(wanted_sentece)}
     
     //transcript_index = finalTranscript.length ; 
     setindex(finalTranscript.length); //Update the index 
     //console.log("index",transcript_index)
     console.log('Got final result:', finalTranscript);
   }
 }, [ finalTranscript]);

 if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
   return null;
 }

 if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
   console.log('Your browser does not support speech recognition software! Try Chrome desktop, maybe?');
 }

 return (
   <div>
     {/*<div>
       <span>
         listening:
         {' '}
         {listening ? 'on' : 'off'}
       </span>
       <div>
         <button type="button" onClick={resetTranscript}>Reset</button>
         <button type="button" onClick={listenContinuously}>Listen</button>
         <button type="button" onClick={SpeechRecognition.stopListening}>Stop</button>
       </div>
     </div>
     <div>
       {message}
     </div>
     <div>
     <span>{transcript}</span>*/}
       {/*wanted_sentence && <textarea className="text"
        value={wanted_sentence}        
    />*/}
      <Tooltip title="To turn the mic on/off (press space) , 
      To stop the voice (press Esc)" placement="left">
     <button className="voice-btn" onClick={listening?SpeechRecognition.stopListening:listenContinuously}>
        <KeyboardVoiceIcon htmlColor={listening?'green':'red'}/>
           </button>
      </Tooltip>
   </div>
 );
};

export default Speech;