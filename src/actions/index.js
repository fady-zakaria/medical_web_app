export const hospitals = ()=>{
    return {type : "hospitals"} 
}

export const clinics = ()=>{
    return {type : "clinics"} 
}

export const chart = ()=>{
    return {type : "chart"} 
}

export const pharmacies = ()=>{
    return {type : "pharmacies"} 
}

export const announcments = ()=>{
    return {type : "announcments"} 
}

/*export const signin = (token,usertype)=>{
    return {type : "Signin" , token : token , usertype : usertype } 
}*/
export const signin = (state)=>{
    return {type : "Signin" , state : state } 
}
export const logout = ()=>{
    return {type : "logout"} 
}

/************ profile actions */
export const info = ()=>{
    return {type : "info"} 
}

export const history = ()=>{
    return {type : "history"} 
}

export const appointments = ()=>{
    return {type : "appointments"} 
}

export const myorders = ()=>{
    return {type : "myorders"} 
}

export const prescription = ()=>{
    return {type : "prescription"} 
}

export const reservations = ()=>{
    return {type : "reservations"} 
}

export const reviews = ()=>{
    return {type : "reviews"} 
}

//order status
export const order_status = (state)=>{
    return {type : "order_status", state:state} 
}

export const channel_name = (state)=>{
    return {type : "channel_name", state:state} 
}
// export const release = ()=>{
//     return {type : "release"} 
// }

/*********** DOCTOR PROFILE  */
export const info_doc = ()=>{
    return {type : "info_doc"} 
}

export const meetings = ()=>{
    return {type : "meetings"} 
}

export const reviews_doc = ()=>{
    return {type : "reviews_doc"} 
}
export const selected_slot = (state)=>{
    return {type : "selected_slot" , state:state} 
}

export const join = ()=>{
    return {type : "join"} 
}
export const leave = ()=>{
    return {type : "leave"} 
}


