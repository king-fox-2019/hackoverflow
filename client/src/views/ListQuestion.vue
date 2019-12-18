<template>
<div>
  <div class="row">
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.1.1/css/all.css" integrity="sha384-O8whS3fhG2OnA5Kas0Y9l3cfpmYjapjI0E4theH4iuMD+pLhbf6JI0jIMfYcK3yZ" crossorigin="anonymous">
    <div class="col-3 column-one pr-0" v-if="$route.path != '/questions/ask'">
      <div class="mt-5 d-flex justify-content-end">
        <div class="d-flex flex-column">
        <button type="button" class="btn button-style-home"> Home </button>
        <span class="pr-1"><i>  <i class="fas fa-globe-asia mt-3"></i> PUBLIC </i></span>
        <button type="button" class="btn button-style-home-public pl-5 ml-5 mt-2"> Tags </button>
        <button type="button" class="btn button-style-home-public pl-5 ml-5 mt-1"> Popular </button>
        <button type="button" class="btn button-style-home-public pl-5 ml-5 mt-1"> Rank </button>
        </div>
      </div>
    </div>
    <div class="col-6 column-two pl-0" v-if="$route.path == '/questions'">
      <div style="border-bottom: 2px solid rgb(226, 226, 226);">
        <div class="row row-mid-one pb-3">
          <div class="col-5 pt-5">
            <h3>Top Questions</h3>
          </div>
          <div class="col pt-5 text-right">
            <button type="button" class="btn btn-sm btn-primary"> Ask Question </button>
          </div>
        </div>
      </div>
      <div class="button-items" style="border-bottom: 1px solid #E2E2E2;">
        <div class="row row-mid-two d-flex align-items-center">
          <div class="col-3 d-flex flex-row">
            <div class="col-4 d-flex flex-column mt-2">
              <span class="votes-area">0</span>
              <span class="color-grey" style="font-size:13px;">votes</span>
            </div>
            <div class="col-4 d-flex flex-column mt-2 pl-0">
              <span class="votes-area">0</span>
              <span class="color-grey" style="font-size:13px;">answers</span>
            </div>
            <div class="col-4 d-flex flex-column mt-2 pl-0">
              <span class="votes-area">0</span>
              <span class="color-grey" style="font-size:13px;">views</span>
            </div>
            <div class="d-flex flex-column">
              <div class="col mt-2 text-left">
              <span class="text-title" style="max-width: 20vh;">lkdkdwkajdjjawdjawjkajdkawjlajdlkwjlkdjawkdjakjadwadojdojw</span>
            </div>
            <div class=" mt-1 mr-5 text-left ml-2">
              <span class="badge badge-btn p-2 mr-1">Primary</span>
            </div>
            </div>
          </div>
        </div>
        <div class="row mb-1 mr-1">
          <div class="col-12 text-right">
            <span class="text-date color-grey">
                  asked {{ new Date() | moment("from", "now") }}
            </span>
            <a class="text-profile">anggabanny</a>
            <span class="text-reputation">
              1212
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="col-2 column-three pr-5 pt-5" v-if="$route.path == '/questions'">
      <div class="card">
        <div class="card-header">
          <div class="row">
            <div class="col-7 text-left">
              <i class="fas fa-eye"></i>
              <span class="ml-1"> Watch Tags </span>
            </div>
            <div class="col text-right">
              <button type="button" class="btn btn-sm p-0 edit-btn"> edit </button>
            </div>
          </div>
        </div>
        <div class="card-body">
          <div class="row">
            <div class="col">
              <div class="col">
                <div class="input-group">
                  <input type="text" class="form-control input-edit-tag" id="validationDefaultUsername" placeholder="" aria-describedby="inputGroupPrepend2" required>
                  <div class="input-group-prepend">
                    <button type="button" class="btn btn-edit-tag">Add</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <router-view v-if="$route.path != '/questions/ask'"/>
  </div>
  <div v-if="$route.path == '/questions/ask'">
    <router-view/>
  </div>
</div>

</template>

<script>
// @ is an alias to /src
export default {
  name: 'home',
  components: {
  }
}
</script>

<style scoped>
*{
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.text-reputation{
  font-weight: bolder;
  font-size: 15px;
}

.text-profile{
  cursor: pointer;
  color: #1B65BD;
  font-size: 15px;
}

.text-profile:hover{
  cursor: pointer;
  color: #1B65BD;
  font-size: 15px;
}

.text-date{
  cursor: pointer;
  font-size: 12px;
}
.text-date:hover{
  color: #1B65BD;
}

.badge-btn{
  background-color: rgba(206, 224, 237, 0.555);
  color: #1B65BD;
  cursor: pointer;
}

.badge-btn:hover{
  background-color: rgb(206, 224, 237);
}

.text-title{
  font-size: 20px;
  color: #1B65BD;
}

.color-grey{
  color: grey;
}

.votes-area{
  color: grey;
  font-size: 25px;
  margin-bottom: -9px;
}

/* .column-two{
  border: 1px solid black;
} */

.btn-edit-tag{
  background-color: rgb(44, 132, 226);
  color: #F3F3F3;
}

.btn-edit-tag:hover{
  background-color: rgb(34, 114, 201);
  color: #F3F3F3;
}

.btn-edit-tag:focus{
  box-shadow: none;
}

.input-edit-tag:focus{
  box-shadow: none;
}
.edit-btn:focus{
  box-shadow: none;
}
.edit-btn:hover{
  color: orangered;
}

.column-one{
  border-right: 1px solid rgb(226, 226, 226);
  height: 94vh;
}

.button-style-home{
  background-color: #F3F3F3;
  border-right: 3px solid orangered;
  padding-right: 5rem;
  font-size: 18px;
  font-weight: bolder;
}

.button-style-home:focus{
  box-shadow: none;
}

.button-style-home-public{
  background-color: #F3F3F3;
  border-right: 3px solid orangered;
  padding-right: 4rem;
  font-weight: bolder;
  font-size: 15px;
  text-align: left;
}
.button-style-home-public:focus{
  box-shadow: none;
}

</style>
