import React, { useState } from 'react'
import { Modal, Button, Form, Alert } from 'react-bootstrap'
import { useMutation } from 'react-query';
import { API } from '../../config/api';
import LoginModal from './LoginModal'

export default function RegModal({ registerShow, Close }) {
  //modal Show
  const [logShow, setLogShow] = useState(false);

  const handleCloseLog = () => setLogShow(false);
  const handleShowLog = () => setLogShow(true);

  // const regClose = () => (setReg(false), setMessage(null))

  // StateRegister
  const [message, setMessage] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const { name, email, password } = form;
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));


  //HandleSubmit Register
  const handleSubmit = useMutation(async (e) => {
    try {
      // e.prefentDefault();

      //configuration Content-Type

      const config = {
        headers: {
          "Content-type": "application/json"
        },
      };

      //Data Body
      const body = JSON.stringify(form);

      //insert data to database
      const response = await API.post("/register", body, config);
      console.log(response)
      //Notification
      if (response.data.code === 200) {
        const alert = (
          <Alert variant='success' className='p-1'>Success</Alert>
        );
        setMessage(alert)
        setForm({
          name: "",
          email: "",
          password: "",
        });
        await delay(1000)
        Close();
      } else {
        const alert = (
          <Alert variant='danger' className='p-1'>Failed</Alert>
        );
        setMessage(alert);
      }
    } catch (error) {
      const alert = (
        <Alert variant='danger' className='p-1'>Failed</Alert>
      );
      setMessage(alert);
    }
  })


  return (
    <div>
      <Modal show={ registerShow } onHide={ Close }>
        <Modal.Body className='p-5'>
          { message && message }
          <Form
            onSubmit={ (e) => handleSubmit.mutate(e) }
          >
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control type="email" placeholder="Enter email" name="email" value={ email } onChange={ handleChange } required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control type="password" placeholder="Password" name="password" value={ password } onChange={ handleChange } required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control type="text" placeholder="Full Name" name='name' value={ name } onChange={ handleChange } required />
            </Form.Group>
            <Button type="submit" className='brownbutton lgbutton'>
              Register
            </Button>
            <Form.Text className=''>Already have an account ? Click <strong style={ { color: 'black' } } onClick={ handleShowLog } >Here</strong></Form.Text>
            <LoginModal loginShow={ logShow } Close={ handleCloseLog } />
          </Form>
        </Modal.Body>
      </Modal>

    </div>
  )
}
