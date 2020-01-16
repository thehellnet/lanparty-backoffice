<template>
  <div
    class="theme-default bg-background-light flex flex-col min-h-screen "
    id="app-container"
  >
    <the-nav-bar></the-nav-bar>
    <div
      id="main-container"
      class="container flex-grow flex justify-center items-center"
    >
      <slot />
    </div>
    <the-footer></the-footer>
    <base-spinner-container :loading="this.loading">
      <base-spinner></base-spinner>
    </base-spinner-container>
  </div>
</template>

<script>
import TheNavBar from "./TheNavBar";
import TheFooter from "./TheFooter";
import BaseSpinner from "../../components/Base/BaseSpinner";
import { mapState } from "vuex";
import BaseSpinnerContainer from "../../components/Base/BaseSpinnerContainer";
import Component from "vue-class-component";
import Vue from "vue";

@Component({
  name: "TheLayout",
  components: { BaseSpinnerContainer, BaseSpinner, TheFooter, TheNavBar },
  computed: {
    ...mapState({
      loading: state => state.spinner.loading
    })
  }
})
export default class TheLayout extends Vue {}
</script>

<style scoped></style>
