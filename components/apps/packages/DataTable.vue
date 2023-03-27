<template>
    <v-data-table :headers="headers" :items="table.data" :options.sync="table.options" class="fill-height"
                  :footer-props="table.footerProps" :items-per-page="table.options.itemsPerPage" fixed-header
                  :mobile-breakpoint="0" :height="`calc(100vh - ${$vuetify.breakpoint.mdAndUp ? 154 : 204}px)`">

        <template #item.details="{item}">
            <v-btn fab x-small dark depressed color="primary" @click="$emit('see-details', {name: item.name, type: item.type})">
                <Icon name="mdiEye" small/>
            </v-btn>
        </template>

    </v-data-table>
</template>

<script>

import table from '@/mixins/table'

export default {
    name: "PackagesWrapper",

    mixins: [ table ],
}
</script>
