<template>
<nav class="navbar d-flex justify-content-center navbar-expand-lg navbar-light navbar-style p-0">
    <div class="d-flex justify-content-center">
        <button type="button" class="btn button-style p-0">
            <img src="../assets/stunOverflow.png" alt="logo" class="logo-style p-2">
        </button>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse mt-2" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto"></ul>
            <div class="col-auto">
            <label class="sr-only" for="inlineFormInputGroup">search</label>
                <div class="input-group mb-2 input-border" style="border-radius:10%;">
                    <div class="input-group-prepend">
                        <div class="input-group-text pr-0 icon-style" style="background-color: white; border:none;">
                            <i class="fas fa-search" style="border:none"></i>
                        </div>
                    </div>
                    <input type="text" class="form-control pl-2 py-3 input-search" style="font-size:12px; border:none;" id="inlineFormInputGroup" placeholder="Search...">
                </div>
            </div>
        </div>
        <div class="btn-group">
            <button type="button" class="btn button-style d-flex flex-row" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <div class="photo-profile mt-1"></div>
                <span class="point-profile my-auto ml-1">1</span>
            </button>
            <div class="dropdown-menu dropdown-menu-right">
                <h6 class="dropdown-header">Profile</h6>
                <img src="../assets/Angga Banny.jpg" alt="profile" class="px-2" style="width:100%; background-size: 100%;">
                <button class="dropdown-item mt-1" type="button" style="font-weight: bold;">Angga Banny Ridwan Syahputra</button>
                <div class="d-flex align-items-center">
                    <button class="dropdown-item" type="button" style="font-size:15px;">Reputation
                        <span class="badge badge-primary">1</span>
                    </button>
                </div>
                <div class="dropdown-divider"></div>
                <button class="dropdown-item btn-signout" type="button">Sign out</button>
            </div>
        </div>
    </div>
</nav>
</template>

<script>
export default {

}
</script>

<style scoped>
.icon-style:hover{
    color: orangered;
    box-shadow: 0 0 5px 2px rgb(250, 181, 156);
    background-color: none;
}

.btn-signout:hover{
    background-color: rgb(223, 20, 20);
    color: white;
}

.point-profile{
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.navbar-style{
    border-top: 3px solid orangered;
    background-color: #FAFAFB;
    border-bottom: 1px solid rgb(211, 211, 211);
    box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.233);
}

.logo-style{
    width: 180px;
}

.button-style:hover{
    background-color: rgb(241, 241, 241);
}
.button-style:focus{
    box-shadow: none;
}

.input-search{
    width: 0rem;
    transition: 0.5s;
}
.input-search:focus{
    width:20rem;
    box-shadow: none;
}

.input-border{
    border:1px solid #BBC0C4;
    transition: 0.5s;
}

.input-border:focus-within{
    border:1px solid rgb(255, 72, 0);
    box-shadow: 0 0 15px 1px rgba(255, 68, 0, 0.411);
    color: rgb(255, 72, 0)
}
.input-border-value:hover{
    color: rgb(255, 72, 0)
}

.photo-profile{
    width: 30px;
    height: 35px;
    background: url('../assets/Angga Banny.jpg');
    background-size: 100%;
    background-repeat: no-repeat;
}
</style>
