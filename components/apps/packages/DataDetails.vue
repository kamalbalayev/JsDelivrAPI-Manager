<template>
    <v-dialog v-model="dialog" width="650" :fullscreen="$vuetify.breakpoint.smAndDown">
        <v-card>

            <div class="d-flex align-center pr-3">

                <v-card-title class="flex-fill">
                    <Icon name="mdiInformationOutline" class="mr-4"/>
                    {{ $t('Details') }}
                </v-card-title>

                <v-btn icon @click="dialog = false">
                    <Icon name="mdiClose"/>
                </v-btn>

            </div>

            <v-divider/>

            <v-simple-table v-if="details">
                <template #default>
                    <tbody>
                    <tr>
                        <th class="text-left">
                            {{ $t('Name') }}:
                        </th>
                        <td class="text-left">
                            <div class="d-flex justify-space-between align-center">

                                <span class="fill-width" v-text="details.name"/>

                                <v-btn :href="link" target="_blank" rel="noopener noreferrer" depressed rounded small>
                                    {{ $t('Go to package') }}
                                </v-btn>

                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th class="text-left">
                            {{ $t('Type') }}:
                        </th>
                        <td class="text-left">
                            <div class="d-flex align-center">
                                <Icon :name="details.type === 'gh' ? 'mdiGithub' : 'mdiNpm'" left/>
                                {{ details.type === 'gh' ? 'Github' : 'NPM' }}
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th class="text-left align-v-top pt-4">
                            {{ $t('Versions') }}:
                        </th>
                        <td class="text-left pa-0 fill-width">
                            <v-card tile flat :max-height="300" class="overflow-auto pb-3 pt-1 pl-3 min-h-100">
                                <template v-for="(item, i) in details.versions">
                                    <v-chip small color="lighten" rounded depressed :key="`version-${i}`" class="mt-2 mr-2">
                                        {{ item.version }}
                                    </v-chip>
                                </template>
                            </v-card>
                        </td>
                    </tr>
                    </tbody>
                </template>
            </v-simple-table>

            <div class="py-6" v-else>
                <Icon name="mdiBlock" size="80"/>
            </div>

        </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: "DataDetails",
    props:{
        toggle: Boolean,
        data: Object
    },

    data:()=> ({
        dialog: false,
    }),


    computed:{
        details(){
            return this.$store.state.data.details
        },

        link(){
            return `https://${this.details.type === 'gh' ? 'github.com' : 'www.npmjs.com/package'}/${this.details.name}`
        },
    },

    watch:{

        toggle(val){
            if(val) {
                this.dialog = true
                this.$fetchData({
                    store: 'data',
                    api: `api/packages?q=${this.data.name}&type=${this.data.type}`,
                    key: 'details',
                    force: true,
                })
            }
        },

        dialog(val){
            !val && this.$emit('close')
        }

    },
}
</script>
