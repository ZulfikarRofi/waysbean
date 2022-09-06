import React, { useContext, useState } from 'react'
import { Modal, Button, Form, Alert } from 'react-bootstrap'
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { API } from '../../config/api';
import { UserContext } from '../context/userContext';
import RegModal from './RegisterModal'

export default function LoginModal({ loginShow, Close }) {
  const [regShow, setRegShow] = useState(false);

  const handleCloseReg = () => setRegShow(false);
  const handleShowReg = () => setRegShow(true);

  // UseContext
  const [state, dispatch] = useContext(UserContext);

  const [message, setMessage] = useState(null);

  const navigate = useNavigate();


  //State Login
  const [formLog, setFormLog] = useState({
    email: "",
    password: ""
  })
  const { emailLogin, passwordLogin } = formLog;
  const handleChangeLog = (e) => {
    setFormLog({
      ...formLog,
      [e.target.name]: e.target.value,
    });
  };
  console.log(formLog)
  //Handlesubmit Login
  const handleSubmitLogin = useMutation(async (e) => {
    try {
      e.preventDefault();

      //Configuration Content Type
      const config = {
        headers: {
          "Content-Type": "applicaton/json"
        },
      };

      //Data body
      const reqBody = JSON.stringify(formLog);

      //insert data user to Database
      const response = await API.post("/login", reqBody, config);
      console.log(response);
      // const {level, name, email, token} = response.data.data

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: response.data.data,
      });
      Close();
    } catch (error) {
      const alert = (
        <Alert variant='danger' className='p-1'>Email or Password is wrong. Please insert a correct account!</Alert>
      );
      setMessage(alert);
      console.log(error);
    }
  })

  return (
    <div>
      <Modal show={ loginShow } onHide={ Close } >
        <Modal.Body className='p-5 justify-content-center'>
          { message && message }
          <Form onSubmit={ (e) => handleSubmitLogin.mutate(e) }          >
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control type="email" placeholder="Enter email" name='email' value={ emailLogin } onChange={ handleChangeLog } />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control type="password" placeholder="Password" name='password' value={ passwordLogin } onChange={ handleChangeLog } />
            </Form.Group>
            <Button type="submit" className='brownbutton lgbutton'>
              Login
            </Button>
            <Form.Text className=''>Don't have account ? Click <strong style={ { color: 'black' } } onClick={ handleShowReg } >Here</strong></Form.Text>
            <RegModal registerShow={ regShow } Close={ handleCloseReg } />
          </Form>
        </Modal.Body>
      </Modal>

    </div>
  )
}
