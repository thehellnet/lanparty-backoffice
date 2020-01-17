<template>
    <the-layout>
        <login-form></login-form>
    </the-layout>
</template>

<script lang="ts">
import Component from 'vue-class-component'
import { Vue } from 'vue-property-decorator'
import TheLayout from '@/router/layouts/TheLayout.vue'
import LoginForm from '@/components/LoginForm.vue'

@Component({
    name: 'Login',
    components: { TheLayout, LoginForm },
})
export default class Login extends Vue {}
</script>

<style scoped></style>
