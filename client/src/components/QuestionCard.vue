<template>
  <div class="d-flex mt-3">
    <div class="col-md-2"></div>    
    <div class="card mb-3 col-md-8 border-secondary">
      <div class="row no-gutters">
        <div class="col-md-3 text-center">
          <p class="mt-3">{{totalVote}}</p> 
          <p>votes</p>
        </div>
        <div class="col-md-7">
          <div class="card-body">
            <h5 class="card-title">{{question.title}}</h5>
            <p class="card-title">Asked by {{question.UserId.username}}</p>
          </div>
        </div>
        <div class="col-md-2">
          <button class="btn btn-secondary mt-4 ml-3" @click='detail(question._id)'>Detail</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

  name: 'QuestionCard',

  data () {
    return {
    }
  },
  props: ['question'],
  created(){
  },
  computed: {
    totalVote(){
      return this.$store.getters.voteCount
    }
  },
  methods: {
    detail(id){
      this.$router.push('/questions/' + id)
    }
  }
}
</script>

<style lang="css" scoped>
</style>