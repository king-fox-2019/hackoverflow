<template>
    
        <nav class="navbar navbar-expand-lg navbar-light">
            <button style="border:none;background-color:transaparant">

            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRqsSVN5OXqT5pMow7ob7BajkpHTZvu2qvUVOdaWKlqLphB195r" @click="home" style="width:170px" alt="">
            </button>
              <div v-if="isLogin === true" class="input-group mb-2" style="margin-top:10px;padding-left:250px;padding-right:250px">
                <div class="input-group-prepend">
                <div class="input-group-text"></div>
                </div>
                <form  @submit.prevent="filter" style="width:50%;">
                    <input v-model="keyword" style="border-left:none" type="text" class="form-control" id="inlineFormInputGroup" placeholder="search...">
                </form>
            </div>
             <div v-if="isLogin"  class="left-bar" style="margin-right:50px;">
                <i class="fas fa-sign-out-alt"></i>
                <button class="btn my-2 my-sm-0" type="submit" @click="logout">Logout</button>
            </div>
           
        </nav>

</template>

<script>
import {mapState} from 'vuex'
export default {
    name: 'navbar',

    data(){
        return {
            keyword : ''
        }
    },

    methods : {
        filter(){
            // console.log(this.keyword)
            this.$store.dispatch('filterData',this.keyword)
            this.keyword = ''
        },
        home(){
            this.$router.push('/')
        },
        logout(){
            this.$store.commit('CHANGE_ISLOGIN',false)
            localStorage.removeItem('token')
            this.$router.push('/login')
        }
    },
    computed : mapState(['isLogin'])

}
</script>

<style scoped>

.navbar{
    background-color: white;
    border-top: 4px solid rgb(230, 117, 47);
    display: flex;
    align-items: center;
    align-content: center;
    border-bottom:1px solid  rgb(220, 220, 220);
    /* box-shadow: 10px 10px 22px -10px rgba(0,0,0,0.27); */
}

.input-group-text{
    background-image: url('https://cdn1.iconfinder.com/data/icons/hawcons/32/698956-icon-111-search-512.png');
    background-color:white;
    background-size:30px 30px;
    background-repeat: no-repeat;
    background-position:center;
    width:50px;
    padding:5px;
    border-right: none;
}

.form-control:focus{
    border-color: #cccccc;
    -webkit-box-shadow: none;
    box-shadow: none;
}

button:focus {
    outline:0;
}

.left-bar{
    display:flex; 
    align-items:center;
    margin-left:20px;
}
</style>