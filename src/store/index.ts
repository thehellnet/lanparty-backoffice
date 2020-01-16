import Vue from "vue";
import Vuex from "vuex";
import spinner from "@/store/modules/spinner";
import auth from "@/store/modules/auth";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    spinner: spinner,
    auth: auth
  },
  strict: true
});
