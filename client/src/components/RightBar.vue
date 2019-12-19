<template>
    <div class="col-3" style="height:90vh;width:30%;margin-bottom:150px;">
        <div class="top-list" style="margin-top:30px;">
               <div class="card" >
                   <div class="header">
                    <h6>Top Questions</h6>
                   </div>

                    <div v-for="(top,i) in topThree" :key="i" class="card-body" style="flex-direction: row;">
                        <div class="votes" style="display:flex">
                            <button type="button" class="btn-vote" >
                                <i class="far fa-comment-alt"></i>
                            </button>
                        </div>
                        <div class="right-content">

                        <a @click.prevent="article()" class="card-text" style="text-align:left;font-weight:700">{{top.title}}</a>                    
                        <div class="update">
                        <p style="font-size:12px;text-align:left;margin-top:5px;" >{{top.createdAt.slice(0,10)}} asked by <strong>{{top.userId.name}}</strong></p>
                        </div>
                        </div>
                    </div>


                </div>
        </div>

       <div class="top-list" style="margin-top:30px;">
               <div class="tags-card" >
                   <div class="header-tag">
                    <h6>Watched Tags</h6>
                   </div>
                    <div class="card-body"  id="tags">
                        <div class="right-content">
                            <form>
                                <div class="form-group" style="display:flex;align-items:center">
                                      <div class="form-group">
                                        <p for="exampleFormControlSelect1" style="text-align:left;font-size:20px;">Choose tags</p>
                                        <br>
                                        <select v-model="choosenTag" class="form-control" style="width:200px;" id="exampleFormControlSelect1">
                                        <option v-for="(tag,i) in allTags" :key='i' >{{tag}}</option>
                                        </select>
                                    </div>
                                    <button type="submit" @click="addUserTags" class="btn btn-primary btn-sm" style="height:40px;margin-left:20px;width:100px;margin-top:40px;">add</button>
                                </div>
                            </form>
                        </div>

                        <div class="tags">
                            <button class="tag" v-for="(tag,i) in userTags" :key="i"  @click="filter(tag)" type="submit">{{tag}}</button>
                        </div>

                    </div>
                </div>



        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    data(){
        return {
            choosenTag: ''
        }
    },
    methods: {
        article(){
            console.log('test')
        },
        addUserTags(){
            this.$store.dispatch('addUserTags',this.choosenTag)
        },
        filter(keyword){
            this.$store.dispatch('filterData',keyword)
        }
    },
    created(){
        this.$store.dispatch('getUserTags')
        this.$store.dispatch('getTopThree')
    },
    computed: mapState(['allTags','userTags','topThree'])
}
</script>

<style scoped>

.right-content{
    margin-left:0px;
}
.col-3{
    margin-top:70px;
    overflow: scroll;

    right:0px;
     /* z-index: -1; */
}

button:focus {
    outline:none !important;
}

p{
    font-size:12px;
    margin:0px;
}

h6{
    text-align: left;
}

a {
    font-size:13px;
    cursor: pointer;
}

#tags{
    border: 0.5px solid rgb(191, 191, 191);
}

.tags{
    display: flex;
    flex-wrap: wrap;
}

.card{
    border:none;
    background-color:rgb(255, 249, 228);
    /* border: 0.5px solid rgb(242, 228, 176) */
}

.card-body{
    border: 0.25px solid rgb(242, 228, 176);
    display: flex;
    flex-direction: column;
    padding-right:100px;
}

.header{
    background-color:rgb(255, 244, 204);
    display: flex;
    align-content: center;
    align-items: center;
    padding:15px;
    padding-bottom:5px;
    border: 0.5px solid rgb(242, 228, 176)
}

.header-tag{
    background-color:rgb(245, 245, 245);
    display: flex;
    align-content: center;
    align-items: center;
    padding:15px;
    padding-bottom:5px;
    border: 0.5px solid rgb(193, 193, 193);
    border-bottom: none;
}

.btn-vote{
    height:70px;
    width:70px;
    margin-top:-5px;
    margin-left:-20px;
    margin-right:-10px;
    border:none;
    background-color:transparent;
}



</style>