<template>
    <div class="container">
        <div class="row d-flex justify-content-center">
            <div class="col-8-center" >
                <div style="margin-top:20px">
                        <h3>add Question</h3>
                        <b-form-input v-model="title" placeholder="Enter your title"></b-form-input>
                        <wysiwyg v-model="desc" />
                        <button @click.prevent ='save' class="btn btn-secondary btn-lg btn-block">Create</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name:'newQuestion',
    data:function(){
        return{
            title:'',
            desc: ''
        }
    },
    methods:{
        save(){
              axios({
            url: `http://localhost:3000/questions`,
            method: 'post',
            headers:{
                token : localStorage.getItem('token')
            },
            data:{
                title: this.title,
                desc: this.desc
            }
            })
            .then(()=>{
                this.myAnswer = ''
                this.title = ''
                this.$router.push('/')
            })
            .catch(err=>{
                console.log(err)
            })
        }
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>