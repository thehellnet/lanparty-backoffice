<template>
    <the-layout>
        <login-form></login-form>
    </the-layout>
</template>

<script lang="ts">
import TheLayout from '../layouts/TheLayout'
import LoginForm from '../../components/LoginForm'
import Component from 'vue-class-component'
import { Vue } from 'vue-property-decorator'

@Component({
    name: 'Login',
    components: { TheLayout, LoginForm },
})
export default class Login extends Vue {}
</script>

<style scoped></style>
