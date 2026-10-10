export async function GET() {
  const js = `(function(){
    if(document.getElementById('deliver-chat-frame')) return;
    var f=document.createElement('iframe');
    f.src='https://deliver-chat.vercel.app/embed';
    f.style.cssText='position:fixed;bottom:90px;right:20px;width:360px;height:480px;border:none;border-radius:16px;z-index:999999;box-shadow:0 8px 32px rgba(0,0,0,0.2);display:none;';
    f.id='deliver-chat-frame';
    document.body.appendChild(f);
    var b=document.createElement('button');
    b.innerHTML='💬';
    b.id='deliver-chat-btn';
    b.style.cssText='position:fixed;bottom:20px;right:20px;width:64px;height:64px;border-radius:50%;background:#8B2D5E;color:white;border:none;font-size:28px;z-index:999999;cursor:pointer;box-shadow:0 4px 16px rgba(0,0,0,0.2);';
    b.onclick=function(){var fr=document.getElementById('deliver-chat-frame');if(fr){fr.style.display=fr.style.display==='none'?'block':'none';}};
    document.body.appendChild(b);
  })();`;
  return new Response(js, {
    headers: {
      'Content-Type': 'application/javascript',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=3600'
    },
  });
}
