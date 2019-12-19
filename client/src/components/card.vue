<template>
  <b-card bg-variant="dark" text-variant="white" :title="question.title" style="width:500px">
    <b-card-text>
        
    </b-card-text>
    <b-button variant="light"><router-link :to="`/detail/${question._id}`"> Go Detail </router-link></b-button>
  </b-card>
</template>

<script>
export default {
    name:'card',
    props:['question']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>