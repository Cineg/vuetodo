<template>
    <div>
        <div class="container">
            <h3>Hello! Please, log in.</h3>
            <p class="register-info">Don't have an account? Please <router-link to="/register">register.</router-link></p>
            <div class="login-form">
                <form action="">
                    <div class="input-field">
                        <i class="fas fa-envelope"></i>
                        <input type="text" id="email" placeholder="your@email.com" v-model="email">
                    </div>
                    <div class="input-field">
                        <i class="fas fa-unlock"></i>
                        <input type="password" id="password" placeholder="password" v-model="password">
                    </div>
                    <button class="loginbutton" @click="login">Login</button>
            </form>
            </div>
        </div>
    </div>
</template>

<script>
import firebase from 'firebase'

export default {
    name: 'login-form',
    data: function(){
        return{
            email: '',
            password: '',
        }
    },
    methods: {
        login: function(e){
            firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
                user => {
                    this.$router.go({path: this.$router.path});
                },
            err => {
                alert(err.message);
            });
            
            e.preventDefault();
        }
    }
}
</script>

<style>
    .container{
        display: flex;
        flex-direction:column;
        margin: 0 auto;
        width: 600px;
        -webkit-box-shadow: 0px 5px 15px 0px rgba(0,0,0,0.2);
        -moz-box-shadow: 0px 5px 15px 0px rgba(0,0,0,0.2);
        box-shadow: 0px 5px 15px 0px rgba(0,0,0,0.2);
    }
    .container h3{
        margin: 0 auto;
        padding: 30px;
        font-size: 40px;
        padding-bottom: 10px;
    }

    .register-info{
        margin: 0;
        font-size: 12px;
        padding-bottom: 10px;
    }

    .register-info a{
        color: rgb(72, 182, 72);
        text-decoration: none;
    }

    .login-form{
        margin: 0 auto;
        margin-bottom: 15px;
    }

    .input-field{
        width: 300px;
        padding: 10px;
        -webkit-box-shadow: 0px 2px 10px 0px rgba(0,0,0,0.2);
        -moz-box-shadow: 0px 2px 10px 0px rgba(0,0,0,0.2);
        box-shadow: 0px 2px 10px 0px rgba(0,0,0,0.2);
        border-radius: 10px;
        display: flex;
        justify-content: flex-start;
        margin-bottom: 20px;
    }
    .login-form i{
        margin-right: 15px;
    }
    .login-form input{
        border: none;
    }
    .login-form input:focus{
        outline: 0;
    }

    .loginbutton{
        background-color: lightgreen;
        padding: 10px 20px;
    }

     @media screen and (max-width: 600px) {
         .container{
             width: 90vw;
         }
         .input-field{
             width: 80vw;
         }
         .container h3{
             font-size: 30px;
         }
    }

</style>

