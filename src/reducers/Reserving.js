const entry_state = JSON.stringify({})
const reserving_reducer = (state = entry_state , action)=>{ //APP ADMIN
switch(action.type){
case "selected_slot":
    //console.log(action.state);
    return JSON.stringify(action.state) ;
default :
     return state ;
}
}

export default reserving_reducer ;