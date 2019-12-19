<template>
  <div>
    <b-form>
      <b-form-group id="input-group-1" label="Title:" label-for="input-1" >
        <b-form-input v-model="title" id="input-2" type="text" required placeholder="Enter title"></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-1" label="Description:" label-for="input-1">
          <b-form-textarea
            id="textarea"
            v-model="description"
            placeholder="Enter something..."
            rows="3"
            max-rows="6"
          ></b-form-textarea>
          <!-- <wysiwyg v-model="description" /> -->
      </b-form-group>
      <b-btn variant="outline-dark" @click="addQuestion">Submit</b-btn>
    </b-form>
  </div>
</template>

<script>
import axios from 'axios'
import { mapMutations } from 'vuex'
 
export default {
    name:'questionForm',
    data(){
        return {
            title:'',
            description:''
        }
    },
    computed:{
        ...mapMutations({addNewQuestion:'question/ADD_QUESTION'})
    },
    methods:{
        addQuestion(){
            axios({
                method:'post',
                url:'http://localhost:3000/question',
                headers:{token:localStorage.getItem('token')},
                data:{
                    title:this.title,
                    description:this.description
                }
            })
            .then(({data})=>{
                $('#myModal1').modal('hide')
                this.$store.commit('question/ADD_QUESTION',data)
                this.$swal({
                    type:'success',
                    title:'Add Success',
                    timer:'1000'
                })
            })
            .catch(err=>{
                console.log(err)
                this.$swal({
                    type:'error',
                    title:'Fail add',
                    timer:1000
                })
            })
        }
    }
}
</script>

<style>
/* @import "~vue-wysiwyg/dist/vueWysiwyg.css" */
</style>