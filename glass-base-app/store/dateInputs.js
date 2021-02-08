// TODO replace this eventually
const maxDate = new Date('2021-02-22').toLocaleDateString()
const minDate = new Date('2008-09-05').toLocaleDateString()

export const state = () => ({
  startDate: minDate,
  endDate: maxDate,
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
    if (startDate === '') {
      state.startDate = minDate
    } else {
      state.startDate = startDate
    }
  },
  setEndDate(state, endDate) {
    if (endDate === '') {
      state.endDate = maxDate
    } else {
      state.endDate = endDate
    }
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
