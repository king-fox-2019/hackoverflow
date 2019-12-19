<template>
  <div class="d-flex flex-column container">
    <div class="d-flex flex-column border-bottom">
      <div class="d-flex justify-content-between mb-4">
        <h3>Top Question</h3>
        <button class="btn-sm btn-primary" @click.prevent="askQuestion">Ask Question</button>
      </div>
      <div>
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">Home</li>
            <li class="breadcrumb-item">Library</li>
            <li class="breadcrumb-item">Data</li>
          </ol>
        </nav>
      </div>
    </div>
    <div class="d-flex flex-column mt-2">
      <Card></Card>
    </div>
  </div>
</template>

<script>
import Card from '@/components/Card.vue'
export default {
  components: {
    Card
  },
  data () {
    return {

    }
  },
  methods: {
    askQuestion () {
      this.$router.push('/add')
    }
  },
  created () {
    this.$store.dispatch('question/fetchQuestion')
  }
}
</script>

<style scoped>
.col-left{
  width: 25%;
}

.col-right{
  width: 75%;
}

.card-wrap-inside{
  padding: 0;
  margin: 0;
  height: 100%;
}
</style>
