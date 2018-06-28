<template>
    <div>
        <div class="container">
            <h3>Hello! Please, log in.</h3>
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
                    alert(`You ${user.email}`)
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

</style>

