import React,{useState} from "react";
import './file.css';

const Slot=(props)=>{
    var [num , setnum] =useState(1);
    const inc = ()=>{
        num+=1;
        setnum(num)};
    
      const dec = ()=>{
        num-=1;
        if (num >=1) setnum(num);
        else if (num ===1 || num <1 )
        {
         num =1;
          setnum(1);
        }};
        if (props.setfrom !== undefined)
        {
          console.log(props.data.med)
          for(var i=0;i<props.data.q.length;i++)
          {
            if(props.data.q[i].medicine === props.data.med) props.data.q[i].quanity=(num);
          }
          console.log(props.data.q);  
          props.setfrom(num);
        }
        
       
    return(
        <body>
    <div className="container_block">
      <button type="button" className="minus" onClick={dec}>
        <span>-</span>
      </button>
      <span className="num">{num}</span>
      <button type="button" className="plus" onClick={inc}>
        <span>+</span>
        <span></span>
      </button>
    </div>
    </body>
    )

}
export default Slot;