const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 }); // 创建 WebSocket 服务器

wss.on('connection', (ws) => {
  console.log('A client connected');

  // 当收到消息时广播给所有连接的客户端
  ws.on('message', (message) => {
    console.log(`Received message: ${message}`);
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on('close', () => {
    console.log('A client disconnected');
  });
});
