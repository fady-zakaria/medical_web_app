const entry_state = JSON.stringify([])
const order_reducer = (state = entry_state , action)=>{ //APP ADMIN
switch(action.type){
case "order_status":
    console.log(action.state);
    return JSON.stringify(action.state) ;
default :
     return state ;
}
}

export default order_reducer ;