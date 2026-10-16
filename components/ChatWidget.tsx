'use client';
import { useState } from 'react';

type Message = {
  role: 'user' | 'assistant';
  text: string;
};

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(true);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', text: 'Hello! Welcome to Deliver Uganda. How can I help you today? 🇺🇬' }
  ]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, { role: 'user', text: input }, { role: 'assistant', text: 'Thanks! We received: ' + input }]);
    setInput('');
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #FFD700, #D4AF37)',
          border: 'none',
          fontSize: '28px',
          cursor: 'pointer',
          zIndex: 999999,
          boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
        }}
      >
        💬
      </button>
    );
  }

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      width: '100vw',
      height: '100dvh',
      background: '#fff',
      zIndex: 999999,
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* HEADER - GOLD */}
      <div style={{
        height: '60px',
        background: 'linear-gradient(135deg, #FFD700, #D4AF37)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 16px',
        color: '#000',
        fontWeight: 'bold',
        fontSize: '18px'
      }}>
        <span>🇺🇬 Deliver Uganda</span>
        <button
          onClick={() => setIsOpen(false)}
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: '#000',
            color: '#FFD700',
            border: 'none',
            fontSize: '20px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          X
        </button>
      </div>

      {/* MESSAGES */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px', background: '#f9f9f9' }}>
        {messages.map((m, i) => (
          <div
            key={i}
            style={{
              maxWidth: '80%',
              margin: m.role === 'user' ? '8px 0 8px auto' : '8px auto 8px 0',
              padding: '10px 14px',
              borderRadius: '18px',
              background: m.role === 'user' ? '#000' : '#fff',
              color: m.role === 'user' ? '#FFD700' : '#000',
              border: m.role === 'user' ? 'none' : '1px solid #eee',
              boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
            }}
          >
            {m.text}
          </div>
        ))}
      </div>

      {/* INPUT + SEND BUTTON */}
      <div style={{
        height: '70px',
        borderTop: '1px solid #eee',
        display: 'flex',
        alignItems: 'center',
        padding: '0 12px',
        gap: '10px',
        background: '#fff'
      }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Type a message..."
          style={{
            flex: 1,
            height: '44px',
            borderRadius: '22px',
            border: '1px solid #ddd',
            padding: '0 16px',
            outline: 'none',
            fontSize: '16px'
          }}
        />
        <button
          onClick={sendMessage}
          style={{
            height: '44px',
            padding: '0 22px',
            borderRadius: '22px',
            background: 'linear-gradient(135deg, #FFD700, #D4AF37)',
            color: '#000',
            border: 'none',
            fontWeight: 'bold',
            cursor: 'pointer',
            fontSize: '15px'
          }}
        >
          SEND
        </button>
      </div>
    </div>
  );
}
