<template>
    <nav class="flex items-center justify-between flex-wrap bg-primary p-6">
        <div class="flex items-center flex-shrink-0 text-white mr-6">
            <a href="/" class="font-semibold text-3xl tracking-tight">[hnt]</a>
        </div>
        <div class="block lg:hidden">
            <button
                class="flex items-center px-3 py-2 border rounded text-white border-white hover:text-white hover:border-white"
                @click="toggleMenu"
            >
                <font-awesome-icon icon="bars"></font-awesome-icon>
            </button>
        </div>
        <div
            class="w-full block flex-grow lg:flex lg:items-center lg:justify-end lg:w-auto lg:visible"
            :class="{ hidden: !showMenu }"
        >
            <router-link
                v-for="(nav, index) in navLinks"
                :key="nav.title"
                :to="nav.href"
                class="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white"
                :class="{ 'mr-4': navLinks.length !== index }"
            >
                {{ nav.title }}
            </router-link>
            <base-drop-down-menu
                :is-open="false"
                :button-prop="{ type: 'text', text: 'Entities', color: 'transparent' }"
                :menu-items="entityMenuItems"
            ></base-drop-down-menu>
            <base-drop-down-menu
                v-if="this.isAuthenticated"
                :is-open="false"
                :button-prop="{ type: 'icon', icon: 'user' }"
                :menu-items="userMenuItems"
            ></base-drop-down-menu>
        </div>
    </nav>
</template>

<script lang="ts">
import Component from 'vue-class-component'
import { Vue } from 'vue-property-decorator'
import BaseIconButton from '@/components/Base/BaseIconButton.vue'

import { namespace } from 'vuex-class'
import BaseDropDownMenu from '@/components/Base/BaseDropDownMenu.vue'
import logger from '@/services/app-logger/app-logger.service'
import restService from '@/services/http/rest.service'

const authModule = namespace('AuthModule')

@Component({
    name: 'TheNavBar',
    components: { BaseDropDownMenu, BaseIconButton },
})
export default class TheNavBar extends Vue {
    navLinks = []
    showMenu = false
    entityMenuItems: any[] = []
    userMenuItems = [
        {
            label: 'LogOut',
            type: 'action',
            action: this.signOut,
        },
    ]

    @authModule.Getter
    private isAuthenticated: () => boolean

    @authModule.Action
    private doLogout: () => Promise<boolean>

    created() {
        if (this.isAuthenticated) {
            restService.getEntities().then(res => {
                logger.log(res)
                for (let entity of res) {
                    this.entityMenuItems.push({
                        type: 'link',
                        label: entity.charAt(0).toUpperCase() + entity.slice(1),
                        href: `/entity/${entity}`,
                    })
                }
            })
        }
    }
    toggleMenu() {
        this.showMenu = !this.showMenu
    }

    signOut() {
        this.doLogout()
            .then(() => {
                this.$router.replace('/login')
            })
            .catch(error => {
                logger.debug(error)
            })
    }
}
</script>

<style scoped></style>
