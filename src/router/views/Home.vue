<template>
    <the-layout>
        <img alt="Vue logo" src="../../assets/logo.png" />
    </the-layout>
</template>

<script lang="ts">
import Component from 'vue-class-component'
import { Vue } from 'vue-property-decorator'
import TheLayout from '@/router/layouts/TheLayout.vue'

@Component({
    name: 'Home',
    components: { TheLayout },
})
export default class Home extends Vue {}
</script>
