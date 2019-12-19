<template>
  <div>
    <b-card no-body>
      <b-tabs card>
        <b-tab title="Questions" active>
          <b-card-text>
            <div
              class="container-fluid"
              v-for="usersQuestion in this.$store.state.allUsersQuestions"
              :key="usersQuestion._id"
              style="border-bottom: 2px solid gray; padding: 15px; text-align: left;"
            >
              <div class="row">
                <div class="col-md-12">
                  <h2>{{ usersQuestion.title }}</h2>
                  <p v-html="usersQuestion.desc"></p>
                  <div class="row">
                    <div class="col-md-2">
                      <button
                        @click.prevent="setUpdateQuestion(usersQuestion._id)"
                        type="button"
                        class="btn btn-success"
                      >update</button>
                    </div>
                    <div class="col-md-8"></div>
                    <div class="col-md-2">
                      <button
                        @click.prevent="deleteQuestion(usersQuestion._id)"
                        type="button"
                        class="btn btn-danger"
                      >delete</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </b-card-text>
        </b-tab>
        <b-tab title="Answers">
          <b-card-text>
            <div
              class="container-fluid"
              v-for="usersAnswer in this.$store.state.allUsersAnswers"
              :key="usersAnswer._id"
              style="border-bottom: 2px solid gray; padding: 15px; text-align: left;"
            >
              <div class="row">
                <div class="col-md-12">
                  <p v-html="usersAnswer.desc"></p>
                  <div class="row">
                    <div class="col-md-2">
                      <button
                        @click.prevent="setUpdateAnswer(usersAnswer._id)"
                        type="button"
                        class="btn btn-success"
                      >update</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </b-card-text>
        </b-tab>
        <b-tab title="Watched Tags">
          <b-card-text>
            <div
              class="container-fluid"
              v-for="(userTag, i) in user.tags"
              :key="i"
            >
              <b-badge pill variant="warning">{{ userTag }}</b-badge>
            </div>
            <br>
            <b-button v-b-modal="'my-modal'"> Delete Watched Tags </b-button>
            <b-modal id="my-modal" ref="my-modal" title="Edit your watched tags" button-size="sm">
              <vue-tags-input v-model="tag" :tags="tags" @tags-changed="newTags => tags = newTags" />
              <div slot="modal-footer">
                <b-button variant="outline-primary" @click.prevent="deleteUserTags">Delete</b-button>
              </div>
            </b-modal>
          </b-card-text>
        </b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>

<script>
import axios from '../../apis/server'
import Swal from 'sweetalert2'
import VueTagsInput from '@johmun/vue-tags-input'

export default {
  name: 'UserHomePageContent',
  components: {
    VueTagsInput
  },
  data () {
    return {
      tag: '',
      tags: []
    }
  },
  methods: {
    deleteQuestion (questionId) {
      axios({
        url: `/questions/${questionId}`,
        method: 'DELETE',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          Swal.fire({
            icon: 'success',
            title: 'Question deleted',
            showConfirmButton: false,
            timer: 1500
          })
          this.$store.dispatch('getAllUsersQuestions')
        })
        .catch(err => {
          console.log(err)
          Swal.fire('Errors', `Internal server error`, `error`)
        })
    },
    setUpdateQuestion (questionId) {
      this.$store.dispatch('fetchDataUpdateQuestion', questionId)
    },
    setUpdateAnswer (answerId) {
      this.$store.dispatch('fetchDataUpdateAnswer', answerId)
    },
    deleteUserTags () {
      let tagTemp = []
      for (let i = 0; i < this.tags.length; i++) {
        tagTemp.push(this.tags[i].text)
      }
      axios({
        url: `/users/delete-tag`,
        method: 'PATCH',
        data: {
          tags: tagTemp
        },
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          Swal.fire({
            icon: 'success',
            title: 'Watched tag(s) updated',
            showConfirmButton: false,
            timer: 1500
          })
          this.$store.dispatch('fetchUserData')
          this.tags = []
        })
        .catch(err => {
          console.log(err.response.data.message)
          Swal.fire('Errors', `${err.response.data.message}`, `error`)
        })
      this.$refs['my-modal'].hide()
    }
  },
  computed: {
    user: {
      get () {
        return this.$store.state.userData
      }
    }
  },
  created () {
    this.tags = this.$store.state.userData.tags
  }
}
</script>

<style>
</style>
