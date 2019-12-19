<template>
  <div class="container">
      <div class="row justify-content-center">
        <h1 class="mt-5">YOUR QUESTIONS</h1>
      </div>
    <div class="float-left question mb-3">
      <div v-for="(list,i) in questions" :key="i">
        <h1 @click.prevent="toDetail(list._id)" >{{list.title}}</h1>
        <p><i>Author: {{list.author.name}}</i></p>
        <p>Votes: {{list.votes.length}}</p>
        <div class="row">
            <b-btn variant='outline-danger' @click="deleteQuestion(list._id)">Delete</b-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import axios from 'axios'

export default {
  name:'user-question',
  data(){
      return{
          questions:[],
          titles: '',
          descriptions:''
      }
  },
  created(){
      this.getUserQuestion()
  },
  methods:{
      getUserQuestion(){
          axios({
          method:'get',
          url:'http://localhost:34.66.242.14/question?userquestion=1',
          headers:{token:localStorage.getItem('token')}
            })
            .then(({data})=>{
                this.questions = data
            })
            .catch(err=>console.log(err))
      },
      deleteQuestion(questionId){
          console.log(questionId)
          axios({
              method:'delete',
              url:'http://localhost:34.66.242.14/question',
              headers:{token:localStorage.getItem('token')},
              data:{
                  id:questionId
              }
          })
          .then(({data})=>{
              this.getUserQuestion()
              this.$store.commit('question/DELETE_QUESTION',questionId)
              this.$swal({
                  type:'success',
                  title:'Delete Success'
              })
          })
          .catch(err=>{
              console.log(err)
              this.$swal({
                  type:'error',
                  title:'Delete Fail'
              })
          })
      }
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
</style>

<form @submit.prevent="updateQuestion(list._id)">
                        <div class="form-group">
                            <label for="exampleInputEmail1">Title: </label>
                            <input v-model="titles" :value="list.title" type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
                        </div>
                        <div class="form-group">
                             <label for="exampleFormControlTextarea1">Description: </label>
                             <textarea v-model="descriptions" :value="list.description" class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                        </div>
                        <button type="submit" class="btn btn-dark">Submit</button>
                    </form>