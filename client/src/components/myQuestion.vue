<template>
    <div class="mt-3">
        <b-card :title="data.title">
            <hr>
            <div v-html="data.desc"></div>
            <a @click.prevent="showUpdate" class="card-link" style="color:black">Update</a>
            <b-link @click.prevent="delQuestion(data._id)" class="card-link" style="color:red">Delete</b-link>
        </b-card>

        <div style="margin-top:20px" v-if="update">
            <h3>add Question</h3>
            <b-form-input v-model="title" placeholder="Enter your title" ></b-form-input>
            <wysiwyg v-model="myQuestion" />
            <button @click.prevent ='save(data._id)' class="btn btn-secondary btn-lg btn-block">Create</button>
        </div>

    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'myQuestion',
    props:["data"],
    data:function(){
        return {
            title : this.data.title,
            myQuestion : this.data.desc,
            update: false
        }
    },
    methods:{
        showUpdate(){
            if(!this.update){
                this.update = true
            }else{
                this.update = false
            }
        },
        save(id){
             axios({
            url: `http://localhost:3000/questions/${id}`,
            method: 'put',
            headers:{
                token : localStorage.getItem('token')
            },
            data:{
                title: this.title,
                desc: this.myQuestion
            }
            })
            .then(() =>{
                this.$emit("fetch")
                this.update = false
            })
        },
        delQuestion(id){
             axios({
            url: `http://localhost:3000/questions/${id}`,
            method: 'delete',
            headers:{
                token : localStorage.getItem('token')
            }
            })
            .then(() =>{
               
            })

        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>