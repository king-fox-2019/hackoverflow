<template>
  <v-card
    class="mx-auto"
    max-width="344"
  >
    <v-card-text>
      <p class="title text--primary mb-0">
        <v-icon class="material icons">
          mdi-eye
        </v-icon>
        Watched Tags
      </p>
      <!-- {{user}} -->
      <v-container fluid>
      <v-layout wrap>
        <v-flex xs12 class="tags-input-container">
          <v-combobox 
            multiple
            v-model="select" 
            label="Watch tags" 
            append-icon
            chips
            deletable-chips
            class="tag-input pr-5"
            :search-input.sync="search" 
            @keyup.tab="pasted"
            @paste="pasted"
            >
          </v-combobox>
          <v-btn @click="watchTags">Add</v-btn>
        </v-flex>
      </v-layout>
    </v-container>

    <v-container>
        <v-chip v-for="(tag, i) in user.watchedTags" :key="i"
          class="mr-1 mb-1"
          close
          @click:close="confirmRemoveFromWatchedTags(tag)"
          >{{tag}}</v-chip>
    </v-container>

    </v-card-text>

    <template class="dialog-confirm-remove-tag">
      <v-row justify="center">
        <v-dialog
          v-model="dialogConfirmRemoveTag"
          max-width="290"
        >
          <v-card>
            <v-card-title class="title">Remove from your watched tags?</v-card-title>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn
                color="grey darken-1"
                text
                @click="closeDialogConfirmRemoveTag"
              >
                No
              </v-btn>

              <v-btn
                color="red darken-1"
                text
                @click="removeFromWatchedTags"
              >
                Yes
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </template>

  </v-card> 
</template>

<script>
import { mapState } from 'vuex'
import axios from '../../configs/axios'
import toast from '../mixins/toast'

export default {
  name: 'sidebar-widget',

  computed: mapState(['user']),

  data () {
    return {
      select: [],
      search: "",

      dialogConfirmRemoveTag: false,
      tagToRemove: ''
    }
  },

  methods: {
    pasted() {
      this.$nextTick(() => {
        this.select.push(...this.search.split(","));
        this.$nextTick(() => {
          this.search = "";
        });
      });
    },

    watchTags() {
      axios({
        method: 'post',
        url: '/users/tags',
        headers: { access_token: localStorage.getItem('access_token') },
        data: { tags: this.select }
      })
        .then(_ => {
          this.select = []
          this.search = ""
          this.$store.dispatch('fetchCurrentUser')
        })
        .catch(err => {
          this.select = []
          this.search = ""
          const errMessages = err.response.data.messages
          if (errMessages) {
            this.danger(errMessages[0])
          } else {
            this.danger("Couldn't connect to server.")
          }
        })
    },

    confirmRemoveFromWatchedTags(tag) {
      this.dialogConfirmRemoveTag = true
      this.tagToRemove = tag
    },

    closeDialogConfirmRemoveTag() {
      this.dialogConfirmRemoveTag = false
      this.tagToRemove = ''
    },

    removeFromWatchedTags() {
      axios({
        method: 'delete',
        url: '/users/tags/' + this.tagToRemove,
        headers: { access_token: localStorage.getItem('access_token') }
      })
        .then(_ => {
          this.closeDialogConfirmRemoveTag()
          this.removeTag = ''
          this.$store.dispatch('fetchCurrentUser')
        })
        .catch(err => {
          const errMessages = err.response.data.messages
          if (errMessages) {
            this.danger(errMessages[0])
          } else {
            this.danger("Couldn't connect to server.")
          }
        })
    }
  },

  mixins: [toast]
}
</script>

<style>
.tags-input-container {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>