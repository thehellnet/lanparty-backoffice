<template>
    <div class="relative">
        <div v-if="buttonProp.type === 'icon'">
            <base-icon-button :icon="buttonProp.icon" :class="buttonProp.class || ''" @click="isOpen = !isOpen" />
        </div>
        <div v-else>
            <base-button
                :text="buttonProp.text"
                :class="buttonProp.class || ''"
                :color="buttonProp.color"
                @click="isOpen = !isOpen"
            />
        </div>
        <button
            v-if="isOpen"
            @click="isOpen = false"
            tabindex="-1"
            class="fixed inset-0 h-full w-full bg-black opacity-50 cursor-default"
        />
        <div v-if="isOpen" class="absolute right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-xl">
            <a
                v-for="menuItem in menuItems"
                :key="menuItem.label"
                @click.prevent="handleClick(menuItem)"
                href="#"
                class="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white"
                >{{ menuItem.label }}</a
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
    @Prop({ type: Array, default: [] }) menuItems: {
        label: string
        type: string
        action?: () => any
        params?: []
        href?: string
    }
    @Prop({ type: Boolean, default: false }) isOpen
    @Prop({ type: Object, default: { type: 'icon', icon: 'bars' } }) buttonProp: {
        type: string
        color: string
        text?: string
        icon?: string
        class?: string
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

    handleClick(menuItem) {
        switch (menuItem.type) {
            case 'link':
                this.$router.push({ path: menuItem.href })
                break
            case 'action':
                menuItem.action()
                break
        }
    }
    goToPage(href) {
        this.$router.push({ path: href })
    }
}
</script>

<style scoped></style>
