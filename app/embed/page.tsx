'use client'
import { useState } from 'react'
export default function Embed() {
  const [msg, setMsg] = useState('')
  const [chats, setChats] = useState<string[]>([])
  return (
    <div style={{padding: 16, height: '100vh', display: 'flex', flexDirection: 'column', background: '#fff'}}>
      <h3 style={{margin: 0, color: '#8B2D5E'}}>Deliver Chat 💬</h3>
      <div style={{flex: 1, overflowY: 'auto', margin: '12px 0', border: '1px solid #eee', borderRadius: 8, padding: 8}}>
        {chats.map((c,i)=><div key={i} style={{margin: '4px 0', padding: 8, background: '#f5f5f5', borderRadius: 8}}>{c}</div>)}
        {chats.length===0 && <div style={{color: '#999'}}>Say hi! 👋</div>}
      </div>
      <div style={{display: 'flex', gap: 8}}>
        <input value={msg} onChange={e=>setMsg(e.target.value)} placeholder="Type a message..." style={{flex: 1, padding: 10, borderRadius: 8, border: '1px solid #ddd'}} />
        <button onClick={()=>{if(msg.trim()){setChats([...chats, msg]); setMsg('')}}} style={{padding: '10px 16px', background: '#8B2D5E', color: 'white', border: 'none', borderRadius: 8}}>Send</button>
      </div>
    </div>
  )
}
