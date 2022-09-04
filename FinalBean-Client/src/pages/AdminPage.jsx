import React from 'react'
import {Container, Table } from 'react-bootstrap'
import NavbarUser from '../components/Navbar/NavbarUser'
import ListTransactionModal from '../components/modal/TranasctionModal';

export default function AdminPage() {

  const [modalShow, setModalShow] = React.useState(false);

  const closeTransmodal = () => setModalShow(false);
  const openTransmodal = () => setModalShow(true);

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
                      <tr onClick={openTransmodal}>
                          <td>
                              1
                          </td>
                          <td style={{border:"1px solid grey"}}>
                                  test
                          </td>
                          <td style={{border:"1px solid grey"}}>
                            test
                          </td>
                          <td style={{border:"1px solid grey"}}>
                            test 
                          </td>
                          <td style={{border:"1px solid grey"}}>
                            test
                          </td>
                          <td className='' style={{border:"1px solid grey"}}>
                          </td>
                      </tr>
              </tbody>
          </Table>
      </div>
    </Container>
  </div>
  )
}
