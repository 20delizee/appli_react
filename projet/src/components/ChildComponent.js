import React, { useState } from 'react';

const ChildComponent = ({ sendMessage }) => {
  const [message, setMessage] = useState('');
  const storedEmail = sessionStorage.getItem('email');
  const storedToken = sessionStorage.getItem('token');
  console.log(storedEmail);
  console.log(storedToken);
  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendMessage(message);
    setMessage('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={message} onChange={handleMessageChange} />
        <button type="submit">Envoyer</button>
      </form>
    </div>
  );
};

export default ChildComponent;