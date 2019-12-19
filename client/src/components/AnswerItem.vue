<template>
  <div class="answer">
    <div class="row">
      <div class="col-sm-1 text-right" v-if="$store.state.isLogin">
        <span @click="upvote"><i class="fa fa-arrow-up"></i></span>
        <span><i class="fa fa-arrow-down"></i></span>
      </div>
      <div class="col-sm-1 status">
        <div class="number">{{answer.votes.length}}</div>
        Vote
      </div>
      <div class="col-sm-10 p-2">
        {{answer.content}}
      </div>
    </div>
  </div>
</template>

<script>
import axios from '../config/api'
export default {
  name: 'AnswerItem',
  props: {
    answer: Object
  },
  methods: {
    upvote () {
      this.$emit('refresh')
      axios({
        method: 'PATCH',
        url: `/answer`,
        data: {
          answer: this.answer._id
        },
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          this.$store.dispatch('fetchData')
        })
        .catch(() => {
          this.$swal.fire(
            'something wrong',
            'already voted',
            'error'
          )
        })
    }
  }
}
</script>

<style scoped>
.answer {
  margin-left: 4vw;
  margin-top: 10px
}
.answer .status {
  border: 1px solid orange;
  font-size: 0.6em;
  height: 3rem;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
}
.answer .number {
  color: aqua;
  font-size: 1.4rem
}
</style>
