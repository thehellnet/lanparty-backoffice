<template>
    <the-layout>
        <div class="flex justify-center">
            <confirm-form :token="token"></confirm-form>
        </div>
    </the-layout>
</template>

<script lang="ts">
import Component from 'vue-class-component'
import { Prop, Vue } from 'vue-property-decorator'
import TheLayout from '@/router/layouts/TheLayout.vue'
import ConfirmForm from '@/components/ConfirmForm.vue'

@Component({
    name: 'Confirm',
    components: { ConfirmForm, TheLayout },
})
export default class Confirm extends Vue {
    @Prop(String) token: string

}
</script>

<style scoped></style>
