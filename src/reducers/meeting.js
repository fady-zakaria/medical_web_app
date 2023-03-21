const entry_state = JSON.stringify("")
const meeting_reducer = (state = entry_state , action)=>{ //APP ADMIN
switch(action.type){
case "channel_name":
    console.log(action.state);
    return JSON.stringify(action.state) ;
default :
     console.log(state); 
     return state ;
}
}

export default meeting_reducer ;