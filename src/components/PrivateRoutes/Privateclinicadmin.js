import React from 'react'
import {useNavigate,Navigate} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
function Privateclinicadmin({ children }) {
  const token = useSelector(state => state.auth) //state of token 
  console.log(token); 
  return (token.token&&token.usertype==="c_admin") ? children : <Navigate to="/login" />;
 
}

export default Privateclinicadmin