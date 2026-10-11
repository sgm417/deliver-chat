'use client'
export default function AudioPage(){
  return(
    <div style={{width:'100vw',height:'100dvh',position:'fixed',inset:0,background:'#fff',fontFamily:'system-ui',display:'flex',flexDirection:'column'}}>
      <div style={{padding:'12px',borderBottom:'1px solid #eee'}}>
        <button onClick={()=>window.parent.postMessage('deliver-close','*')} style={{fontSize:'26px',border:'none',background:'none'}}>✕</button>
      </div>
      <div style={{flex:1,display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',gap:'12px'}}>
        <h2>Audio Works! 🎤</h2>
        <audio controls src="https://www.w3schools.com/html/horse.mp3" />
        <p style={{color:'#888'}}>If you see this, /audio is fixed!</p>
      </div>
    </div>
  )
}
