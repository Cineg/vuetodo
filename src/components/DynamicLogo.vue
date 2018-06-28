<template>
    <div>
       <div class="logo sun" v-if="logo == 'sun'"> 
        <div class="cloud">
            <i class="fas fa-cloud"></i>
        </div>
        </div>
        <div class="logo eveningSun" v-else-if="logo == 'eveningSun'"> 
        <div class="cloud">
            <i class="fas fa-cloud" ></i>
        </div>
        </div>
        <div class="logo moon" v-else> 
        <div class="cloud">
            <i class="fas fa-cloud"></i>
        </div>
        </div>
        
        <!--Workaround I came up with to get computed property update data, therefore logo -->
        <span class="invisible">{{computedLogo}}</span>
    </div>
</template>


<script>
export default {
    name: 'DynamicLogo',
    data(){
        return{
        logo: 'eveningSun',
        }
    },
    computed: {
        computedLogo(){
            let time = new Date;
            let hours = time.getHours();

            if (hours > 6 && hours < 18){
                this.logo = 'sun';
                return 'sun';
            } if(hours >= 18 && hours <= 21 ){
                this.logo = 'eveningSun';
                return 'eveningSun';
            }
            else{
                this.logo = 'moon';
                return 'moon';
            }
        }
    },
}
</script>

<style>
    .logo{
    background-repeat: no-repeat;
    background-position: center;
    margin-top: 60px;
    height: 121px;
    width: 400px;
    font-size: 70px;
    color: white;
    margin-left: auto;
    margin-right: auto;
    }

    .cloud{
    animation-name: cloud;
    animation-duration: 20s;
    animation-iteration-count: infinite;
    }

    .sun{
    background-image: url('../assets/sun.png'); 
    }
    .eveningSun{
    background-image: url('../assets/evening.png');
    }
    .moon{
    background-image: url('../assets/moon.png');
    }
    .invisible{
    display: none;
    }

    @keyframes cloud{
    0% {
        margin-left: 300px;
    }  
    100%{
        margin-right: 400px;
    }
    }
</style>

