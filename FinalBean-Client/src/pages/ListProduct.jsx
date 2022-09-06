import React from 'react'
import { Button, Container, Table } from 'react-bootstrap'
import { useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import NavbarUser from '../components/Navbar/NavbarUser'
import { API } from '../config/api'

export default function ListProduct() {
  // const { id } = useParams();
  let navigate = useNavigate();
  let {data: products, refetch} = useQuery("product", async () => {
    const response = await API.get("/list-products");
    return response.data.data;
  });
  let handleDelete = async (id) => {
    let person = prompt("Input 'DELETE' for Delete Product", "DELETE");
    if (person === "DELETE") {
      await API.delete(`product/${id}`);
    }
    refetch();
  }
  return (
    <div>
      <NavbarUser />
      <Container className='pt-5 mt-5'>
        <div className='mt-5'>
          <h1>List Product</h1>
        </div>
        <div>
        <Table>
                <thead style={{backgroundColor:"#E5E5E5", border:"1px solid grey"}}>
                    <tr>
                        <th style={{border:"1px solid grey"}}>No</th>
                        <th style={{border:"1px solid grey"}}>Image</th>
                        <th style={{border:"1px solid grey"}}>Name</th>
                        <th style={{border:"1px solid grey"}}>Stock</th>
                        <th style={{border:"1px solid grey"}}>Price</th>
                        <th style={{border:"1px solid grey"}}>Description</th>
                        <th style={{border:"1px solid grey"}}>Action</th>
                    </tr>
                </thead>
                <tbody className='triggered' style={{border:"1px solid grey"}}>
                        {products?.map((item,index) => (
                        <tr >
                            <td style={{border:"1px solid grey"}}>
                              {index + 1}
                            </td>
                            <td style={{border:"1px solid grey"}}>
                              <img src={item.image} alt="product pic" style={{width:'100px'}} />
                            </td>
                            <td style={{border:"1px solid grey"}}>
                              {item.name}
                            </td>
                            <td style={{border:"1px solid grey"}}>
                              {item.stock}
                            </td>
                            <td style={{border:"1px solid grey"}}>
                              {item.price}
                            </td>
                            <td style={{border:"1px solid grey"}}>
                              {item.description}
                            </td>
                            <td className='flexrowcenter' style={{border:"1px solid grey", alignItems:'center'}}>
                                <Button className='button-green' onClick={() => navigate(`/product/${item.id}`)}>Update</Button>
                                <Button className='button-red ms-2' type='submit' onClick={() => handleDelete(item.id)}>Delete</Button>
                            </td>
                        </tr>
                        ))}
                </tbody>
            </Table>
        </div>
      </Container>
    </div>
  )
}
