<template>
    <the-layout>
        <div class="about">
            <h1>This is an about page</h1>
        </div>
    </the-layout>
</template>
<script lang="ts">
import { Vue } from 'vue-property-decorator'
import Component from 'vue-class-component'
import TheLayout from '@/router/layouts/TheLayout.vue'

@Component({
    name: 'About',
    components: { TheLayout },
})
export default class About extends Vue {}
</script>
