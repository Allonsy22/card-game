const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors({ origin: true }));


const port = process.env.PORT || 3333;

app.get('/', (req, res) => {
  res.status(200).json('Hello');
});

const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const io = require('socket.io')(server)

// ____________
io.sockets.on('connection', (socket) => {
  socket.emit('connection', socket.id);
  console.log('a user connected');
});

const workspaces = io.of(/^\/\w+$/);
workspaces.on('connection', socket => {
  const workspace = socket.nsp;
  const type = socket.handshake.query['type'];

  socket.emit('connection', workspace.name.slice(1, workspace.name.lenth));
  socket.on('disconnect', () => {
    console.log('socket disconnected');
    workspace.emit('opponent-disconnected', 'Opponent disconnected')
  })
  console.log(`socket ${socket.id} connected to room ${workspace.name}`);

  if (type === 'join') {
    workspace.emit('opponent-connected')
    const size = workspace.sockets.size;
    if (size < 2 || size > 2) {
      socket.emit('unavailable-game');
    }
  }

  socket.on('get-deck-indices', indices => {
    workspace.emit('set-random-idices', indices);
    workspace.emit('game-ready');
  });

  socket.on('get-index', index => {
    workspace.emit('set-index', index);
  });

  socket.on('skip-turn', () => {
    workspace.emit('skip-turn')
  })

});
