<template>
  <div class="banner">
    <hr>
    <strong class="has-text-info">QUESTION YOU HAVE ANSWERED:</strong>
    <div v-for="answer in userAnswers" :key="answer._id">
      <div class="columns">
        <div class="column">
          {{ answer.question.title }}
        </div>
        <div class="column">
          <a @click="$router.push(`/users/edit/answer/${answer._id}`)">edit</a>
        </div>
      </div>
    </div>
    <div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'userAns',
  computed: {
    ...mapState(['userAnswers'])
  },
  methods: {
    getUserAnswers () {
      this.$store.dispatch('getUserAnswers')
    },
    removeAnswer (id) {
      this.$store.dispatch('removeAnswer')
   
    }
  },
  created () {
    this.getUserAnswers()
  }
}
</script>

<style scoped>
.columns {
  display: flex;
  flex-direction: column;
}
.column {
  text-align: left;
  margin: 10px;
}
.banner {
  margin-left: 0%;
}
</style>
