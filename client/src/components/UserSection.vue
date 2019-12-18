<template>
  <div class="col-6">
    <h3 style="text-align:left;margin-left:50px;">Users Section</h3>
      <div class="top-option">
          


          <div class="users">

                <div class="card-body">
                    <div class="right-content">
                    <div class="user">
                            <img src="https://avatars1.githubusercontent.com/u/8036315?v=4&s=460" alt="">
                    </div>
                    <div class="content">
                    <h6>
                        Dwitama Alfred
                    </h6>
                    <p>
                        Fullstack developer students at Hacktiv8
                    </p>
                    </div>
                    </div>
                </div>

                <div class="card-body">
                    <div class="right-content">
                    <div class="user">
                            <img src="https://avatars1.githubusercontent.com/u/8036315?v=4&s=460" alt="">
                    </div>
                    <div class="content">
                    <h6>
                        Dwitama Alfred
                    </h6>
                    <p>
                        Fullstack developer students at Hacktiv8
                    </p>
                    </div>
                    </div>
                </div>

          </div>


        </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>

img{
    width:100px; 
    height:100px;
    margin-right:30px;
}

.users{
    display: flex;
    flex-wrap: wrap;
}

.tag{
    width:initial ! important;
    text-align: left;
    font-size:18px;
    padding-left:20px;
    
}

.col-6{

    margin-top:70px;
    z-index: 0;
    background-color:rgb(255, 255, 255);
    height:100vh;
    width:30%;
    margin-left:25%;
    padding-top:70px;
    
}


.card-body{
    width:45%;
    margin:20px;
    display: flex;
    justify-content: flex-start;
    border-radius: 5px;
    border: 0.5px solid rgb(228, 228, 228);
}

.card{
    border :none;
}

.top-option{
    display:flex;
    justify-content: space-between;
}



.right-content{
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    margin-left:20px;
}

.votes{
    margin-top:-15px
}

p{
    color: rgb(89, 89, 89);
    font-size: 14px;
    text-align: left;
}

h6{
    color: rgb(89, 89, 89);
    font-style: 16px;
    text-align: left;
}

.btn-secondary {
    color: rgb(89, 89, 89) ! important;
    background-color:transparent ! important;
    border-color: #6c757d;
}

hr{
    margin :0 ! important;
    /* padding:0px; */
}
</style>