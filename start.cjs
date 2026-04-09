const { spawn } = require('child_process');

console.log('启动管理器开始运行...');

// 启动keepalive
const keepalive = spawn('node', ['keepalive.cjs'], {
  stdio: 'inherit'
});

// 启动ST服务器
const server = spawn('node', ['server.js', '--listen', '--disableCsrf'], {
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
  process.exit(0);
});
