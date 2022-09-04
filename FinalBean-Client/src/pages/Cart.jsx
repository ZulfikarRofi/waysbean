import React from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import NavbarUser from '../components/Navbar/NavbarUser'
import product from '../components/dummy/ethiopia.png'
import plus  from './assets/plus-solid.svg'
import minus  from './assets/minus-solid.svg'
import trash  from './assets/trash-can-solid.svg'
import './assets/style.css'

export default function Cart() {
  return (
    <div>
      <NavbarUser />
      <Container className='pt-5 mt-5'>
        <div className='mb-3'>
          <h4>MY CART</h4>
          <p>Review Your Order</p>
        </div>
        <Row className='mt-5'>
          <Col xs={12} md={7}>
            <div>
              <div className='cartlist py-4'>
                <Row>
                  <div className='between'>
                    <div className='d-flex'>
                      <img src={product} alt='productimage' style={{width:'20%'}} />
                      <div className='detailcartlist ps-3'>
                        <p className='fw-semibold mb-3' style={{fontSize:'22px'}}>Guatemala Beans</p>
                        <div className='counter'>
                          <img src={minus} alt="minus" style={{width:'5%'}} onClick='' />
                          <p className='mb-0 ms-2 py-1 px-2 fs-5 fw-bold' style={{backgroundColor:'#F6E6DA', width:'fit-content', }}>0</p>
                          <img src={plus} alt="plus" className='ms-2' style={{width:'5%'}} onClick='' />
                        </div>
                      </div>
                      <div className='flexcolend'>
                      <p className='fw-semibold fs-5 mb-3 mt-1'>Rp. 300.900</p>
                      <img className='' src={trash} alt='trash' style={{width:'15%'}} onClick='' />
                      </div>
                    </div>
                  </div>
                </Row>
              </div>
            </div>
          </Col>
          <Col xs={12} md={5}>
            <div className='cartlist py-4 between'>
              <div>
                <p>Subtotal</p>
                <p>Qty</p>
              </div>
              <div className='flexcolend'>
               <p>Rp. 300.900</p>
               <p>1</p>
              </div>
            </div>
            <div className='pt-4 between fw-bold mb-3'>
              <p>Total:</p>
              <p>Rp. 300.900</p>
            </div>
            <Button className='brownbutton' style={{width:'100%'}}>Pay</Button>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
