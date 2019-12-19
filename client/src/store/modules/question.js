import axios from 'axios'

const namespaced = true

const state = {
    question:[]
}

const mutations = {
    SET_QUESTION(state,questions){
        console.log(questions)
        state.question = questions
    },
    ADD_QUESTION(state,question){
        state.question.push(question)
    },
    DELETE_QUESTION(state,id){
        let newQuestion = state.question.filter(question=>{
            return question._id!==id
        })
        state.question = newQuestion
    }
}

const actions = {
    getAllQuestion({commit}){
        axios({
            method:'get',
            url:'http://localhost:3000/question',
            headers:{token:localStorage.getItem('token')}
        })
        .then(({data})=>{
            commit('SET_QUESTION',data)
        })
        .catch(err=>console.log(err))
    }
}

const getters = {
}

export default {
    namespaced,
    state,
    mutations,
    actions,
    getters
}