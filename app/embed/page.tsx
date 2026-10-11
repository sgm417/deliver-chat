'use client'
import { useState, useRef } from 'react'

export default function Embed(){
  const [msg,setMsg]=useState('')
  const [chats,setChats]=useState<string[]>([])
  const [isRec,setIsRec]=useState(false)
  const [dragX,setDragX]=useState(0)
  const startXRef=useRef(0)

  const send=()=>{
    if(!msg.trim()) return;
    setChats([...chats,msg]); setMsg('')
  }

  return(
    <div style={{position:'fixed',inset:0,width:'100vw',height:'100vh',height:'100dvh',display:'flex',flexDirection:'column',background:'#fff',fontFamily:'system-ui'}}>
      {/* HEADER with X on LEFT */}
      <div style={{height:56,background:'#7a365f',display:'flex',alignItems:'center',gap:12,padding:'0 16px',flexShrink:0}}>
        <button onClick={()=>window.parent.postMessage('close-deliver-chat','*')} style={{width:36,height:36,borderRadius:'50%',background:'rgba(255,255,255,.15)',border:'none',color:'#fff',fontSize:20,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center'}}>✕</button>
        <div style={{color:'#fff',fontWeight:700}}>Deliver Chat 💬</div>
      </div>

      {/* MESSAGES */}
      <div style={{flex:1,overflowY:'auto',padding:16,display:'flex',flexDirection:'column',gap:8}}>
        {chats.length===0 && <div style={{background:'#f3f4f6',padding:'10px 14px',borderRadius:18,alignSelf:'flex-start'}}>Say hi! 👋</div>}
        {chats.map((c,i)=><div key={i} style={{background:'#7a365f',color:'#fff',padding:'10px 14px',borderRadius:18,alignSelf:'flex-end',maxWidth:'75%'}}>{c}</div>)}
      </div>

      {/* INPUT BAR - WhatsApp style */}
      <div style={{padding:'10px 12px',borderTop:'1px solid #eee',display:'flex',gap:8,alignItems:'center',background:'#fff'}}>
        <div style={{flex:1,position:'relative',display:'flex',alignItems:'center'}}>
          {isRec && (
            <div style={{position:'absolute',inset:0,background:'#ffe4e6',borderRadius:24,display:'flex',alignItems:'center',paddingLeft:14,fontSize:13,color:'#991b1b',transform:`translateX(-${dragX}px)`,transition: isRec ? 'none' : 'transform .2s'}}>
              ← Slide to cancel {dragX>50 && '❌'}
            </div>
          )}
          <input 
            value={msg} 
            onChange={e=>setMsg(e.target.value)} 
            onKeyDown={e=>e.key==='Enter'&&send()}
            placeholder={isRec?'':"Type a message..."} 
            style={{width:'100%',padding:'12px 14px',borderRadius:24,border:'1px solid #d1d5db',outline:'none'}} 
          />
        </div>
        <button onClick={send} style={{background:'#7a365f',color:'#fff',border:'none',borderRadius:20,padding:'10px 18px',fontWeight:600}}>Send</button>
        
        {/* MIC with slide */}
        <button 
          onPointerDown={e=>{
            setIsRec(true); startXRef.current=e.clientX;
            const btn=e.currentTarget as any; btn.setPointerCapture(e.pointerId);
            btn.onpointermove=(ev:PointerEvent)=>{
              const diff=startXRef.current-ev.clientX;
              if(diff>0) setDragX(diff);
              if(diff>120){ setIsRec(false); setDragX(0); btn.onpointermove=null; }
            }
          }}
          onPointerUp={e=>{
            setIsRec(false); setDragX(0);
            (e.currentTarget as any).onpointermove=null;
          }}
          style={{width:44,height:44,borderRadius:'50%',background:isRec?'#ef4444':'#7a365f',border:'none',color:'#fff',fontSize:18,transform:`translateX(-${dragX}px)`,transition: isRec ? 'none' : 'transform .2s'}}
        >🎤</button>
      </div>
    </div>
  )
}
