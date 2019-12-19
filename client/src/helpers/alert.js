import store from '../store'
import { ToastProgrammatic as Toast } from 'buefy'

export default (err) => {
  console.log(JSON.stringify(err))
  console.log(err)
  if (err.response) {
    let messages = ''
    err.response.data.message.forEach(msg => {
      messages += msg + '<br>'
    })
    Toast.open(messages)
  } else {
    Toast.open('Something went wrong')
  }
  store.commit('SET_IS_LOADING', false)
}
