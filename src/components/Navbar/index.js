import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavbarText,
} from 'reactstrap';
import firebase from 'firebase/app';
import 'firebase/auth';
import { Link } from 'react-router-dom';

const MyNavbar = ({ user }) => {
  const logMeOut = (e) => {
    e.preventDefault();
    firebase.auth().signOut();
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="dark" expand="lg">
        <NavbarBrand className='gradient-text' href="/">Know the Network</NavbarBrand>
        <NavbarToggler onClick={toggle} className='custom-toggler'/>
        <Collapse isOpen={isOpen} navbar>
          <Nav className="link-container mr-auto" navbar>
            <NavItem>
              <Link to='/watchlist' className="nav-link m-2" href="#">Watchlist</Link>
            </NavItem>
            <NavItem>
              <Link to='/favorites' className="nav-link m-2" href="#">Favorites</Link>
            </NavItem>
          </Nav>
          <NavbarText>
            <div className="form-inline my-2 my-lg-0">
                {user && (
                  <button className="nav-link btn btn-outline-primary" onClick={logMeOut}>Logout</button>
                )}
            </div>
          </NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default MyNavbar;
