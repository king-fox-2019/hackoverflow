<template>
  <div class="col-6">
    <h3 style="text-align:left;margin-left:50px;">Tags Section</h3>
      <div class="top-option">
          


          <div class="tags">
                <div class="card-body">
                    <div class="right-content">
                    <button class="tag" type="submit">javascript</button>
                    <p>
                        JavaScript (not to be confused with Java) is a high-level, dynamic, multi-paradigm, object-oriented, prototype-based, weakly-typed, and interpreted language used for both client-side and server-side scripting. Its primary use is in the rendering and manipulation of web pages. 
                    </p>
                    <hr>
                    </div>
                </div>

                <div class="card-body">
                    <div class="right-content">
                    <button class="tag" type="submit">HTML</button>
                    <p>
                        HTML (Hypertext Markup Language) is the standard markup language used for structuring web pages and formatting content. HTML describes the structure of a website semantically along with cues for presentation, making it a markup language, rather than a programming language. 
                    </p>
                    <hr>
                    </div>
                </div>

                <div class="card-body">
                    <div class="right-content">
                    <button class="tag" type="submit">swift</button>
                    <p>
                       Swift is a general-purpose, open-source programming language developed by Apple Inc. for its platforms and Linux. Use the tag only for questions about language features, or requiring code in Swift. 
                    </p>
                    <hr>
                    </div>
                </div>

                <div class="card-body">
                    <div class="right-content">
                    <button class="tag" type="submit">vue</button>
                    <p>
                        Vue.js is an open-source, progressive Javascript framework for building user interfaces that aim to be incrementally adoptable. Vue.js is mainly used for front-end development and requires an intermediate level of HTML and CSS. 
                    </p>
                    <hr>
                    </div>
                </div>

                 <div class="card-body">
                    <div class="right-content">
                    <button class="tag" type="submit">javascript</button>
                    <p>
                        JavaScript (not to be confused with Java) is a high-level, dynamic, multi-paradigm, object-oriented, prototype-based, weakly-
                    </p>
                    <hr>
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

.tags{
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
    max-width:30%;
    display: flex;
    justify-content: flex-start;
}

.card{
    border :none;
}

.top-option{
    display:flex;
    justify-content: space-between;
    margin-bottom: 50px;
    padding-left:50px;
    padding-right:50px;
}



.right-content{
    display: flex;
    flex-direction: column;
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