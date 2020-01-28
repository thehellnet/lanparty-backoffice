<template>
    <div class="w-full max-w-xs">
        <h1 class="text-2xl mb-6 text-center">Confirm</h1>
        <div class="bg-background border-secondary border-t-12 rounded-lg shadow-lg px-8 pt-6 pb-8 mb-6">
            <form @submit.prevent="handleSubmit">
                <base-input
                    :id="'confirmToken'"
                    :label="'Confirm token'"
                    :placeholder="'abcd1234'"
                    :type="'text'"
                    :invalid-msg="
                        error && submitting && this.validateAndParseConfirmToken() ? 'Confirm token is required' : ''
                    "
                    v-model="confirmToken"
                    @focus="clearStatus"
                    @keypress="clearStatus"
                />
                <base-button class="w-full" :text="'Confirm'" :type="'submit'" :color="'secondary'"/>
            </form>
        </div>
    </div>
</template>

<script lang="ts">
import Component from 'vue-class-component'
import { Prop, Vue } from 'vue-property-decorator'
import BaseButton from '@/components/Base/BaseButton.vue'
import BaseInput from '@/components/Base/BaseInput.vue'
import logger from '@/services/app-logger/app-logger.service'
import { namespace } from 'vuex-class'
import { MailUtility } from '@/utility/mail.utility'
import authService from '@/services/auth/auth.service'

const authModule = namespace('AuthModule')

@Component({ components: { BaseButton, BaseInput } })
export default class ConfirmForm extends Vue {
    @Prop(String) token: string

    confirmToken: string = ''
    submitting: boolean = false
    error: boolean = false
    success: boolean = false

    private email: string
    private confirmCode: string

    @authModule.Action
    private doConfirm: ({ email, confirmCode }) => Promise<boolean>

    created() {
        this.confirmToken = this.token || ''

        if (this.confirmToken !== '') {
            this.handleSubmit()
        }
    }

    handleSubmit() {
        this.submitting = true
        this.clearStatus()

        if (!this.validateAndParseConfirmToken()) {
            this.error = true
            return
        }

        authService
            .doConfirm(this.email, this.confirmToken)
            .then(() => {
                alert('Activated')
            })
            .catch(error => {
                logger.debug(error)
            })
            .finally(() => {
                this.submitting = false
            })
    }

    clearStatus(): void {
        this.success = false
        this.error = false
    }

    validateAndParseConfirmToken(): boolean {
        if (this.confirmToken === '' || this.confirmToken.trim() === '') {
            return false
        }

        try {
            const decodedToken = atob(this.confirmToken)
            const encoded = btoa(decodedToken)

            if (encoded !== this.confirmToken) {
                return false
            }

            if (!decodedToken.includes('|')) {
                return false
            }

            const items = decodedToken.split('|')
            this.email = items[0]
            this.confirmCode = items[1]

            if (!MailUtility.validateAddress(this.email)) {
                return false
            }

            if (this.confirmCode.length != 64) {
                return false
            }
        } catch (err) {
            return false
        }

        return true
    }
}
</script>

<style scoped></style>
