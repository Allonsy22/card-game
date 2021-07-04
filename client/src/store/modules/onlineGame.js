import Game from '@/game/Game'
import Player from '@/game/Player'
import SocketAPI from '@/utils/socketApi'
import router from '@/router'
import store from '../index'

const socket = new SocketAPI()

const state = {
  firstPlayer: null,
  secondPlayer: null,
  currentPlayer: null,
  game: null,
  onlineGame: false,
  gameId: null
}

const mutations = {
  SET_NEW_ONLINE_GAME (state) {
    state.firstPlayer = new Player({ name: 'First player' })
    state.secondPlayer = new Player({ name: 'Second player' })
    state.game = new Game({ firstPlayer: state.firstPlayer, secondPlayer: state.secondPlayer })
    state.currentPlayer = state.game.getCurrentPlayer()
  },
  SET_CURRENT_PLAYER (state) {
    state.currentPlayer = state.game.getCurrentPlayer()
  },
  SET_ONLINE_GAME_STATUS (state, payload) {
    state.onlineGame = payload
  },
  SET_GAME_ID (state, payload) {
    state.gameId = payload
  }
}

const actions = {
  createNewOnlineGame ({ commit, state }) {
    // first time connects to server than connects to special workspace
    socket.connect().then((gameId) => {
      commit('SET_GAME_ID', gameId)
      commit('SET_NEW_ONLINE_GAME')
      state.game.init()
      socket.connect(gameId).then((gameId) => {
        console.log(gameId)
        router.push({ name: 'OnlineGame', params: { id: gameId } })
        store.dispatch('closeAllDialogs')
        socket.on('opponent-connected', () => {
          socket.emit('get-deck-indices', state.game.getRandomIndices())
        })
        socket.on('set-index', index => {
          state.game.makeMove(state.firstPlayer, index)
          commit('SET_CURRENT_PLAYER')
        })
      })
    })
  },
  joinOnlineGame ({ commit, state }, gameId) {
    socket.connect(gameId, 'join')
    commit('SET_NEW_ONLINE_GAME')
    socket.on('set-random-idices', indices => {
      state.game.setRandomIndeces([...indices])
      state.game.init()
      router.push({ name: 'OnlineGame', params: { id: gameId } })
      store.dispatch('closeAllDialogs')
      socket.on('set-index', index => {
        state.game.makeMove(state.firstPlayer, index)
        commit('SET_CURRENT_PLAYER')
      })
    })
  },
  makeMove ({ commit, state }, props) {
    const { owner, index } = props
    socket.emit('get-index', index)
    socket.on('set-index', index => {
      state.game.makeMove(owner, index)
      commit('SET_CURRENT_PLAYER')
    })
  }
}

const getters = {

}

const onlineGameModule = {
  state,
  mutations,
  actions,
  getters
}

export default onlineGameModule
