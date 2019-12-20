<template>
  <div>
    <h1 @click.prevent="toDetail(id)">{{questionTitle}}</h1>
    <p>
      <i>Author: {{author}}</i>
    </p>
    <div class="row">
      <div v-for="(tag,i) in tags" :key="i">
        <p id="tag" @click="addTag(tag)">{{tag}}</p>
      </div>
    </div>
    <p>Votes: {{totalVote}}</p>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import axios from 'axios'

export default {
  data(){
    return{
      totalVote:0
    }
  },
  props:['id','questionTitle','author','votes','tags'],
  computed: {
    ...mapState({ question: "question/question" })
  },
  methods: {
    ...mapActions({ getAllQuestion: "question/getAllQuestion" }),
    toDetail(questionId){
      this.$router.push({path:'/question/'+questionId})
    },
    addTag(tag){
      axios({
        method:'put',
        url:'http://localhost:3000/tag',
        headers:{token:localStorage.getItem('token')},
        data:{watchedTags:tag}
      })
      .then(({data})=>{
        this.$swal({
          type:'success',
          title:'Tag Added.'
        })
      })
      .catch(err=>{
        console.log(err.response.data.message)
        this.$swal({
          type:'error',
          title:'Add Tag Failed'
        })
      })
    }
  },
  created() {
    this.getAllQuestion();
    this.totalVote = this.votes.reduce((a, item) => a += item.vote ,0)
    // this.questions = this.$store.state.question
  }
};
</script>

<style scoped>
h1 {
  padding-bottom: 20px;
  transition: 0.3s;
}
h1:hover {
  cursor: pointer;
  color: rgb(78, 78, 85);
  transition: 0.3s;
}
.question {
  border-top: 5px double rgba(0, 0, 0, 0.3);
  border-bottom: 5px double rgba(0, 0, 0, 0.3);
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