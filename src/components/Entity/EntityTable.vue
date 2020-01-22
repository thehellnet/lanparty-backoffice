<template>
    <div id="entity-table">
        <p v-if="entityList.length < 1" class="empty-table">
            No entity in list
        </p>
        <table v-else class="table-auto">
            <caption>
                {{
                    entityTableConfig.title
                }}
            </caption>
            <thead>
                <tr>
                    <th
                        class="py-4 px-6 bg-background-light font-bold uppercase text-sm text-text-secondary border-b border-background-dark"
                        v-for="(value, key) in entityTableConfig.properties"
                        :key="key"
                    >
                        {{ value.title }}
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
                    <td v-for="(value, key) in entityTableConfig.properties" :key="key">
                        <div v-if="value.type === 'string' && value.format === 'uri'">
                            {{ loadRelated(entity.id, key) }}
                        </div>
                        <div v-else>
                            {{ entity[key] }}
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
import restService, { EntitySchema } from '@/services/http/rest.service'

@Component({
    components: { BaseIconButton },
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

    created() {
        logger.debug(this.entity)
        Promise.all([restService.getAll(this.entity), restService.entitySchema(this.entity)])
            .then(response => {
                this.entityList = response[0]
                this.entityTableConfig = response[1]
            })
            .catch(err => {
                logger.error(err)
            })
    }
    async loadRelated(id, related) {
        return await restService.lazyLoad(this.entity, id, related)
    }
}
</script>

<style scoped></style>
