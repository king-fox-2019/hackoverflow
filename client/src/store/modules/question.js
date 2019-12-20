import axios from '../../../apis/server'

const namespaced = true

const state = {
   questions: []
}

const mutations = {
   UPDATE_QUESTIONS(state, questions) {
      state.questions = questions
   }
}

const actions = {
   fetchQuestions({commit}) {
      axios({
         url: '/question',
         method: 'get'
      })
      .then(({data}) => {
         commit('UPDATE_QUESTIONS', data.questions)
      })
      .catch(error => console.log(error))
   }
}

const getters = {}

export default {
   namespaced,
   state,
   mutations,
   actions,
   getters
}