const { spawn } = require('child_process');

// 启动keepalive
const keepalive = spawn('node', ['keepalive.js'], {
  stdio: 'inherit'
});

// 启动ST服务器
const server = spawn('node', ['server.js'], {
  stdio: 'inherit'
});

keepalive.on('error', (err) => {
  console.error('Keepalive启动失败:', err);
});

server.on('error', (err) => {
  console.error('ST服务器启动失败:', err);
});

process.on('SIGTERM', () => {
  keepalive.kill();
  server.kill();
});
