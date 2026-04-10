const WS_URL = "wss://你的Railway域名/ws";
let ws = null;

function connectWS() {
  ws = new WebSocket(WS_URL);
  ws.onclose = () => setTimeout(connectWS, 3000);
}
connectWS();

$(document).on('MESSAGE_RECEIVED', async function(e, data) {
  const text = data?.mes || "";
  if (!ws || ws.readyState !== WebSocket.OPEN) return;
  
  const setMatch = text.match(/\[SET:(\d+)\]/);
  if (setMatch) {
    ws.send(JSON.stringify({ type: 'set', value: setMatch[1] }));
    return;
  }
  if (text.includes("[STOP]")) {
    ws.send(JSON.stringify({ type: 'stop' }));
  }
});
