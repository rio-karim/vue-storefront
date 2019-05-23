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
        const cache = await JSON.parse(sessionStorage.getItem('assessment'))
        const response = await axios.get('http://localhost:3030/assets/iec/assessment.json')

        if(!cache){
          commit('setAssessment', response.data)
          return response.data
        }
        else {
          commit('setAssessment', cache)
          return cache
        }
    },
    commitAssessment( { commit }, assessment) {
      sessionStorage.setItem('assessment', JSON.stringify(assessment))
      commit('setAssessment', assessment)
    }
  },
  getters: {
    getAssessment: state => state.nodeList,
    getAssessmentStats: (state) => {
      if(!state.nodeList.length && JSON.parse(sessionStorage.getItem('assessment'))) {
        state.nodeList = JSON.parse(sessionStorage.getItem('assessment'))
      }
      else {
        return false
      }
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
    },
    getActive: (state) => {
      let i = 0
      state.nodeList.forEach((nodeItem, x) => {
        if(nodeItem.active) {
          i = x
        }
      })
      return i
    }
  },
  setters: {

  }
}

export const Assessment = createModule({
  key: KEY,
  store: { modules: [{ key: KEY, module: store }] }
})
