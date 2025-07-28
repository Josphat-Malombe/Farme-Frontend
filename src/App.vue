<template>
  <!--<nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
-->
  <router-view/>
</template>

<style>

html, body  {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow:visible;
  
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  max-width: 100vw;
  width: 100%;
  padding-left: 0px;
  margin-left: -20px;;
  
  
}

nav {
  padding: 20px;
  
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
