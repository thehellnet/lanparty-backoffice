<template>
    <the-layout>
        <img alt="Vue logo" src="../../assets/logo.png" />
    </the-layout>
</template>

<script>
import TheLayout from '../layouts/TheLayout'
import Component from 'vue-class-component'
import { Vue } from 'vue-property-decorator'

@Component({
    name: 'Home',
    components: { TheLayout },
})
export default class Home extends Vue {}
</script>
