<template>
    <div>
        <label v-if="label" class="block text-text-secondary text-sm font-bold mb-2" :for="id">
            {{ label }}
        </label>
        <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-primary mb-3 leading-tight focus:outline-none"
            :class="{
                'border-error': !!invalidMsg,
                'focus:shadow-outline': !invalidMsg,
            }"
            :id="id"
            :type="type"
            :placeholder="placeholder"
            :value="value"
            v-on="inputListeners"
        />
        <p v-if="invalidMsg" class="text-error text-xs italic">
            {{ invalidMsg }}
        </p>
    </div>
</template>

<script lang="ts">
import { Prop, Vue } from 'vue-property-decorator'
import Component from 'vue-class-component'

@Component
export default class BaseInput extends Vue {
    @Prop(String) id: string
    @Prop(String) label: string
    @Prop(String) type: string
    @Prop(String) invalidMsg: string
    @Prop(String) placeholder: string
    @Prop(String) value: string

    get inputListeners() {
        const vm = this
        return Object.assign({}, this.$listeners, {
            input: function(event) {
                vm.$emit('input', event.target.value)
            },
        })
    }
}
</script>

<style scoped></style>
