<template>
    <the-layout>
        <entity-table :entity="entity" @edit:entity="editEntity"></entity-table>
        <entity-form :entity="entityToEdit"></entity-form>
    </the-layout>
</template>

<script>
import TheLayout from '../layouts/TheLayout'
import EntityTable from '../../components/Entity/EntityTable'
import EntityForm from '../../components/Entity/EntityForm'
import Component from 'vue-class-component'
import { Prop, Vue } from 'vue-property-decorator'

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
