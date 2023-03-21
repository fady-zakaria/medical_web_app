
const page_reducer = (state = 0 , action)=>{
    switch(action.type){
    case "join":
        console.log(parseInt(state) + 1 );
        return state+1 ;

    case "leave":
        console.log(parseInt(state)-1);
        if (state>0)
        return state-1 ;
        else return 0;
    
    default :
         return state ;
    }
    }
    export default page_reducer ;