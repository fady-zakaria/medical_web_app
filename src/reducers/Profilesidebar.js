const profile_reducer = (state = "info" , action)=>{
switch(action.type){
case "info":
    return "info" ;
case "history" :
    return "history"  ;   
case "appointments" :
    return "appointments" ;  
case "myorders" :
    return "myorders"   ;    
case "prescription" :
    return "prescription"   ;   
case "reviews" :
    return "reviews"   ;   
case "reservations" :
    return "reservations"   ;   
default :
     return state ;
}
}
export default profile_reducer ;