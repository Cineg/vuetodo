<template>
    <div>
        <div class="container">
            <h3>Hello! Please, register.</h3>
            <div class="register-form">
                <form action="">
                    <div class="input-field">
                        <i class="fas fa-envelope"></i>
                        <input type="text" id="email" placeholder="your@email.com" v-model="email">
                    </div>
                    <div class="input-field">
                        <i class="fas fa-unlock"></i>
                        <input type="password" id="password" placeholder="password" v-model="password">
                    </div>
                    <button class="registerbutton" @click="register">Register</button>
            </form>
            </div>
        </div>
    </div>
</template>

<script>
import firebase from 'firebase'

export default {
    name: 'register-form',
    data: function(){
        return{
            email: '',
            password: '',
        }
    },
    methods: {
        register: function(e){
            firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(user => {
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
    .register-form{
        margin: 0 auto;
        margin-bottom: 15px;
    }
    .register-form i{
        margin-right: 15px;
    }
    .register-form input{
        border: none;
    }
    .register-form input:focus{
        outline: 0;
    }

    .registerbutton{
        background-color: lightgreen;
        padding: 10px 20px;
    }

</style>

