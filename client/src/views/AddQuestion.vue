<template>
  <div>
    <div class="form-group">
      <input
        v-model="title"
        type="text"
        class="form-control pl-2 pr-2 rounded-0"
        placeholder="Title"
        style="background-color:transparent;border:0px;border-left:3px solid orange;box-shadow:none;border-bottom:0px;font-size:30px"
      />
    </div>
    <div class="pl-2" style="border-left:3px solid orange;font-size:30px;text-align:left">
      <vue-editor placeholder="Description" v-model="description"></vue-editor>
    </div>
    <div class="pt-2 d-flex justify-content-start pl-0">
      <a
        @click.prevent="askQuestion"
        class="btn rounded-0"
        style="background-color:orange;color:white"
        role="button"
      >Ask Question</a>
    </div>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      title: "",
      description: ""
    };
  },
  methods: {
    askQuestion() {
      const payload = {
        title: this.title,
        description: this.description
      };
      this.$store
        .dispatch("askQuestion", payload)
        .then(data => {
          Swal.fire(
            "Success!",
            "You have successfully asked the question",
            "success"
          );
          this.$router.push("/myquestion");
        })
        .catch(err => {
          console.log(err);
          Swal.fire("Oops!", "error", "error");
        });
    }
  },
  components: {
    VueEditor
  },
  computed: {
    createdAt() {
      return moment(this.currentQuestion.createdAt).format("ll");
    }
  }
};
</script>

<style></style>