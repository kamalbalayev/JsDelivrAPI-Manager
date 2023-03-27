import app from '../structure/app'

export const state = () => ({
    app: app.data,
    theme: app.theme,
    mainNavBar: false,
})

export const mutations = {

    SET_STATE_KEY(state, params){
        if(!state[params.key]){
            params.data.$set(state, params.key, null)
        }
    },

    SET_STATE(state, params) {
        if(params.push){
            state[params.key].push(params.data)
        }else{
            state[params.key] = params.data
        }
    },
}

export const actions = {
    async GET_DATA({commit}, params) {
        try {

            const queryBlackList = []

            Object.entries(params.query).forEach(([key, _]) => {
                if(queryBlackList.includes(key)){
                    delete params.query[key]
                }
            })

            const {data} = await this.$axios.get(params.api, {params: params.query})
            if(!params.returnData){
                const SET_STATE = `${params.store === 'index' ? '' : params.store + '/'}SET_STATE`
                commit(SET_STATE, {...params, data})
            }
            return data

        } catch (error) {
            params.vm.$responseError(error)
        }
    }
};
