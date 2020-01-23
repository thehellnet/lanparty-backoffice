<template>
    <div class="v-spinner">
        <div class="v-scale v-scale1" v-bind:style="[spinnerStyle, spinnerDelay1]"></div>
        <div class="v-scale v-scale2" v-bind:style="[spinnerStyle, spinnerDelay2]"></div>
        <div class="v-scale v-scale3" v-bind:style="[spinnerStyle, spinnerDelay3]"></div>
        <div class="v-scale v-scale4" v-bind:style="[spinnerStyle, spinnerDelay4]"></div>
        <div class="v-scale v-scale5" v-bind:style="[spinnerStyle, spinnerDelay5]"></div>
    </div>
</template>

<script lang="ts">
import Component from 'vue-class-component'
import { Prop, Vue } from 'vue-property-decorator'

@Component
export default class BaseSpinner extends Vue {
    @Prop({ type: Boolean, default: true }) loading: boolean
    @Prop({ type: String, default: 'var(--color-primary)' }) color: string
    @Prop({ type: String, default: '35px' }) height: string
    @Prop({ type: String, default: '4px' }) width: string
    @Prop({ type: String, default: '2px' }) margin: string
    @Prop({ type: String, default: '2px' }) radius: string

    spinnerStyle = {
        backgroundColor: this.color,
        height: this.height,
        width: this.width,
        margin: this.margin,
        borderRadius: this.radius,
        display: 'inline-block',
        animationName: 'v-scaleStretchDelay',
        animationDuration: '1s',
        animationIterationCount: 'infinite',
        animationTimingFunction: 'cubic-bezier(.2,.68,.18,1.08)',
        animationFillMode: 'both',
    }
    spinnerDelay1 = {
        animationDelay: '0.1s',
    }
    spinnerDelay2 = {
        animationDelay: '0.2s',
    }
    spinnerDelay3 = {
        animationDelay: '0.3s',
    }
    spinnerDelay4 = {
        animationDelay: '0.4s',
    }
    spinnerDelay5 = {
        animationDelay: '0.5s',
    }
}
</script>

<style lang="scss">
@-webkit-keyframes v-scaleStretchDelay {
    0%,
    100% {
        -webkit-transform: scaleY(1);
        transform: scaleY(1);
    }
    50% {
        -webkit-transform: scaleY(0.4);
        transform: scaleY(0.4);
    }
}
@keyframes v-scaleStretchDelay {
    0%,
    100% {
        -webkit-transform: scaleY(1);
        transform: scaleY(1);
    }
    50% {
        -webkit-transform: scaleY(0.4);
        transform: scaleY(0.4);
    }
}
</style>
