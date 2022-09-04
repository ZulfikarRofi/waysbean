import React, { useState, useContext } from 'react';
import { Navbar, Button, NavDropdown, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import waysbeanlogo from './waysbean-icon.png'
import { UserContext } from '../context/userContext';
import cart from './cart.png';
import user from './user.png';
import coffee from './coffee.png';
import profile from './profile.png'
import logout from './logout.png'
import './style.css';
import './style.css';
import LoginModal from '../modal/LoginModal';
import RegisterModal from '../modal/RegisterModal';
import { useQuery } from 'react-query';
import { API } from '../../config/api';
import { useEffect } from 'react';

export default function NavbarUser() {


  //useContext
  const [state, dispatch] = useContext(UserContext);

  const navigate = useNavigate();

  const [logShow, setLogShow] = useState(false);
  const [regShow, setRegShow] = useState(false);


  const handleCloseReg = () => setRegShow(false);
  const handleShowReg = () => setRegShow(true);

  const handleCloseLog = () => setLogShow(false);
  const handleShowLog = () => setLogShow(true);


  return (
    <div>
      <Navbar bg='#F5F5F5' expand='lg' className='px-5 between shadow' fixed='top bg-white'>
        <Navbar.Brand href='/'>
          <img src={ waysbeanlogo } alt='waysbean' style={ { width: '100%' } } />
        </Navbar.Brand>
        { state.isAdmin ? (
          <>
            <Nav>
              <NavDropdown
                id="nav-dropdown-dark-example"
                title={ <img src={ user } alt='' style={ { width: "50px", borderRadius: "50px" } } /> }
                menuVariant="light"
              >
                <NavDropdown.Item href="/add-product"><img src={ coffee } alt='' style={ { width: "15px", height: "15px" } } /> Add Product</NavDropdown.Item>
                <NavDropdown.Item href="/list-product"><img src={ coffee } alt='' style={ { width: "15px", height: "15px" } } /> List Product</NavDropdown.Item>
                <NavDropdown.Item href="/logout">
                  <img src={ logout } alt='' style={ { width: "15px", height: "15px" } } /> Log Out
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </>
        ) :
          state.isLogin ? (
            <>
              <div style={ { display: "flex", flexDirection: "row" } }>
                <div className='d-flex align-items-center' onClick={ () => navigate('/cart') }>
                  <img src={ cart } alt='' style={ { width: "40px", height: "40px", marginRight: '20px' } } />
                </div>
                <Nav>
                  <NavDropdown
                    id="nav-dropdown-dark-example"
                    title={ <img src={ user } alt='' style={ { width: "50px", borderRadius: "50px" } } /> }
                    menuVariant="light"
                  >
                    <NavDropdown.Item href="/profile"><img src={ profile } alt='' style={ { width: "15px", height: "15px" } } /> Profile</NavDropdown.Item>
                    <NavDropdown.Item href="/logout">
                      <img src={ logout } alt='' style={ { width: "15px", height: "15px" } } /> Log Out
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </div>
            </>
          ) : (
            <>
              <div>
                <LoginModal loginShow={ logShow } Close={ handleCloseLog } />
                <RegisterModal registerShow={ regShow } Close={ handleCloseReg } />
                <Button className='px-5 py-2 brownbutton ms-3' onClick={ () => handleShowLog() }>
                  Login
                </Button>
                <Button className='px-5 py-2 whitebutton ms-3' onClick={ () => handleShowReg() }>
                  Register
                </Button>
              </div>
            </>
          ) }
      </Navbar>
    </div>
  )
}
