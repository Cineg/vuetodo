<template>
    <nav>
        <div class="container">
            <div class="logo"> To-Do </div>
            <div class="menu"> 
                <div>todo</div>
                <div>user</div>
            </div>
        </div>
    </nav>  

</template>

<script>
export default {
    name: 'nav-bar',
}
</script>

<style>
    @import url('https://fonts.googleapis.com/css?family=Permanent+Marker');

    nav{
        display: flex;
        width: 100%;
        background-color: rgba(132, 204, 249, 0.5);
        height: 50px;
        -webkit-box-shadow: 0px 1px 3px 0px rgba(0,0,0,0.2);
        -moz-box-shadow: 0px 1px 3px 0px rgba(0,0,0,0.2);
        box-shadow: 0px 1px 3px 0px rgba(0,0,0,0.2);
    }

    .container{
        width: 600px;
        height: 100%;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .logo{
        font-family: 'Permanent Marker', cursive;
        font-size: 40px;
        padding-left: 20px;
        color: rgb(0, 31, 31);
    }

    .menu{
        height: 100%;
        display: flex;
        align-items: center;
        padding-right: 10px;
    }

    .menu > div {
        padding: 0px 10px;
    }
</style>
