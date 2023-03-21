const Doctor_reducer = (state = "info" , action)=>{
switch(action.type){
case "info_doc":
    return "info_doc" ;
case "reviews_doc" :
    return "reviews_doc"  ;   
case "meetings" :
    return "meetings" ;         
default :
     return state ;
}
}
export default Doctor_reducer ;