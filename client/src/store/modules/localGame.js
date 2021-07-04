import Game from '@/game/Game'
import Player from '@/game/Player'
import router from '@/router'
import SocketAPI from '@/utils/socketApi'
import store from '../index'

const socket = new SocketAPI()

const onDisconnect = ({ dispatch, commit }) => {
  socket.on('opponent-disconnected', () => {
    commit('SET_CURRENT_PLAYER', null)
    dispatch('disconnect')
  })
}

const onSetIndex = ({ commit, state }) => {
  socket.on('set-index', index => {
    state.game.makeMove(state.currentPlayerMove, index)
    commit('SET_CURRENT_PLAYER_MOVE')
  })
}

const onSkipTurn = ({ commit, state }) => {
  socket.on('skip-turn', () => {
    state.game.skipTurn()
    commit('SET_CURRENT_PLAYER_MOVE')
  })
}

const state = {
  firstPlayer: null,
  secondPlayer: null,
  creator: null,
  currentPlayerMove: null,
  currentPlayer: null,
  game: null,
  onlineGame: false,
  gameId: null,
  gameReady: false
}

const mutations = {
  SET_NEW_LOCAL_GAME (state) {
    state.firstPlayer = new Player({ name: 'First player' })
    state.secondPlayer = new Player({ name: 'Second player' })
    state.creator = state.firstPlayer
    state.game = new Game({ firstPlayer: state.firstPlayer, secondPlayer: state.secondPlayer })
    state.currentPlayerMove = state.game.getCurrentPlayer()
  },
  SET_CURRENT_PLAYER_MOVE (state) {
    state.currentPlayerMove = state.game.getCurrentPlayer()
  },
  SET_CURRENT_PLAYER (state, payload) {
    state.currentPlayer = payload
  },
  SET_ONLINE_GAME_STATUS (state, payload) {
    state.onlineGame = payload
  },
  SET_GAME_STATUS (state, payload) {
    state.gameReady = payload
  },
  SET_GAME_ID (state, payload) {
    state.gameId = payload
  }
}

const actions = {
  startNewGame ({ commit, state }, deepGame = false) {
    commit('SET_GAME_STATUS', true)
    commit('SET_NEW_LOCAL_GAME')
    state.game.init({ deepGame })
    const id = Math.random() * 30
    router.push({ name: 'Game', params: { id } })
  },
  createNewOnlineGame ({ dispatch, commit, state }) {
    // first time connects to server than connects to special workspace
    commit('SET_ONLINE_GAME_STATUS', true)
    commit('SET_GAME_STATUS', false)
    socket.connect().then((gameId) => {
      commit('SET_GAME_ID', gameId)
      commit('SET_NEW_LOCAL_GAME')
      commit('SET_CURRENT_PLAYER', state.firstPlayer) // a creator is always the first player
      state.game.init({ deepGame: true })
      socket.connect(gameId).then((gameId) => {
        router.push({ name: 'Game', params: { id: gameId } })
        store.dispatch('closeAllDialogs')
        socket.on('opponent-connected', () => {
          socket.emit('get-deck-indices', state.game.getRandomIndices())
        })
        socket.on('game-ready', () => {
          commit('SET_GAME_STATUS', true)
        })
        onDisconnect({ dispatch, commit })
        onSetIndex({ state, commit })
        onSkipTurn({ state, commit })
      })
    })
  },
  joinOnlineGame ({ dispatch, commit, state }, gameId) {
    commit('SET_ONLINE_GAME_STATUS', true)
    socket.connect(gameId, 'join')
    commit('SET_NEW_LOCAL_GAME')
    commit('SET_CURRENT_PLAYER', state.secondPlayer)
    socket.on('set-random-idices', indices => {
      state.game.setRandomIndeces([...indices])
      state.game.init({ deepGame: true })
      router.push({ name: 'Game', params: { id: gameId } })
      commit('SET_GAME_STATUS', true)
      store.dispatch('closeAllDialogs')
    })
    socket.on('unavailable-game', () => {
      commit('SET_GAME_STATUS', false)
      dispatch('disconnect')
    })
    onDisconnect({ dispatch, commit })
    onSetIndex({ commit, state })
    onSkipTurn({ commit, state })
  },
  makeMove ({ commit, state }, props) {
    const { owner, index } = props
    if (!state.onlineGame) {
      state.game.makeMove(owner, index)
      commit('SET_CURRENT_PLAYER_MOVE')
    } else {
      socket.emit('get-index', index)
    }
  },
  skipTurn ({ commit, state }) {
    if (!state.onlineGame) {
      state.game.skipTurn()
      commit('SET_CURRENT_PLAYER_MOVE')
    } else {
      socket.emit('skip-turn')
    }
  },
  disconnect () {
    socket.disconnect()
  }
}

const getters = {
  firstPlayer: state => state.firstPlayer,
  secondPlayer: state => state.secondPlayer,
  creator: state => state.creator,
  game: state => state.game,
  gameId: state => state.gameId,
  isOnlineGame: state => state.onlineGame,
  currentPlayerMove: state => state.currentPlayerMove,
  currentPlayer: state => state.currentPlayer,
  isGameReady: state => state.gameReady,
  isGameOver: state => state.game.isGameOver(),
  winner: state => state.game.getWinner()
}

const localGameModule = {
  state,
  mutations,
  actions,
  getters
}

export default localGameModule
