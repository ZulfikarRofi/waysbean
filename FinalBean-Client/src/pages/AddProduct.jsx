import React from 'react'
import {Alert, Button, Col, Container, Form, FormControl, Row } from 'react-bootstrap'
import './assets/style.css'
import NavbarUser from '../components/Navbar/NavbarUser'
import paperclip from './assets/paperclip.png'
import product from './assets/nicaragua.png'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useMutation } from 'react-query'
import { API } from '../config/api'

export default function AddProduct() {
  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);
  const [nameUrl, setNameUrl] = useState("");
  const [addProduct, setAddProduct] = useState({
    name:"",
    stock:"",
    description:"",
    price:"",
    image:"",
  });

  const { name, stock, price, description, image} = addProduct;

  const handleOnChange = (e) => {
    setAddProduct({
      ...addProduct,
      [e.target.name]:
      e.target.type === "file" ? e.target.files : e.target.value,
    });

    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
      setNameUrl(e.target.files[0].name);
    }
  }

  const handleSubmit = useMutation(
    async(e) => {
      try {
        
        e.preventDefault();
        const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

        //store data
        const formData = new FormData();
        formData.set("image", addProduct.image[0], addProduct.image[0].name);
        formData.set("name", addProduct.name);
        formData.set("price", addProduct.price);
        formData.set("stock", addProduct.stock);
        formData.set("description", addProduct.description);

        console.log(formData);
        //Configuration
        const config = {
          headers: {
            "Content-type":"multipart/form-data",
          },
        };

        //Insert data product 
        await API.post('/product', formData, config)
        //console.log(response)
        alert('berhasil menambahkan product')
        await delay(500)
        navigate('/admin')
      } catch (error) {
        console.log(error)
      }
    }
  );

  console.log(preview)

  return (
    <div>
    <NavbarUser />
    <Container className='pt-5 mt-5'>
      <div className='mb-5'>
        <h1>Add Product</h1>
      </div>
      <Row>
        <Col xs={12} md={6}>
            <Form onSubmit={(e) => handleSubmit.mutate(e)}>
              <Form.Group>
                <FormControl className="inputbrown mb-3" type='text' size='xl' placeholder='Name' name='name' value={name} onChange={handleOnChange} />
                <FormControl className="inputbrown mb-3" type='text' size='xl' placeholder='Stock' name='stock' value={stock} onChange={handleOnChange} />
                <FormControl className="inputbrown mb-3" type='text' size='xl' placeholder='Price' name='price' value={price} onChange={handleOnChange} />
                <Form.Control as='textarea' rows='3' className='inputbrown mb-3' placeholder='Description' name='description' value={description} onChange={handleOnChange} />
                <div class="input-group mb-3" >
                  <input type="file" class="form-control" id="inputGroupFile02" name='image' size='xl' onChange={handleOnChange}  hidden required />
                  <label className="inputbrown" style={{width:'100%'}} for="inputGroupFile02">
                  <div className='px-2' style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                    <p>{nameUrl === "" ? "Add Product" : nameUrl}</p>
                  <img src={paperclip} alt="" className='' />
                  </div>
                  </label>
                </div>
              </Form.Group>
              <Button type='submit' className='brownbutton' style={{width:"100%"}}>Add Product</Button>
            </Form>
        </Col>
        <Col xs={12} md={6} className="d-flex justify-content-center">
          { preview && (
            <img src={preview} alt={preview} style={{width:'50%', borderRadius:'5px'}} />
          )}
        </Col>
      </Row>
    </Container>
  </div>
  )
}
