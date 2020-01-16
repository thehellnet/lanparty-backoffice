<template>
    <button
        class="bg-secondary hover:bg-secondary-dark disabled:bg-secondary-light text-text-primary font-bold py-2 px-4 rounded focus:border-secondary focus:outline-none focus:shadow-outline"
        :class="[
            { 'cursor-not-allowed': disabled },
            { 'bg-button-disabled': disabled },
            { 'hover:bg-button-hover': !disabled },
            { 'bg-secondary': !disabled },
        ]"
        v-on="$listeners"
        :type="type"
    >
        {{ text }}
    </button>
</template>

<script>
import { Vue, Prop } from 'vue-property-decorator'
import Component from 'vue-class-component'

@Component
export default class BaseButton extends Vue {
    @Prop(Boolean) disabled: boolean
    @Prop(String) text: string
    @Prop(String) type: boolean
}
</script>

<style scoped></style>
