const state = {
  menuDialog: false,
  gameTypeMenu: false,
  onlineTypeMenu: false
}

const mutations = {
  SET_MENU_DIALOG_STATUS (state, payload) {
    state.menuDialog = payload
  },
  SET_GAME_TYPE_MENU_STATUS (state, payload) {
    state.gameTypeMenu = payload
  },
  SET_ONLINE_TYPE_MENU_STATUS (state, payload) {
    state.onlineTypeMenu = payload
  },
  CLOSE_ALL_DIALOG (state) {
    state.menuDialog = false
    state.gameTypeMenu = false
    state.onlineTypeMenu = false
  }
}

const actions = {
  toggleMenuDialog ({ commit, state }) {
    commit('SET_MENU_DIALOG_STATUS', !state.menuDialog)
  },
  toggleGameTypeMenu ({ commit, state }) {
    commit('SET_GAME_TYPE_MENU_STATUS', !state.gameTypeMenu)
  },
  toggleOnlineTypeMenu ({ commit, state }) {
    commit('SET_ONLINE_TYPE_MENU_STATUS', !state.onlineTypeMenu)
  },
  closeAllDialogs ({ commit }) {
    commit('CLOSE_ALL_DIALOG')
  }
}

const getters = {
  isMenuDialog: state => state.menuDialog,
  isGameTypeMenu: state => state.gameTypeMenu,
  isOnlineTypeMenu: state => state.onlineTypeMenu
}

const navigationModule = {
  state,
  mutations,
  actions,
  getters
}

export default navigationModule
