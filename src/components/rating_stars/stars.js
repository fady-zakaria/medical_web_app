import React, {useState} from "react";
import './stars.css';
import axios from "axios";
const StarRating = (props) => {
    const [rating, setRating] = useState(0);
    props.setrating(rating);
    
    const [hover, setHover] = useState(0);

    const rating_api = async (rating)=>{
        try {
               const res = await axios.patch(`https://future-medical.herokuapp.com/user/rating/doctor/${props.dr_id}`,
               {rating:rating}
               )
               alert(res.data);
              console.log(res.data);
           } 
           catch (err) {
               console.error(err);
           }
       }
    return (
      <div className="star-rating">
        {[...Array(5)].map((star, index) => {
          index += 1;
          return (
            <button id="button-stars"
              type="button"
              key={index}
              className={index <= (hover || rating) ? "on" : "off"}
              onClick={() => {setRating(index); rating_api(index); props.setcount(parseInt(props.count)+1);}}
              onMouseEnter={() => setHover(index)}
              onMouseLeave={() => setHover(rating)}
            >
              <span className="star">&#9733;</span>
              
            </button>
          );
        })}
      </div>
    );
  };
  export default StarRating;