<template>
    <button
        class="font-bold py-2 px-4 w-100 rounded focus:outline-none focus:shadow-outline"
        :class="[
            { 'bg-secondary text-text-primary hover:bg-secondary-dark focus:border-secondary': color === 'secondary' },
            { 'bg-primary text-text-primary hover:bg-primary-dark focus:border-primary': color === 'primary' },
            {
                'bg-transparent text-text-primary hover:bg-background-light hover:text-primary  border-background-light':
                    color === 'transparent',
            },
            { [`cursor-not-allowed disabled:bg-${color}-light`]: disabled },
        ]"
        v-on="$listeners"
        :type="type"
        :disabled="disabled"
    >
        {{ text }}
    </button>
</template>

<script lang="ts">
import { Vue, Prop } from 'vue-property-decorator'
import Component from 'vue-class-component'

@Component
export default class BaseButton extends Vue {
    @Prop(Boolean) disabled: boolean
    @Prop(String) text: string
    @Prop(String) type: string
    @Prop(String) color: string
}
</script>

<style scoped></style>
