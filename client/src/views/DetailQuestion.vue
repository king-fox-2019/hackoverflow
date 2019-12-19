<template>
<div id="content" class="snippet-hidden">
  <div id="mainbar">
    <div class="grid">
      <h1 class="grid--cell fl1 fs-headline1">
        {{question.title}}
      </h1>
    </div>
    <div id="qlist-wrapper" class="flush-left">
      <div id="question-mini-list" v-show="show == 'add'">
        <div class="question-summary narrow" id="question-summary-59385317" style="padding: 30px;">
          <div class="summary" style="padding: 30px;">
            <div class="started">
              <h5 @click="showList">close</h5>
            </div>
            <br><br>
            <form @submit.prevent="editAnswer">
                <h3>description</h3>
                <wysiwyg v-model="editDescription" /><br>
                <b-button :type="'submit'" variant="success" >Save Answer</b-button>
            </form>
          </div>
        </div>
      </div>
      <div id="question-mini-list" v-show="show == 'list'">
          <div class="question-summary narrow" id="question-summary-59385317" style="padding: 30px;">
              <div class="js-voting-container grid fd-column ai-stretch gs4 fc-black-200" data-post-id="59385313">
              <button @click="upvotes(question._id)" class="js-vote-up-btn grid--cell s-btn s-btn__unset c-pointer" title="This question shows research effort; it is useful and clear (click again to undo)" aria-pressed="false" aria-label="up vote" data-selected-classes="fc-theme-primary"><svg aria-hidden="true" class="svg-icon m0 iconArrowUpLg" width="36" height="36" viewBox="0 0 36 36"><path d="M2 26h32L18 10 2 26z"/></svg></button>
              <div class="js-vote-count grid--cell fc-black-500 fs-title grid fd-column ai-center" itemprop="upvoteCount" data-value="0">{{votesCount}}</div>
              <button @click="downvotes(question._id)" class="js-vote-down-btn grid--cell s-btn s-btn__unset c-pointer" title="This question does not show any research effort; it is unclear or not useful (click again to undo)" aria-pressed="false" aria-label="down vote" data-selected-classes="fc-theme-primary"><svg aria-hidden="true" class="svg-icon m0 iconArrowDownLg" width="36" height="36" viewBox="0 0 36 36"><path d="M2 10h32L18 26 2 10z"/></svg></button>
              </div>
              <div class="summary" style="padding: 30px;">
              <h3 v-html="question.description">
              </h3>
              <div class="started">
                  <a href="#">{{question.user.username}}</a>
              </div>
              <div class="tags t-spring t-spring-boot">
                  <a v-for="(tag, id) in question.tags" :key="id" class="post-tag" rel="tag">{{tag}}</a> 
              </div>
              </div>
          </div>
          <div id="answers-header" style="padding:0px 20px">
              <div class="subheader answers-subheader">
                  <h2 data-answercount="2">
                  2 Answers
                  </h2>
                  <div id="tabs">
                      <a class="youarehere is-selected" href="/questions/59392104/change-the-value-of-input-tag-based-on-other-input-without-jquery?answertab=active#tab-top" data-nav-xhref="" title="Answers with the latest activity first" data-value="active" data-shortcut="A">
                      active</a>
                  </div>
              </div>
          </div>
          <listAnswer @edit="showForm" @fetch="fetchQuestionAnswer" v-for="(answer, id) in answers" :key="id" :answer="answer" :idnya="id"/>
          <div class="question-summary narrow" id="question-summary-59385317" style="padding: 30px;">
            <div class="summary" style="padding: 30px;">
              <br><br>
              <form @submit.prevent="addAnswer">
                  <h2>add answer</h2>
                  <wysiwyg v-model="description" /><br>
                  <b-button :type="'submit'" variant="success" >Submit Answer</b-button>
              </form>
            </div>
          </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'
import listAnswer from '../components/listAnswer'
export default {
  name: 'detail',
  components: {
    listAnswer
  },
  data(){
    return{
      question : [],
      answers : [],
      description : '',
      editDescription : '',
      editId : '',
      show : 'list'
    }
  },
  methods:{
    editAnswer(){
      axios({
        url:`http://localhost:3002/answer/${this.editId}`,
        method : 'put',
        data:{
          description : this.editDescription
        },
        headers : {
          access_token : localStorage.access_token
        }
      })
        .then(({data}) => {
          swal({
            title: "Answer updated!",
            icon: "success",
          });
          this.fetchQuestionAnswer()
          this.show = 'list'
        })
        .catch(console.log)
        .finally(()=> {
          this.editDescription = ''
        })
    },
    showForm(id){
      this.show = 'add'
      this.editId = this.answers[id]._id
      this.editDescription = this.answers[id].description
    },
    showList(){
      this.show = 'list'
    },
    fetchQuestion(){
      axios({
        url:`http://localhost:3002/question/${this.$route.params.id}`,
        methods:'get',
        headers :{
          access_token : localStorage.access_token
        }
      })
        .then(({data})=> {
          this.question = data
        })
        .catch(console.log)
    },
    upvotes(_id){
      axios({
        url:`http://localhost:3002/question/upvotes/${_id}`,
        method : 'patch',
        headers : {
          access_token : localStorage.access_token
        }
      })
        .then(({data})=>{
          this.fetchQuestion()
        })
        .catch(console.log)
    },
    downvotes(_id){
      console.log('kesini')
      axios({
        url:`http://localhost:3002/question/downvotes/${_id}`,
        method : 'patch',
        headers : {
          access_token : localStorage.access_token
        }
      })
        .then(({data})=>{
          this.fetchQuestion()
        })
        .catch(console.log)
    },
    fetchQuestionAnswer(){
      axios({
        url:`http://localhost:3002/answer/${this.$route.params.id}`,
        method:'get',
        headers:{
          access_token : localStorage.access_token
        }
      })
        .then(({data}) => {
          this.answers = data
        })
        .catch(console.log)
    },
    addAnswer(){
      console.log('ksei')
      axios({
        url:`http://localhost:3002/answer`,
        method:'post',
        data :{
          question : this.$route.params.id,
          description : this.description
        },
        headers :{
          access_token : localStorage.access_token
        }
      })
        .then(({data})=> {
          this.fetchQuestionAnswer()
          this.description = ''
          swal({
            title: "Answer added!",
            icon: "success",
          });
        })
        .catch(err=> {
          swal({
            title: "fail!",
            icon: "warning",
          });
          console.log(err)
        })
    }
  },
  computed:{
    votesCount(){
      const votes = this.question.votes
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
  mounted(){
    this.fetchQuestion()
    this.fetchQuestionAnswer()
  }
}
</script>
