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
      @click="edit">Edit</b-button>
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
    edit() {
      this.$store.dispatch('sentEdit', {
        title: this.title,
        message: this.message,
        id: router.currentRoute.params.id,
      });
    },
  },
  created() {
    this.title = this.$store.state.editQuestions.title;
    this.message = this.$store.state.editQuestions.description;
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
