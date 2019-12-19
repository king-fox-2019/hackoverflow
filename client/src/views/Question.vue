<template>
<div class="col-9" style="overflow-y:scroll;">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.1.1/css/all.css" integrity="sha384-O8whS3fhG2OnA5Kas0Y9l3cfpmYjapjI0E4theH4iuMD+pLhbf6JI0jIMfYcK3yZ" crossorigin="anonymous">
    <div class="mt-4 ml-2 d-flex flex-row ml-5" v-if="$route.path == `/questions/${$route.params.id}`">
        <div class="title-qs">
            <span>{{ question.title }}</span>
        </div>
            <button type="button" class="btn btn-success btn-sm ml-auto mr-5 px-4" @click="$router.push(`/questions/${question._id}/update`)"> Update Question </button>
    </div>
    <div v-if="$route.path == `/questions/${$route.params.id}`" class="row pb-3 ml-3 mr-4" style="border-bottom: 1px solid black; font-size: 15px;">
        <div class="d-flex justify-content-start ml-4">
            Asked {{ new Date(question.createdAt) | moment("from", "now") }}
        </div>
        <div class="d-flex justify-content-start ml-4">
            Viewed
        </div>
        <div class="ml-auto mr-4 mt-1">
            <button type="button" @click="deletedQues(question._id)" class="btn btn-danger p-0 px-2 pb-1">
                <i class="fas fa-trash" style="font-size:10px;"></i>
            </button>
        </div>
    </div>
    <div class="row" v-if="$route.path == `/questions/${$route.params.id}`">
        <div class="col-1 ml-4 mt-4 pt-3 d-flex flex-column">
            <i class="fas fa-play fa-2x top-btn" @click="voteUpQuestion(question._id)"></i>
            <span style="font-size: 30px; margin-top:-11px; margin-bottom:-11px;color: rgb(153, 156, 158)" class="mr-1">{{ Number(question.upvotes.length) - Number(question.downvotes.length) || 0}}</span>
            <i class="fas fa-play fa-2x bottom-btn" @click="voteDownQuestion(question._id)"></i>
        </div>
        <div class="col">
            <div style="font-size:20px; font-weight: bold;" class="row mt-4" >
                <span class="ml-1">Questions:</span>
            </div>
            <div class="row p-3 mr-5 question-desc">
                <div v-html="question.description"></div>
            </div>
            <div class="d-flex flex-row">
                <div class="row mt-2 mr-3 text-left" v-for="(tag,i) in question.tags" :key="i">
                    <span class="badge badge-btn p-2 mr-1">{{ tag }}</span>
                </div>
            </div>
        </div>
    </div>
    <div v-if="$route.path == `/questions/${$route.params.id}`" style="font-size:15px;font-weight: lighter;font-style: italic;" class="row ml-3 mt-5" >
        <span class="ml-1"><b style="font-size:20px;" class="mr-1">{{ question.answerId.length }}</b>Answers</span>
    </div>
    <div v-if="$route.path == `/questions/${$route.params.id}`" class="hr-line mr-3 mt-1"></div>
    <div class="row" v-for="answer in question.answerId" :key="answer._id">
        <div class="col-1 ml-4 mt-4 pt-3 d-flex flex-column">
            <i class="fas fa-play fa-2x top-btn" @click="voteUpAnswer(answer._id, question._id)"></i>
            <span style="font-size: 30px; margin-top:-11px; margin-bottom:-11px;color: rgb(153, 156, 158)" class="mr-1">{{ Number(answer.upvotes.length) - Number(answer.downvotes.length) || 0}}</span>
            <i class="fas fa-play fa-2x bottom-btn" @click="voteDownAnswer(answer._id,question._id)"></i>
        </div>
        <div class="col">
            <div class="text-left d-flex flex-row mt-4">
                <div :style="`width:35px; height:35px; background: url('${answer.userId.image[0]}'); background-size: 100%;`"></div>
                <div class="d-flex flex-column">
                    <span class="ml-1" style="font-size:15px;">{{ answer.userId.email }}</span>
                    <span class="ml-1" style="margin-top:-5px;font-size:12px;">
                        Answer {{ new Date(answer.createdAt) | moment("from", "now") }}
                    </span>
                </div>
                <div class="ml-auto mr-5">
                    <button v-if="!updatedAnswer" type="button" class="btn btn-primary ml-4 btn-sm px-3" @click="updatedToggle(answer.description, answer._id)" >Edit</button>
                    <button v-if="!updatedAnswer" type="button" class="btn btn-danger ml-1 btn-sm px-3" @click="deleted(answer._id, question._id)">Delete</button>
                </div>
            </div>
            <div class="row mt-1 p-3 mr-5 question-desc">
                <div v-html="answer.description"></div>
                <div class="hr-line-answer mr-3 my-0 mt-2"></div>
                <div class="hr-line-answer mr-3 my-0"></div>
            </div>
        </div>
    </div>
    <div v-if="$route.path == `/questions/${$route.params.id}`" class="hr-line-answer mr-3 my-4"></div>
    <div v-if="$route.path == `/questions/${$route.params.id}`" class="row ml-5 mt-4" style="font-size:20px; font-weight: bold;">
        <span class="ml-2">Answer:</span>
    </div>
    <div v-if="$route.path == `/questions/${$route.params.id}`" class="row ml-5 mr-5 mt-1">
        <wysiwyg class="text-left" v-model="answer" />
    </div>
    <div v-if="$route.path == `/questions/${$route.params.id}`" class="ml-5 mr-4">
        <div class="hr-line-answer mr-3 my-0 mt-2"></div>
        <div v-html="answer" v-if="answer" class="text-left ml-3"></div>
        <div class="hr-line-answer mr-3 my-0"></div>
    </div>
    <div class="row ml-5 mt-1" v-if="$route.path == `/questions/${$route.params.id}`">
        <div class="mb-5">
            <button type="button" v-if="!updatedAnswer" class="btn btn-primary mt-2" @click="created(question._id)">Post Your Answer</button>
            <button type="button" v-if="updatedAnswer" class="btn btn-primary mt-2" @click="updated(question._id)">Update Your Answer</button>
            <button type="button" v-if="updatedAnswer" class="btn btn-danger mt-2 ml-1" @click="updatedToggle(null)">Cancel</button>
        </div>
    </div>
    <div>
        <router-view v-if="$route.path == `/questions/${$route.params.id}/update`"/>
    </div>
</div>
</template>

<script>
import axios from '../helpers/axios'
import Swal from 'sweetalert2'
import {mapState} from 'vuex'
export default {
    data() {
        return {
            updatedAnswer: false,
            answer: '',
            answerId: ''
        }
    },
    name: 'questionAndAnswer',
    created() {
        this.$store.dispatch('getQuestionShow',{ id: this.$route.params.id })
    },
    methods: {
        updatedToggle(description, id){
            if (description) {
                this.answer = description
                this.updatedAnswer = true
                this.answerId = id
            } else {
                this.answer = ''
                this.updatedAnswer = false
                this.answerId = ''
            }
        },
        voteDownQuestion(id){
            axios({
                url: `/question/${id}/downvotes`,
                method: 'PATCH',
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .then(({ data })=>{
                this.$store.dispatch('getQuestionShow', { id })
            })
            .catch(error=>{
                console.log(error.response.data);
                Swal.fire({
                    title: 'Error!',
                    text: error.response.data.errors.join(' | '),
                    icon: 'error',
                    // imageWidth: 400,
                    // imageHeight: 200,
                    timer: 2500,
                    imageAlt: 'Custom image',
                    showConfirmButton: false,
                    showCancelButton: false,
                    confirmButtonText: 'نعم',
                    cancelButtonText: 'لا'
                })
            })
        },
        voteUpQuestion(id){
            axios({
                url: `/question/${id}/upvotes`,
                method: 'PATCH',
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .then(({ data })=>{
                this.$store.dispatch('getQuestionShow', { id })
            })
            .catch(error=>{
                console.log(error.response.data);
                Swal.fire({
                    title: 'Error!',
                    text: error.response.data.errors.join(' | '),
                    icon: 'error',
                    // imageWidth: 400,
                    // imageHeight: 200,
                    timer: 2500,
                    imageAlt: 'Custom image',
                    showConfirmButton: false,
                    showCancelButton: false,
                    confirmButtonText: 'نعم',
                    cancelButtonText: 'لا'
                })
            })
        },
        voteDownAnswer(id,productId){
            axios({
                url: `/answer/${id}/downvotes`,
                method: 'PATCH',
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .then(({ data })=>{
                this.$store.dispatch('getQuestionShow', { id : productId })
            })
            .catch(error=>{
                console.log(error.response.data);
                Swal.fire({
                    title: 'Error!',
                    text: error.response.data.errors.join(' | '),
                    icon: 'error',
                    // imageWidth: 400,
                    // imageHeight: 200,
                    timer: 2500,
                    imageAlt: 'Custom image',
                    showConfirmButton: false,
                    showCancelButton: false,
                    confirmButtonText: 'نعم',
                    cancelButtonText: 'لا'
                })
            })
        },
        voteUpAnswer(id,productId){
            axios({
                url: `/answer/${id}/upvotes`,
                method: 'PATCH',
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .then(({ data })=>{
                this.$store.dispatch('getQuestionShow', { id: productId })
            })
            .catch(error=>{
                console.log(error.response.data);
                Swal.fire({
                    title: 'Error!',
                    text: error.response.data.errors.join(' | '),
                    icon: 'error',
                    // imageWidth: 400,
                    // imageHeight: 200,
                    timer: 2500,
                    imageAlt: 'Custom image',
                    showConfirmButton: false,
                    showCancelButton: false,
                    confirmButtonText: 'نعم',
                    cancelButtonText: 'لا'
                })
            })
        },
        deletedQues(id){
            axios({
                url: '/question/'+id,
                method: 'DELETE',
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .then(({ data })=>{
                this.$router.push('/questions')
                this.$store.dispatch('getdataQuestion')
            })
            .catch(error=>{
                console.log(error.response.data);
                Swal.fire({
                    title: 'Error!',
                    text: error.response.data.errors.join(' | '),
                    icon: 'error',
                    // imageWidth: 400,
                    // imageHeight: 200,
                    timer: 2500,
                    imageAlt: 'Custom image',
                    showConfirmButton: false,
                    showCancelButton: false,
                    confirmButtonText: 'نعم',
                    cancelButtonText: 'لا'
                })
            })
        },
        deleted(id, productId){
            let form = { productId }
            axios({
                url: '/answer/'+id,
                method: 'DELETE',
                data: form,
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .then(({ data })=>{
                this.$store.dispatch('getQuestionShow', { id: productId })
            })
            .catch(error=>{
                console.log(error.response.data);
                Swal.fire({
                    title: 'Error!',
                    text: error.response.data.errors.join(' | '),
                    icon: 'error',
                    // imageWidth: 400,
                    // imageHeight: 200,
                    timer: 2500,
                    imageAlt: 'Custom image',
                    showConfirmButton: false,
                    showCancelButton: false,
                    confirmButtonText: 'نعم',
                    cancelButtonText: 'لا'
                })
            })
        },
        created(id){
            let form = {
                description: this.answer
            }
            axios({
                url: '/answer/'+id,
                method: 'POST',
                data: form,
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .then(({ data })=>{
                this.answer = ''
                this.$store.dispatch('getQuestionShow', { id })
            })
            .catch(error=>{
                console.log(error.response.data);
            })
        },
        updated(questionId){
            let form = {
                description: this.answer
            }
            axios({
                url: `/answer/${this.answerId}/updated`,
                method: 'PUT',
                data: form,
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .then(({ data })=>{
                this.updatedToggle()
                this.$store.dispatch('getQuestionShow', { id: questionId })
            })
            .catch(error=>{
                console.log(error.response.data);
            })
        }
    },
    computed: mapState(['question', 'photo'])
}
</script>

<style scoped>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";
.top-btn:hover{
    color: orangered;
}

.top-btn{
    cursor: pointer;
    transform: rotate(30deg);
    color: rgb(200, 203, 206);
    transition: 0.6s;
}

.bottom-btn{
    cursor: pointer;
    transform: rotate(-30deg);
    color: rgb(200, 203, 206);
    transition: 0.6s;
}

.bottom-btn:hover{
    color: orangered;
}

.hr-line{
    border-bottom: 1px solid rgb(175, 175, 175);
}

.hr-line-answer{
    border-bottom: 1px solid rgb(233, 233, 233);
}

.badge-btn{
    background-color: rgba(206, 224, 237, 0.555);
    color: #1B65BD;
    cursor: pointer;
}

.badge-btn:hover{
    background-color: rgb(206, 224, 237);
}
.question-desc{
    border: 1px solid rgb(199, 199, 199);
    background-color: rgb(231, 231, 231);
}
.title-qs{
    font-size: 30px;
    font-weight: initial;
}
</style>
