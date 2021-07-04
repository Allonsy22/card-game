import socketIOClient from 'socket.io-client'
const URI = 'http://localhost:3333/'

export default class socketAPI {
  socket;

  connect (gameId = '', type = 'create') {
    this.socket = socketIOClient(URI + gameId, {
      transports: ['websocket', 'polling'],
      query: { gameId, type }
    })
    return new Promise((resolve, reject) => {
      this.socket.on('connection', (gameId) => resolve(gameId))
      this.socket.on('connect_error', (error) => reject(error))
    })
  }

  disconnect () {
    return new Promise((resolve) => {
      this.socket.disconnect(() => {
        this.socket = null
        resolve()
      })
    })
  }

  emit (event, data) {
    return new Promise((resolve, reject) => {
      if (!this.socket) return reject(new Error('No socket connection.'))

      return this.socket.emit(event, data, (response) => {
        if (response.error) {
          console.error(response.error)
          return reject(response.error)
        }

        return resolve()
      })
    })
  }

  on (event, fun) {
    return new Promise((resolve, reject) => {
      if (!this.socket) return reject(new Error('No socket connection.'))

      this.socket.on(event, fun)
      resolve()
    })
  }
}
