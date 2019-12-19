<template>
  <b-container>
    <b-row>
      <ThreadList 
            v-for="thread in $store.state.threads" 
            :key="thread._id" 
            :thread="thread" 
          />
    </b-row>
  </b-container>
</template> 

<script>
import ThreadList from '../components/ThreadList.vue'
export default {
  components: {
    ThreadList
  },
  methods: {
    fetchThread() {
      this.$store.dispatch('fetchThread')
    }
  },
  created() {
    this.fetchThread()
  }
}
</script>

<style>

</style>