<template>
    <nav>
        <div class="menu"> 
            <div>Hello, <span>{{user}}</span></div>
            <div>register</div>
            <div>login</div>
            <div @click="logout">logout</div>
        </div>
    </nav>  

</template>

<script>
import firebase from 'firebase'

export default {
    name: 'nav-bar',
    data(){
        return{
            isLoggedIn: false,
            currentUser: false,
        }
    },
    methods: {
        logout: function(){
            firebase.auth().signOut().then(() => {
                alert('logged out')
            });
        }
    }
}
</script>

<style scoped>
    @import url('https://fonts.googleapis.com/css?family=Permanent+Marker');

    nav{
        display: flex;
        width: 100%;
        background-color: rgba(132, 204, 249, 0.5);
        height: 50px;
        -webkit-box-shadow: 0px 2px 5px 0px rgba(0,0,0,0.2);
        -moz-box-shadow: 0px 2px 5px 0px rgba(0,0,0,0.2);
        box-shadow: 0px 2px 5px 0px rgba(0,0,0,0.2);
    }
    .menu{
        
        width: 600px;
        margin: 0 auto;
        height: 100%;
        display: flex;
        align-items: center;
        padding-right: 10px;
    }

    .menu > div {
        padding: 0px 10px;
    }
</style>
