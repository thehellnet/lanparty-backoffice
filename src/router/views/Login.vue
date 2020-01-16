<template>
  <the-layout>
    <login-form></login-form>
  </the-layout>
</template>

<script>
import TheLayout from "../layouts/TheLayout";
import LoginForm from "../../components/LoginForm";

export default {
  name: "Login",
  components: { TheLayout, LoginForm }
};
</script>

<style scoped></style>
