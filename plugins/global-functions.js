import Vue from 'vue';
import allPages from '../structure/pages';

global.structuredClone = (val) => JSON.parse(JSON.stringify(val));

Vue.prototype.$localePath = function (routeOpt) {
    return this.localePath(routeOpt, this.$i18n.locale);
};

Vue.prototype.$routeName = function () {
    return this.$route.name?.split('___')[0];
};

Vue.prototype.$routeIs = function (route) {
    return this.$routeName() === route;
};

Vue.prototype.$navMenuById = function (id) {

    const menu = allPages.find(page => page._id === id);

    if(menu){

        const { _id, config, header } = menu
        const { module, route } = config

        return {
            id: _id,
            name: this.$byLocale(menu.name),
            menu: header.menu,
            group: route.group,
            module
        }
    }
};

Vue.prototype.$navMenusByParent = function (options = {}) {

    const id = options.id || null, group = options.group || [ 'general' ], position = options.position || [ 'top' ];

    return allPages.filter(page => page.header.menu.display
        && (page.config.route.parent ? page.config.route.parent?._id === id : page.config.route.parent === id)
        && group.includes(page.config.route.group)
        && position.includes(page.header.menu.position)
        && (page.config.module.name === 'general')
    ).map(page => {
        return {
            id: page._id,
            name: this.$byLocale(page.name),
            menu: page.header.menu,
            route: page.config.route,
            module: page.config.module
        }
    });
};

Vue.prototype.$replacePath = function (routeOpt) {
    return this.$router.replace(routeOpt).catch(() => {
    });
};

Vue.prototype.$pushQuery = async function (query, val) {
    if (this.$route.query[query] && (val === '' || val === null || Array.isArray(val) && val.length === 0)) {
        await this.$deleteQuery(query);
    } else {
        await this.$router.push({ query: { ...this.$route.query, [query]: val } });
    }
};

Vue.prototype.$deleteQuery = async function (query) {
    const routeQuery = Object.assign({}, this.$route.query);
    delete routeQuery[query];
    await this.$replacePath({ query: routeQuery });
};

Vue.prototype.$fetchData = function ({ store, api, query, key, force, push }) {

    const params = {
        store: store || 'index',
        api: api || '',
        query: query || {},
        key: key || api,
        force: force || false,
        push: push || false,
        returnData: !store && !key
    };

    return new Promise(async (resolve) => {

        let target = store ? this.$store.state[store][params.key] : this.$store.state[params.key];

        if (!target && store) {
            const state = `${ params.store === 'index' ? '' : params.store + '/' }SET_STATE_KEY`
            await this.$store.commit(state, { key: params.key, data: this });
        }

        if (params.force) {

            const data = await this.$store.dispatch('GET_DATA', params);
            resolve(data);

        } else {
            if (!target || target && (Array.isArray(target) && target.length === 0)) {
                const data = await this.$store.dispatch('GET_DATA', params);
                resolve(data);
            }
        }

    });

};

Vue.prototype.$errorMessages = function (field, target = null) {
    let errors = [];
    if (!field.$dirty) return errors;

    Object.entries(field.$params).forEach(([ key, val ]) => {
        if (!field[key]) {
            const secondVal = Object.entries(val)[1];

            if (secondVal && secondVal[1]) {

                if (val.type === 'sameAs') {
                    errors.push(this.$t(`sameAsField`, { n: this.$t(target) }));
                } else if (val.type === 'requiredIf') {
                    errors.push(this.$t(`requiredField`, { n: this.$t(target) }));
                } else {
                    errors.push(this.$t(`${ key }Field`, { n: secondVal[1] }));
                }

            } else {
                errors.push(target ? this.$t(`${ key }Field`, { n: this.$t(target) }) : this.$t(`${ key }Field`));
            }
        }
    });

    return errors;
};

Vue.prototype.$savedSuccessfully = function ({ title = null, message = null, options = {} } = {}) {
    alert(message || this.$t('Saved successfully'))
};

Vue.prototype.$errorOccurred = function ({ title = null, message = null, type = 'alert', icon, options = {} } = {}) {
    if (process.client) {
        alert(message || this.$t('Error occurred'))
    } else {
        console.log(title, message)
    }
};

Vue.prototype.$responseError = function (error) {
    this.$errorOccurred({
        type: 'error',
        title: error?.response?.statusText,
        message: error?.response?.data?.message,
    });
};

Vue.prototype.$byLocale = function (target, locale = this.$i18n.locale) {
    return target ? target[locale] : null;
};

Vue.prototype.$dark = function () {
    return this.$vuetify.theme.dark;
};
