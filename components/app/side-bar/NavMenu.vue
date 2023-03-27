<template>
    <nav class="d-flex flex-column align-center pt-3 text-center"
         :class="{'flex-fill overflow-auto': positionIs('top') && groupIs('apps')}">
        <div class="mx-auto">
            <v-tooltip right v-for="(section, i) in $navMenusByParent({group, position})"
                       :key="`section-${i}`" v-if="hasPermission(section)">

                <template #activator="{ on, attrs }">
                    <v-hover v-slot="{hover}">
                        <v-btn width="40" height="40" min-width="auto" icon :depressed="$routeIs(section.route.path)"
                               :color="$routeIs(section.route.path) && $dark() ? 'lighten--text' : ''"
                               :active-class="$dark() ? 'primary' : 'v-btn--active primary--text elevation-16'"
                               class="pa-4 mb-3" :aria-label="section.name" v-bind="attrs" v-on="on"
                               :class="[
                                   {'elevation-16': hover},
                                   {'rounded-lg': positionIs('top')}
                               ]"
                               :to="$localePath(section.route.path)" :exact="section.route.path === 'index'">

                            <Icon :name="section.menu.icon" size="22" :color="$dark() ? 'white' : 'primary'"/>

                        </v-btn>
                    </v-hover>
                </template>

                {{ section.name }}

            </v-tooltip>
        </div>
    </nav>
</template>

<script>
export default {
    name: 'SideBarNavMenu',
    props: {
        group: Array,
        position: Array,
    },
    methods: {

        positionIs( position ) {
            return this.position.includes( position );
        },

        groupIs( group ) {
            return this.group && this.group.includes( group );
        },

        hasPermission( section ) {
            return section.module.name === 'general'
        }

    }
};
</script>

<style lang="scss">
.main-sidebar {
    .v-navigation-drawer {
        &__content {
            display: flex;
            flex-direction: column;
        }
    }
}
</style>
