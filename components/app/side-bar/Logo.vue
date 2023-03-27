<template>
    <nuxt-link :to="$localePath('index')" :title="$byLocale(appData.meta.name)"
               class="logo d-flex align-center pa-3 primary--text" v-ripple>

        <img :src="require('@/static/icon.png')" :alt="$byLocale(appData.meta.name)" :width="height" :height="height"/>

    </nuxt-link>
</template>

<script>
export default {
    name: 'logo',
    props: {
        dark: {
            type: Boolean,
            default: false
        },
        width: {
            type: [ Number, String ],
        },
        height: {
            type: [ Number, String ],
        }
    },
    computed: {
        appData() {
            return this.$store.state.app;
        },
    }
};
</script>

<style lang="scss">
.logo {
    img {
        width: auto !important;
    }
}
</style>
