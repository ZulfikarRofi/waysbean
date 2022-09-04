import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import {dataProduct} from '../components/dummy/dataProduct';
import NavbarUser from '../components/Navbar/NavbarUser';
import '../pages/assets/style.css';
import ethiopia from '../components/dummy/ethiopia.png';
import rwanda from '../components/dummy/rwanda.png';
import guatemala from '../components/dummy/guatemala.png';
import nicaragua from '../components/dummy/nicaragua.png';
import { API } from '../config/api';
import { useState } from 'react';
import { useEffect } from 'react';
import { useMutation } from 'react-query';

export default function Detail() {
  const [product, setProduct] = useState();
  const { id } = useParams();

  let navigate = useNavigate();
  //Product Fetch
  const findProduct = async () => {
    try {
      let response = await API.get("/product/" + id);
      setProduct(response.data.data);
    } catch (error) {
      console.log(error.message)
    }
  }

    useEffect(() => {
      findProduct();
    }, 
    []);

    //Check Transaction
    const [transaction, setTransaction] = useState();
    const getTrans = async () => {
      try {
        let response = await API.get("/transaction-status");
        setTransaction(response.data.data);
      } catch (error) {
        console.log(error.message)
      }
    };

    useEffect(() => {
      getTrans();
    }, []);

    console.log(transaction);


    //handle Add to Cart

    const handleAddCart = useMutation(
      async (e) => {
        try {
          e.prefentDefault();

          const config = {
            headers: {
              "Content-type":"application/json",
            },
          };
          await API.post("/transaction", config)

          const data = {
            product_id: product.id,
            qty: 1,
            subtotal: product.price,
          };

          const body = JSON.stringify(data);

          await API.post("/cart", body, config);
          navigate("/");
        } catch (error) {
          console.log(error);
        }
      }
    )

  return (
    <div>
      <NavbarUser />
      <Container className='pt-5 mt-5'>
        <Row className='mt-5 mb-2'>
          <Col xs={12} md={6}>
              <div className='detailimage'>
                <img src={product?.image} alt='product' style={{width:'60%'}} />
              </div>
          </Col>
          <Col xs={12} md={6}>
            <div style={{width:'80%'}}>
              <h1 className='mb-3 fw-bold'>{product?.name}</h1>
              <p className='mb-5'style={{fontSize:'18px'}}>Stock : {product?.stock}</p>
              <p className='detaildesc mb-5'>{product?.desc}</p>
              <p className='mb-2 detailprice'>{product?.price}</p>
            </div>
            <div>
              <Button className='mt-4 lgbutton brownbutton' style={{width:'80%'}}>
                Add Chart
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
