<template>
  <div>
    <div class="input-group-prepend animated rotateInDownRight delay-0.5s" id="title">
      <span class="input-group-text" id="inputGroup-sizing-sm">Title</span>
      <input type="text" class="form-control"
      v-model="title"
      placeholder="Your Question Title"
      aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm">
    </div>
    <div id="post" class="animated fadeIn">
      <wysiwyg id="wysiwyg" v-model="message"/>
    </div>
    <div id="button" class="animated rotateInDownRight delay-1s">
      <b-button
      style="width: 30%"
      variant="outline-primary"
      @click="post">ASK</b-button>
    </div>
  </div>
</template>

<script>
import router from '../router';

export default {
  data() {
    return {
      title: '',
      message: '',
    };
  },
  methods: {
    post() {
      const questions = {
        title: this.title,
        description: this.message,
      };
      this.$store.dispatch('askQuestion', questions);
      this.title = '';
      this.message = '';
      router.push({ name: 'question' });
    },
  },
};
</script>

<style scoped>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";
#wysiwyg{
  border: 2px solid blue;
  box-shadow: 5px 5px blue;
}
#post {
  display: flex;
  justify-content: center;
  background-color: snow !important;
  height: 25rem;
  margin-right: 20%;
  margin-left: 20%;
}
#title {
  margin-top: 5%;
  margin-bottom: 1%;
  margin-right: 20%;
  margin-left: 20%;
}
#button {
  margin-top: 2%;
  display: flex;
  justify-content: center;
  margin-bottom: 1%;
  margin-right: 20%;
  margin-left: 20%;
}
</style>
