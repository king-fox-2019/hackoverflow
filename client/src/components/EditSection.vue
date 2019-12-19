<template>
  <div class="col-6">
    <h3 style="text-align:left;margin-left:50px;">Edit Section</h3>
      <div class="question">
          <form @submit.prevent="editQuestion">
            <div class="form-group">
                <label for="exampleInputEmail1">Title</label>
                <input v-model="title" type="text" class="form-control" id="text" aria-describedby="text">
                <small id="text" class="form-text text-muted">Be specific and imagine you’re asking a question to another person</small>
            </div> 
            <wysiwyg v-model="myHTML" style="width:100%" />
            <br>
            <vue-tags-input class="tags-input" 
                v-model="tag"
                :tags="tags"
                @tags-changed="newTags => tags = newTags"
            />
            <br>
           
            <button type="submit" class="btn btn-primary">Submit</button>
            </form>



        </div>
  </div>
</template>

<script>

import VueTagsInput from '@johmun/vue-tags-input';
import { mapState } from 'vuex';
export default {
    data(){
        return{
            myHTML : '',
            tag: '',
            tags: [],
            title: '',
            questionId:''
        }
    },
    computed : mapState(['detailQuestion']),
    components: {
        VueTagsInput,
    },
    methods:{
        editQuestion(){
            this.$router.push(`/personal`)
        let tags= []
            for(let i = 0 ; i < this.tags.length ; i++){
                tags.push(this.tags[i].text)
            }
            let payload = {
                title : this.title,
                question : this.myHTML,
                tags: tags,
                questionId : this.questionId
            }
            this.$store.dispatch('editQuestion',payload)
        }
    },
    created(){
        this.$store.dispatch('fetchQuestionById',this.$route.params.id)
    },
    watch: {
        detailQuestion(val){
            console.log(val)
            this.myHTML = val.question
            this.title = val.title
            this.tags = val.tags
            this.questionId = val._id
        }
    }

}
</script>

<style scoped>

@import "~vue-wysiwyg/dist/vueWysiwyg.css";


.tags-input{
    width: 100% !important;
}

.ti-tag[data-v-61d92e31] {
    background-color: rgb(192, 135, 92) !important;
    color: #fff;
    border-radius: 2px;
    display: flex;
    padding: 3px 5px;
    margin: 2px;
    font-size: .85em;
}

.col-6{

    margin-top:70px;
    z-index: 0;
    background-color:rgb(255, 255, 255);
    height:100vh;
    width:30%;
    margin-left:25%;
    padding-top:70px;
    
}

.question{
    margin-top:100px;
    width: 100%;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
}


</style>