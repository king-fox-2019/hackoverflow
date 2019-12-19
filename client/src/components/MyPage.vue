<template>
  <div class="col-6">
      <div class="top-option">
          <h3>My Section</h3>
      </div>
      <div class="filter-bar" style="margin-bottom:20px;margin-top:-20px">
      
      </div>
        <div class="card" v-for="(question,i) in myQuestion" :key="i" style="border:none">
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
                    
                <a class="card-text" style="text-align:left;font-size:22px;font-weight:500">{{question.title}}</a>
                <br>
                <div class="tags">
                    <button type="button" class="btn btn-warning" style="margin-right:10px;">Update</button>
                    <button @click="remove(question._id)" type="button" class="btn btn-secondary" >Delete</button>
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
    computed : mapState(['questions','isLogin','myQuestion']),

    methods : {
      remove(id){
          this.$store.dispatch('deleteQuestion',id)
      }
    },
    created(){
      this.$store.dispatch('fetchMyQuestion')
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
    color: rgb(23, 69, 167);
    margin:5px;
    font-size:18px;
    padding:5px;
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