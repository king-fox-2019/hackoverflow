import Vue from 'vue'
import Vuex from 'vuex'
import User from '@/store/modules/user'
import Answer from '@/store/modules/answer'
import Question from '@/store/modules/question'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user: {
      namespaced: true,
      state: User.state,
      mutations: User.mutations,
      actions: User.actions
    },
    question: {
      namespaced: true,
      state: Question.state,
      mutations: Question.mutations,
      actions: Question.actions
    },
    answer: {
      namespaced: true,
      state: Answer.state,
      mutations: Answer.mutations,
      actions: Answer.actions
    }
  }
})
