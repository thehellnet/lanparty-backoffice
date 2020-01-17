<template>
    <the-layout>
        <div class="about">
            <h1>This is an about page</h1>
        </div>
    </the-layout>
</template>
<script lang="ts">
import TheLayout from '../layouts/TheLayout'
import { Vue } from 'vue-property-decorator'
import Component from 'vue-class-component'

@Component({
    name: 'About',
    components: { TheLayout },
})
export default class About extends Vue {}
</script>
