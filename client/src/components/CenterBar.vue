<template>
  <div class="col-6">
      <div class="top-option">
          <h3>Questions Section</h3>
          <button type="button" class="btn btn-primary" @click="ask" >Ask Question</button>
      </div>
      <div class="filter-bar" style="margin-bottom:20px;margin-top:-20px">
            <div class="btn-group btn-group-toggle" style="color: transparent;" data-toggle="buttons">
                <label class="btn btn-secondary active">
                    <input type="radio" name="options" @click="fetchAll" id="option1" autocomplete="off" checked> Newest
                </label>
                <label class="btn btn-secondary">
                    <input type="radio" name="options" @click="unanswered" id="option1" autocomplete="off"> Unanswered
                </label>
                <label class="btn btn-secondary">
                    <input type="radio" name="options" @click="popular" id="option1" autocomplete="off"> Popular
                </label>
            </div>
      </div>
        <div class="card" v-for="(question,i) in questions" :key="i" style="border:none">
            <hr>
            <div class="card-body">
                <div class="votes" style="display:flex">
                    <button type="button" class="btn-vote" style="height:100px;width:100px;margin:5px;border :none">
                        <h5 style="margin:0px">{{question.upVotes.length - question.downVotes.length}}</h5>
                        <p style="font-size:14px;margin:0px">votes</p>
                    </button>
                </div>
                <div class="votes" style="display:flex">
                    <button type="button" class="btn-vote" style="height:100px;width:100px;margin:5px;border:none">
                        <h5 style="margin:0px">{{question.answers.length}}</h5>
                        <p style="font-size:14px;margin:0px">answers</p>
                    </button>
                </div>
                <div class="right-content" style="width:100%;">
                    
                <a @click.prevent="article(question._id)" class="card-text" style="text-align:left;font-size:22px;font-weight:500">{{question.title}}</a>
                <br>
                <div class="tags">
                    <button style="font-size:16px;margin:5px;" v-for="(tag,index) in question.tags" :key="index" class="tag" type="submit">{{tag}}</button>
                </div>
                 <div class="update">
                     <br>
                    <div class="lower-card" style="margin-top:-50px;margin-bottom:0px;">
                    <p style="font-size:14px;text-align:right;margin-top:5px;">
                         <img :src="question.userId.profilePicture" style="height:40px;width:40px;object-fit: cover; border-radius:5%;margin-right:10px;margin-top:10px;" alt="">
                        <!-- <img :src="question.userId.profilePicture" style="height:40px;border-radius:5%;margin-right:10px;" alt=""> -->
                         asked by 
                    <strong>{{question.userId.name}}</strong> 
                    <p style="font-size:14px;text-align:right;margin-top:-25px;">
                    at {{question.createdAt.slice(0,10)}}    
                    </p>
                    </div>
                </div>
                </div>
            </div>
        </div>

        
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    name: 'main-page',
    computed : mapState(['questions','isLogin']),
    methods:{
        fetchAll(){
            this.$store.dispatch('fetchQuestion')
        },
        unanswered(){
            this.$store.dispatch('unansweredQuestion')
        },
        popular(){
            this.$store.dispatch('popular')
        },
        ask(){
            this.$router.push('/ask')
        },
        article(id){
            this.$router.push(`/questions/${id}`)
        }
    },
    created(){
      this.$store.dispatch('fetchQuestion')
    }
    

}
</script>

<style>


a{

    cursor: pointer;
    font-size:18px;
}

.card-body{
    width:100%;
    display: flex;
    justify-content: flex-start;
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
.card{
    border :none;
    width:100%;
    min-width:500px;
}

.top-option{
    display:flex;
    justify-content: space-between;
    margin-bottom: 50px;
    padding-left:50px;
    padding-right:50px;
}

.tag{
    background-color:rgb(191, 225, 255);
    border:none;
    border-radius:5px;
    color: rgb(53, 72, 114);
    margin:2px;
    font-size:12px;
}

.tags{
    display: flex;
    justify-content: flex-start;
}

.right-content{
    display: flex;
    flex-direction: column;
    margin-left:20px;
}

.votes{
    margin-top:-15px;
    margin-right:10px;
}

h5{
    color: rgb(89, 89, 89);
}

h3{
    color: rgb(89, 89, 89);
}

p{
    color: rgb(89, 89, 89);
}

.btn-secondary {
    color: rgb(89, 89, 89) ! important;
    background-color:transparent ! important;
    border-color: #6c757d;
}

hr{
    margin :0 ! important;
    /* padding:0px; */
}   


button:focus {
    outline:none !important;
}

</style>