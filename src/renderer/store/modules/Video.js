const state = {
  show: true,
  hide: true
}

const mutations = {
  setShow (state) {
    state.show = !state.show
  },
  setHide (state) {
    state.hide = !state.hide
  }
}

const actions = {
  dispatchShow ({ commit }) {
    commit('setShow')
  },
  dispatchHide ({commit}) {
    commit('setHide')
  }
}

export default {
  state,
  mutations,
  actions
}
