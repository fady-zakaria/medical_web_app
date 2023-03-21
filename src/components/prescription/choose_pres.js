import React, { useEffect, useState } from "react";
import { Modal, Row,Col, Button, Form, Carousel,Card,Alert  } from "react-bootstrap";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {GiMedicines} from 'react-icons/gi';
import SendIcon from '@mui/icons-material/Send';
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import Slot from './file';
import { Back } from "react-bootstrap-icons";
import {logout} from '../../actions';
import { useNavigate } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";

const Choose_pres=(props)=>{
        const dispatch = useDispatch();
        let navigate = useNavigate();
        const [show, setShow] = useState(props.show);
        const handleClose = () => {setShow(false); props.setshow(false);};
        const[done, setdone] = useState(false);
        const[pres, setpres]=useState([]);
        const[pres2, setpres2]=useState([]);
        const[number, setnumber] = useState(1);
        const [q,setq]=useState([]);
        const[next, setnext] = useState(false);
        const[dis, setdis] = useState(true);
        const token = JSON.parse(useSelector((state) => state.auth));
        const [loading,setloading]=useState(true)
       
        const config = {headers: {
            'Authorization': `Bearer ${token.token}`}};

        
        
       
        const get_pres = async ()=>{
         try {
                const res = await axios.get('https://future-medical.herokuapp.com/user/prescriptions' ,
                
                 config
                )
     
                console.log(res.data);
                if (res.data==="you have no prescriptions yet") {setnext(true);setloading(false);return}
                var med_state=[];
                for(var i=0; i<res.data.length;i++)
                {
                  for(var j=0; j<res.data[i].medicines.length;j++)
                  {
                    med_state.push({medicine:res.data[i].medicines[j], state:false});
                  }

                }
                setpres(med_state);
                setpres2(res.data);
                setloading(false)
              
            } 
            catch (err) {
              if (err.response) {
                if(err.response.data === "not authorized, token is failed"){
                  dispatch(logout());
                  navigate("/login")
                }
              }
          //console.error(error);
          }
        }




const change=(x)=>{
  console.log(x);
  var med = [];
  for(var i=0; i<pres.length;i++)
  {
    //if(pres[i].medicine === x) pres[i].state=!(pres[i].state);
    if(pres[i].medicine === x) med.push({medicine:pres[i].medicine , state:!(pres[i].state)})
    else med.push({medicine:pres[i].medicine , state:pres[i].state})
  }
  setpres(med);
  console.log(med);
}
const setback=()=>{
  var med_state=[];
    for(var i=0; i<pres2.length;i++)
    {
      for(var j=0; j<pres2[i].medicines.length;j++)
      {
        med_state.push({medicine:pres2[i].medicines[j], state:false});
      }
    }
    setpres(med_state);
}
const order_details=()=>{
 
  props.set_order(q);
}

const quanity=()=>{
  var o =[];
  for(var i=0;i<pres.length;i++)
  {
      if(!(o.includes(pres[i].medicine))&&(pres[i].state===true)) o.push({medicine: pres[i].medicine, quanity:1});
  }
  console.log(o);
  setq(o);
}

    
     useEffect(()=>{
      get_pres();
      },[])
      
        return (
          <>
           
            <Modal show={show} onHide={handleClose}>
              <Modal.Header>
                <Modal.Title>Choose from your Prescriptions</Modal.Title>
              </Modal.Header>
             { done ? 
             <Modal.Body>
               <Form>
                {
                  q.map(m=> 
                    <Row>
                      <Col>
                      <li>{m.medicine}</li>
                      </Col>
                      <Col>
                      <Slot setfrom={setnumber} data={{med:m.medicine, q:q} }/>
                      </Col>
                    </Row>
                   
                    )
                }
               </Form>
             </Modal.Body>
             : 
             <Modal.Body>
                <Form>
                 
            <div style={{width:"350px", height:"350px"}}>
                {
                    pres2.length ===0 ? (
                    loading?(
                      <div style={{'margin':'auto'}}>
                     <Spinner animation="border" variant="primary" />
                   </div>  
                      ):(
                    <>
                      <Alert key="primary" variant="primary">
                        There are no prescriptions yet.
                      </Alert>
                  </>))
                  :
                  loading?(
                    <div style={{'margin':'auto'}}>
                   <Spinner animation="border" variant="primary" />
                 </div>  
                    ):(
            <Carousel variant="dark">
                    {
                        pres2.map((p)=>
                            <Carousel.Item>
        <div style={{ textAlign:"center"}}>
            <Card>
            <Card.Body>
              <Card.Title>Prescription</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{p.Date.split("T")[0]
                        .split("-")
                        .reverse()
                        .join("-")}</Card.Subtitle>
              <Card.Subtitle className="mb-2 text-muted">Dr {p.doctor.username}</Card.Subtitle>
              <Card.Subtitle className="mb-2 text-muted">{p.doctor.email}</Card.Subtitle>
              <Card.Text>
              <div key={`default-checkbox`} className="mb-3">
                {
                    p.medicines.map((m)=>
                <>
                <input type="checkbox" id={m} name={m} value={m} onChange={(e)=>{change(e.target.value); setdis(false);}} />
                <label for={m}>  {" "+ m}</label><br></br></>
                    )
                }
                </div>
                <ul></ul>
              </Card.Text>
            </Card.Body>
          </Card>
          </div>
  </Carousel.Item>
                        )
                    }
            </Carousel>)}
            </div>
                 
                </Form>
              

              </Modal.Body>}
              {done ? 
              <Modal.Footer>
              <Button variant="secondary" onClick={(e)=>{setdone(false) ; setback();}}>
                Back
              </Button>
              <Button variant="primary" onClick={(e)=>{handleClose(); order_details();}}>
                Order Now
              </Button>
            </Modal.Footer>
              :<Modal.Footer>
                <Button variant="secondary" onClick={(e)=>{handleClose(); props.cancel(false);}}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={(e)=>{setdone(true); quanity();}} disabled={next || dis} >
                  Next
                </Button>
              </Modal.Footer>}
            </Modal>
          </>
        );
      
}
export default Choose_pres;