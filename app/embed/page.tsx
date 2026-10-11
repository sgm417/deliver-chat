'use client'
export default function Embed(){
 return(
  <div style={{width:'100vw',height:'100dvh',display:'flex',flexDirection:'column',background:'#fff',position:'fixed',inset:0}}>
   
   {/* TOP BAR - Only X button, no title */}
   <div style={{padding:'12px',borderBottom:'1px solid #eee',display:'flex',alignItems:'center'}}>
    <button onClick={()=>window.parent.postMessage('deliver-close','*')} style={{fontSize:'26px',border:'none',background:'none',cursor:'pointer',padding:'4px 8px'}}>✕</button>
   </div>

   {/* CHAT AREA */}
   <div style={{flex:1,padding:'16px',overflowY:'auto'}}>
    <div style={{background:'#f1f1f1',padding:'10px 14px',borderRadius:'14px',display:'inline-block'}}>Welcome to Deliver Uganda Live Chat! 👋</div>
   </div>

   {/* INPUT */}
   <div style={{padding:'10px',display:'flex',gap:'8px',borderTop:'1px solid #eee',alignItems:'center'}}>
    <input placeholder="Type a message..." style={{flex:1,padding:'12px 16px',borderRadius:'24px',border:'1px solid #ddd',outline:'none'}}/>
    <button style={{background:'#5e1742',color:'#fff',border:'none',borderRadius:'20px',padding:'10px 20px',fontWeight:'bold'}}>Send</button>
   </div>

  </div>
 )
}
