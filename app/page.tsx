export default function Home() {
  return (
    <main style={{padding: 40}}>
      <h1>Deliver Chat is running ✅</h1>
      <p>Widget: <a href="/widget">/widget</a> | <a href="/widget.js">/widget.js</a></p>
      <p>Embed: <a href="/embed">/embed</a></p>
      <pre>{`<script src="https://deliver-chat.vercel.app/widget.js"></script>`}</pre>
    </main>
  )
}
