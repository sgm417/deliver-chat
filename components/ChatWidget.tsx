"use client"
import { useState } from "react";

export default function DeliverChat(){
 const [open,setOpen]=useState(true); // set true to see full screen instantly while testing
 const [rec,setRec]=useState(false);
 const [drag,setDrag]=useState(0);

 return (
  <div style={{fontFamily:'system-ui'}}>
   {!open && (
    <button onClick={()=>setOpen(true)} style={{position:'fixed',bottom:18,right:18,width:58,height:58,borderRadius:'50%',background:'#7a365f',color:'#fff',border:'none',zIndex:9999999}}>💬</button>
   )}
   {open && (
    <div style={{
     position:'fixed',inset:0,
     width:'100vw',height:'100vh',height:'100dvh',
     background:'#fff',zIndex:9999999,
     display:'flex',flexDirection:'column'
    }}>
     {/* HEADER WITH X LEFT - AS YOU WANTED */}
     <div style={{height:54,background:'#7a365f',display:'flex',alignItems:'center',gap:10,padding:'0 14px'}}>
      <button onClick={()=>setOpen(false)} style={{background:'transparent',border:'none',color:'#fff',fontSize:22,width:32,height:32,cursor:'pointer'}}>✕</button>
      <b style={{color:'#fff'}}>Deliver Chat</b>
      <span style={{color:'#fff',marginLeft:6}}>💬</span>
     </div>

     <div style={{flex:1,background:'#fff',padding:16}}>
      <div style={{background:'#f5f5f5',padding:'10px 14px',borderRadius:16,display:'inline-block'}}>Say hi! 👋</div>
     </div>

     <div style={{padding:10,display:'flex',gap:8,borderTop:'1px solid #eee',alignItems:'center'}}>
      <div style={{flex:1,position:'relative'}}>
       {rec && <div style={{position:'absolute',inset:0,background:'#ffeaea',borderRadius:24,display:'flex',alignItems:'center',paddingLeft:14,fontSize:13,transform:`translateX(-${drag}px)`}}>← Slide to cancel {drag>40?'❌':''}</div>}
       <input disabled={rec} placeholder={rec?' ':'Type a message...'} style={{width:'100%',padding:'12px 14px',borderRadius:24,border:'1px solid #d1d5db',outline:'none',boxSizing:'border-box'}}/>
      </div>
      <button style={{background:'#7a365f',color:'#fff',border:'none',borderRadius:20,padding:'10px 18px',fontWeight:600}}>Send</button>
      <button
       onPointerDown={e=>{
         setRec(true);
         const sx=e.clientX;
         const el=e.currentTarget as any;
         el.setPointerCapture(e.pointerId);
         el.onpointermove=(ev:PointerEvent)=>{
           const d=sx-ev.clientX;
           if(d>0) setDrag(d);
           if(d>110){ setRec(false); setDrag(0); el.onpointermove=null; }
         }
       }}
       onPointerUp={e=>{ setRec(false); setDrag(0); (e.currentTarget as any).onpointermove=null; }}
       style={{width:44,height:44,borderRadius:'50%',background:rec?'#ef4444':'#7a365f',border:'none',color:'#fff',transform:`translateX(-${drag}px)`,flexShrink:0}}
      >🎤</button>
     </div>
    </div>
   )}
  </div>
 )
}
