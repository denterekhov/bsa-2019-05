import React, { useState, createRef } from 'react';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { Edit, Delete, ThumbUp } from '@material-ui/icons';
import { func, shape, bool, string } from 'prop-types';
import './Message.css';

const Message = ({ post, editMessage, deleteMessage, likeMessage }) => {
  const [isEditing, setIsEditing] = useState(false);
  const { id, avatar, created_at, message, user, isLiked } = post;

  let inputRef = createRef();

  const thumbUpIconColor = isLiked ? '#f00' : '#000';
  const textAreaBorderColor = isEditing ? '#f00' : 'transparent';
  const myMessageAlignment = user === 'Den' ? 'auto' : '0';

  const handleEditMessage = () => {
    setIsEditing(!isEditing);

    if (isEditing) {
      editMessage(id, inputRef.current.value);
    }
  }

  const createEditIcon = () => user === 'Den' 
    ? <Edit 
        className='edit_icon'
        onClick={handleEditMessage}/> 
    : null;
  const createDeleteIcon = () => user === 'Den' 
    ? <Delete 
        className='delete_icon'
        onClick={() => deleteMessage(id)}/> 
    : null;
  const createThumbUpIcon = () => user !== 'Den' 
    ? <ThumbUp 
        className='like_icon'
        style={{color: thumbUpIconColor}} 
        onClick={() => likeMessage(id)}/> 
    : null;

  const editIcon = createEditIcon();
  const deleteIcon = createDeleteIcon();
  const thumbUpIcon = createThumbUpIcon();

  return (
    <Card 
      className='card'
      style={{marginLeft: myMessageAlignment}}>
      {avatar && <Avatar src={avatar} alt="user" style={{margin: 10}}/>}
      <div style={{width: '80%', maxWidth: '100%'}}>
        <p>
          {created_at}
        </p>
        <TextareaAutosize
          className='textarea'
          aria-label="Textarea" 
          rows={3}  
          defaultValue={message}
          ref={inputRef} 
          disabled={!isEditing} 
          style={{border: `1px solid ${textAreaBorderColor}`}}
        />
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
