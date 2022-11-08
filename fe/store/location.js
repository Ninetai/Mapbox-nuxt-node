export const state = () => ({
  error: null,
  locations: []
})

export const mutations = {
  SET_ERROR (state, error) { state.error = error },
  CLEAR_ERROR (state) { state.error = null },
  SET_LOCATIONS(state, locations) { state.locations = locations }
}

export const actions = {
  async getLocations ({ commit }, mapId) {
    try {
      const response = await this.$axios.get(`/locations?mapId=${mapId}`)
      
      commit('SET_LOCATIONS', response.data.locations)

      return response
    } catch (err) {
      commit('SET_ERROR', err.response.data)
    }
  },
  async createLocation ({ commit }, payload) {
    try {
      const response = await this.$axios.post('/locations', payload)

      return response
    } catch (err) {
      commit('SET_ERROR', err.response.data)
    }
  },
  async updateLocation ({ commit }, payload) {
    try {
      const response = await this.$axios.put(`/locations/${payload.id}`, payload)

      return response
    } catch (err) {
      console.log(err)
      commit('SET_ERROR', err.response.data)
    }
  },
  async getLocation ({ commit }, id) {
    try {
      const response = await this.$axios.get(`/locations/${id}`)
      
      return response
    } catch (err) {
      commit('SET_ERROR', err.response.data)
    }
  },
}
