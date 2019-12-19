<template>
    <div class="mt-2 d-flex flex-column">
        <div class="card w-100 mt-2" v-for="data in question" :key="data._id">
          <div class="card-body d-flex w-100">
            <div class="w-25 d-flex text-center">
              <div class="d-flex flex-column justify-content-center mr-2">
                  <p>{{ data.upvote.length - data.downvote.length || 0 }}</p>
                  <p>votes</p>
              </div>
              <div class="d-flex flex-column justify-content-center mr-2">
                  <p>0</p>
                  <p>answer</p>
              </div>
              <div class="d-flex flex-column justify-content-center mr-2">
                  <p>{{ data.views.length || 0 }}</p>
                  <p>views</p>
              </div>
            </div>
            <div class="d-flex flex-column">
              <div>
                <h5 class="card-title title" @click.prevent="showDetail(data._id)" data-toggle="tooltip" data-placement="bottom" title="Open the question">{{ data.title }}</h5>
                <div class="d-flex">
                  <img :src="data.author.avatar" alt="" id="avatar">
                  <p class="card-text">by {{ data.author.email }}</p>
                </div>
              </div>
              <div class="d-flex justify-content-between mt-5">
                <div>
                  <span class="badge badge-info ml-2" style="cursor:pointer;" v-for="(item,index) in data.tags" :key="index" @click.prevent="searchTags(item)">{{item}}</span>
                </div>
                <div>
                  <p>{{ getTime(data.updatedAt) }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment'

export default {
  data () {
    return {
      getTime (val) {
        return moment(val).startOf('minutes').fromNow()
      }
    }
  },
  methods: {
    showDetail (id) {
      this.$store.dispatch('question/detailQuestion', id)
      this.$store.dispatch('answer/getQuestionAnswer', id)
      this.$store.dispatch('question/countView', id)
      this.$router.push(`/detail/${id}`)
    },
    searchTags (item) {
      this.$store.dispatch('question/searchTag', item)
    }
  },
  computed: {
    question () {
      return this.$store.state.question.listQuestion
    }
  },
  created () {
    this.$store.dispatch('question/fetchQuestion')
  }
}
</script>

<style scoped>
#avatar{
  width: 25px;
  height: 25px;
  border-radius: 50%;
  margin-right: 10px;
}

.title:hover{
  cursor: pointer;
  color: rgb(139, 119, 7);
}

.card-text{
  color: rgb(150, 150, 230);
}
</style>
