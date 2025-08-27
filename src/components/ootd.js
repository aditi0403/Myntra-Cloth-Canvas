import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCrown, faBell, faUser } from '@fortawesome/free-solid-svg-icons';
import './OOTD.css';
import fwd from '../assets/images/ootd/fwdlogo.png';
import card0 from '../assets/images/ootd/card user0.png';
import card1 from '../assets/images/ootd/card user1.png';
import card2 from '../assets/images/ootd/card user2.png';
import card3 from '../assets/images/ootd/card user3.png';
import card4 from '../assets/images/ootd/card user4.png';
import card5 from '../assets/images/ootd/card user5.png';
import card6 from '../assets/images/ootd/card user6.png';
import Navbar from './Navbar';

const OOTD = () => {
  const users = [
    { name: 'MalaikaSen', img: card0 },
    { name: 'AshlynKapoor', img: card1 },
    { name: 'SanaPatel', img: card2 },
    { name: 'VihaanFWD', img: card3 },
    { name: 'Shananana', img: card4 },
    { name: 'VihaanFWDagain', img: card5 },
    { name: 'Shanananaagaain', img: card6 }
  ];

  const repeatedUsers = [...users, ...users, ...users]; // Repeat users 4 times

  return ( 
    <><Navbar />
    <div className="container-main">
      <div className="ootd-container">
        <header className="header">
          <div className="top-row">
            <div className="header-logo">
              <img src={fwd} alt="fwd" />
            </div>
            <div className="header-icons">
              <button><FontAwesomeIcon icon={faCrown} /></button>
              <button><FontAwesomeIcon icon={faBell} /></button>
              <button><FontAwesomeIcon icon={faUser} /></button>
            </div>
          </div>
          <div className="header-search">
            <input type="text" placeholder="Search for Textured Polos Men" />
            <button type="submit"><FontAwesomeIcon icon={faSearch} /></button>
          </div>
          <div className="header-title">
            <h1>OOTD <span>with your designs</span></h1>
          </div>
        </header>
        <div className="scroll-container">
          {repeatedUsers.map((user, index) => (
            <div key={index} className="user-post">
              
              <img src={user.img} alt={user.name} />
            </div>
          ))}
        </div>
      </div>
    </div></>
  );
};

export default OOTD;
