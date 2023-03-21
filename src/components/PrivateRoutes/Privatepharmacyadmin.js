import React from 'react'
import {useNavigate,Navigate} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
function Privatepharmacyadmin({ children }) {
  const token = useSelector(state => state.auth) //state of token 
  console.log(token); 
  return (token.token&&token.usertype==="p_admin") ? children : <Navigate to="/login" />;
 
}

export default Privatepharmacyadmin