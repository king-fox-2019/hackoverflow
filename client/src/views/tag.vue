<template>
  <div class="container">
      <div class="mt-4 float-left question mb-3">
      <div v-for="(list,i) in questions" :key="i">
        <!-- <h1 @click.prevent="toDetail(list._id)" >{{list.title}}</h1>
        <p><i>Author: {{list.author.name}}</i></p>
        <p>Votes: {{}}</p> -->
        <question :id="list._id" :questionTitle="list.title" :author="list.author.name" :votes="list.votes" :tags="list.tags"></question>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import question from '@/components/question'

export default {
    components:{
        question
    },
    data(){
        return{
            questions:[]
        }
    },
    created(){
        let tag = this.$route.params.tag
        axios({
            method:'get',
            url:'http://localhost:3000/question?tag='+tag,
            headers:{token:localStorage.getItem('token')}
        })
        .then(({data})=>{
            this.questions = data
            console.log(data)
        })
        .catch(err=>console.log(err))
    }
}
</script>

<style>

</style>