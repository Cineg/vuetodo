<template>
    <nav>
        <div class="menu">
            <span v-if="isLoggedIn" class="left">Hello {{currentUser}}!</span>
            <span v-else class="left">Hello!</span>
            <div class="right">
                <router-link to="/register"><button v-if="!isLoggedIn" class="register">register</button> </router-link>
                <button @click="logout" v-if="isLoggedIn" class="logout">logout</button>
                <router-link to="/login"><button v-if="!isLoggedIn" class="login">login</button></router-link>
                
            </div>
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
    created(){
        if(firebase.auth().currentUser){
            this.isLoggedIn = true;
            this.currentUser = firebase.auth().currentUser.email;
        }
    },
    methods: {
        logout: function(){
            firebase.auth().signOut().then(() => {
                this.isLoggedIn = false;
                this.$router.push('/login');
            });
        }
    },
    toRegister: function(){
        alert('poop')
        this.$router.push('/register');
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
        justify-content: space-between;
    }

    .left{
        margin-left: 30px;
    }
    .right{
        display: flex;
    }

    .right > div{
        padding: 0 10px;
    }

    .logout{
        margin-right: 30px;
        background-color: tomato;
        color: white;
    }

    .login, .register{
        margin-right: 15px;
        background-color: whitesmoke;
    }
</style>
