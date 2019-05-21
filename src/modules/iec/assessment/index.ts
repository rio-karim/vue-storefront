import { createModule } from '@vue-storefront/core/lib/module'
import axios from 'axios'

// TODO: Move the logic to appropriate modules and deprecate this one

const KEY = 'assessment'
const store = {
  namespaced: true,
  state: {
    nodeList: [],
  },
  mutations: {
    setAssessment: (state, assessment) => (state.nodeList = assessment)
  },
  actions: {
    async fetchAssessment({ commit }) {
      const response = await axios.get('http://localhost:3030/assets/iec/assessment.json')
      commit('setAssessment', response.data)
      return response.data
    },
    // async commitAssessment( { commit }, assessment) {
    //   const response = await axios.post('http://localhost:3030/assets/iec/assessment.json', assessment)
    //   commit('setAssessment', assessment)
    // }
    commitAssessment( { commit }, assessment) {
      commit('setAssessment', assessment)
    }
  },
  getters: {
    getAssessment: state => state.nodeList,
    getCompletedCount: (state) => {
      let i = 0
      state.nodeList.forEach((nodeItem) => {
        if(nodeItem.answer) {
          i++
        }
      })
      return {
        answered: i,
        length: state.nodeList.length
      }
    }
  },
  setters: {

  }
}

export const Assessment = createModule({
  key: KEY,
  store: { modules: [{ key: KEY, module: store }] }
})
