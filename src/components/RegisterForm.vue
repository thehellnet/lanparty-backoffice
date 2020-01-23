<template>
    <div class="w-full max-w-xs">
        <form class="bg-background shadow-md rounded px-8 pt-6 pb-8 mb-4" @submit.prevent="handleSubmit">
            <base-input
                :id="'email'"
                :label="'Email'"
                :placeholder="'mario.rossi@email.it'"
                :type="'text'"
                :invalid-msg="error && submitting && this.invalidEmail ? 'Email is required' : ''"
                v-model="user.email"
                @focus="clearStatus"
                @keypress="clearStatus"
            />
            <base-input
                :id="'password'"
                :label="'Password'"
                :placeholder="'********'"
                :type="'password'"
                :invalid-msg="error && submitting && this.invalidPassword ? 'Password is required' : ''"
                v-model="user.password"
                @focus="clearStatus"
                @keypress="clearStatus"
            />
            <base-input
                :id="'name'"
                :label="'Name'"
                :placeholder="'Mario Rossi'"
                :type="'text'"
                :invalid-msg="error && submitting && this.invalidName ? 'Name is required' : ''"
                v-model="user.name"
                @focus="clearStatus"
                @keypress="clearStatus"
            />
            <base-input
                :id="'nickname'"
                :label="'Nickname'"
                :placeholder="'n1cKn4m3'"
                :type="'text'"
                :invalid-msg="error && submitting && this.invalidNickname ? 'Nickname is required' : ''"
                v-model="user.nickname"
                @focus="clearStatus"
                @keypress="clearStatus"
            />
            <base-button :text="'SignUp'" :type="'submit'" />
        </form>
    </div>
</template>

<script lang="ts">
import logger from '../services/app-logger/app-logger.service'
import { Vue } from 'vue-property-decorator'
import Component from 'vue-class-component'
import BaseInput from '@/components/Base/BaseInput.vue'
import BaseButton from '@/components/Base/BaseButton.vue'
import authService from '@/services/auth/auth.service'

@Component({ components: { BaseButton, BaseInput } })
export default class RegisterForm extends Vue {
    error = false
    submitting = false
    success = false
    user = {
        email: '',
        password: '',
        name: '',
        nickname: '',
    }

    handleSubmit() {
        this.submitting = true
        this.clearStatus()

        if (this.invalidEmail || this.invalidPassword || this.invalidName || this.invalidNickname) {
            this.error = true
            return
        }

        authService
            .register(this.user)
            .then(() => {
                this.$router.replace('/')
            })
            .catch(error => {
                logger.debug(error)
            })
            .finally(() => {
                this.submitting = false
            })
    }
    clearStatus() {
        this.success = false
        this.error = false
    }
    get invalidEmail() {
        return this.user.email === ''
    }

    get invalidPassword() {
        return this.user.password === ''
    }

    get invalidName() {
        return this.user.name === ''
    }

    get invalidNickname() {
        return this.user.nickname === ''
    }
}
</script>

<style>
div.divider {
    width: 1px;
    align-self: stretch;
    margin: 100px 0;
    background-image: linear-gradient(to top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));
}
</style>
