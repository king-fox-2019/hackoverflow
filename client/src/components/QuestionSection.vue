<template>
  <div class="col-6">
      <div class="top-option" style="margin-bottom:0px;">

            <div class="answer" style="margin-bottom:0px;text-align:left;display:flex;align-items:center">
                <div class="title" style="width:20%;display:flex;">
                    <div class="vote-bar" style="display:flex;flex-direction:column;justify-content:space-between;">
                        <a style="margin-bottom:-20px;" @click="upVoteQuestion(detailQuestion._id)"> <i class="fas fa-sort-up"></i></a>
                        
                        <h4>{{detailQuestion.upVotes.length - detailQuestion.downVotes.length}}</h4>
                        <a style="margin-top:-20px;" @click="downVoteQuestion(detailQuestion._id)"> <i class="fas fa-sort-down"></i></a>
                    </div>
                </div>
            </div>
                  
            
        <div class="title" style="width:70%;marginleft:250px">
        <p style="text-align:left;">Question title</p>
        <h3>
            {{detailQuestion.title}}
        </h3>
        <div class="left" style="display:flex;align-items:center">
            <img :src="detailQuestion.userId.profilePicture" style="height:40px;width:40px;object-fit: cover; border-radius:5%;margin-right:10px;margin-top:10px;" alt="">
            <div class="text" style="display:flex;align-content:flex-start;flex-direction:column;margin-top:10px;">
                <p style="font-size:14px;text-align:left;margin-bottom:0px;">
                asked by 
                <strong>{{detailQuestion.userId.name}} </strong> 
                <p style="font-size:14px;text-align:left;margin-bottom:0px;">
                at {{detailQuestion.createdAt.slice(0,10)}}    
                </p>
            </div>
        </div>
        <br>
        <div class="tags" style="margin-left:0%">
            <button style="font-size:12px;margin:5px;" v-for="(tag,index) in detailQuestion.tags" :key="index" class="tag" type="submit">{{tag}}</button>
        </div>
        </div>
        <button type="button" class="btn btn-primary" @click="ask" style="height:50px;" >Ask Question</button>
      </div>
        <br>
        
    <br>
    <br>
            <div class="content">
                <p style="text-align:left;" v-html="detailQuestion.question">
                    <!-- {{detailQuestion.question}} -->
                </p>
            </div>

    <p style="text-align:left;margin-left:50px;font-size:24px;">Answers  : </p>
    <hr> 
    <br>

    <div class="answer" style="margin-bottom:0px;text-align:left;margin-left:-200px;">
        <div v-for="(answer,i) in detailQuestion.answers" :key=i class="title" style="width:100%;display:flex;">
            <div class="vote-bar" style="width:30%;display:flex;flex-direction:column;justify-content:space-around;height:100px;align-items:flex-end;margin-right:100px;">
                <a style="margin-bottom:-20px;" @click="upVoteAnswer(answer._id,detailQuestion._id)" > <i class="fas fa-sort-up"></i></a>
                <h4>{{answer.upVotes.length - answer.downVotes.length}}</h4>
                <a style="margin-top:-20px;" @click="downVoteAnswer(answer._id,detailQuestion._id)"> <i class="fas fa-sort-down"></i></a>
            </div>
            <div class="content" style="min-width:400px;max-width:600px">

                <p v-html="answer.text" >
                </p>

                    <div class="lower-card">
                        <p style="font-size:14px;text-align:right;margin-top:20px;">
                            <img :src="answer.userId.profilePicture" style="height:40px;width:40px;object-fit: cover; border-radius:5%;margin-right:10px;margin-top:10px;" alt="">
                                answered by 
                        <strong>{{answer.userId.name}}</strong> 
                        <p style="font-size:14px;text-align:right;margin-top:-25px;">
                        at {{answer.createdAt.slice(0,10)}}    
                        </p>
                    </div>
                <br>
                <br>
            </div>
        </div>
    </div>
    

      
      <div class="comments" style="margin-bottom:200px;width:100%;padding-left:0px;">
          <form @submit.prevent="submitAnswer" style="width:90%;">

            <h3>Have an Answers?</h3>
            <br>
            <wysiwyg v-model="myHTML" style="width:100%" />
            <br>
            <button type="submit" class="btn btn-primary">Submit</button>

            </form>
            <br>
        </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    data(){
        return{
            myHTML : '',
        }
    },
    methods : {
        ask(){
            this.$router.push('/ask')
        },
        submitAnswer(){
            let payload = {
                text : this.myHTML,
                questionId : this.$router.currentRoute.params.id
            }
            this.$store.dispatch('addAnswer',payload)
            this.myHTML = ''
        },
        upVoteQuestion(id){
            this.$store.dispatch('upVoteQuestion',id)
        },
        downVoteQuestion(id){
            this.$store.dispatch('downVoteQuestion',id)
        },
        upVoteAnswer(id,questionId){
            let payload = {
                answerId : id,
                questionId : questionId
            }
            this.$store.dispatch('upVoteAnswer',payload)
        },
        downVoteAnswer(id,questionId){
            let payload = {
                answerId : id,
                questionId : questionId
            }
            this.$store.dispatch('downVoteAnswer',payload)
        }
    },
    computed: mapState(['detailQuestion']),
}
</script>

<style scoped>

@import "~vue-wysiwyg/dist/vueWysiwyg.css";


.tags-input{
    width: 100% !important;
}

.fas{
    font-size:50px;
    margin:-10px;
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
    margin-left:20%;
    padding-top:70px;
    
}

.comments{
    margin-top:100px;
    width: 100%;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
}

h3{
    text-align: left;
}



</style>