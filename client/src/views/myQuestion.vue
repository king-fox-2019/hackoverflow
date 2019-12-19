<template>
<div id="content" class="snippet-hidden">
  <div id="mainbar">
    <div class="grid">
        <h1 class="grid--cell fl1 fs-headline1">
          My Questions
        </h1>
    </div>
    <div id="qlist-wrapper" class="flush-left">
      <div id="question-mini-list">
        <div v-show="showForm == 'list'">
        <div v-for="(question, id) in questions" :key="id">
            <Question :question="question"/>
            <a class="js-add-link comments-link disabled-link" @click="showAdd(id)">edit</a>
            <a class="js-add-link comments-link disabled-link" @click="deleteCurrent(question._id)">delete</a>
        </div>
        </div>
        <editForm v-if="showForm == 'add'" @closeForm="showList" :id="editId"/>
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
                  <p class="grid--cell w100 wmx6 fc-black-300">Watch tags to curate your list of questions.</p>
                  <a class="js-show-add-watched grid--cell s-btn s-btn__filled s-btn__icon"><svg aria-hidden="true" class="svg-icon iconEye" width="18" height="18" viewBox="0 0 18 18"><path d="M9.06 3C4 3 1 9 1 9s3 6 8.06 6C14 15 17 9 17 9s-3-6-7.94-6zM9 13a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-2a2 2 0 0 0 2-2 2 2 0 0 0-2-2 2 2 0 0 0-2 2 2 2 0 0 0 2 2z"/></svg> Watch a tag</a>
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
import editForm from '@/components/editQuestion'
import axios from 'axios'

export default {
  name: 'myQuestion',
  data(){
    return{
      showForm : 'list',
      editId : ''
    }
  },
  components: {
    Question,
    editForm
  },
  methods:{
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
            url:`http://localhost:3002/question/${id}`,
            method:'delete',
            headers : {
              access_token : localStorage.access_token
            }
          })
            .then(({data}) => {
              swal({
                title: "Question deleted!",
                icon: "success",
              });
              this.$store.dispatch('fetchUserQuestion')
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
    showList(){
      this.showForm = 'list'
      this.$store.dispatch('fetchUserQuestion')
    },
    showAdd(id){
      this.editId = id
      this.showForm = 'add'
    }
  },
  computed:{
    questions(){
      return this.$store.state.userQuestions
    },
  },
  created(){
    this.$store.dispatch('fetchUserQuestion')
  }
}
</script>
