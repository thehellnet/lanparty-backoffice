<template>
    <div id="entity-table" class="self-start">
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
                    <template v-for="field in entityTableConfig.fields">
                        <th
                            v-if="!field.hidden"
                            class="py-4 px-6 bg-background-light font-bold uppercase text-sm text-text-secondary border-b border-background-dark"
                            :key="field.name"
                        >
                            {{ field.title }}
                        </th>
                    </template>
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
                    <template v-for="field in entityTableConfig.fields">
                        <td v-if="!field.hidden" class="text-center" :key="field.name">
                            <div v-if="field.type.match(/(One|Many)To(One|Many)/)">
                                <base-button
                                    :color="'primary'"
                                    @click="toggleRelated(entity, field.name)"
                                    :text="!!entity[field.name] ? 'Hide' : 'Show'"
                                ></base-button>
                                <data v-if="entity[field.name]" v-html="entity[field.name]"></data>
                            </div>
                            <div v-else>
                                {{ entity[field.name] }}
                            </div>
                        </td>
                    </template>
                    <td class="text-center">
                        <base-icon-button :icon="'edit'" class="text-text-secondary"></base-icon-button>
                    </td>
                </tr>
            </tbody>
            <tfoot class=" bg-background-light font-bold text-sm text-text-secondary border-t border-background-dark">
                <tr>
                    <td colspan="100%">
                        <div class="flex justify-center align-center py-4 px-6">
                            <base-button
                                v-for="index in entityTablePages.totalPages"
                                :key="index"
                                @click="setTableData(entity, { page: index - 1, size: entityTablePages.size })"
                                :text="index"
                                :color="`${index == entityTablePages.number + 1 ? 'secondary' : 'primary'}`"
                                :class="'mx-2'"
                            >
                                {{ index }}
                            </base-button>
                        </div>
                    </td>
                </tr>
            </tfoot>
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
})
export default class EntityTable extends Vue {
    @Prop(String) entity: string
    private entityList = []
    private entityTablePages = {}
    private entityTableConfig: EntitySchema

    async created() {
        this.entityTableConfig = await restService.entityConfig(this.entity)
        await this.setTableData(this.entity, { size: 10 })
    }
    async toggleRelated(entity, related) {
        if (!entity[related]) {
            await restService.lazyLoad(this.entity, entity.id, related).then(response => {
                const relatedEntities = response.data._embedded[related].map(obj => obj.friendlyName)
                this.$set(entity, related, this.arrayToHtmlList(relatedEntities))
            })
        } else {
            this.$set(entity, related, '')
        }
    }

    async setTableData(entity, params?) {
        const data = await restService.getAll(this.entity, params)
        this.entityTablePages = data.page
        this.entityList = data[`${this.entity}`]
    }

    arrayToHtmlList(array) {
        if (!array || array.length === 0) return ''
        let result = '<ul class="list-none text-left">'
        for (let item of array) {
            result += `<li>${item}</li>`
        }
        return (result += '</ul>')
    }
}
</script>

<style scoped></style>
