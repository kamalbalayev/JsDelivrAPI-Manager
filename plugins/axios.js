// import Vue from 'vue'

export default function ({app, error: nuxtError}) {

    app.$axios.defaults.headers.common['Content-Language'] = app.i18n.locale;
    app.$axios.defaults.headers.common['Accept-Language'] = app.i18n.locale;

    app.$axios.onError(error => {
        if(error.response.status === 404 || error.response.status === 500){
            if(!process.client){
                nuxtError({
                    statusCode: error.response.status,
                    message: error.response.statusText,
                });
                return Promise.resolve(false);
                // Vue.prototype.$responseError(error)
            }
        }
    })
}
