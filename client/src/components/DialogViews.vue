<template>
  <v-dialog v-model="openviews" scrollable max-width="300px">
    <v-card>
      <v-card-title>Peoples See This Question</v-card-title>
      <v-divider></v-divider>
      <v-card-text style="height: 300px;">
        <!-- {{ getViewsQuestion.views}} -->
        <div v-for="profile in getViewsQuestion.views" :key="profile._id">
          <div
            style="display:flex; flex-direction:row; justify-content: space-around; margin-top:10px;"
          >
            <v-avatar>
              <img :src="profile.avatar" alt="avatar" />
            </v-avatar>
            <p>{{ profile.username }}</p>
          </div>
        </div>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn color="blue darken-1" text @click="$emit('close-views', false)"
          >Close</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "DialogViews",
  props: {
    openviews: {
      type: Boolean
    }
  },
  computed: {
    getViewsQuestion() {
      return this.$store.state.question.detailQuestion;
    }
  },
  watch: {
    openviews(val) {
      if (!val) {
        this.$emit("close-views", false);
      }
    }
  }
};
</script>

<style></style>
