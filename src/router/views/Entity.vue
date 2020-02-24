<template>
    <the-layout>
        <entity-table :entity="entity"></entity-table>
        <!--        <entity-form :entity="entityToEdit"></entity-form>-->
    </the-layout>
</template>

<script lang="ts">
import Component from 'vue-class-component'
import { Prop, Vue } from 'vue-property-decorator'
import EntityForm from '@/components/Entity/EntityForm.vue'
import TheLayout from '@/router/layouts/TheLayout.vue'
import EntityTable from '@/components/Entity/EntityTable.vue'

@Component({
    name: 'Entity',
    components: { EntityForm, TheLayout, EntityTable },
})
export default class Entity extends Vue {
    @Prop(String) entity: string
    @Prop(String) editEntity: string
    @Prop(String) entityToEdit: string
}
</script>

<style scoped></style>
