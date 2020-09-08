const cors = require('cors')
const server = require('express')()
const http = require('http').createServer(server)
const io = require('socket.io')(http)

server.use(cors({
  origin: '*'
}))

server.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>')
})

io.on('connection', (socket) => {
  console.log('a user connected')
  socket.on('messageClient', (msg) => {
    console.log('接收到客户端信息', msg)
    console.log('------')
    socket.broadcast.emit('messageServer', '我是服务器')
  })
})

http.listen(9527, () => {
  console.log('监听127.0.0.1:9527端口')
})
