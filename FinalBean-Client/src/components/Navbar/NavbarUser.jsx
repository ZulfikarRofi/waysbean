import React, { useState, useContext } from 'react';
import { Navbar, Button, NavDropdown, Nav } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
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

export default function NavbarUser({show, setShow}) {


  //useContext
  const [state, dispatch] = useContext(UserContext);

  const navigate = useNavigate();

  const [logShow, setLogShow] = useState(false);
  const [regShow, setRegShow] = useState(false);


  const handleCloseReg = () => setRegShow(false);
  const handleShowReg = () => setRegShow(true);

  const handleCloseLog = () => setLogShow(false);
  const handleShowLog = () => setLogShow(true);

  const logOut = () => {
    dispatch({
      type:"LOGOUT",
      payload:"",
    });
  };

  console.log(state)

  return (
    <div>
      <Navbar bg='#F5F5F5' expand='lg' className='px-5 between shadow' fixed='top bg-white'>
        <Link to='/'>
          <Navbar.Brand>
            <img src={ waysbeanlogo } alt='waysbean' style={ { width: '100%' } } />
          </Navbar.Brand>
        </Link>
        {state.user?.level === "admin" ? (
          <>
            <Nav>
              <NavDropdown
                id="nav-dropdown-dark-example"
                title={ <img src={ user } alt='' style={ { width: "50px", borderRadius: "50px" } } /> }
                menuVariant="light"
              >

                <NavDropdown.Item onClick={() => navigate('/add-product')}><img src={ coffee } alt='' style={ { width: "15px", height: "15px" } } /> Add Product</NavDropdown.Item>
                <NavDropdown.Item onClick={() => navigate('/list-product')}><img src={ coffee } alt='' style={ { width: "15px", height: "15px" } } /> List Product</NavDropdown.Item>
                <NavDropdown.Item onClick={logOut}>
                  <img src={ logout } alt='' style={ { width: "15px", height: "15px" } } /> Log Out
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </>
        ) : state.user?.level === "customer" ? (
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
                    <NavDropdown.Item onClick={() => navigate('/profile')}><img src={ profile } alt='' style={ { width: "15px", height: "15px" } } /> Profile</NavDropdown.Item>
                    <NavDropdown.Item onClick={logOut}>
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
          )}
      </Navbar>
    </div>
  )
}
