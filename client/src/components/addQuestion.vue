<template>
  <div class="question-summary narrow" id="question-summary-59385317" style="padding: 30px;">
    <div class="summary" style="padding: 30px;">
      <div class="started">
        <h5 @click="closeForm">close</h5>
      </div>
      <br><br>
      <form @submit.prevent="addQuestion">
          <h3>title</h3>
          <b-form-input v-model="title" placeholder="Enter your Question title"></b-form-input><br>
          <h3>description</h3>
          <wysiwyg v-model="description" /><br>
          <h3>tags</h3>
          <VueTagsInput
            v-model="tag"
            :tags="tags"
            @tags-changed="newTags => tags = newTags"
          /><br>
          <b-button :type="'submit'" variant="success" >Add Question</b-button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import VueTagsInput from '@johmun/vue-tags-input';
export default {
    data(){
        return{
            tag:'',
            tags :[],
            title : '',
            description : ''
        }
    },
    components: {
        VueTagsInput,
    },
    methods:{
        closeForm(){
            this.$emit('closeForm')
        },
        addQuestion(){
            const newTag = this.tags.map(item => item.text)
            axios({
                url:'http://localhost:3002/question',
                method : 'post',
                data : {
                    title : this.title,
                    description : this.description,
                    tags : newTag   
                },
                headers:{
                    access_token : localStorage.access_token
                }
            })
                .then(({data})=> {
                    this.description = ''
                    this.title = ''
                    this.tags = []
                    this.tag = ''
                    this.$emit('closeForm')
                    swal({
                        title: "Question success added!",
                        icon: "success",
                    }); 
                })
                .catch(err => {
                    console.log(err)
                    swal({
                        title: "Question add fail!",
                        icon: "warning",
                    }); 
                })
        }
    }
}
</script>

<style>

</style>