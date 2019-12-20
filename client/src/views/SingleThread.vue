<template>
<div>
  <b-container>
    <b-row>
      <b-col cols="12" class="flex-me mb-5 bg-white p-4 br-2 rounded">
        <div class="left">
          <VoteButton :modeURL="'thread'" :data="$store.state.currentThread"/>
        </div>
        <div class="right">
          <h1>{{$store.state.currentThread.title}}</h1>
          <p>{{$store.state.currentThread.content}}</p>
        </div>
          <b-button 
            class="flex-to-right" 
            variant="danger" 
            @click="deleteThread($store.state.currentThread._id)">Delete
          </b-button>
      </b-col>
      <b-col>
        <b-form @submit.prevent="onSubmit" @reset.prevent="onReset" class="mb-5 mt-4">
          <b-form-group
            id="input-group-1"
            label="Reply:"
            label-for="input-1"
            description="Write your reply here."
          >
            <wysiwyg
              id="input-2"
              v-model="form.content"
              type="textarea"
              required
              placeholder="Enter reply here"
            ></wysiwyg>
          </b-form-group>
          

          <div class="button-group">
            <b-button type="submit" variant="primary">Submit</b-button>
            <b-button type="reset" variant="danger">Reset</b-button>
          </div>
        </b-form>
        
        <ReplyList v-for="reply in $store.state.currentThread.replies" :key="reply._id" :reply="reply" />

      </b-col>
    </b-row>
  </b-container>
</div>
</template>

<script>
import VoteButton from '../components/VoteButton.vue'
import ReplyList from '../components/ReplyList.vue'

export default {
  name: 'SingleThread',
  components: {
    VoteButton,
    ReplyList
  },
  data() {
    return {
      form: {
        content: ''
      }
    }
  },
  methods: {
    replyThread() {
      console.log('reply')
    },
    onSubmit() {
      const payload = {
        id: this.$store.state.currentThread._id,
        data: this.form
      }
      this.$store.dispatch('replyThread', payload)
      
      // this.form.content = ''
    },
    onReset() {
      this.form.content = ''
    },
    deleteThread(id) {
      console.log(id)
      this.$store.dispatch('deleteThread', id)
    }
  }
}
</script>

<style scoped>
  .flex-me {
    display: flex;
  }
  .editr {
    background-color: #fff;
  }
  input[type="textarea"] {
    background-color: #fff !important;
  }
  .button-group {
    display: flex;
    flex-direction: row-reverse;
  }
  .button-group button {
    margin-left: 1rem;
  }
  .flex-to-right {
    margin-left: auto;
    align-self: flex-start;
  }
</style>