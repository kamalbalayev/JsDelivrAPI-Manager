<template>
    <div class="d-flex flex-column">

        <v-card tile flat color="lighten" class="px-4 pt-7 clearfix">
            <v-row justify="space-between">

                <v-col cols="12" md="7">
                    <SectionTitle :title="$t('Popular packages')"/>
                </v-col>

                <v-col cols="12" md="4">
                    <div class="d-flex">
                        <v-text-field v-model="value" outlined rounded dense clearable
                                      :clear-icon="mdiClose" :append-icon="mdiMagnify"
                                      :placeholder="$t('Search _', {n: $t('Package')})"/>
                    </div>
                </v-col>

            </v-row>
        </v-card>

        <v-divider/>

        <PackagesDataTable :headers="headers" :data="packages" @see-details="seeDetails($event)"/>

        <PackagesDataDetails :toggle="detailsDialog" :data="selected" @close="detailsDialog = false"/>


    </div>
</template>

<script>

import {mdiMagnify, mdiClose} from '@mdi/js'

export default {
    name: "PackagesWrapper",

    props: {
        component: Object
    },

    data: ()=> ({
        value: "",
        selected: null,
        detailsDialog: false,
        mdiMagnify,
        mdiClose
    }),

    async fetch(){
        await this.getPackages()
    },

    computed:{

        headers(){
            return [
                { text: this.$t('Name'), value: 'name', sortable: false },
                { text: this.$t('Type'), value: 'type', sortable: false },
                { text: this.$t('Hits'), value: 'hits', sortable: false },
                { text: this.$t('Details'), value: 'details', sortable: false, width: 10, align: 'center' },
            ]
        },

        packages(){
            const value = this.value?.trim()
            if(!value){
                return this.$store.state.data.packages
            }
            return this.$store.state.data.packages.filter(item => item.name.includes(value.toLowerCase()))
        }

    },

    methods:{

        async getPackages(query){
            await this.$fetchData({
                store: 'data',
                api: 'api/packages',
                key: 'packages',
                force: true,
                query,
            })
        },

        seeDetails(selected){
            this.selected = selected
            this.detailsDialog = true
        },
    }
}
</script>
