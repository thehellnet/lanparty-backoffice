<template>
    <div class="theme-default bg-background-light flex flex-col min-h-screen " id="app-container">
        <the-nav-bar></the-nav-bar>
        <div id="main-container" class="container flex-grow flex justify-center items-center">
            <slot />
        </div>
        <the-footer></the-footer>
        <base-spinner-container :loading="this.loading">
            <base-spinner></base-spinner>
        </base-spinner-container>
    </div>
</template>

<script lang="ts">
import { mapState } from 'vuex'
import Component from 'vue-class-component'
import { Vue } from 'vue-property-decorator'
import BaseSpinnerContainer from '@/components/Base/BaseSpinnerContainer.vue'
import BaseSpinner from '@/components/Base/BaseSpinner.vue'
import TheFooter from '@/router/layouts/TheFooter.vue'
import TheNavBar from '@/router/layouts/TheNavBar.vue'
import { namespace } from 'vuex-class'

const spinnerModule = namespace('SpinnerModule')
@Component({
    name: 'TheLayout',
    components: { BaseSpinnerContainer, BaseSpinner, TheFooter, TheNavBar },
})
export default class TheLayout extends Vue {
    @spinnerModule.State
    private loading
}
</script>

<style scoped></style>
