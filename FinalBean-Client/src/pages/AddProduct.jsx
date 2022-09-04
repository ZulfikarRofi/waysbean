import React from 'react'
import {Col, Container, Form, FormControl, Row } from 'react-bootstrap'
import './assets/style.css'
import NavbarUser from '../components/Navbar/NavbarUser'
import paperclip from './assets/paperclip.png'
import product from './assets/nicaragua.png'

export default function AddProduct() {
  return (
    <div>
    <NavbarUser />
    <Container className='pt-5 mt-5'>
      <div className='mb-5'>
        <h1>Add Product</h1>
      </div>
      <Row>
        <Col xs={12} md={6}>
            <Form>
              <Form.Group>
                <FormControl className="inputbrown mb-3" type='text' size='xl' placeholder='Name'/>
                <FormControl className="inputbrown mb-3" type='text' size='xl' placeholder='Stock'/>
                <FormControl className="inputbrown mb-3" type='text' size='xl' placeholder='Price'/>
                <Form.Control as='textarea' rows='3' className='inputbrown mb-3' placeholder='Description' name='description' onChange='' />
                <div class="input-group mb-3" >
                  <input type="file" class="form-control" id="inputGroupFile02" placeholder='Input image' size='xl'  hidden required />
                  <label className="inputbrown" style={{width:'100%'}} for="inputGroupFile02">
                  <div className='px-2' style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                    <p>Input Image</p>
                  <img src={paperclip} alt="" className='' />
                  </div>
                  </label>
                </div>
              </Form.Group>
            </Form>
        </Col>
        <Col xs={12} md={6} className="d-flex justify-content-center">
              <img src={product} alt='foto product' style={{width:'50%', borderRadius:'5px'}} />
        </Col>
      </Row>
    </Container>
  </div>
  )
}
