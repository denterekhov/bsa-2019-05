import React, { Component } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { api } from '../../REST';
import { Header } from '../Header';
import { MessageList } from '../MessageList';
import { MessageInput } from '../MessageInput';

class App extends Component {
  state = {
    isLoading: false,
    messages: []
  }

  async componentDidMount() {
    const response = await api.fetchMessages('https://api.myjson.com/bins/1hiqin');
    const messages = await response.json();
    this.setState({
      messages
    });
  }

  createNewMessage = (message) => {
    this.setState(({messages}) => ({
      messages: [...messages, message],
    }))
  }

  editMessage = (id, updatedMessage) => {
    const { messages } = this.state;
    this.setState({
      messages: messages.map(post => post.id === id 
        ? {
          ...post,
          message: updatedMessage,
        } 
        : post
      )
    })
  }

  deleteMessage = (id) => {
    const { messages } = this.state;
    this.setState({
      messages: messages.filter(message => message.id !== id),
    })
  }

  likeMessage = (id) => {
    const { messages } = this.state;
    this.setState({
      messages: messages.map(message => message.id === id 
        ? {
          ...message,
          isLiked: true,
        } 
        : message
      )
    })
  }

  render() {
    const { messages } = this.state;
    const usersQuantity = (new Set(messages.map(({user}) => user))).size;
    const lastMessageTime = messages.length && messages[messages.length - 1].created_at;

    return (
      <>
        {messages.length 
          ? <>
              <Header 
                messageQuantity={messages.length}
                usersQuantity={usersQuantity}
                lastMessageTime={lastMessageTime}
              />
              <CssBaseline />
              <Container maxWidth="md">
                <MessageList 
                  messages={messages}
                  deleteMessage={this.deleteMessage}
                  editMessage={this.editMessage}
                  likeMessage={this.likeMessage}
                />
                <MessageInput 
                  createNewMessage={this.createNewMessage}
                />
              </Container>
          </>
          : <CircularProgress
              size={60}
              thickness={4}
              style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}
            />
        }
      </>
    )
  }
}

export default App;
