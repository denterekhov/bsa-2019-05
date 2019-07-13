import React, { Fragment } from 'react';
import Divider from '@material-ui/core/Divider';
import { Message } from '../Message';
import { array, func } from 'prop-types';

const MessageList = ({ messages, editMessage, deleteMessage, likeMessage }) => {
  const createMessageList = () => {
    return messages.map(( post, ind) => {
      if(messages[ind + 1] && (new Date(messages[ind + 1].created_at)).getDate() - (new Date(messages[ind].created_at)).getDate()) {

        return (
          <Fragment key={post.id}>
            <Message post={post} editMessage={editMessage} deleteMessage={deleteMessage} likeMessage={likeMessage}/>
            <Divider style={{marginTop: 20}}/>
            <p style={{textAlign: 'center'}}>{(new Date(messages[ind + 1].created_at)).toLocaleString('ru', {  month: 'long', day: 'numeric'})}</p>
          </Fragment>
        )
      } else {
        return <Message key={post.id} post={post} editMessage={editMessage} deleteMessage={deleteMessage} likeMessage={likeMessage}/>;
      }
    })
  }

  const messageList = createMessageList();

  return (
    <>
      {messageList}
    </>
  )
}

MessageList.propTypes = {
  messages: array.isRequired,
  editMessage: func.isRequired,
  deleteMessage: func.isRequired,
  likeMessage: func.isRequired
}

export { MessageList };
