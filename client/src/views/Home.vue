<template>
  <div class="home">
    <div class="button__holder">
        <h2>Add Question &rarr;</h2>
        <button class="plus" @click.prevent="addNew"></button>
    </div>
    <div id="card" v-for="item in allItem" :key="item.id">
      <card :question="item" />    
    </div>
  </div>
</template>

<script>
import card from '../components/card'
import {mapGetters,mapActions} from 'vuex'

export default {
  name: 'home',
  components: {
    card
  },
    computed:{
    ...mapGetters({
      allItem: 'question/getquestion'
    })
  },
  methods:{
    ...mapActions({
      fetchAction: 'question/fetchAction'
    }),
    addNew(){
      this.$router.push('/newQuestion')
    }
  },
  created(){
    this.fetchAction()
  }
}
</script>

<style scoped>
#card{
  display: flex;
  justify-content: center;
  margin: 6px;
}

@import url(https://fonts.googleapis.com/css?family=Source+Sans+Pro:300);
body,
html {
  margin: 0;
  width: 100vw;
  height: 100vh;
  font-family: "Source Sans Pro" sans-serif;
}

.button__holder {
  position: relative;
  width: 20%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  background-color: white;
}
.button__holder:after {
  content: "";
  position: absolute;
  z-index: 0;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(255, 255, 255, 0.7);
}
.button__holder h2 {
  margin-right: 1em;
  text-align: center;
  color: #8a3b58;
}

.plus {
  position: relative;
  z-index: 1;
  width: 50px;
  height: 50px;
  color: #1a1a1a;
  background: #ed1c5b;
  border-radius: 50%;
  border: none;
  transition: box-shadow 400ms cubic-bezier(0.2, 0, 0.7, 1), -webkit-transform 200ms cubic-bezier(0.2, 0, 0.7, 1);
  transition: box-shadow 400ms cubic-bezier(0.2, 0, 0.7, 1), transform 200ms cubic-bezier(0.2, 0, 0.7, 1);
  transition: box-shadow 400ms cubic-bezier(0.2, 0, 0.7, 1), transform 200ms cubic-bezier(0.2, 0, 0.7, 1), -webkit-transform 200ms cubic-bezier(0.2, 0, 0.7, 1);
}
.plus:after {
  content: "+";
  font-size: 2.5em;
  line-height: 1.1em;
}
.plus:hover {
  -webkit-transform: rotate(45deg);
          transform: rotate(45deg);
  box-shadow: 0 0 1px 15px rgba(138, 59, 88, 0.4), 0 0 1px 30px rgba(138, 59, 88, 0.1), 0 0 1px 45px rgba(138, 59, 88, 0.1);
}

</style>
