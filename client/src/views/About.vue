<template>
  <div class="about container">
    <div class="row" v-if="!setUser">
      <div class="col-6">
        <login />
      </div>
      <div class="col-6">
        <register />
      </div>
    </div>
    <div v-if="setUser">
      <div>
        <b-card no-body>
          <b-tabs card>
            <b-tab title="My Questions" active>
              <div v-for="question in allQuestion" :key="question.id">
                <myQuestion :data="question"/>
                <hr>
              </div>
            </b-tab>
            <b-tab title="My Answers">
              <div v-for="answer in allAnswer" :key="answer.id">
                <myAnswer :data="answer"/>
                <hr>
              </div>
            </b-tab>
          </b-tabs>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
import register from '../components/register'
import login from '../components/login'
import myQuestion from '../components/myQuestion'
import myAnswer from '../components/myAnswer'
import {mapGetters,mapActions} from 'vuex'

export default {
  name:'loginRegister',
  components:{
    register,
    login,
    myQuestion,
    myAnswer
  },
  computed:{
    setUser(){
     return this.$store.state.user
    },
      ...mapGetters({
        allAnswer: 'myAnswer/getmyAnswer',
        allQuestion: 'myQuestion/getmyQuestion',
    })
  },
  methods:{
    ...mapActions({
      fetchAnswer: 'myAnswer/fetchAction',
      fetchAction: 'myQuestion/fetchAction',
    })
  },
  created(){
    if(localStorage.getItem('token')){
      this.fetchAnswer()
       this.fetchAction()
      this.$store.commit('setUser',true)
    }else{
      this.$store.commit('setUser',null)
    }
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>