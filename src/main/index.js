'use strict'

import { app, BrowserWindow, screen, ipcMain } from 'electron'
import store from '../renderer/store'
// -----------------------------------------------------------------------
// require('./server')
const cors = require('cors')
const express = require('express')
const server = express()
const http = require('http').createServer(server)
const io = require('socket.io')(http)
const path = require('path')
const staticRoot = path.resolve(__dirname)

server.use(cors({
  origin: '*'
}))

server.use('/', express.static(staticRoot))
server.get('/test', (req, res) => {
  res.send('<h1>服务正常</h1>')
})
io.on('connection', (socket) => {
  socket.on('messageClient', (msg) => {
    mainWindow.show()
    setTimeout(() => {
      mainWindow.setPosition(screenSize.x + 1475, screenSize.y + 165)
      store.dispatch('dispatchShow')
    }, 50)

    socket.broadcast.emit('messageServer', '我是服务器')
  })
})

http.listen(9527, () => {
  console.log('监听127.0.0.1:9527端口')
})
// -----------------------------------------------------------------------------

if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

var mainWindow
var currentDisplay, screenSize
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `http://localhost:9527` // `file://${__dirname}/index.html`
function getScreenSize () {
  let {x, y} = screen.getCursorScreenPoint()// 获取当前鼠标位置
  currentDisplay = screen.getDisplayNearestPoint({ x, y })
  screenSize = currentDisplay.bounds
};

function createWindow () {
  getScreenSize()
  mainWindow = new BrowserWindow({
    // x: screenSize.x + 1475,
    // y: screenSize.y + 165,
    x: screenSize.x + 1475,
    y: screenSize.y + 165,
    height: 640,
    useContentSize: true,
    width: 445,
    transparent: true,
    frame: false,
    show: true,
    alwaysOnTop: true, // 窗口总是在屏幕顶部
    skipTaskbar: true, // 任务栏中不显示窗口图标
    webPreferences: {
      webSecurity: true,
      plugins: true,
      nodeIntegration: true
    }
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

ipcMain.on('closeVideo', () => {
  store.dispatch('dispatchHide')
  setTimeout(() => {
    mainWindow.setPosition(screenSize.x + 5475, screenSize.y + 165)
    mainWindow.hide()
  }, 800)
})

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

let pluginName = app.getPath('pepperFlashSystemPlugin')
// pepflashplayer = path.join(__dirname, 'PepperFlashPlayer.plugin');
app.commandLine.appendSwitch('ppapi-flash-path', pluginName)
