import React from 'react'
import {useNavigate,Navigate} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import { useJwt } from 'react-jwt'
function Privateuser({ children }) {
  const token = JSON.parse(useSelector(state => state.auth)) //state of token 
  //let { decodedToken, isExpired } = useJwt(token.token);
  //console.log(decodedToken)
  console.log(token); 
  return (token.token ) ? children : <Navigate to="/login" />;
 
}

export default Privateuser