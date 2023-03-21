/*const auth_reducer = (state = {token:"",usertype:""} , action)=>{
switch(action.type){
case "Signin":
    return {token : action.token , usertype : action.usertype } 
    //return action.token,action.usertype ; 
case "logout" :
    return {token : "" , usertype : "" }     //remove token 
default :
     return state ;
}
}*/
/*const auth_reducer = (state = {} , action)=>{ //APP ADMIN
switch(action.type){
case "Signin":
    return action.state ;
    //return action.token,action.usertype ; 
case "logout" :
    return {}      //remove token 
default :
     return state ;
}
}*/
const entry_state = JSON.stringify({})
const auth_reducer = (state = entry_state , action)=>{ //APP ADMIN
switch(action.type){
case "Signin":
    return JSON.stringify(action.state) ;
    //return action.token,action.usertype ; 
case "logout" :
    return entry_state      //remove token 
default :
     return state ;
}
}

export default auth_reducer ;