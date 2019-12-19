<template>
  <section class="container">
			<div class="columns">
				<div class="column is-3">
					<aside class="menu">
						<p class="menu-label">
							Categories
						</p>
						<ul class="menu-list" v-for="(category, i) in categories" :key="i">
							<li @click.prevent="filter(category[0])"><span :class="category[1]" id="category">{{ category[0] }}</span></li>
						</ul>
					</aside>
				</div>
				<div class="column is-9">
					<div class="box content">
						<question-card v-for="(question, i) in questions"
							:key="i" :question="question"
						></question-card>
					</div>
				</div>
			</div>
		</section>
</template>

<script>
import QuestionCard from '@/components/QuestionCard.vue'

export default {
  name: 'Questions',
  data: function () {
    return {
      categories: [
          ['Javascript', 'tag is-black'],
          ['Java', 'tag is-dark'],
          ['C#', 'tag is-light'],
          ['C', 'tag is-primary'],
          ['Python', 'tag is-link'],
          ['PHP', 'tag is-info'],
          ['Jquery', 'tag is-warning'],
          ['HTML', 'tag is-success'],
          ['C++', 'tag is-danger'],
          ['CSS', 'tag is-primary is-light'],
          ['SQL', 'tag is-primary is-link'],
          ['Ruby-on-rails', 'tag is-primary is-info'],
          ['Uncategorized', 'tag is-primary is-success'],
        ]
    }
  },
	methods: {
    fetchQuestions () {
      return this.$store.dispatch('fetchQuestions')
    },
    filter (category) {
      console.log(category)
      return this.$store.dispatch('filterQuestions', category)
    }
	},
  components: {
    QuestionCard
  },
  computed: {
    questions () {
      return this.$store.state.questions
    }
  },
  mounted: function () {
    return this.fetchQuestions()
      .then(() => {
        console.log('kekirim')
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>

<style scoped>
html,body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
  background: #F2F6FA;
}
footer {
  background-color: #F2F6FA !important;
}
.topNav {
  border-top: 5px solid #3498DB;
}
.topNav .container {
  border-bottom: 1px solid #E6EAEE;
}
.container .columns {
  margin: 1rem 0;
}
.navbar-menu .navbar-item {
  padding: 0 2rem;
}
aside.menu {
  padding-top: 3rem;
}
aside.menu .menu-list {
  line-height: 1.5;
}
aside.menu .menu-label {
  padding-left: 10px;
  font-weight: 700;
}
.button.is-primary.is-alt {
  background: #00c6ff;
  background: -webkit-linear-gradient(to bottom, #0072ff, #00c6ff);
  background: linear-gradient(to bottom, #0072ff, #00c6ff);
  font-weight: 700;
  font-size: 14px;
  height: 3rem;
  line-height: 2.8;
}
.media-left img {
  border-radius: 50%;
}
.media-content p {
  font-size: 14px;
  line-height: 2.3;
  font-weight: 700;
  color: #8F99A3;
}
article.post {
  margin: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #E6EAEE;
}
article.post:last-child {
  padding-bottom: 0;
  border-bottom: none;
}
.menu-list li{
  padding: 5px;
}
#category {
  cursor: pointer
}
</style>
