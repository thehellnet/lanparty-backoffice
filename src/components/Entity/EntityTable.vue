<template>
    <div id="entity-table">
        <p v-if="entityList.length < 1" class="empty-table">
            No entity in list
        </p>
        <table v-else class="table-auto">
            <caption>
                {{
                    entityTableConfig.label
                }}
            </caption>
            <thead>
                <tr>
                    <th
                        class="py-4 px-6 bg-background-light font-bold uppercase text-sm text-text-secondary border-b border-background-dark"
                        v-for="configField in entityTableConfig.fields"
                        :key="configField.name"
                    >
                        {{ configField.name }}
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
                    <td v-for="configField in entityTableConfig.fields" :key="configField.name">
                        <div v-if="configField.type === 'list'">
                            {{ entity[configField.name] | printArray }}
                        </div>
                        <div v-else>
                            {{ entity[configField.name] }}
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

<script>
import logger from '../../services/app-logger/app-logger.service'
import { entityService } from '../../services/entity.service'
import BaseIconButton from '../Base/BaseIconButton'
import { Prop, Vue } from 'vue-property-decorator'
import Component from 'vue-class-component'

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
    entityList = { type: Object, default: [] }
    entityTableConfig = { type: Object, default: {} }
    entityService = entityService[this.entity]

    created() {
        logger.debug(this.entity)
        Promise.all([this.entityService.getAll(), this.entityService.config()])
            .then(response => {
                this.entityList = response[0].data
                this.entityTableConfig = response[1].data
            })
            .catch(err => {
                logger.error(err)
            })
    }
}
</script>

<style scoped></style>
