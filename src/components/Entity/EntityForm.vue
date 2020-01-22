<template>
    <div class="w-full max-w-xs">
        <form class="bg-background shadow-md rounded px-8 pt-6 pb-8 mb-4" @submit.prevent="handleSubmit">
            <div v-for="configField in entityTableConfig.fields" :key="configField.name">
                <div v-if="configField.type === 'list'"></div>
                <base-input
                    v-else
                    :id="configField.name"
                    :label="configField.label"
                    :type="configField.type"
                    :invalid-msg="
                        error && (configField.required ? this.requiredField(configField.name) : false) && submitting
                            ? 'Email is required'
                            : ''
                    "
                    v-model="entity[configField.name]"
                >
                </base-input>
            </div>
        </form>
    </div>
</template>

<script lang="ts">
import { Prop, Vue } from 'vue-property-decorator'
import Component from 'vue-class-component'
import logger from '@/services/app-logger/app-logger.service'
@Component
export default class EntityForm extends Vue {
    @Prop(String) entityName: string
    @Prop(Object) entity: any

    item = this.entity
    error = false
    submitting = false
    success = false
    entityTableConfig = {
        type: Object,
    }

    created() {
        logger.debug(this.entity)
    }

    handleSubmit() {}

    requiredField(field: string) {
        return this.entity[field] === ''
    }
}
</script>

<style scoped></style>
