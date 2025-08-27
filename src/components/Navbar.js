import React from 'react';
import './Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faHeart, faShoppingBag, faSearch } from '@fortawesome/free-solid-svg-icons';
import Myntra from '../assets/images/myntra (2).webp';
import { Link } from "react-router-dom";


function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo"><img src={Myntra} alt="myntra" className="myntra" /></div>
      <ul className="nav-links">
        <li><Link to="/">Men</Link></li>
        <li><Link to="/">Women</Link></li>
        <li><Link to="/">Kids</Link></li>
        <li><Link to="/">Home & Living</Link></li>
        <li><Link to="/">Beauty</Link></li>
        <li><Link to="/">Studio</Link></li>
        <li>
          <Link className="nav-link" to="/canvas">Canvas</Link>
          <span className="new-label">New</span>
        </li>
        <li>
          <Link className="nav-link" to="/ootd">OOTD</Link>
          <span className="new-label">New</span>
        </li>
      </ul>
      <div className="search-bar">
        <FontAwesomeIcon icon={faSearch} className="search-icon" />
        <input type="text" placeholder="          Search for products, brands and more              " />
      </div>
      <div className="nav-icons">
        <Link to="/"><FontAwesomeIcon icon={faUser} /></Link>
        <Link to="/"><FontAwesomeIcon icon={faHeart} /></Link>
        <Link to="/"><FontAwesomeIcon icon={faShoppingBag} /></Link>
      </div>
    </nav>
  );
}

export default Navbar;
