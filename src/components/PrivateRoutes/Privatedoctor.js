import React from 'react'
import {useNavigate,Navigate} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
function Privatedoctor({ children }) {
  const token = useSelector(state => state.auth) //state of token 
  console.log(token); 
  return (token.token&&token.usertype==="doctor") ? children : <Navigate to="/login" />;
 
}

export default Privatedoctor