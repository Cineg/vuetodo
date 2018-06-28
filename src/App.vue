<template>
  <div id="app">
    <NavigationBar />
    <DynamicLogo />
    <router-view />

  </div>
</template>

<script>
import Todo from './components/Todo'
import NavigationBar from './components/NavigationBar'
import DynamicLogo from './components/DynamicLogo'
import Login from './components/Login'
import Register from './components/Register'

export default {
  name: 'app',
  components: {
    Todo,
    NavigationBar,
    DynamicLogo,
    Login,
    Register,
  },
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

</style>
