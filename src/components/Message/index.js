import React, { useState, createRef } from 'react';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import { Edit, Delete, ThumbUp } from '@material-ui/icons';
import { func, shape, bool, string } from 'prop-types';
import './Message.css';

const Message = ({ post, editMessage, deleteMessage, likeMessage }) => {
  const [isEditing, setIsEditing] = useState(false);
  // const [text, setText] = useState('');
  const { id, avatar, created_at, message, user, isLiked } = post;

  let inputRef = createRef();

  const thumbUpIconColor = isLiked ? '#f00' : '#000';
  const textAreaBorderColor = isEditing ? '#f00' : 'transparent';

  const handleEditMessage = () => {
    setIsEditing(!isEditing);

    if (!isEditing) {
      editMessage(id, inputRef.current.value);
    }
  }

  const createEditIcon = () => user === 'Den' 
    ? <Edit style={{width: '.6em', marginLeft: 'auto', marginRight: 0, cursor: 'pointer'}} onClick={handleEditMessage}/> 
    : null;
  const createDeleteIcon = () => user === 'Den' 
    ? <Delete style={{width: '.6em', marginRight: 0, cursor: 'pointer'}} onClick={() => deleteMessage(id)}/> 
    : null;
  const createThumbUpIcon = () => user !== 'Den' 
    ? <ThumbUp style={{position: 'absolute', bottom: 6, right: 10, width: '.6em', cursor: 'pointer', color: thumbUpIconColor}} onClick={() => likeMessage(id)}/> 
    : null;

  const editIcon = createEditIcon();
  const deleteIcon = createDeleteIcon();
  const thumbUpIcon = createThumbUpIcon();

  return (
    <Card style={{position: 'relative', display: 'flex', padding: 15, width: 400, marginTop: 20}}>
      {avatar && <Avatar src={avatar} alt="user" style={{margin: 10}}/>}
      <div style={{width: '80%'}}>
        <p>
          {created_at}
        </p>
        <textarea value={message} ref={inputRef} disabled={!isEditing} style={{backgroundColor: 'transparent', width: '100%', height: 80, maxHeight: 100,  resize: 'none', border: `1px solid ${textAreaBorderColor}` }}/>
      </div>
      {editIcon}
      {deleteIcon}
      {thumbUpIcon}
    </Card>
  )
}

Message.propTypes = {
  post: shape({
    id: string.isRequired, 
    avatar: string, 
    created_at: string.isRequired, 
    message: string.isRequired, 
    user: string.isRequired,
    isLiked: bool
  }),
  editMessage: func.isRequired,
  deleteMessage: func.isRequired,
  likeMessage: func.isRequired
}

export { Message };
