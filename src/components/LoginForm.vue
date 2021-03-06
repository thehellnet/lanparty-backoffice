<template>
    <div class="w-full max-w-xs">
        <h1 class="text-2xl mb-6 text-center">LogIn</h1>
        <div class="bg-background border-secondary border-t-12 rounded-lg shadow-lg px-8 pt-6 pb-8 mb-6">
            <form @submit.prevent="handleSubmit">
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
                <base-button class="w-full" :text="'LogIn'" :type="'submit'" />
                <div class="mt-4">
                    <a href="#" class="text-primary text-xs">Forgot your password?</a>
                </div>
            </form>
        </div>
    </div>
</template>

<script lang="ts">
import logger from '../services/app-logger/app-logger.service'
import { Vue } from 'vue-property-decorator'
import Component from 'vue-class-component'
import BaseInput from '@/components/Base/BaseInput.vue'
import BaseButton from '@/components/Base/BaseButton.vue'
import { namespace } from 'vuex-class'

const authModule = namespace('AuthModule')

@Component({ components: { BaseButton, BaseInput } })
export default class LoginForm extends Vue {
    error = false
    submitting = false
    success = false
    user = {
        email: '',
        password: '',
    }

    @authModule.Action
    private doLogin: (user: any) => Promise<boolean>

    handleSubmit() {
        this.submitting = true
        this.clearStatus()

        if (this.invalidEmail || this.invalidPassword) {
            this.error = true
            return
        }

        this.doLogin(this.user)
            .then(() => {
                this.$router.replace('/')
            })
            .catch(error => {
                logger.debug(error)
            })
        this.submitting = false
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
}
</script>

<style scoped></style>
