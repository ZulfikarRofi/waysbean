import React from 'react'
import {Container, Table } from 'react-bootstrap'
import NavbarUser from '../components/Navbar/NavbarUser'
import ListTransactionModal from '../components/modal/TranasctionModal';
import { useQuery } from 'react-query';
import {API} from '../config/api'
import { useEffect } from 'react';

export default function AdminPage() {

  const [modalShow, setModalShow] = React.useState(false);

  const closeTransmodal = () => setModalShow(false);
  const openTransmodal = () => setModalShow(true);

  let {data: transactions} = useQuery("product", async () => {
    const response = await API.get("/transactions");
    return response.data.data;
  });

  return (
    <div>
    <NavbarUser />
    <Container className='pt-5 mt-5'>
      <div className='mt-5'>
        <h1>Income Transaction</h1>
      </div>
      <div>
      <Table>
              <thead style={{backgroundColor:"#E5E5E5", border:"1px solid grey"}}>
                  <tr>
                      <th style={{border:"1px solid grey"}}>No</th>
                      <th style={{border:"1px solid grey"}}>Name</th>
                      <th style={{border:"1px solid grey"}}>Address</th>
                      <th style={{border:"1px solid grey"}}>Post Code</th>
                      <th style={{border:"1px solid grey"}}>Products Order</th>
                      <th style={{border:"1px solid grey"}}>Status</th>
                  </tr>
              </thead>
              <tbody className='triggered' style={{border:"1px solid grey"}}>
                      <ListTransactionModal show={modalShow} close={closeTransmodal} />
                      {transactions?.map((item,index) => (
                        <tr onClick={openTransmodal}>
                            <td>
                                {index + 1}
                            </td>
                            <td style={{border:"1px solid grey"}}>
                                {item.user.name}
                            </td>
                            <td style={{border:"1px solid grey"}}>
                                {item.user.address}
                            </td>
                            <td style={{border:"1px solid grey"}}>
                                {item.user.postcode}
                            </td>
                            <td style={{border:"1px solid grey"}}>
                                {item.product?.name}
                            </td>
                            <td className='' style={{border:"1px solid grey"}}>
                              {item.status}
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
