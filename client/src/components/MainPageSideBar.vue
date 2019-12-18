<template>
  <div style="text-align:left;">
    <a href @click.prevent="goToHome">Home</a>
    <hr class="test">
    <form @submit.prevent="addUserTag">
      <div class="form-group">
        <label for="tags">Tags</label>
        <vue-tags-input v-model="tag" :tags="tags" @tags-changed="newTags => tags = newTags" />
      </div>
      <b-button type="submit" variant="warning"> <i class="far fa-plus-square"></i> </b-button>
    </form>
    <br>
    <hr class="test">
    <div>
      <h5> Watched Tags </h5>
      <UserTags v-for="(userTag, i) in user.tags" :key=i :UserTags=userTag></UserTags>
    </div>
  </div>
</template>

<script>
import VueTagsInput from '@johmun/vue-tags-input'
import axios from '../../apis/server'
import Swal from 'sweetalert2'
import UserTags from '../components/UserTags'

export default {
  name: 'MainPageSideBar',
  components: {
    VueTagsInput,
    UserTags
  },
  data () {
    return {
      tag: '',
      tags: []
    }
  },
  methods: {
    goToHome () {
      this.$router.push('/main/question-list')
      this.$store.dispatch('getAllQuestions')
    },
    addUserTag () {
      let tagTemp = []
      for (let i = 0; i < this.tags.length; i++) {
        tagTemp.push(this.tags[i].text)
      }
      axios({
        url: `/users`,
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
            title: 'Tag(s) added',
            showConfirmButton: false,
            timer: 1500
          })
        })
        .catch(err => {
          console.log(err)
          Swal.fire('Errors', `Internal server error`, `error`)
        })
    }
  },
  computed: {
    user: {
      get () {
        return this.$store.state.userData
      }
    }
  }
}
</script>

<style scoped>
hr.test {
  border-bottom: 1px solid black !important;
}
</style>
