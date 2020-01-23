<template>
    <div id="entity-table">
        <p v-if="entityList.length < 1" class="empty-table">
            No entity in list
        </p>
        <table v-else class="table-auto">
            <caption class="text-2xl">
                {{
                    entityTableConfig.title
                }}
            </caption>
            <thead>
                <tr>
                    <th
                        class="py-4 px-6 bg-background-light font-bold uppercase text-sm text-text-secondary border-b border-background-dark"
                        v-for="field in entityFields"
                        :key="field.name"
                    >
                        {{ field.title }}
                    </th>
                    <th
                        class="py-4 px-6 bg-background-light font-bold uppercase text-sm text-text-secondary border-b border-background-dark"
                    >
                        Actions
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr
                    :class="{
                        'bg-background-variant': index % 2 == 0,
                        'bg-background': index % 2 == 1,
                    }"
                    v-for="(entity, index) in entityList"
                    :key="entity.id"
                >
                    <td class="text-center" v-for="field in entityFields" :key="field.name">
                        <div v-if="!entity[field.name] && field.type.match(/(One|Many)To(One|Many)/)">
                            <base-button
                                class="bg-primary-light"
                                @click="loadRelated(entity, field.name)"
                                :text="'Show'"
                            ></base-button>
                        </div>
                        <div v-else>
                            {{ entity[field.name] }}
                        </div>
                    </td>
                    <td class="text-center">
                        <base-icon-button :icon="'edit'" class="text-text-secondary"></base-icon-button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script lang="ts">
import logger from '../../services/app-logger/app-logger.service'
import { Prop, Vue } from 'vue-property-decorator'
import Component from 'vue-class-component'
import BaseIconButton from '@/components/Base/BaseIconButton.vue'
import restService, { EntitySchema, FieldSchema } from '@/services/http/rest.service'
import BaseButton from '@/components/Base/BaseButton.vue'

@Component({
    components: { BaseButton, BaseIconButton },
    filters: {
        printArray(array) {
            if (!array) return ''
            let result = ''
            const separator = ' - '
            for (let item of array) {
                result += item + separator
            }
            return result.replace(new RegExp(separator + '$'), '')
        },
    },
})
export default class EntityTable extends Vue {
    @Prop(String) entity: string
    private entityList = []
    private related: any = {}
    private entityTableConfig: EntitySchema
    private entityFields: FieldSchema[]

    created() {
        logger.debug(this.entity)
        Promise.all([restService.getAll(this.entity), restService.entityConfig(this.entity)])
            .then(response => {
                this.entityList = response[0]
                this.entityTableConfig = response[1]
                this.entityFields = this.entityTableConfig.fields.filter(value => !value.hidden)
            })
            .catch(err => {
                logger.error(err)
            })
    }
    async loadRelated(entity, related) {
        return await restService.lazyLoad(this.entity, entity.id, related).then(response => {
            const relatedEntities = response.data._embedded[related].map(obj => obj.friendlyName)
            this.$set(entity, related, relatedEntities)
        })
    }
}
</script>

<style scoped></style>
