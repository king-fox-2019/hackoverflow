<template>
  <b-container>
    <b-row>
      <b-col>
        <b-button v-if="$store.state.isLogin" variant="info" class="add-thread" @click="addThread">Ask Question</b-button>
        <ThreadList 
              v-for="thread in $store.state.threads" 
              :key="thread._id" 
              :thread="thread" 
            />
      </b-col>
    </b-row>
  </b-container>
</template> 

<script>
import ThreadList from '../components/ThreadList.vue'
import AddThreadButton from '../components/AddThreadButton.vue'
export default {
  components: {
    ThreadList,
    AddThreadButton
  },
  methods: {
    fetchThread() {
      this.$store.dispatch('fetchThread')
    },
    addThread() {
      this.$router.push('/thread')
    }
  },
  created() {
    this.fetchThread()
  }
}
</script>

<style>
  .add-thread {
    display: block;
    margin-bottom: 1rem;
  }
</style>