<template>
    <div id="app">
        <router-view :key="$router.fullPath" />
    </div>
</template>

<style lang="scss">
@import 'style/global';
</style>
