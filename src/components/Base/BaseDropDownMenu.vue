<template>
    <div class="relative">
        <div v-if="buttonProp.type === 'icon'">
            <base-icon-button :icon="buttonProp.icon" @click="isOpen = !isOpen"></base-icon-button>
        </div>
        <div v-else>
            <base-button :text="buttonProp.text"></base-button>
        </div>
        <button
            v-if="isOpen"
            @click="isOpen = false"
            tabindex="-1"
            class="fixed inset-0 h-full w-full bg-black opacity-50 cursor-default"
        ></button>
        <div v-if="isOpen" class="absolute right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-xl">
            <a
                v-for="menuItem in menuItems"
                :key="menuItem.title"
                @click="menuItem.action()"
                href="#"
                class="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white"
                >{{ menuItem.title }}</a
            >
        </div>
    </div>
</template>

<script lang="ts">
import { Prop, Vue } from 'vue-property-decorator'
import Component from 'vue-class-component'
import BaseButton from '@/components/Base/BaseButton.vue'
import BaseIconButton from '@/components/Base/BaseIconButton.vue'

@Component({
    name: 'BaseDropDownMenu',
    components: { BaseIconButton, BaseButton },
})
export default class BaseDropDownMenu extends Vue {
    @Prop({ type: Array, default: [] }) menuItems
    @Prop({ type: Boolean, default: false }) isOpen
    @Prop({ type: Object, default: { type: 'icon', icon: 'bars' } }) buttonProp: {
        type: string
        text?: string
        icon?: string
    }

    created() {
        const handleEscape = e => {
            if (e.key === 'Esc' || e.key === 'Escape') {
                this.isOpen = false
            }
        }
        document.addEventListener('keydown', handleEscape)
        this.$once('hook:beforeDestroy', () => {
            document.removeEventListener('keydown', handleEscape)
        })
    }
}
</script>

<style scoped></style>
