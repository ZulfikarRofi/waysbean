import React, { useEffect } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import NavbarUser from '../components/Navbar/NavbarUser'
import convertRupiah from 'rupiah-format';
import plus  from './assets/plus-solid.svg'
import minus  from './assets/minus-solid.svg'
import trash  from './assets/trash-can-solid.svg'
import './assets/style.css'
import { API } from '../config/api'
import { useMutation, useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function Cart() {

  const handleClickplus = async (qty, id, price) => {
    // Counter state is incremented
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const newQty = qty + 1;
    const newTotal = price * newQty;
    const req = JSON.stringify({
      qty: newQty,
      subtotal: newTotal,
    });
    await API.patch(`/cart/${id}`, req, config);
    refetch();
  };

  const handleClickmin = async (id, qty, price, subtotal) => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    console.log(subtotal);
    console.log(price);
    // Counter state is decremented
    if (qty === 1) {
      return;
    }
    const newQty = qty - 1;
    const newTotal = subtotal - price * newQty;
    console.log(newTotal);
    const req = JSON.stringify({
      qty: newQty,
      subtotal: newTotal * newQty,
    });
    await API.patch(`/cart/${id}`, req, config);
    refetch();
  };

  let navigate = useNavigate();
  // Get data transaction by ID
  let { data: transaction, refetch } = useQuery("transCache", async () => {
    const response = await API.get("/transaction-status");
    return response.data.data;
  });

  let handleDelete = async (id) => {
    await API.delete(`cart/${id}`);
    refetch();
  };

  // total Payment
  let Total = transaction?.carts?.reduce((a, b) => {
    return a + b.subtotal;
  }, 0);
  let TotalQTY = transaction?.carts?.reduce((a, b) => {
    return a + b.qty;
  }, 0);

  // pay Handler
  const form = {
    status: "success",
    total: Total,
  };

  const handleSubmit = useMutation(async (e) => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    // Insert transaction data
    const body = JSON.stringify(form);

    const response = await API.patch("/transactionID", body, config);

    console.log(response);

    const token = response.data.data.token;
    console.log(token);
    window.snap.pay(token, {
      onSuccess: function (result) {
        /* You may add your own implementation here */
        console.log(result);
        navigate("/profile");
      },
      onPending: function (result) {
        /* You may add your own implementation here */
        console.log(result);
        navigate("/profile");
      },
      onError: function (result) {
        /* You may add your own implementation here */
        console.log(result);
      },
      onClose: function () {
        /* You may add your own implementation here */
        alert("you closed the popup without finishing the payment");
      },
    });
  });

  // useEffect on Mitrans
  useEffect(() => {
    //change this to the script source you want to load, for example this is snap.js sandbox env
    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    //change this according to your client-key
    const myMidtransClientKey = "SB-Mid-client-jd0GnBC0JrRJjhvc";

    let scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl;
    // optional if you want to set script attribute
    // for example snap.js have data-client-key attribute
    scriptTag.setAttribute("data-client-key", myMidtransClientKey);

    document.body.appendChild(scriptTag);
    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

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
              <div className='cartlist p-4'>
                {transaction?.carts.length ===  0 ? (
                  <Row className='d-flex text-align-center' style={{backgroundColor:'#d6d5dd'}}>
                    <p className='fs-5 py-2 fw-semibold'>Cart is empty now. Click <span onClick={() => navigate('/')} style={{color:'green'}}> here </span> to choose an item</p>
                  </Row>
                  ) : (
                    <div>
                      {transaction?.carts?.map((item, index) => (
                      <Row>
                        <div className='between'>
                          <div className='d-flex'>
                            <img src={"http://localhost:5000/uploads/" + item.product?.image} alt='productimage' style={{width:'20%'}} />
                            <div className='detailcartlist ps-3'>
                              <p className='fw-semibold mb-3' style={{fontSize:'22px'}}>{item?.product?.name}</p>
                              <div className='counter'>
                                  <img src={minus} alt="minus tools" style={{width:'5%'}} onClick={() => handleClickmin()}/>
                                <p className='mb-0 ms-2 px-3 fs-5 fw-bold' style={{backgroundColor:'#F6E6DA', width:'fit-content', }}>{item.qty}</p>
                                  <img src={plus} alt="plus tools" style={{width:'5%', marginLeft:'10px'}} onClick={() => handleClickplus()} />
                              </div>
                            </div>
                            <div className='flexcolend'>
                            <p className='fw-semibold fs-5 mb-3 mt-1'>{convertRupiah.convert(item.subtotal)}</p>
                            <img className='tools' src={trash} alt='trash' style={{width:'11%'}} onClick={() => handleDelete(item.id)} />
                            </div>
                          </div>
                        </div>
                    </Row>
                    ))}
                    </div>
                )}
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
               <p>{Total}</p>
               <p>{TotalQTY}</p>
              </div>
            </div>
            <div className='pt-4 between fw-bold mb-3'>
              <p>Total:</p>
              <p>{Total}</p>
            </div>
            <Button className='brownbutton' type='submit' onClick={(e) => handleSubmit.mutate(e)} style={{width:'100%'}}> {" "} Pay</Button>
          </Col>
        </Row>
      </Container>
    </div>
  )
}