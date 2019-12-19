<template>
  <div class="wysiwyg">
    <v-text-field 
      v-model="title" 
      label="Title" 
      name="title" 
      prepend-icon="" 
      type="text" />
      <v-container>
        <VueEditor v-model="myHTML"/>
        <!-- <wysiwyg v-model="myHTML" /> -->
      </v-container>

    <v-container fluid>
      <v-layout wrap>
        <v-flex xs12>
          <v-combobox 
            multiple
            v-model="select" 
            label="Tags" 
            append-icon
            chips
            deletable-chips
            class="tag-input"
            :search-input.sync="search" 
            @keyup.tab="pasted"
            @paste="pasted">
          </v-combobox>
        </v-flex>
      </v-layout>
    </v-container>

    <div class="btn-section">
      <v-btn @click="submitQuestion" color="primary">Submit</v-btn>
    </div>
  </div>
</template>

<script>
import axios from '../../configs/axios'
import toast from '../mixins/toast'
import { VueEditor } from 'vue2-editor'

export default {
  data: () => ({
    title: '',
    myHTML: '',

    select: [],
    search: ""
  }),

  methods: {
    submitQuestion () {
      axios({
        method: 'post',
        url: '/questions',
        data: {
          title: this.title,
          description: this.myHTML,
          tags: this.select
        },
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          this.toast(data.message)
          this.$router.push('/')
        })
        .catch(err => {
          const errMessages = err.response.data.messages;
          if (errMessages) {
            this.danger(errMessage[0])
          } else {
            this.danger("Couldn't connect to server.");
          }
        })
    },

    pasted() {
      this.$nextTick(() => {
        this.select.push(...this.search.split(","));
        this.$nextTick(() => {
          this.search = "";
        });
      });
    }
  },

  components: { VueEditor },

  mixins: [toast]
};
</script>

<style scoped>
.wysiwyg {
  margin: 20% 10%;
}

.btn-section {
  margin-top: 25px;
}
</style>