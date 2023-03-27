<template>
    <v-navigation-drawer v-model="drawer" fixed app :touchless="$vuetify.breakpoint.mdAndUp" width="60"
                         class="main-sidebar z-index-9">

        <template #prepend>

            <AppSideBarLogo :height="37" :width="37"/>

            <v-divider class="mx-6"/>

        </template>

        <AppSideBarNavMenu :position="['top']"/>

        <v-divider class="mx-6"/>

        <AppSideBarNavMenu :position="['top']" :group="['apps']"/>

        <template #append>

            <v-divider class="mx-6"/>

            <div class="d-flex flex-column align-center justify-center text-center my-3">

                <AppSideBarDarkMode/>

                <AppSideBarLanguage/>

            </div>

        </template>

    </v-navigation-drawer>
</template>

<script>
export default {
    name: "NavDrawer",

    data: (app)=> ({
        drawer: app.$vuetify.breakpoint.mdAndUp
    }),

    watch: {
        '$store.state.mobileMenu'(val) {
            if (val === false || val === true) {
                this.drawer = true
            }
        }
    },
}
</script>
