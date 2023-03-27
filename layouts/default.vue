<template>
    <v-app :dark="$dark()">

        <AppSideBarDrawer/>

        <Nuxt/>

    </v-app>
</template>

<script>

import head from '@/plugins/meta-data';

export default {

    head,

    created() {
        this.$vuetify.theme.dark = !!this.$storage.getCookie( 'darkMode' );
    },
};
</script>

<style lang="scss">
@import "assets/global";
</style>
