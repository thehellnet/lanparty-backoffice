import Vuex from "vuex";

export default new Vuex.Store({
  state: {
    loading: false
  },
  mutations: {
    show(state) {
      state.loading = true;
    },
    hide(state) {
      state.loading = false;
    },
    toggle(state) {
      state.loading = !state.loading;
    }
  }
});
