<template>
  <div :style="`background-color:${question.bgcolor}; padding: 30px;`" class="question-summary narrow" id="question-summary-59385317">
    <div class="js-voting-container grid fd-column ai-stretch gs4 fc-black-200" data-post-id="59385313">
      <button @click="upvotes(question._id)" class="js-vote-up-btn grid--cell s-btn s-btn__unset c-pointer" title="This question shows research effort; it is useful and clear (click again to undo)" aria-pressed="false" aria-label="up vote" data-selected-classes="fc-theme-primary"><svg aria-hidden="true" class="svg-icon m0 iconArrowUpLg" width="36" height="36" viewBox="0 0 36 36"><path d="M2 26h32L18 10 2 26z"/></svg></button>
      <div class="js-vote-count grid--cell fc-black-500 fs-title grid fd-column ai-center" itemprop="upvoteCount" data-value="0">{{votesCount}}</div>
      <button @click="downvotes(question._id)" class="js-vote-down-btn grid--cell s-btn s-btn__unset c-pointer" title="This question does not show any research effort; it is unclear or not useful (click again to undo)" aria-pressed="false" aria-label="down vote" data-selected-classes="fc-theme-primary"><svg aria-hidden="true" class="svg-icon m0 iconArrowDownLg" width="36" height="36" viewBox="0 0 36 36"><path d="M2 10h32L18 26 2 10z"/></svg></button>
    </div>
    <div class="summary" style="padding: 30px;">
      <h3>
        <a class="question-hyperlink" @click="seeDetail(question._id)">{{question.title}}</a>
      </h3>
      <div class="tags t-spring t-spring-boot">
          <a v-for="(tag, id) in question.tags" :key="id" class="post-tag" rel="tag">{{tag}}</a> 
      </div>
      <div class="started">
          <a href="#">{{question.user.username}}</a>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'listQuestion',
  props : ['question'],
  methods:{
    seeDetail(id){
      this.$router.push(`/detail/${id}`)
    },
    upvotes(_id){
      axios({
        url:`http://localhost:3002/question/upvotes/${_id}`,
        method : 'patch',
        headers : {
          access_token : localStorage.access_token
        }
      })
        .then(({data})=>{
          this.$store.dispatch('fetchAllQuestion')
          this.$store.dispatch('fetchUserQuestion')
        })
        .catch(console.log)
    },
    downvotes(_id){
      axios({
        url:`http://localhost:3002/question/downvotes/${_id}`,
        method : 'patch',
        headers : {
          access_token : localStorage.access_token
        }
      })
        .then(({data})=>{
          this.$store.dispatch('fetchAllQuestion')
          this.$store.dispatch('fetchUserQuestion')
        })
        .catch(console.log)
    }
  },
  computed:{
    votesCount(){
      const votes = this.question.votes
      Array.prototype.sum = function (prop) {
        var total = 0
        for ( var i = 0, _len = this.length; i < _len; i++ ) {
            total += this[i][prop]
        }
        return total
      }
      if(votes.length){
        return votes.sum('number')
      }else{
        return 0
      }
    }
  }
}
</script>

<style>

</style>
