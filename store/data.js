export const state = () => ({
    activeSection: null,
})

export const mutations = {

    SET_STATE_KEY(state, params){
        if(!state[params.key]){
            params.data.$set(state, params.key, null)
        }
    },

    SET_STATE(state, params) {

        if(params.push){

            const data = params.data.data || params.data

            if(Array.isArray(data)){
                data.forEach(item => (state[params.key].data || state[params.key]).push(item))
            }else{
                state[params.key].push(data)
            }

            if(params.data.meta){
                state[params.key].meta = params.data.meta
            }

        }else{
            state[params.key] = params.data
        }

    },
}
