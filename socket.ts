import { WebSocketServer } from 'ws';

// 포트 설정 (표준 3055 포트 사용)
const port = 3055;

console.log(`🔍 Starting WebSocket server on port ${port}...`);

const wss = new WebSocketServer({ port });

console.log(`🚀 Tomatopass Cyber Academy WebSocket server is running on port ${port}`);

wss.on('connection', (ws) => {
  console.log('✅ Figma client connected to Cyber Academy');

  ws.on('message', (data) => {
    try {
      const parsedData = JSON.parse(data.toString());
      console.log('📨 Received from Figma:', parsedData);

      // Echo back to client with cyber academy specific response
      ws.send(JSON.stringify({
        type: "system",
        message: {
          id: parsedData.id,
          result: "Connected to Tomatopass Cyber Academy channel: " + parsedData.channel,
          academy: "cyber-academy",
          status: "ready"
        },
        channel: parsedData.channel
      }));

    } catch (error) {
      console.error('❌ Error parsing message:', error);
    }
  });

  ws.on('close', () => {
    console.log('🔌 Figma client disconnected from Cyber Academy');
  });

  ws.on('error', (error) => {
    console.error('⚠️ WebSocket error:', error);
  });
});

console.log('🎓 Cyber Academy Socket server ready for Figma MCP connection');
console.log('🔗 Ready to receive design updates from Figma');
