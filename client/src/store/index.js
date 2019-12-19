import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    base_url: 'http://localhost:3001',
    isLoggedIn: false,
    access_token: '',
    questions: [],
    answers: [],
    // modalClass: 'modal',
    // questionTitle: '',
    // questionDescription: '',
    // questionCategory: '',
    // questionId: ''
  },
  mutations: {
    login (state, payload) {
      this.state.isLoggedIn = true
      this.state.access_token = payload 
      router.push('/')
    },
    logout () {
      this.state.isLoggedIn = false
      this.state.access_token = ''
    },
    setQuestions (state, payload) {
      this.state.questions = payload
    },
    setAnswers (state, payload) {
      this.state.answers = payload
    },
    // openModal: function (state, payload) {
    //   axios({
    //     method: 'GET',
    //     url: `${this.state.base_url}/questions/${payload}`,
    //     headers: {
    //       access_token: this.state.access_token
    //     }
    //   })
    //     .then(question => {
    //       this.state.questionTitle = question.data.title
    //       this.state.questionDescription = question.data.description
    //       this.state.questionCategory = question.data.category
    //       this.state.questionId = question.data._id
    //     })
    //     .catch(err => {
    //       console.log(err)
    //     })
    //   this.state.modalClass = 'modal is-active'
    // },
    // closeModal: function () {
    //   this.state.modalClass = 'modal'
    // },
    // clearForm: function () {
    //   this.state.questionTitle = ''
    //   this.state.questionDescription = ''
    //   this.state.questionCategory = ''
    // },
    // fillForm: function () {

    // }
  },
  actions: {
    addQuestion (context, data) {
      axios({
        method: 'POST',
        url: `${this.state.base_url}/questions`,
        headers: {
          access_token: this.state.access_token
        },
        data: data
      })
        .then(question => {
          console.log(question.data)
          context.commit('closeModal')
          context.dispatch('fetchQuestions')
        })
        .catch(err => {
          console.log(err)
        })
    },
    updateQuestion (context, obj) {
      console.log('masuk store')
      console.log(obj)
      axios({
        method: 'PATCH',
        url: `${this.state.base_url}/questions/${obj.id}`,
        headers: {
          access_token: this.state.access_token
        },
        data: {
          title: obj.title,
          description: obj.description,
          category: obj.category
        }
      })
        .then(question => {
          console.log(question.data)
          context.dispatch('fetchQuestions')
        })
        .catch(err => {
          console.log(err)
        })
    },
    fetchQuestions (context) {
      console.log('masuk fetchquestions')
      axios({
        method: 'GET',
        url: `${this.state.base_url}/questions`,
        headers: {
          access_token: this.state.access_token
        }
      })
        .then(questions => {
          console.log(questions.data)
          context.commit('setQuestions', questions.data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    // fetchQuestion (context, id) {
    //   console.log('masuk fetchquestion')
    //   axios({
    //     method: 'GET',
    //     url: `${this.state.base_url}/questions/${id}`,
    //     headers: {
    //       access_token: this.state.access_token
    //     }
    //   })
    //     .then(question => {
    //       console.log(question.data)
    //       context.commit('setQuestion', question.data)
    //     })
    //     .catch(err => {
    //       console.log(err)
    //     })
    // },
    fetchAnswers (context, QuestionId) {
      axios({
        method: 'GET',
        url: `${this.state.base_url}/answers/${QuestionId}`,
        headers: {
          access_token: this.state.access_token
        }
      })
        .then(answers => {
          console.log(answers.data)
          context.commit('setAnswers', answers.data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    voteQuestion (context, data) {
      console.log(data)
      axios({
        method: 'PATCH',
        url: `${this.state.base_url}/questions/vote/${data.QuestionId}`,
        headers: {
          access_token: this.state.access_token
        },
        data: {
          type: data.type
        }
      })
        .then(() => {
          context.dispatch('fetchQuestions')
        })
        .catch(err => {
          console.log(err)
        })
    },
    // voteSingleQuestion (context, data) {
    //   console.log(data)
    //   axios({
    //     method: 'PATCH',
    //     url: `${this.state.base_url}/questions/vote/${data.QuestionId}`,
    //     headers: {
    //       access_token: this.state.access_token
    //     },
    //     data: {
    //       type: data.type
    //     }
    //   })
    //     .then(() => {
    //       context.dispatch('fetchQuestion', data.QuestionId)
    //     })
    //     .catch(err => {
    //       console.log(err)
    //     })
    // },
    voteAnswer (context, data) {
      // console.log(data)
      axios({
        method: 'PATCH',
        url: `${this.state.base_url}/answers/vote/${data.AnswerId}`,
        headers: {
          access_token: this.state.access_token
        },
        data: {
          type: data.type
        }
      })
        .then(() => {
          console.log(data.QuestionId)
          context.dispatch('fetchAnswers', data.QuestionId)
        })
        .catch(err => {
          console.log(err)
        })
    },
    filterQuestions (context, category) {
      console.log('masuk filterquestions')
      axios({
        method: 'GET',
        url: `${this.state.base_url}/questions/filter/${category}`,
        headers: {
          access_token: this.state.access_token
        }
      })
        .then(questions => {
          console.log(questions.data)
          context.commit('setQuestions', questions.data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    addAnswer (context, data) {
      console.log('masuk addanswer')
      axios({
        method: 'POST',
        url: `${this.state.base_url}/answers`,
        headers: {
          access_token: this.state.access_token
        },
        data: data
      })
        .then(answer => {
          console.log(answer.data)
          context.dispatch('fetchAnswers', data.QuestionId)
        })
        .catch(err => {
          console.log(err)
        })
    },
    updateAnswer (context, obj) {
      console.log('masuk store')
      axios({
        method: 'PATCH',
        url: `${this.state.base_url}/answers/${obj.id}`,
        headers: {
          access_token: this.state.access_token
        },
        data: {
          title: obj.title,
          description: obj.description
        }
      })
        .then(answer => {
          console.log(answer.data)
          context.dispatch('fetchAnswers', answer.data.QuestionId)
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  modules: {
  }
})
