<template>
    <div>
        <sui-menu secondary>
            <sui-menu-item style="padding-left: 0">
                <h1>List Of Question</h1>
            </sui-menu-item>
            <sui-menu-menu position="right">
                <sui-menu-item style="padding-right: 0">
                    <main-menu/>
                </sui-menu-item>
            </sui-menu-menu>
        </sui-menu>
        <code>Get Stuck ? maybe we have the answer for you here.
            All you need just to explore. Have a nice adventure Hackers</code>
        <hr>
    </div>
</template>

<script>
    import mainMenu from "./mainMenu";

    export default {
        name: "navBar",
        components:{
            mainMenu
        }
    }
</script>

<style scoped>

</style>