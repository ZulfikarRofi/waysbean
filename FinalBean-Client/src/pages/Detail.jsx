import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import NavbarUser from '../components/Navbar/NavbarUser';
import '../pages/assets/style.css';
import { API } from '../config/api';
import { useState } from 'react';
import { useEffect } from 'react';
import { useMutation } from 'react-query';

export default function Detail() {
  const title = "Product";
    document.title = "Waysbean | " + title;

    let navigate = useNavigate();
    const { id } = useParams();
    // Product Fetch
    const [product, SetProduct] = useState();
    const findProduct = async () => {
        try {
        let response = await API.get("/product/" + id);
        SetProduct(response.data.data);
        console.log(response.data.data)
        } catch (e) {
        console.log(e.message);
        }
    };

    useEffect(() => {
        findProduct();
        }, []);
        console.log(product);

      // Check Transaction
    const [transaction, setTransaction] = useState();
    const getTrans = async () => {
    try {
        let response = await API.get("/transaction-status");
        setTransaction(response.data.data);
        } catch (e) {
        console.log(e.message);
        }
    };

        useEffect(() => {
        getTrans();
        }, []);
        console.log(transaction)

    // Handle for Add to cart
    const handleAddToCart = useMutation(async (e) => {
        try {
        e.preventDefault();

        const config = {
            headers: {
            "Content-type": "application/json",
            },
        };
        await API.post("/transaction", config);

        const data = {
            product_id: product.id,
            qty: 1,
            subtotal: product.price,
        };

        const body = JSON.stringify(data);
        console.log(body)

        await API.post("/cart", body, config);
        navigate("/cart");
        } catch (error) {
        console.log(error);
        }
    });


    const moving = useNavigate()
    const moveToDetailProduct = (id) => {
        moving('/detail-product/' + id)
    }

  return (
    <div>
      <NavbarUser />
      <Container className='pt-5 mt-5'>
        <Row className='mt-5 mb-2'>
          <Col xs={12} md={6}>
              <div className='detailimage'>
                <img src={product?.image} alt='product' style={{width:'60%'}} onClick={() => moveToDetailProduct(product?.id)} />
              </div>
          </Col>
          <Col xs={12} md={6}>
            <div style={{width:'80%'}}>
              <h1 className='mb-3 fw-bold'>{product?.name}</h1>
              <p className='mb-5'style={{fontSize:'18px'}}>Stock : {product?.stock}</p>
              <p className='detaildesc mb-5'>{product?.description}</p>
              <p className='mb-2 detailprice'>{product?.price}</p>
            </div>
            <div>
              <Button className='mt-4 lgbutton brownbutton' type='submit' onClick={(e) => handleAddToCart.mutate(e)} style={{width:'80%'}}>
                {" "}
                Add Cart
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
