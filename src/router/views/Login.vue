<template>
    <the-layout>
        <div class="flex w-1/2 justify-center">
            <login-form></login-form>
        </div>
        <div class="divider"></div>
        <div class="flex w-1/2 justify-center">
            <register-form></register-form>
        </div>
    </the-layout>
</template>

<script lang="ts">
import Component from 'vue-class-component'
import { Vue } from 'vue-property-decorator'
import TheLayout from '@/router/layouts/TheLayout.vue'
import LoginForm from '@/components/LoginForm.vue'
import RegisterForm from '@/components/RegisterForm.vue'

@Component({
    name: 'Login',
    components: { RegisterForm, TheLayout, LoginForm },
})
export default class Login extends Vue {}
</script>

<style scoped></style>
