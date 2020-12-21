<template>
  <div id="app">
    <div id="nav">
      <ul>
        <li class="outside">
          <svg id="i-home" class="outside" xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32" width="32" height="32"
          fill="none" stroke=" #42b983"
          stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
            <path d="M12 20 L12 30 4 30 4 12 16 2 28 12 28 30 20 30 20 20 Z" />
          </svg>
        </li>
        <li>
          <router-link to="/">Home</router-link>
        </li>
        <li>
          <router-link to="/catalogue">Catalogue</router-link>
        </li>
        <li>
          <router-link to="/about">About</router-link>
        </li>
        <li style="float:right">
          <router-link to="/users">Users</router-link>
        </li>
        <li style="float:right">
          <router-link to="/signup">Sign Up</router-link>
        </li>
        <li style="float:right">
          <router-link to="/signin">Sign In</router-link>
        </li>
      </ul>
    </div>
      <!-- <transition
    name="custom-classes-transition"
    enter-active-class="animated tada"
    leave-active-class="animated bounceOutRight"
  > -->
      <transition
    name="custom-classes-transition"
    enter-active-class="animated bounceInLeft"
    leave-active-class="animated bounceOutRight"
  >
    <p v-if="show">hello</p>
    <router-view/>
  </transition>
  </div>
</template>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 0px;
  font-family: 'Raleway', sans-serif;
}

#nav a {
  font-weight: bold;
  color: #42b983;
}

#nav a.router-link-exact-active {
  background-color: #42b983;
  color: #fff;
}

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #333;
}

li {
  float: left;
}

li a {
  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}

li a:hover:not(.active) {
  background-color: #111;
}

.active {
  background-color: #4CAF50;
}

.outside{
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
