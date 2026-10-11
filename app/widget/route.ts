export async function GET() {
  const js = `(function(){
 if(document.getElementById('deliver-chat-frame')) return;
 var f=document.createElement('iframe');
 f.src='https://deliver-chat.vercel.app/embed';
 f.id='deliver-chat-frame';
 f.style.cssText='position:fixed;inset:0;width:100vw;height:100vh;height:100dvh;border:none;z-index:9999999;display:none;background:#fff;';
 document.body.appendChild(f);
 var b=document.createElement('button');
 b.innerHTML='💬';
 b.id='deliver-chat-btn';
 b.style.cssText='position:fixed;bottom:20px;right:20px;width:64px;height:64px;border-radius:50%;background:#7a365f;color:white;border:none;font-size:28px;z-index:999999;cursor:pointer;box-shadow:0 4px 16px rgba(0,0,0,.2);';
 b.onclick=function(){
  var fr=document.getElementById('deliver-chat-frame');
  if(fr){ var isHidden=fr.style.display==='none'; fr.style.display=isHidden?'block':'none'; b.style.display=isHidden?'none':'block'; }
 };
 document.body.appendChild(b);
 window.addEventListener('message',function(e){
  if(e.data==='close-deliver-chat'){
   var fr=document.getElementById('deliver-chat-frame'); var btn=document.getElementById('deliver-chat-btn');
   if(fr) fr.style.display='none'; if(btn) btn.style.display='block';
  }
 });
})();`;
  return new Response(js, {
    headers: {
      'Content-Type': 'application/javascript',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=60'
    },
  });
}
