import  { useState, useEffect } from 'react';

import io from 'socket.io-client';
const socket = io('http://localhost:5000');
function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  console.log('socket: ', socket);
  useEffect(() => {
    socket.on('chat message', (msg) => {
      
      setMessages([...messages, msg]);
    });
  }, [messages]);
  const sendMessage = () => {
    socket.emit('chat message', input);
    setInput('');
  };
  return (
    <div>
      <h1>Chat App</h1>
      <div>
        {messages.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
export default App;