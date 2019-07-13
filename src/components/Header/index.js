import React from 'react';
import { number, string } from 'prop-types';
import './Header.css';

const Header = ({ usersQuantity, messageQuantity, lastMessageTime }) => {
  return (
    <header>
      <div style={{width: '50%', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <div style={{fontSize: 24}}>
          My chat
        </div>
        <div>
          {usersQuantity} participants
        </div>
        <div>
          {messageQuantity} messages
        </div>
      </div>
      <div style={{width: '50%', textAlign: 'right'}}>
        Last message at {lastMessageTime}
      </div>
    </header>
  )
}

Header.propTypes = {
  usersQuantity: number.isRequired,
  messageQuantity: number.isRequired,
  lastMessageTime: string.isRequired,
}

export { Header };
