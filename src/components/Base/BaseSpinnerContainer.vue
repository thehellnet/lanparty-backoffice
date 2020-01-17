<template>
    <div class="v-spinner-bg" v-show="loading">
        <div class="v-spinner-container" :style="spinnerPosition">
            <slot />
        </div>
    </div>
</template>

<script lang="ts">
import { Prop, Vue } from 'vue-property-decorator'
import Component from 'vue-class-component'

@Component
export default class BaseSpinnerContainer extends Vue {
    @Prop({ type: Boolean, default: true }) loading: boolean
    @Prop({ type: String, default: '40px' }) width: string
    @Prop({ type: String, default: '40px' }) height: string
    spinnerPosition = {
        top: `calc(50% - (${this.height} / 2))`,
        left: `calc(50% - (${this.width} / 2))`,
    }
}
</script>

<style lang="scss">
.v-spinner-bg {
    position: fixed;
    width: 100%;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(255, 255, 255, 0.7);
    z-index: 10;
    & > .v-spinner-container {
        position: absolute;
        display: flex;
        justify-content: center;
        align-content: center;
    }
}
</style>
