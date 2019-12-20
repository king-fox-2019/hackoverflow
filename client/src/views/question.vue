<template>
  <div class="container">
      <div class="row justify-content-center">
        <h1 class="mt-5 col-md-6">QUESTIONS</h1>
        <div class="col-md-6 my-auto">
          <div class="row justify-content-center mb-3">
            <b-btn variant="outline-secondary" @click.prevent="getTags">Get Tags</b-btn>
            <div v-for="(tag,i) in tags" :key="i">
              <p id="tag" @click="toTag(tag)">{{tag}}</p>
            </div>
          </div>
          <div class="row justify-content-center">
            <b-btn variant="outline-dark" v-if="this.$store.state.isLogin" data-toggle="modal" data-target="#myModal1">Add Question</b-btn>
          </div>
        </div>
      </div>
    <div class="float-left question mb-3">
      <div v-for="(list,i) in this.$store.state.question.question" :key="i">
        <!-- <h1 @click.prevent="toDetail(list._id)" >{{list.title}}</h1>
        <p><i>Author: {{list.author.name}}</i></p>
        <p>Votes: {{}}</p> -->
        <question :id="list._id" :questionTitle="list.title" :author="list.author.name" :votes="list.votes" :tags="list.tags"></question>
      </div>
    </div>
    <div class="modal" id="myModal1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <!-- Modal Header -->
          <div class="modal-header text-center d-block">
            <h4 class="modal-title"></h4>
            <button type="button" class="close" data-dismiss="modal">&times;</button>
          </div>

          <!-- Modal body -->
          <div class="modal-body">
            <questionForm></questionForm>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import questionForm from '@/components/addQuestionForm.vue'
import question from '@/components/question.vue'
import axios from 'axios'

export default {
  data(){
    return {
      tags:[],
      totalVote:0,
      questions:[]
    }
  },
  components:{
    questionForm,
    question
  },
  computed:{
    ...mapState({question:'question/question'})
  },
  methods:{
    ...mapActions({getAllQuestion:'question/getAllQuestion'}),
    getTags(){
      axios({
        method:"get",
        url:'http://localhost:3000/tag',
        headers:{token:localStorage.getItem('token')}
      })
      .then(({data})=>{
        this.tags = data.watchedTags
      })
      .catch(err=>console.log(err))
    },
    toTag(tag){
      this.$router.push({path:'tag/'+tag})
    }
  },
  created(){
    this.getAllQuestion()
  }
}
</script>

<style scoped>
h1{
  padding-bottom: 20px;
  transition: 0.3s;
}
h1:hover{
  cursor: pointer;
  color: rgb(78, 78, 85);
  transition: 0.3s
}
.question{
  border-top: 5px double rgba(0,0,0,.3);
  border-bottom: 5px double rgba(0,0,0,.3);
  width: 100%;
  padding: 10px 0;
}
#tag {
  padding: 3px;
  border: 1px solid black;
  border-radius: 5px;
  margin-left:12px;
  transition: 0.3s
}
#tag:hover {
  cursor: pointer;
  background-color: black;
  transition: 0.3s;
  color: white
}
</style>