<template>
  <div class="question-summary narrow" id="question-summary-59385317" style="padding: 30px;">
    <div class="summary" style="padding: 30px;">
      <div class="started">
        <h5 @click="closeForm">close</h5>
      </div>
      <br><br>
      <form @submit.prevent="editQuestion">
          <h3>title</h3>
          <b-form-input v-model="title" placeholder="Enter your Question title"></b-form-input><br>
          <h3>description</h3>
          <wysiwyg v-model="description" /><br>
          <b-button :type="'submit'" variant="success" >Save Question</b-button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return{
            title : '',
            description : '',
            questionId : ''
        }
    },
    props : ['id'],
    methods:{
        closeForm(){
            this.$emit('closeForm')
        },
        editQuestion(){
            axios({
                url:`http://localhost:3002/question/${this.questionId}`,
                method : 'put',
                data : {
                    title : this.title,
                    description : this.description,
                },
                headers:{
                    access_token : localStorage.access_token
                }
            })
                .then(({data})=> {
                    this.description = ''
                    this.title = ''
                    this.$emit('closeForm')
                    swal({
                        title: "Question Updated!",
                        icon: "success",
                    }); 
                })
                .catch(err => {
                    console.log(err)
                    swal({
                        title: "Question update fail!",
                        icon: "warning",
                    }); 
                })
        }
    },
    mounted(){
        this.title = this.$store.state.userQuestions[this.id].title
        this.questionId = this.$store.state.userQuestions[this.id]._id
        this.description = this.$store.state.userQuestions[this.id].description
    }
}
</script>

<style>

</style>