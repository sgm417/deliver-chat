"use client";
import { useState } from "react";

export default function EmbedPage() {
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState(["Say hi! 👋"]);

  return (
    <div className="fixed inset-0 w-[100vw] h-[100dvh] flex flex-col bg-white overflow-hidden">

      {/* HEADER - X Close ALWAYS visible */}
      <div className="h-[56px] shrink-0 bg-[#4a143e] text-white flex items-center justify-between px-4">
        <span className="font-bold">Deliver Chat 💬</span>
        <button
          onClick={() => {
            if (window.parent!== window) {
              window.parent.postMessage("CLOSE_DELIVER_CHAT", "*");
            }
            window.history.back();
          }}
          className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-xl"
        >
          ✕
        </button>
      </div>

      {/* MESSAGES - only this scrolls */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-[#f9f5f7]">
        {messages.map((m, i) => (
          <div key={i} className="bg-white p-3 rounded-xl shadow-sm max-w-[80%]">
            {m}
          </div>
        ))}
      </div>

      {/* FOOTER - Send button NEVER hidden - with safe area */}
      <div className="shrink-0 bg-white border-t p-3 flex gap-2 items-center pb-[calc(12px+env(safe-area-inset-bottom))]">
        <input
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 h-[48px] border border-gray-300 rounded-full px-5 outline-none text-[16px] focus:border-[#4a143e]"
        />
        <button
          onClick={() => { if(msg.trim()){ setMessages([...messages, msg]); setMsg(""); }}}
          className="h-[48px] px-6 bg-[#4a143e] text-white rounded-full font-bold shrink-0"
        >
          Send
        </button>
      </div>
    </div>
  );
}
