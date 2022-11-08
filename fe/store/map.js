export const state = () => ({
  error: null,
  maps: [],
  templates: []
})

export const mutations = {
  SET_ERROR (state, error) { state.error = error },
  CLEAR_ERROR (state) { state.error = null },
  SET_MAPS (state, maps) { state.maps = maps },
  SET_TEMPLATES (state, templates) { state.templates = templates }
}

export const actions = {
  async getMaps ({ commit }) {
    try {
      const response = await this.$axios.get('/maps')
      
      commit('SET_MAPS', response.data.maps)
    } catch (err) {
      commit('SET_ERROR', err.response.data)
    }
  },
  async getMapTemplates ({ commit }) {
    try {
      const response = await this.$axios.get('/maps/templates')

      commit('SET_TEMPLATES', response.data.templates)
    } catch (err) {
      commit('SET_ERROR', err.response.data)
    }
  },
  async createMap ({ commit }, payload) {
    try {
      const response = await this.$axios.post('/maps', payload)

      return response
    } catch (err) {
      commit('SET_ERROR', err.response.data)
    }
  },
  async updateMap ({ commit }, payload) {
    try {
      const response = await this.$axios.put(`/maps/${payload.id}`, payload)

      return response
    } catch (err) {
      console.log(err)
      commit('SET_ERROR', err.response.data)
    }
  },
  async getMap ({ commit }, id) {
    try {
      const response = await this.$axios.get(`/maps/${id}`)
      
      return response
    } catch (err) {
      commit('SET_ERROR', err.response.data)
    }
  },
}
