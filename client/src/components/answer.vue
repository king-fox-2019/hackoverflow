<template>
  <div>
    <p>{{description}}</p>
    <p>
      <i>Answered by: {{author.author.name}}</i>
    </p>
    <p>Total votes: {{totalVotes}}</p>
    <b-btn v-if="author.author.name===username" @click="showUpdate">Update</b-btn>
    <b-btn variant='outline-secondary' style="margin-left:10px;" @click.prevent="upVote">Up Vote</b-btn>
    <b-btn variant='outline-secondary' style="margin-left:10px;" @click.prevent="downVote">Down Vote</b-btn>
    <form v-if="showUpdateForm">
      <div class="form-group">
        <label for="exampleFormControlTextarea1">Description:</label>
        <textarea
          v-model="ansDescription"
          class="form-control"
          id="exampleFormControlTextarea1"
          rows="6"
        ></textarea>
        <!-- <wysiwyg v-model="ansDescription" /> -->
      </div>
      <b-btn @click.prevent="updateAns">Submit</b-btn>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data(){
      return {
          ansDescription:'',
          showUpdateForm:false,
          totalVotes:0
      }
  },
  props: ["username","id", "description", "author", "votes", "question"],
  created(){
      this.totalVotes = this.votes.reduce((a, item) => a += item.vote ,0)
      this.ansDescription=this.description
  },
  watch:{
      votes(){
          this.totalVotes = this.votes.reduce((a, item) => a += item.vote ,0)
      }
  },
  methods:{
      upVote(){
            axios({
                method:'put',
                url:'http://localhost:3000/answer/'+this.id,
                data:{vote:1},
                headers:{token:localStorage.getItem('token')}
            })
            .then(({data})=>{
                this.$emit('getAnswer')
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
                url:'http://localhost:3000/answer/'+this.id,
                data:{vote:-1},
                headers:{token:localStorage.getItem('token')}
            })
            .then(({data})=>{
                this.$emit('getAnswer')
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
      showUpdate(){
          if(!this.showUpdateForm){
              this.showUpdateForm=true
          }else{
              this.showUpdateForm=false
          }
      },
      updateAns(){
          axios({
              method:'put',
              url:'http://localhost:3000/answer',
              headers:{token:localStorage.getItem('token')},
              data:{
                  id:this.id,
                  description:this.ansDescription
              }
          })
          .then(({data})=>{
              this.$emit('getAnswer')
              this.showUpdateForm=false
              this.$swal({
                  type:'success',
                  title:'Update Success.'
              })
          })
          .catch(err=>{
              console.log(err)
              this.$swal({
                  type:'error',
                  title:'Failed Update.'
              })
          })
      }
  }
};
</script>

<style scoped>
/* @import "~vue-wysiwyg/dist/vueWysiwyg.css"; */
</style>