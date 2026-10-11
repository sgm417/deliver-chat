'use client'
import { useState,useRef } from 'react'

export default function SliderPage(){
  const [msgs,setMsgs]=useState<any[]>([{id:1,text:"Welcome to Deliver Uganda Live Chat! 👋"}])
  const [isRec,setIsRec]=useState(false)
  const [locked,setLocked]=useState(false)
  const [time,setTime]=useState(0)
  const [slideX,setSlideX]=useState(0)
  const [slideY,setSlideY]=useState(0)
  const mediaRef=useRef<MediaRecorder|null>(null)
  const timerRef=useRef<any>(null)
  const startPos=useRef({x:0,y:0})
  const chunks=useRef<Blob[]>([])

  const start=(e:any)=>{
    const x=e.touches? e.touches[0].clientX : e.clientX
    const y=e.touches? e.touches[0].clientY : e.clientY
    startPos.current={x,y}
    navigator.mediaDevices.getUserMedia({audio:true}).then(s=>{
      const mr=new MediaRecorder(s)
      mediaRef.current=mr; chunks.current=[]
      mr.ondataavailable=ev=>chunks.current.push(ev.data)
      mr.onstop=()=>{
        if(slideX<100){
          const blob=new Blob(chunks.current,{type:'audio/webm'})
          const url=URL.createObjectURL(blob)
          setMsgs(m=>[...m,{id:Date.now(),type:'audio',url,dur:time}])
        }
      }
      mr.start(); setIsRec(true); setTime(0)
      timerRef.current=setInterval(()=>setTime(t=>t+1),1000)
    })
  }
  const move=(e:any)=>{
    if(!isRec || locked) return
    const x=e.touches? e.touches[0].clientX : e.clientX
    const y=e.touches? e.touches[0].clientY : e.clientY
    const dx=startPos.current.x - x
    const dy=startPos.current.y - y
    if(dx>0) setSlideX(dx)
    if(dy>50) setSlideY(dy)
    if(dx>130){ cancel() }
    if(dy>80){ setLocked(true); setSlideY(0); setSlideX(0) }
  }
  const stop=()=>{
    if(!isRec || locked) return
    mediaRef.current?.stop()
    mediaRef.current?.stream.getTracks().forEach(t=>t.stop())
    clearInterval(timerRef.current)
    setIsRec(false); setSlideX(0); setSlideY(0); setTime(0)
  }
  const cancel=()=>{
    mediaRef.current?.stop()
    mediaRef.current?.stream.getTracks().forEach(t=>t.stop())
    clearInterval(timerRef.current)
    setIsRec(false); setSlideX(0); setSlideY(0); setTime(0); setLocked(false)
  }
  const sendLocked=()=>{
    mediaRef.current?.stop()
    mediaRef.current?.stream.getTracks().forEach(t=>t.stop())
    clearInterval(timerRef.current)
    const blob=new Blob(chunks.current,{type:'audio/webm'})
    const url=URL.createObjectURL(blob)
    setMsgs(m=>[...m,{id:Date.now(),type:'audio',url,dur:time}])
    setIsRec(false); setLocked(false); setSlideX(0); setTime(0)
  }
  const fmt=(s:number)=>`${Math.floor(s/60)}:${String(s%60).padStart(2,'0')}`

  return(
    <div style={{width:'100vw',height:'100dvh',display:'flex',flexDirection:'column',background:'#fff',position:'fixed',inset:0,fontFamily:'system-ui'}}>
      <div style={{padding:'12px',borderBottom:'1px solid #eee',display:'flex',justifyContent:'space-between'}}>
        <button onClick={()=>window.parent.postMessage('deliver-close','*')} style={{fontSize:'26px',border:'none',background:'none'}}>✕</button>
        {isRec && <span style={{color:'red',fontSize:'14px'}}>● {fmt(time)}</span>}
      </div>

      <div style={{flex:1,overflowY:'auto',padding:'16px',display:'flex',flexDirection:'column',gap:'10px',background:'#EFEAE2'}}>
        {msgs.map(m=>(
          <div key={m.id} style={{background:m.text?'#fff':'#D9FDD3',padding:'10px 14px',borderRadius:'14px',maxWidth:'75%',alignSelf:'flex-start'}}>
            {m.text || <audio controls src={m.url} style={{width:'190px'}}/>}
          </div>
        ))}
      </div>

      {/* SLIDER TRACK */}
      <div style={{padding:'12px',background:'#F0F2F5',position:'relative'}}>
        {/* Lock indicator */}
        {isRec &&!locked && (
          <div style={{position:'absolute',right:'70px',bottom:'80px',display:'flex',flexDirection:'column',alignItems:'center',transform:`translateY(-${slideY}px)`,opacity: 1-slideY/100}}>
            <div style={{background:'#fff',borderRadius:'20px',padding:'8px',boxShadow:'0 2px 8px #0002'}}>🔒</div>
            <div style={{width:'2px',height:'40px',background:'#ddd',margin:'4px 0'}}/>
            <span style={{fontSize:'10px',color:'#888'}}>slide up to lock</span>
          </div>
        )}

        <div style={{display:'flex',alignItems:'center',gap:'10px',background:'#fff',borderRadius:'999px',padding:'8px 12px',transform:`translateX(-${slideX}px)`,transition: isRec &&!locked?'none':'0.2s'}}>
          {isRec? (
            <>
              <span style={{color:'red',fontSize:'12px'}}>● {fmt(time)}</span>
              <div style={{flex:1,display:'flex',gap:'2px'}}>{[...Array(15)].map((_,i)=><div key={i} style={{width:'3px',height:`${6+Math.random()*16}px`,background:'#5e1742',borderRadius:'2px'}}/>)}</div>
              <span style={{fontSize:'12px',color:'#888'}}>← slide to cancel</span>
            </>
          ) : (
            <input placeholder="Type a message..." style={{flex:1,border:'none',outline:'none'}}/>
          )}
          <button
            onMouseDown={start} onMouseMove={move} onMouseUp={stop}
            onTouchStart={start} onTouchMove={move} onTouchEnd={stop}
            style={{width:'46px',height:'46px',borderRadius:'50%',border:'none',background: isRec?'red':'#5e1742',color:'#fff'}}>
            🎤
          </button>
        </div>

        {locked && (
          <div style={{display:'flex',justifyContent:'space-between',marginTop:'10px'}}>
            <button onClick={cancel} style={{background:'#fff',border:'1px solid #ddd',borderRadius:'20px',padding:'8px 16px',color:'red'}}>✕ Cancel</button>
            <button onClick={sendLocked} style={{background:'#5e1742',color:'#fff',border:'none',borderRadius:'20px',padding:'8px 24px'}}>Send ➤</button>
          </div>
        )}
      </div>
    </div>
  )
}
