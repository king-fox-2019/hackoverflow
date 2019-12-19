<template>
  <div>
    <div class="columns">
    <div class="column q-maths">
      <div class="q-math num">
        {{ totalVote }}
      </div>
      <div class="q-math">
        votes
      </div>
        <div class="q-math number">
        {{ question.answers.length }}
      </div>
      <div class="q-math">
        answers
      </div>
    </div>

    <div class="column q-details is-three-fifths">
      <span class="q-title " @click="$router.push(`/questions/${question._id}`)">
        {{ question.title }}
      </span>
      <div class="q-detail">
        {{ truncateDesc }}
      </div>
      <div>
        <b-tag
        v-for="(tag, index) in question.tags" :key="index"
        class="tag-question clickable"
        ><span @click="$router.push(`/questions/tagged/${tag}`)">{{ tag }}</span></b-tag>
       </div>
    </div>

    <div class="column q-corners has-text-grey">
      <div class="q-corner">
       {{ period }}
      </div>
      <div class="q-corner">
        <button class="button is-light">{{ userUpper }}</button>
        <div>
        {{ question.user.username }}
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import period from '../helpers/period'
export default {
  name: 'Quest',
  props: ['question'],
  computed: {
    period () {
      return period.format(new Date(this.question.created_at))
    },
    userUpper () {
      return this.question.user.username.charAt(0).toUpperCase()
    },
    truncateDesc () {
      const div = document.createElement('div')
      div.innerHTML = this.question.description
      let result = div.textContent || div.innerText || ''
      if (result.length > 200) {
        result = result.substring(0, 200) + '...'
      }
      return result
    },
    totalVote () {
      return this.question.upVotes.length - this.question.downVotes.length
    }
  }
}
</script>

<style>
.q-maths {
  text-align: center;
}
.q-details {
  flex-grow: 1;
  text-align: left;
}
.q-corners {
  font-size: 11px;
  text-align: left;
}
.number {
  font-size: 24px;
}
.q-title {
  font-size: 21px;
  cursor: pointer;
}
.columns {
  padding: 5px;
}
</style>
