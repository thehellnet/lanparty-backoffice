<template>
  <the-layout>
    <entity-table :entity="entity" @edit:entity="editEntity"></entity-table>
    <entity-form :entity="entityToEdit"
  </the-layout>
</template>

<script>
import TheLayout from "../layouts/TheLayout";
import EntityTable from "../../components/Entity/EntityTable";
import EntityForm from "../../components/Entity/EntityForm";
export default {
  name: "EntityView",
  components: { EntityForm, TheLayout, EntityTable },
  props: ["entity"]
};
</script>

<style scoped></style>
