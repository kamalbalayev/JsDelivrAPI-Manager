<template>
    <v-tooltip right>
        <template #activator="{ on, attrs }">
            <v-btn icon width="40" height="40" v-bind="attrs" v-on="on"
                   active-class="primary white--text"
                   :title="$dark() ? $t('Light mode') : $t('Dark mode')" @click="setDarkMode">

                <Icon :name="$dark() ? 'mdiWhiteBalanceSunny' : 'mdiWeatherNight'" size="22" :color="$dark() ? '' : 'primary'"/>

            </v-btn>
        </template>
        {{ $dark() ? $t('Light mode') : $t('Dark mode') }}
    </v-tooltip>
</template>

<script>

export default {
    name: "darkMode",
    props: {header: Boolean},
    methods:{
        setDarkMode(){
            this.$storage.setCookie('darkMode', !this.$dark(), {maxAge: 3600 * 24 * 365})
            this.$vuetify.theme.dark = !this.$dark()
        }
    }
}
</script>
