import React from 'react';
import { Navbar, Button, NavDropdown, Nav, Dropdown} from 'react-bootstrap';
// import { Link, useNavigate } from 'react-router-dom';
import waysbeanlogo from './waysbean-icon.png'
// import { userContext } from '../context/userContext';
import cart from './cart.png';
import user from './user.png';
import coffee from './coffee.png';
import profile from './profile.png'
import logout from './logout.png'
import './style.css';
import { useNavigate } from 'react-router-dom';
// import LoginModal from '../modal/LoginModal';
// import RegisterModal from '../modal/RegisterModal';
// import { useQuery } from 'react-query';
// import { API } from '../../config/api';


export default function Navbarr() {
    const navigate = useNavigate();
  return (
    <div>
      <Navbar bg='#F5F5F5' expand='lg' className='px-5 between shadow' fixed='top bg-white'>
        <Navbar.Brand href='/'>
          <img src={waysbeanlogo} alt='waysbean' style={{width:'100%'}} />
        </Navbar.Brand>
            <Nav>
            <NavDropdown
              id="nav-dropdown-dark-example"
              title={<img src={user} alt='' style={{width:"50px", borderRadius:"50px"}} />}
              menuVariant="light"
            >
              <NavDropdown.Item href="/add-product"><img src={coffee} alt='' style={{width:"15px", height:"15px"}} /> Add Product</NavDropdown.Item>
              <NavDropdown.Item href="/list-product"><img src={coffee} alt='' style={{width:"15px", height:"15px"}} /> List Product</NavDropdown.Item>
              <NavDropdown.Item href="/logout">
                <img src={logout} alt='' style={{width:"15px", height:"15px"}} /> Log Out
              </NavDropdown.Item>
            </NavDropdown>
            </Nav>
      </Navbar>
    </div>
  )
}

