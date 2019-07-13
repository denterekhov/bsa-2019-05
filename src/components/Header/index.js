import React from 'react';
// import { api } from '../../REST';
// import { Header } from '../Header';
// import { MessageList } from '../MessageList';
// import { MessageInput } from '../MessageInput';
// import PropTypes from 'prop-types'
// import './App.css';
import { number, string } from 'prop-types';

const Header = ({ usersQuantity, messageQuantity, lastMessageTime }) => {
  // console.log('props: ', props);
  // const { messageQuantity, usersQuantity } = props;
  // console.log('usersQuantity: ', usersQuantity);
  // console.log('messageQuantity: ', messageQuantity);
  return (
    <>
        <p>
          {usersQuantity} participants
        </p>
        <p>
          {messageQuantity} messages
        </p>
        <p>
          Last message at {lastMessageTime}
        </p>
    </>
  )
}

Header.propTypes = {
  usersQuantity: number.isRequired,
  messageQuantity: number.isRequired,
  lastMessageTime: string.isRequired,
}

export { Header };
