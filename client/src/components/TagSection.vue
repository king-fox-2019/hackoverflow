<template>
  <div class="col-6">
    <h3 style="text-align:left;margin-left:50px;">Tags Section</h3>
    <br>
    <hr>
    <br>
      <div class="top-option">
          


          <div class="tags">
                
                    <div class="right-content" style="display:flex;flex-direction:row;flex-wrap:wrap;">
                    <button  v-for="(tag,i) in allTags" :key='i'  class="tag" type="submit">{{tag}}</button>
                    </div>

          </div>


        </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    computed: mapState(['allTags']),
    created(){
        this.$store.dispatch('getAllTags')
    }
}
</script>

<style scoped>

.tags{
    display: flex;
    flex-wrap: wrap;
}

.tag{
    width:initial ! important;
    text-align: left;
    font-size:24px;
    padding-left:20px;
    padding-right:20px;
    margin:10px;
    
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


.card-body{
    max-width:30%;
    display: flex;
    justify-content: flex-start;
}

.card{
    border :none;
}

.top-option{
    display:flex;
    justify-content: space-between;
    margin-bottom: 50px;
    padding-left:50px;
    padding-right:50px;
}



.right-content{
    display: flex;
    flex-direction: column;
    margin-left:20px;
}

.votes{
    margin-top:-15px
}

p{
    color: rgb(89, 89, 89);
    font-size: 14px;
    text-align: left;
}

h6{
    color: rgb(89, 89, 89);
    font-style: 16px;
    text-align: left;
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
</style>