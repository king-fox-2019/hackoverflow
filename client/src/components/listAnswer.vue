<template>
<div>
  <div class="question-summary narrow" id="question-summary-59385317" style="padding: 30px;">
    <div class="js-voting-container grid fd-column ai-stretch gs4 fc-black-200" data-post-id="59385313">
      <button @click="upvotes(answer._id)" class="js-vote-up-btn grid--cell s-btn s-btn__unset c-pointer" title="This question shows research effort; it is useful and clear (click again to undo)" aria-pressed="false" aria-label="up vote" data-selected-classes="fc-theme-primary"><svg aria-hidden="true" class="svg-icon m0 iconArrowUpLg" width="36" height="36" viewBox="0 0 36 36"><path d="M2 26h32L18 10 2 26z"/></svg></button>
      <div class="js-vote-count grid--cell fc-black-500 fs-title grid fd-column ai-center" itemprop="upvoteCount" data-value="0">{{votesCount}}</div>
      <button @click="downvotes(answer._id)" class="js-vote-down-btn grid--cell s-btn s-btn__unset c-pointer" title="This question does not show any research effort; it is unclear or not useful (click again to undo)" aria-pressed="false" aria-label="down vote" data-selected-classes="fc-theme-primary"><svg aria-hidden="true" class="svg-icon m0 iconArrowDownLg" width="36" height="36" viewBox="0 0 36 36"><path d="M2 10h32L18 26 2 10z"/></svg></button>
    </div>
    <div class="summary" style="padding: 30px;">
    <h3 v-html="answer.description">
    </h3>
      <div class="started">
          <a href="#">{{answer.user.username}}</a>
      </div>
    </div>
  </div>
  <div v-if="answer.user.username == username">
    <a class="js-add-link comments-link disabled-link" @click="editAnswer">edit</a>
    <a class="js-add-link comments-link disabled-link" @click="deleteCurrent(answer._id)">delete</a>
  </div>
  <div class="comments js-comments-container bt bc-black-2 mt12 " >
    <ul class="comments-list js-comments-list">
        <li class="comment js-comment" v-for="(comment, id) in answer.comment" :key="id">
            <div class="js-comment-actions comment-actions">
                <div class="comment-score js-comment-edit-hide">
                </div>
            </div>
            <div class="comment-body js-comment-edit-hide">
                {{comment.comment}}
                -{{comment.user.username}}
            </div>
        </li>
    </ul>
  </div>
  <div>
      <a class="js-add-link comments-link disabled-link" @click="addKomen">add a comment</a>
      <div style="padding : 0px 30px;" v-show="komen">
        <form @submit.prevent="comments">
          <b-form-input style="width:50%;" v-model="textComment" placeholder="Enter your comment"></b-form-input><br>
          <b-button variant="outline-primary" :type="'submit'">Comment</b-button>
        </form>
      </div> 
  </div>
</div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'listAnswer',
  data(){
    return{
      username : localStorage.username,
      komen : false,
      textComment : ''
    }
  },
  props : ['answer', 'idnya'],
  methods:{
    comments(){
      axios({
        url:`http://localhost:3002/answer/${this.answer._id}`,
        method : 'patch',
        data : {
          comment : this.textComment
        },
        headers : {
          access_token : localStorage.access_token
        }
      })
        .then(({data}) => {
          this.$emit('fetch')
          this.addKomen()
        })
        .catch(console.log)
        .finally(asd => this.textComment = '')
    },
    addKomen(){
      if(this.komen){
        this.komen = false
      }else{
        this.komen = true
      }
    },
    deleteCurrent(id){
      swal({
        title: "Are you sure want to delete?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          axios({
            url:`http://localhost:3002/answer/${id}`,
            method:'delete',
            headers : {
              access_token : localStorage.access_token
            }
          })
            .then(({data}) => {
              swal({
                title: "Answer deleted!",
                icon: "success",
              });
              this.$emit('fetch')
            })
            .catch(err=> {
              console.log(err)
              swal({
                title: "Delete fail!",
                icon: "warning",
              });
            })
        } 
      });
    },
    editAnswer(){
      this.$emit('edit', this.idnya)
    },
    upvotes(_id){
      axios({
        url:`http://localhost:3002/answer/upvotes/${_id}`,
        method : 'patch',
        headers : {
          access_token : localStorage.access_token
        }
      })
        .then(({data})=>{
          this.$emit('fetch')
        })
        .catch(console.log)
    },
    downvotes(_id){
      axios({
        url:`http://localhost:3002/answer/downvotes/${_id}`,
        method : 'patch',
        headers : {
          access_token : localStorage.access_token
        }
      })
        .then(({data})=>{
          this.$emit('fetch')
        })
        .catch(console.log)
    },
  },
  computed:{
    votesCount(){
      const votes = this.answer.votes
      Array.prototype.sum = function (prop) {
        var total = 0
        for ( var i = 0, _len = this.length; i < _len; i++ ) {
            total += this[i][prop]
        }
        return total
      }
      if(votes && votes.length){
        return votes.sum('number')
      }else{
        return 0
      }
    }
  },
}
</script>

<style>

</style>
