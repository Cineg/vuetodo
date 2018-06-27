<template>
  <div id="app">
    <!-- <NavigationBar /> -->
    <div class="logo">
      <div class="cloud">
        <i class="fas fa-cloud"></i>
      </div>

    </div>
    <Todo />
  </div>
</template>

<script>
import Todo from './components/Todo.vue'
import NavigationBar from './components/NavigationBar.vue'

export default {
  name: 'app',
  components: {
    Todo,
    NavigationBar,
  }
}
</script>

<style>
  *{
    margin: 0; padding: 0; box-sizing: border-box;
  }
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.logo{
  background-image: url(./assets/logo.png);
  background-repeat: no-repeat;
  background-position: center;
  margin-top: 60px;
  height: 121px;
  font-size: 70px;
  color: white;
}

.cloud{
  animation-name: cloud;
  animation-duration: 20s;
  animation-delay: 5s;
  animation-iteration-count: infinite;
}

@keyframes cloud{
  0% {
    margin-left: 300px;
  }  
  100%{
    margin-right: 300px;
  }
}
</style>
