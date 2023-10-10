import '../Style.css';
import ChildComponent from './ChildComponent';
import { useEffect, useState } from 'react';
import io from 'socket.io-client';

function App() {
  const [messages, setMessages] = useState([]);
  const storedEmail = sessionStorage.getItem('email');
  const storedToken = sessionStorage.getItem('token');
  console.log(storedEmail);
  console.log(storedToken);

  useEffect(() => {
    const socket = io('http://localhost:3000');

    socket.on('connect', () => {
      console.log('Connecté au serveur Socket.IO');
    });

    socket.on('chat:message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = (message) => {
    const socket = io('http://localhost:3000');
    socket.emit('chat:message', message);
  };

  return (
    <div className="App">
      <p className='Coucou'>COUCOUc</p>
      <ChildComponent sendMessage={sendMessage} />
      <div>
        <h3>Messages</h3>
        {messages.map((message, index) => (
        <ul>
          
            <li key={index}>{message}</li>
          
        </ul>
        ))}
      </div>
    </div>
  );
}

export default App;