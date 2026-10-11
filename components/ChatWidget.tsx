"use client"
import { useState } from 'react';

export default function ChatWidget(){
 const [open,setOpen]=useState(false);
 const [rec,setRec]=useState(false);
 const [slide,setSlide]=useState(0);

 return (
 <>
 {!open && (
  <button onClick={()=>setOpen(true)} 
   style={{position:'fixed',bottom:24,right:24,width:60,height:60,borderRadius:'50%',background:'#4F2C92',border:'none',zIndex:999999,cursor:'pointer',color:'#fff',fontSize:24,display:'flex',alignItems:'center',justifyContent:'center'}}>💬</button>
 )}

 {open && (
  <div className="deliver-chat-window" style={{
   position:'fixed', 
   top:0, left:0, right:0, bottom:0,
   width:'100vw', 
   height:'100dvh',
   background:'#fff',
   zIndex:999999,
   display:'flex',
   flexDirection:'column',
  }}>
   <style>{`
    @media(min-width: 768px){
     .deliver-chat-window{
      top:auto !important; left:auto !important;
      right:24px !important; bottom:90px !important;
      width:380px !important; height:580px !important;
      border-radius:16px !important;
      box-shadow:0 10px 30px rgba(0,0,0,.3) !important;
      border:1px solid #eee !important;
     }
    }
   `}</style>

   {/* HEADER WITH X ON TOP LEFT */}
   <div style={{background:'#4F2C92',color:'#fff',padding:'14px',display:'flex',alignItems:'center',gap:12,flexShrink:0}}>
    <button onClick={()=>setOpen(false)} style={{background:'rgba(255,255,255,.2)',border:'none',color:'#fff',width:32,height:32,borderRadius:'50%',fontSize:18,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center'}}>✕</button>
    <div style={{fontWeight:700}}>Deliver Uganda</div>
    <div style={{marginLeft:'auto',fontSize:12,opacity:.8}}>Online</div>
   </div>

   <div style={{flex:1,padding:16,background:'#F5F3FF',overflowY:'auto'}}>
    <div style={{background:'#fff',padding:'12px 16px',borderRadius:12,display:'inline-block',boxShadow:'0 1px 2px rgba(0,0,0,.1)'}}>Say hi! 👋 How can we help?</div>
   </div>

   <div style={{padding:'12px',display:'flex',gap:8,borderTop:'1px solid #eee',alignItems:'center',background:'#fff'}}>
    <input disabled={rec} placeholder={rec ? `← Slide to cancel` : 'Type a message...'} 
     style={{flex:1,padding:'12px 16px',borderRadius:24,border:'1px solid #ddd',outline:'none',background:rec?'#FEE2E2':'#fff'}}/>
    <button
     onPointerDown={(e)=>{
       setRec(true);
       const sx=e.clientX;
       const t=e.currentTarget as any;
       t.setPointerCapture(e.pointerId);
       t.onpointermove=(ev:PointerEvent)=>{
         const d=sx-ev.clientX;
         setSlide(d>0?d:0);
         if(d>100){ setRec(false); setSlide(0); t.onpointermove=null; }
       }
     }}
     onPointerUp={(e)=>{ setRec(false); setSlide(0); (e.currentTarget as any).onpointermove=null; }}
     style={{width:48,height:48,borderRadius:'50%',background:rec?'#EF4444':'#4F2C92',border:'none',color:'#fff',cursor:'pointer',transform:`translateX(-${slide}px)`,flexShrink:0}}>
     {rec ? '✕' : '🎤'}
    </button>
   </div>
  </div>
 )}
 </>
 )
}
