import React, { useEffect } from 'react'
import {Alert, Button, Col, Container, Form, FormControl, Row } from 'react-bootstrap'
import './assets/style.css'
import NavbarUser from '../components/Navbar/NavbarUser'
import paperclip from './assets/paperclip.png'
import product from './assets/nicaragua.png'
import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import { useMutation } from 'react-query'
import { API } from '../config/api'

export default function UpdateProduct() {
  const { id } = useParams();

  const navigate = useNavigate();
  const [data, setData] = useState();
  const [preview, setPreview] = useState(null);
  const [nameUrl, setNameUrl] = useState();
  const [addProduct, setAddProduct] = useState({
    name: "",
    price: "",
    image: "",
    desc: "",
    stock: "",
  });

  useEffect(() => {
    const findProduct = async () => {
      try {
        let response = await API.get("/product/" + id);
        setData(response.data.data);
        setAddProduct({
          name: response.data.data.name,
          price: response.data.data.price,
          desc: response.data.data.desc,
          stock: response.data.data.stock,
        });
        setPreview(response.data.data.image);
      } catch (e) {
        console.log(e.message);
      }
    };
    findProduct();
  }, [id]);
  console.log(data);

  const handleChange = (e) => {
    setAddProduct({
      ...addProduct,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });

    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
      setNameUrl(e.target.name[0]);
    }
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Configuration
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      // Store data with FormData as object
      const formData = new FormData();
      if (addProduct.image) {
        formData.set("image", addProduct?.image[0], addProduct?.image[0]?.name);
      }
      formData.set("name", addProduct.name);
      formData.set("desc", addProduct.desc);
      formData.set("price", addProduct.price);
      formData.set("stock", addProduct.stock);
      // Insert product data
      await API.patch("/product/" + id, formData, config);

      alert("berhasil UPDATE product");
      // regClose();
      navigate("/income");
    } catch (error) {
      console.log(error);
    }
  });
  console.log(addProduct.image);

  return (
    <div>
    <NavbarUser />
    <Container className='pt-5 mt-5'>
      <div className='mb-5'>
        <h1>Edit Product</h1>
      </div>
      <Row>
        <Col xs={12} md={6}>
            <Form onSubmit={(e) => handleSubmit.mutate(e)}>
              <Form.Group>
                <FormControl className="inputbrown mb-3" type='text' size='xl' placeholder='Name' name='name' value={addProduct.name} onChange={handleChange} />
                <FormControl className="inputbrown mb-3" type='text' size='xl' placeholder='Stock' name='stock' value={addProduct.stock} onChange={handleChange} />
                <FormControl className="inputbrown mb-3" type='text' size='xl' placeholder='Price' name='price' value={addProduct.price} onChange={handleChange} />
                <Form.Control as='textarea' rows='3' className='inputbrown mb-3' placeholder='Description' name='description' value={addProduct.description} onChange={handleChange} />
                <div class="input-group mb-3" >
                  <input type="file" class="form-control" id="inputGroupFile02" name='image' size='xl' onChange={handleChange}  hidden required />
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
