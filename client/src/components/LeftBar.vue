<template>
    <div class="col-3">
        <div class="left" style="margin-left:10%">
            <p style="font-size:14px;text-align:left;">PUBLIC</p>
        </div>
        <div class="left-option">
            <i class="fas fa-globe-asia"></i>
            <a @click="home" href="#" class="fill-div">Stack Overflow</a>
        </div>
        <div class="left-option">
            <i class="fas fa-tags"></i>
            <a @click="tags" href="#" class="fill-div">Tags</a>
        </div>
         <div class="left-option">
            <i class="fas fa-users"></i>
            <a @click="users" href="#" class="fill-div">Users</a>
            <!-- <button class="btn my-2 my-sm-0" type="submit">Jobs</button> -->
        </div>
    </div>
</template>

<script>
export default {
    name : 'leftBar',
    methods : {
        tags(){
            this.$router.push('/tags')
        },
        home(){
            this.$router.push('/')
        },
        users(){
            this.$router.push('/users')
        }
    }

}
</script>

<style scoped>
.col-3{
    background-color: white;
    height:100vh;
    width:30%;
    display:flex;
    flex-direction: column;
    padding-top:50px;
    border-right:1px solid  rgb(220, 220, 220);
    position: fixed;
    margin-top:70px;
    z-index: 0;
}
.side-bar{
    display: flex;
    margin-top: 50px;
    flex-direction:column;
    align-items: flex-start;
    
}

.left-option{
    
    height:50px;
    width:84%;
    margin:0px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    align-content: center;
    margin-left:20%;
}
i :hover{
    border-right: none !important;
}

.left-option  :hover{
    font-weight: 700;
    border-right:20px solid rgb(255, 140, 69);
}


a.fill-div {
    height: 100%;
    width: 100%;
    text-decoration: none;
    text-align: left;
    display: flex;
    align-items: center;
    padding: 10px;
    color: rgb(89, 89, 89);
}

i{
    color: rgb(89, 89, 89);
}

a{
    font-size:15px;
}


</style>