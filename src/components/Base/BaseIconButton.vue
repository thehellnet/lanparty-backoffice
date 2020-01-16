<template>
    <button
        class="bg-transparent hover:bg-white text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        v-on="$listeners"
        :type="type"
    >
        <font-awesome-icon :icon="icon"></font-awesome-icon>
    </button>
</template>

<script>
import { Prop, Vue } from 'vue-property-decorator'
import Component from 'vue-class-component'

@Component
export default class BaseIconButton extends Vue {
    @Prop(Boolean) disabled: boolean
    @Prop(String) icon: string
    @Prop({ type: String, default: 'button' }) type: boolean
}
</script>

<style scoped></style>
