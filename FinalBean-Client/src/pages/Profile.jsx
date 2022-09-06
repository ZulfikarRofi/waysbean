import React, { useContext } from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'
import './assets/style.css'
import NavbarUser from '../components/Navbar/NavbarUser'
import user from './assets/userrectangle.png'
import barcode from './assets/barcode.png'
import waysbean from './assets/waysbean-icon.png'
import rwanda from './assets/rwanda.png'
import { UserContext } from '../components/context/userContext'
import { useQuery } from 'react-query'
import { API } from '../config/api'

export default function Profile() {
    const [state, dispatch] = useContext(UserContext)

      let { data: transactions } = useQuery("transCache", async () => {
        const response = await API.get("/transaction1");
        return response.data.data;
      });
    
      console.log(transactions);
  return (
    <div>
      <NavbarUser />
      <Container className='mt-5 pt-5'>
        <Row>
          <Col>
          <div>
            <p className='fw-bold fs-2 mb-3 mt-3 ps-5' style={{color:'#613D2B'}}>My Profile</p>
          </div>
          <div className='d-flex ps-5'>
            <img src={user} alt='' style={{width:'40%', borderRadius:'3px'}} />
            <div className='ms-5'>
              <div>
                <p className='fs-4 fw-bold'>Name :</p>
                <p>{state.user?.name}</p>
              </div>
              <div>
                <p className='fs-4 fw-bold'>Email :</p>
                <p>{state.user?.email}</p>
              </div>
            </div>
          </div>
          </Col>
          <Col>
          {transactions?.map((item,index) => (
          <div>
            <div>
              <p className='fw-bold fs-2 mb-3 mt-3 ps-3' style={{color:'#613D2B'}}>My Transaction</p>
            </div>
            <div>
              <div className='p-3 between' style={{width:'100%', backgroundColor:'#F6E6DA'}}>
                <div className='d-flex' >
                  <img src={rwanda} alt='product' style={{width:'30%',height:'80%',borderRadius:'5px'}} />
                  <div className='ms-3'>
                    <h5 className='mb-0'>{item.transactions?.carts?.product?.name}</h5>
                    <p><span>Saturday, </span> 25 agustus 2022</p>
                    <p className='mb-0'>Price : Rp. {item.transactions?.carts?.price}</p>
                    <p className='mb-0'>Qty : {item.transactions?.carts?.qty}</p>
                    <h6 className='mb-0'>Subtotal : Rp.{item.transactions?.carts?.subtotal},-</h6>
                  </div>
                  <div>
                </div>
                </div>
                <div className='flexcolend'>
                    <img src={waysbean} alt='product' style={{width:'50%',borderRadius:'5px'}} className='mb-2' />
                    <img src={barcode} alt='product' style={{width:'50%',borderRadius:'5px'}} className='mb-2' />
                    <p className='completed px-4 py-1' style={{}}>{item.status}</p>
                </div>
              </div>
            </div>
          </div>
          ))}
          </Col>
        </Row>
      </Container>
    </div>
  )
}
