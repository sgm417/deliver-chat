"use client"
import { useState } from 'react';

export default function ChatWidget(){
 const [open,setOpen]=useState<boolean>(false);
 const [rec,setRec]=useState<boolean>(false);
 const [slide,setSlide]=useState<number>(0);

 return (
 <>
 {!open && (
  <button onClick={()=>setOpen(true)} 
   style={{position:'fixed',bottom:24,right:24,width:60,height:60,borderRadius:'50%',background:'#4F2C92',border:'none',zIndex:99999,cursor:'pointer'}}>
   💬
  </button>
 )}

 {open && (
  <div style={{
   position:'fixed',inset:0,top:'auto',left:'auto',
   width:'100vw',height:'100vh',
   maxWidth: typeof window !== 'undefined' && window.innerWidth < 768 ? '100vw' : '380px',
   maxHeight: typeof window !== 'undefined' && window.innerWidth < 768 ? '100vh' : '580px',
   bottom: typeof window !== 'undefined' && window.innerWidth > 768 ? 90 : 0,
   right: typeof window !== 'undefined' && window.innerWidth > 768 ? 24 : 0,
   background:'#fff',zIndex:99999,display:'flex',flexDirection:'column',
   borderRadius: typeof window !== 'undefined' && window.innerWidth < 768 ? 0 : 16,
   overflow:'hidden',boxShadow:'0 10px 30px rgba(0,0,0,.2)'
  }}>
   {/* TOP BAR WITH X ON LEFT */}
   <div style={{background:'#4F2C92',color:'#fff',padding:'12px 14px',display:'flex',gap:12,alignItems:'center'}}>
    <button onClick={()=>setOpen(false)} style={{background:'none',border:'none',color:'#fff',fontSize:22,cursor:'pointer'}}>✕</button>
    <b>Deliver Uganda</b>
   </div>

   <div style={{flex:1,padding:16,background:'#F5F3FF'}}>Hello! How can we help deliver today?</div>

   <div style={{padding:12,display:'flex',gap:8,borderTop:'1px solid #eee',alignItems:'center'}}>
    <input disabled={rec} placeholder={rec ? `← Slide to cancel ${slide>50?'❌':''}` : 'Type message...'} 
     style={{flex:1,padding:'12px 16px',borderRadius:24,border:'1px solid #ddd',outline:'none'}}/>
    
    <button
     onPointerDown={(e: React.PointerEvent)=>{
       setRec(true);
       const sx = e.clientX;
       const target = e.currentTarget as HTMLElement;
       target.setPointerCapture(e.pointerId);
       (target as any).onpointermove = (ev: PointerEvent)=>{
         const d = sx - ev.clientX;
         setSlide(d>0?d:0);
         if(d>100){ setRec(false); setSlide(0); }
       }
     }}
     onPointerUp={()=>{ setRec(false); setSlide(0); }}
     style={{width:48,height:48,borderRadius:'50%',background:rec?'#EF4444':'#4F2C92',border:'none',color:'#fff',cursor:'pointer',transform:`translateX(-${slide}px)`,transition:rec?'none':'transform .2s'}}>
     {rec ? '●' : '🎤'}
    </button>
   </div>
  </div>
 )}
 </>
 )
}
