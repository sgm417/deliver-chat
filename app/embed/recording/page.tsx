'use client'
import { useState,useRef } from 'react'

export default function CapsuleMic(){
  const [msgs,setMsgs]=useState<any[]>([{id:1,text:"Welcome to Deliver Uganda Live Chat! 👋"}])
  const [isRec,setIsRec]=useState(false)
  const [time,setTime]=useState(0)
  const [slide,setSlide]=useState(0)
  const mediaRef=useRef<MediaRecorder|null>(null)
  const timerRef=useRef<any>(null)
  const startX=useRef(0)
  const chunks=useRef<Blob[]>([])

  const start=(e:any)=>{
    startX.current=e.touches? e.touches[0].clientX : e.clientX
    navigator.mediaDevices.getUserMedia({audio:true}).then(stream=>{
      const mr=new MediaRecorder(stream)
      mediaRef.current=mr; chunks.current=[]
      mr.ondataavailable=ev=>chunks.current.push(ev.data)
      mr.onstop=()=>{
        if(slide<120){
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
    if(!isRec) return
    const x=e.touches? e.touches[0].clientX : e.clientX
    const diff=startX.current - x
    if(diff>0) setSlide(diff)
    if(diff>130){ cancel() }
  }
  const stop=()=>{
    if(!isRec) return
    mediaRef.current?.stop()
    mediaRef.current?.stream.getTracks().forEach(t=>t.stop())
    clearInterval(timerRef.current)
    setIsRec(false); setSlide(0); setTime(0)
  }
  const cancel=()=>{
    mediaRef.current?.stop()
    mediaRef.current?.stream.getTracks().forEach(t=>t.stop())
    clearInterval(timerRef.current)
    setIsRec(false); setSlide(0); setTime(0)
  }
  const fmt=(s:number)=>`0:${String(s).padStart(2,'0')}`

  return(
    <div style={{width:'100vw',height:'100dvh',display:'flex',flexDirection:'column',background:'#fff',position:'fixed',inset:0,fontFamily:'system-ui'}}>
      {/* TOP ONLY X */}
      <div style={{padding:'12px',borderBottom:'1px solid #eee'}}>
        <button onClick={()=>window.parent.postMessage('deliver-close','*')} style={{fontSize:'26px',border:'none',background:'none'}}>✕</button>
      </div>

      {/* CHAT */}
      <div style={{flex:1,overflowY:'auto',padding:'16px',display:'flex',flexDirection:'column',gap:'10px'}}>
        {msgs.map(m=>(
          <div key={m.id} style={{background:'#f5f5f5',padding:'10px 14px',borderRadius:'16px',maxWidth:'80%'}}>
            {m.text || <audio controls src={m.url} style={{width:'200px'}}/>}
          </div>
        ))}
      </div>

      {/* CAPSULE MIC - OUR SIGNATURE! */}
      <div style={{padding:'12px',display:'flex',justifyContent:'center',background:'#fff',borderTop:'1px solid #eee'}}>
        <div style={{
          display:'flex',alignItems:'center',gap:'12px',
          background: isRec? '#1a1a1a':'#f2f2f2',
          color: isRec?'#fff':'#000',
          borderRadius:'999px',padding:'8px 14px',
          minWidth: isRec? '90%':'200px',
          transform:`translateX(-${slide}px)`,
          transition: isRec?'none':'0.2s',
          boxShadow:'0 4px 20px rgba(0,0,0,0.15)'
        }}>
          {isRec? (
            <>
              <div style={{width:'10px',height:'10px',background:'red',borderRadius:'50%',animation:'pulse 1s infinite'}}/>
              <span style={{fontSize:'14px',minWidth:'35px'}}>{fmt(time)}</span>
              <div style={{flex:1,display:'flex',gap:'3px',alignItems:'center'}}>
                {[...Array(12)].map((_,i)=><div key={i} style={{width:'3px',height:`${8+Math.random()*14}px`,background:'#5e1742',borderRadius:'2px'}}/>)}
              </div>
              <span style={{fontSize:'12px',opacity:0.7}}>slide to cancel ←</span>
            </>
          ) : (
            <>
              <input placeholder="Message" style={{flex:1,background:'transparent',border:'none',outline:'none'}}/>
              <div style={{width:'36px',height:'36px',background:'#5e1742',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff'}}>😊</div>
            </>
          )}
          <button
            onMouseDown={start} onMouseMove={move} onMouseUp={stop}
            onTouchStart={start} onTouchMove={move} onTouchEnd={stop}
            style={{width:'44px',height:'44px',borderRadius:'50%',border:'none',background: isRec?'red':'#5e1742',color:'#fff',fontSize:'18px'}}>
            🎤
          </button>
        </div>
      </div>
      <div style={{textAlign:'center',fontSize:'11px',color:'#999',paddingBottom:'8px'}}>{isRec?'Hold • Slide left to cancel':'Hold mic inside capsule to talk'}</div>
    </div>
  )
}
