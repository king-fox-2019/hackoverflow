<template>
    <div>
        <b-card>

            <b-card-text v-html="data.desc"></b-card-text>

            <a @click="showUpdate" class="card-link" style="color:black">Update</a>
        </b-card>

         <div style="margin-top:20px" v-if="update">
            <h3>add Answer</h3>
            <wysiwyg v-model="myAnswer" />
            <button @click.prevent ='save(data._id)' class="btn btn-secondary btn-lg btn-block">Create</button>
        </div>
    </div>
</template>

<script>
import axios from  'axios'

export default {
    name:'myAnswer',
    props:["data"],
    data:function(){
        return {
            myAnswer : this.data.desc,
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
            url: `http://localhost:3000/answers/${id}`,
            method: 'put',
            headers:{
                token : localStorage.getItem('token')
            },
            data:{
                desc: this.myAnswer
            }
            })
            .then(() =>{
                this.update = false
                this.$emit("fetch")
            })
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>