export const state = () => ({
  startDate: null,
  endDate: new Date().toLocaleDateString(),
})

export const getters = {
  startDate: (state) => {
    return state.startDate
  },
  endDate: (state) => {
    return state.endDate
  },
}

export const mutations = {
  setStartDate(state, startDate) {
    state.startDate = startDate
  },
  setEndDate(state, endDate) {
    state.endDate = endDate
  },
}

export const actions = {
  setStartDate(context, { startDate }) {
    context.commit('setStartDate', startDate)
  },
  setEndDate(context, { endDate }) {
    context.commit('setEndDate', endDate)
  },
}
