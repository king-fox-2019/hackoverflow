<template>
<div id="content" class="snippet-hidden">
  <div id="mainbar">
    <div class="grid">
        <h1 class="grid--cell fl1 fs-headline1">
          Questions
        </h1>
        <div class="ml12 aside-cta grid--cell print:d-none">
          <a @click="showAdd" class="ws-nowrap s-btn s-btn__primary" >
              Ask Question
          </a>
        </div>
    </div>
    <div id="qlist-wrapper" class="flush-left">
      <div id="question-mini-list">
        <div v-show="showForm == 'list'">
          <Question v-for="(question, id) in questions" :key="id" :question="question"/>
        </div>
        <addForm v-if="showForm == 'add'" @closeForm="showList"/>
      </div>
    </div>
    <br class="cbt"/>
    <h2 class="bottom-notice" data-loc="2">Looking for more? Browse the <a href="/questions">complete list of questions</a>, or <a href="/tags">popular tags</a>. Help us answer <a href="/unanswered">unanswered questions</a>.</h2>
  </div>
  <div id="sidebar">
    
    <div class="s-sidebarwidget mb16 module" data-controller="se-uql-list">
      <div class="s-sidebarwidget--header">Custom Filters</div>
      <ul class="s-sidebarwidget--content s-sidebarwidget__items">
          <li class="s-sidebarwidget--item fc-black-300">
              <a class="s-btn s-btn__link" data-action="se-uql-list#editCurrent" href="/questions?edited=true">Create a custom filter</a>
          </li>
      </ul>
    </div>

    <div class="js-tag-preferences-container">
      <div class="s-sidebarwidget mb16">
          <div class="s-sidebarwidget--header grid">
              <span class="grid--cell mr4"><svg aria-hidden="true" class="svg-icon iconEye" width="18" height="18" viewBox="0 0 18 18"><path d="M9.06 3C4 3 1 9 1 9s3 6 8.06 6C14 15 17 9 17 9s-3-6-7.94-6zM9 13a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-2a2 2 0 0 0 2-2 2 2 0 0 0-2-2 2 2 0 0 0-2 2 2 2 0 0 0 2 2z"/></svg></span>
              <span class="grid--cell fl1"> Watched Tags </span>
              <a class="js-edit-watched-tags grid--cell ml12 d-none" href="/users/tag-notifications/12540916#watching-1">edit</a>
          </div>
          <div class="s-sidebarwidget--content fd-column">
              <div class="js-watched-tag-list grid gs4 py4 fw-wrap d-none">
                  <script type="text/html" class="js-tag-template"><div class="js-tag grid--cell "><a href="/questions/tagged/template" class="post-tag" title="show questions tagged &#39;template&#39;" rel="tag">template</a></div></script>
              </div>

              <div class="js-add-watched-container"></div>

              <div class="js-show-add-watched-container grid fd-column ta-center ai-center gsy gs16 mx-auto">
                  <img class="grid--cell" alt="Tag watching" src="https://cdn.sstatic.net/Img/ico-binoculars.svg?v=d4dbaac4eec9" />
                  <div class="tags t-spring t-spring-boot">
                    <a v-for="(tag, id) in watchedTag" :key="id" class="post-tag" rel="tag">{{tag}}</a> 
                  </div>
                  <a @click="showAddTag" class="js-show-add-watched grid--cell s-btn s-btn__filled s-btn__icon"><svg aria-hidden="true" class="svg-icon iconEye" width="18" height="18" viewBox="0 0 18 18">
                  <path d="M9.06 3C4 3 1 9 1 9s3 6 8.06 6C14 15 17 9 17 9s-3-6-7.94-6zM9 13a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-2a2 2 0 0 0 2-2 2 2 0 0 0-2-2 2 2 0 0 0-2 2 2 2 0 0 0 2 2z"/></svg> 
                  Watch a tag</a>
                  <div v-show="addTag">
                    <form @submit.prevent="addTags" >
                      <b-form-input v-model="tag" placeholder="Enter your new tag"></b-form-input><br>
                      <b-button variant="success" :type="'submit'">Add Tag</b-button>
                    </form>
                  </div>
              </div>
          </div>
      </div>
      <div class="-ignored s-sidebarwidget mb16">
        <div class="s-sidebarwidget--header grid">
            <span class="grid--cell mr4"><svg aria-hidden="true" class="svg-icon iconNotInterested" width="18" height="18" viewBox="0 0 18 18"><path d="M9 17A8 8 0 1 1 9 1a8 8 0 0 1 0 16zm0-2a6 6 0 0 0 4.89-9.48L5.52 13.9C6.5 14.59 7.7 15 9 15zm-4.89-2.52l8.37-8.37a6 6 0 0 0-8.37 8.37z"/></svg></span>
            <span class="grid--cell fl1">Ignored Tags</span>
            <a class="js-edit-ignored-tags grid--cell ml12 d-none" href="/users/tag-notifications/12540916#ignored-1">edit</a>
        </div>
        <div class="s-sidebarwidget--content fd-column">
          <div class="js-ignored-tag-list grid gs4 py4 fw-wrap ai-baseline d-none">
              <script type="text/html" class="js-tag-template"><div class="js-tag grid--cell "><a href="/questions/tagged/template" class="post-tag" title="show questions tagged &#39;template&#39;" rel="tag">template</a></div></script>
          </div>
          <div class="js-add-ignored-container"></div>
          <button class="js-show-add-ignored none s-btn s-btn__muted p0 as-start">Add an ignored tag</button>
          <div class="js-ignored-edit-visible mt8 d-none">
              <div class="grid ai-center">
                  <div class="grid--cell mr8"><input type="radio" name="hideIgnored" class="js-hide-ignored s-radio" id="2ebf3793-c159-4d9b-a74e-014dee7731ec-on" /></div>
                  <label for="2ebf3793-c159-4d9b-a74e-014dee7731ec-on" class="grid--cell s-label fs-body1 fw-normal">Hide questions in your ignored tags</label>
              </div>
              <div class="grid ai-center">
                  <div class="grid--cell mr8"><input type="radio" name="hideIgnored" class="js-dim-ignored s-radio" id="2ebf3793-c159-4d9b-a74e-014dee7731ec-off" checked="checked" /></div>
                  <label for="2ebf3793-c159-4d9b-a74e-014dee7731ec-off" class="grid--cell s-label fs-body1 fw-normal">Gray out questions in your ignored tags</label>
              </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
// @ is an alias to /src
import Question from '@/components/listQuestion'
import addForm from '@/components/addQuestion'
import axios from 'axios'

export default {
  name: 'home',
  data(){
    return{
      showForm : 'list',
      addTag : false,
      tag : ''
    }
  },
  components: {
    Question,
    addForm
  },
  methods:{
    showAddTag(){
      if(this.addTag){
        this.addTag = false
      }else{
        this.addTag = true
      }
    },
    showList(){
      this.showForm = 'list'
      this.$store.dispatch('fetchAllQuestion')
    },
    showAdd(){
      this.showForm = 'add'
    },
    addTags(){
      axios({
        url:'http://localhost:3002/user/',
        method : 'put',
        data : {
          tag : this.tag
        },
        headers : {
          access_token : localStorage.access_token 
        }
      })
        .then(({data})=> {
          console.log(data)
          this.$store.dispatch('fetchUserTag')
          this.$store.dispatch('fetchAllQuestion')
          this.tag = ''
          this.showAddTag()
        })
        .catch(console.log)
    }
  },
  computed:{
    questions(){
      return this.$store.state.questions
    },
    watchedTag(){
      return this.$store.state.userTag
    }
  },
  mounted(){
    this.$store.dispatch('fetchUserTag')
    this.$store.dispatch('fetchAllQuestion')
  }
}
</script>
