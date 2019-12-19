<template>
  <div class="container mt-5">
    <h1>{{question.title}}</h1>
    <p>{{question.description}}</p>
    <p>Total Vote : {{totalVote}}</p>
    <div class="row">
        <b-btn variant="outline-secondary" @click="showAns">Add Answer</b-btn>
        <b-btn v-if="question.author&&question.author.name===username" style="margin-left:10px;" variant="outline-secondary" @click="showUpdate">Update</b-btn>
        <b-btn v-if="$store.state.isLogin" variant="outline-secondary" style="margin-left:10px" @click.prevent="upVote">Up Vote</b-btn>
        <b-btn v-if="$store.state.isLogin" variant="outline-secondary" style="margin-left:10px" @click.prevent="downVote">Down Vote</b-btn>
    </div>
    <div v-if="showAnsForm" class="mt-4">
        <form>
            <div class="form-group">
                <label for="exampleFormControlTextarea1">Your Answer: </label>
                <textarea v-model="description" class="form-control" id="exampleFormControlTextarea1" rows="6"></textarea>
                <!-- <wysiwyg v-model="description" /> -->
            </div>
            <b-btn @click.prevent="createAns()">Submit</b-btn>
        </form>
    </div>
    <div v-if="showUpdateForm" class="mt-4">
        <form>
            <div class="form-group">
                <label for="exampleFormControlInput1">Title: </label>
                <input v-model="questionTitle" type="text" class="form-control" id="exampleFormControlInput1" placeholder="Title">
            </div>
            <div class="form-group">
                <label for="exampleFormControlTextarea1">Description: </label>
                <textarea v-model="questionDescription" class="form-control" id="exampleFormControlTextarea1" rows="6"></textarea>
                <!-- <wysiwyg v-model="questionDescription" /> -->
            </div>
            <b-btn @click.prevent="updateQuestion()">Submit</b-btn>
        </form>
    </div>
    <div class="mt-5" v-if="question.answers&&question.answers.length>0">
        <h1>Answers</h1>
        <div class="answer" v-for="(answer,i) in answers" :key="i">
            <answer :id="answer._id"
                    :description="answer.description"
                    :author="answer"
                    :votes="answer.votes"
                    :username="username"
                    :question="answer.question"
                    @getAnswer="getAns">
            </answer>
        </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import answer from '@/components/answer'

export default {
    components:{
        answer
    },
    data(){
        return {
            questionId:'',
            question: {},
            username: '',
            showAnsForm:false,
            showUpdateForm:false,
            description:'',
            answers: [],
            questionTitle:'',
            questionDescription:'',
            totalVote:0
        }
    },
    created(){
        this.questionId = this.$route.params.id
        this.username = localStorage.getItem('username')
        this.getQuestion()
        this.getAns()
        this.totalVote=0
    },
    methods:{
        upVote(){
            axios({
                method:'put',
                url:'http://34.66.242.14/question/'+this.questionId,
                data:{vote:1},
                headers:{token:localStorage.getItem('token')}
            })
            .then(({data})=>{
                this.getQuestion()
                this.$swal({
                    type:'success',
                    title:'Up Vote Success'
                })
            })
            .catch(err=>{
                console.log(err)
                this.$swal({
                    type:'error',
                    title:'Up Vote Failed'
                })
            })
        },
        downVote(){
            axios({
                method:'put',
                url:'http://34.66.242.14/question/'+this.questionId,
                data:{vote:-1},
                headers:{token:localStorage.getItem('token')}
            })
            .then(({data})=>{
                this.getQuestion()
                this.$swal({
                    type:'success',
                    title:'Down Vote Success'
                })
            })
            .catch(err=>{
                console.log(err)
                this.$swal({
                    type:'error',
                    title:'Down Vote Failed'
                })
            })
        },
        updateAnswer(id){
            axios({
                method:'put',
                url:'http://34.66.242.14/answer',
                headers:{token:localStorage.getItem('token')},
                data:{
                    id:id,
                    description:this.description
                }
            })
            .then(({data})=>{
                this.description = ''
                this.$swal({
                    type:'success',
                    title:'Edit Answer Success'
                })
            })
            .catch(err=>{
                console.log(err.response.data.message)
                this.$swal({
                    type:'error',
                    title:'Edit Answer Failed'
                })
            })
        },
        updateQuestion(){
            axios({
                method:'put',
                url:'http://34.66.242.14/question',
                headers:{token:localStorage.getItem('token')},
                data:{
                    id:this.questionId,
                    title:this.questionTitle,
                    description:this.questionDescription
                }
            })
            .then(({data})=>{
                this.getQuestion()
                this.showUpdateForm=false
                this.$swal({
                    type:'success',
                    title:'Update Success'
                })
            })
            .catch(err=>{
                console.log(err)
                this.$swal({
                    type:'error',
                    title:'Update Failed'
                })
            })
        },
        getQuestion(){
            axios({
                method:'get',
                url:'http://34.66.242.14/question?questionId='+this.questionId,
                headers:{token:localStorage.getItem('token')}
            })
            .then(({data})=>{
                var total = data.votes.reduce((a, item) => a += item.vote ,0);
                this.totalVote=total
                this.question = data
                this.questionTitle=data.title
                this.questionDescription=data.description
            })
            .catch(err=>console.log(err.response.data.message))
        },
        showAns(){
            if(!this.showAnsForm){
                this.showAnsForm=true
                this.showUpdateForm=false
            }else{
                this.showAnsForm=false
                this.showUpdateForm=false
            } 
        },
        showUpdate(){
            if(!this.showUpdateForm){
                this.showAnsForm=false
                this.showUpdateForm=true
            }else{
                this.showAnsForm=false
                this.showUpdateForm=false
            } 
        },
        createAns(){
            axios({
                method:'post',
                url:'http://34.66.242.14/answer',
                headers:{token:localStorage.getItem('token')},
                data:{
                    description:this.description,
                    questionId: this.questionId
                }
            })
            .then(({data})=>{
                this.description = ''
                this.getQuestion()
                this.getAns()
                this.showAnsForm=false
                this.$swal({
                    type:'success',
                    title:'Answer Added'
                })
            })
            .catch(err=>{
                console.log(err)
                this.$swal({
                    type:'error',
                    title:'Add Answer Failed.'
                })
            })
        },
        getAns(){
            axios({
                method:'get',
                url:'http://34.66.242.14/answer?questionId='+this.$route.params.id,
                headers:{token:localStorage.getItem('token')}
            })
            .then(({data})=>{
                this.answers = data
            })
            .catch(err=>console.log(err))
        }
    }
}
</script>

<style>
.answer{
    padding: 10px 0;
    border-top: 5px double rgba(0,0,0,.3);
}
</style>

<!-- <div class="answer" v-for="(answer,i) in answers" :key="i">
            <p>{{answer.description}}</p>
            <p><i>Answered by: {{answer.author.name}}</i></p>
            <b-btn v-if="answer.author.name===username">Update</b-btn>
            <form>
            <div class="form-group">
                <label for="exampleFormControlTextarea1">Description: </label>
                <textarea v-model="description" class="form-control" id="exampleFormControlTextarea1" rows="6"></textarea>
            </div>
            <b-btn @click.prevent="updateAnswer(answer._id)">Submit</b-btn>
            </form>
        </div> -->