<template>
  <div id="app">
    <SideBar />
    <router-view />
  </div>
</template>

<script>
import SideBar from "./components/layouts/TheSideBar";
import "./../node_modules/slick-carousel/slick/slick.css";
import "./../node_modules/slick-carousel/slick/slick-theme.css";
export default {
  name: "app",
  components: {
    SideBar
  },
  mounted: function() {
    this.$store.dispatch("getUnsplashPhotos", "30");
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
  color: #2c3e50;
}

*,
*:before,
*:after {
  box-sizing: border-box;
}

h3,
p {
  margin: 0;
}

.body {
  margin: 0;
}

.has-show-sidebar {
  margin-left: 300px;
  width: calc(100% - 300px);
  transition: 1s all;
}

.has-hide-sidebar {
  margin-left: 0;
  width: 100%;
  transition: 1s all;
}

.preloader {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
