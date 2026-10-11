'use client'
import { useState, useRef } from 'react'

export default function AudioChat(){
  const [recording,setRecording]=useState(false)
  const [slideX,setSlideX]=useState(0)
  const [msgs,setMsgs]=useState([{id:1,text:"Welcome to Deliver Uganda Live Chat! 👋"}])
  const startX=useRef(0)

  const onTouchStart=(e:any)=>{
    startX.current=e.touches? e.touches[0].clientX : e.clientX
    setRecording(true)
  }
  const onTouchMove=(e:any)=>{
    const x=e.touches? e.touches[0].clientX : e.clientX
    const diff=startX.current - x
    if(diff>0) setSlideX(diff)
    if(diff>100){ setRecording(false); setSlideX(0) }
  }
  const onTouchEnd=()=>{
    if(slideX<100 && recording){
      setMsgs([...msgs,{id:Date.now(),text:"🎤 Voice message 0:05"}])
    }
    setRecording(false); setSlideX(0)
  }

  return(
    <div style={{width:'100vw',height:'100dvh',display:'flex',flexDirection:'column',background:'#fff',position:'fixed',inset:0,fontFamily:'system-ui'}}>
      {/* TOP - Only X */}
      <div style={{padding:'12px',borderBottom:'1px solid #eee',display:'flex',alignItems:'center'}}>
        <button onClick={()=>window.parent.postMessage('deliver-close','*')} style={{fontSize:'26px',border:'none',background:'none'}}>✕</button>
      </div>

      {/* MESSAGES */}
      <div style={{flex:1,overflowY:'auto',padding:'16px',display:'flex',flexDirection:'column',gap:'10px'}}>
        {msgs.map(m=>(
          <div key={m.id} style={{background:'#f1f1f1',padding:'10px 14px',borderRadius:'14px',alignSelf:'flex-start',maxWidth:'80%'}}>{m.text}</div>
        ))}
        {recording && <div style={{color:'#5e1742',fontSize:'14px'}}>● Recording... slide left to cancel ← {slideX>0 && `(${Math.round(slideX)}px)`}</div>}
      </div>

      {/* INPUT + MIC SLIDER */}
      <div style={{padding:'10px',borderTop:'1px solid #eee',display:'flex',gap:'8px',alignItems:'center',background: recording? '#ffeef0':'#fff',transform:`translateX(-${slideX}px)`,transition: recording? 'none':'0.2s'}}>
        <input placeholder="Type a message..." style={{flex:1,padding:'12px 16px',borderRadius:'24px',border:'1px solid #ddd',outline:'none',opacity: recording?0.5:1}}/>
        <button style={{background:'#5e1742',color:'#fff',border:'none',borderRadius:'20px',padding:'10px 20px'}}>Send</button>
        <button
          onMouseDown={onTouchStart} onMouseMove={onTouchMove} onMouseUp={onTouchEnd}
          onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}
          style={{width:'46px',height:'46px',borderRadius:'50%',background: recording?'red':'#5e1742',color:'#fff',border:'none',flexShrink:0}}>
          🎤
        </button>
      </div>
      {recording && <div style={{textAlign:'center',fontSize:'12px',color:'#999',padding:'4px'}}>Slide mic left to cancel</div>}
    </div>
  )
}
