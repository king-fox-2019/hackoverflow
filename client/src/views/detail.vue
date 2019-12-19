<template>
    <div id="main">
        <div class="content">
            <b-card bg-variant="light" :header="questions.title" class="text-center" style="width:800px">
                <div id="card">
                    <div id="btn">
                        <button  @click.prevent="upQuestion"><svg width="15" height="15" viewBox="0 0 36 36"><path d="M2 26h32L18 10 2 26z"></path></svg></button>
                    <div >{{questions.upVotes.length - questions.downVotes.length}}</div>
                        <button @click.prevent="downQuestion"><svg width="15" height="15" viewBox="0 0 36 36"><path d="M2 10h32L18 26 2 10z"></path></svg></button>
                    </div>
                    <div id="desc" v-html="questions.desc"></div>
                </div>
            </b-card> 
        </div>
        <hr>
        <hr>
        <div class="content" v-for="answer in answers" :key="answer.id">
            <b-card bg-variant="light" class="text-center" style="width:800px">
                <div id="card">
                    <div id="btn">
                        <button  @click.prevent="upAnswer(answer._id)"><svg width="15" height="15" viewBox="0 0 36 36"><path d="M2 26h32L18 10 2 26z"></path></svg></button>
                    <div>{{answer.upVotes.length - answer.downVotes.length}}</div>
                        <button @click.prevent="downAnswer(answer._id)"><svg width="15" height="15" viewBox="0 0 36 36"><path d="M2 10h32L18 26 2 10z"></path></svg></button>
                    </div>
                    <div id="desc" v-html="answer.desc" style="margin-left:100px"></div>
                </div>
            </b-card>
        </div>
        <hr>
        <div style="margin-top:20px">
            <h3>add Answer</h3>
            <wysiwyg v-model="myAnswer" />
            <button @click.prevent ='save' class="btn btn-secondary btn-lg btn-block">Create</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name:'detailQuestion',
    data:function(){
        return {
            questions : {title:'',upVotes:[],downVotes:[],desc:''},
            answers: {},
            myAnswer :''
        }
    },
    methods:{
        upQuestion(){
            axios({
            url: `http://localhost:3000/questions/up/${this.$route.params.id}`,
            method: 'patch',
            headers:{
                token : localStorage.getItem('token')
            }
            })
            .then(() =>{
                this.fetchQuestion()
                this.fetchAnswer()
            })
        },
         downQuestion(){
            axios({
            url: `http://localhost:3000/questions/down/${this.$route.params.id}`,
            method: 'patch',
            headers:{
                token : localStorage.getItem('token')
            }
            })
            .then(() =>{
                this.fetchQuestion()
                this.fetchAnswer()
            })
        },
         upAnswer(id){
            axios({
            url: `http://localhost:3000/answers/up/${id}`,
            method: 'patch',
            headers:{
                token : localStorage.getItem('token')
            }
            })
            .then(() =>{
                this.fetchQuestion()
                this.fetchAnswer()
            })
        },
          downAnswer(id){
            axios({
            url: `http://localhost:3000/answers/down/${id}`,
            method: 'patch',
            headers:{
                token : localStorage.getItem('token')
            }
            })
            .then(() =>{
                this.fetchQuestion()
                this.fetchAnswer()
            })
        },
        fetchQuestion(){
             axios({
            url: `http://localhost:3000/questions/${this.$route.params.id}`,
            method: 'get',
            })
            .then(({data})=>{
                this.questions = data
            })
            .catch(err=>{
                console.log(err)
            })
        },
        fetchAnswer(){
               axios({
            url: `http://localhost:3000/answers/${this.$route.params.id}`,
            method: 'get'
            })
            .then(({data})=>{
                this.answers = data
            })
            .catch(err=>{
                console.log(err)
            })
        },
        save(){
              axios({
            url: `http://localhost:3000/answers`,
            method: 'post',
            headers:{
                token : localStorage.getItem('token')
            },
            data:{
                desc: this.myAnswer,
                idQuestion: this.questions._id
            }
            })
            .then(()=>{
                this.myAnswer = ''
                this.fetchAnswer()
            })
            .catch(err=>{
                console.log(err)
            })
        }
    },
    created(){
       this.fetchQuestion()
       this.fetchAnswer()
    },
    mounted(){
        position: ''
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";
.content{
    display: flex;
    justify-content: center
}
#main{
    margin-left: 300px;
    margin-right: 300px
}
#card{
    display: flex;
    flex-direction: row
}
#btn{
    margin-top: 0px
}
#desc{
    width: 100%
}
</style>