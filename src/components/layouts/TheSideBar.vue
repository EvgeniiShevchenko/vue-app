<template>
  <div class="hello" :class="displaySidebar">
    <div class="main-sidebar">
      <div class="main-sidebar-logo">
        <a class="sidebar-logo-ref" href="#">
          <img class="logo-ref-images" src="../../assets/static/images/logo-type.png" alt="Logo" />
        </a>
      </div>
      <nav class="main-sidebar-navigation">
        <ul class="sidebar-navigation-list">
          <li @click="toggleActiveButton" class="navigation-list-item">
            <router-link
              name="home"
              :class="activeName === 'home' ? 'navigation-list-item-ref has-active'  : 'navigation-list-item-ref has-no-active'"
              to="/"
            >HOME</router-link>
          </li>
          <li @click="toggleActiveButton" class="navigation-list-item">
            <router-link
              name="work"
              :class="activeName === 'work' ? 'navigation-list-item-ref has-active'  : 'navigation-list-item-ref has-no-active'"
              to="/work"
            >WORK</router-link>
          </li>
          <li @click="toggleActiveButton" class="navigation-list-item">
            <router-link
              name="about"
              :class="activeName === 'about' ? 'navigation-list-item-ref has-active'  : 'navigation-list-item-ref has-no-active'"
              to="/about"
            >ABOUT</router-link>
          </li>
          <li @click="toggleActiveButton" class="navigation-list-item">
            <router-link
              name="blog"
              :class="activeName === 'blog' ? 'navigation-list-item-ref has-active'  : 'navigation-list-item-ref has-no-active'"
              to="/blog"
            >BLOG</router-link>
          </li>
          <li @click="toggleActiveButton" class="navigation-list-item">
            <router-link
              name="services"
              :class="activeName === 'services' ? 'navigation-list-item-ref has-active'  : 'navigation-list-item-ref has-no-active'"
              to="/services"
            >SERVICES</router-link>
          </li>
        </ul>
      </nav>
      <section class="main-sidebar-filter">
        <h3 class="sidebar-filter-title">Filter</h3>
        <ul class="sidebar-filter-list">
          <li class="filter-list-item">
            <button class="filter-list-item-button" type="button">All Works</button>
          </li>
          <li class="filter-list-item">
            <button class="filter-list-item-button" type="button">web design</button>
          </li>
          <li class="filter-list-item">
            <button class="filter-list-item-button" type="button">illustration</button>
          </li>
          <li class="filter-list-item">
            <button class="filter-list-item-button" type="button">photography</button>
          </li>
          <li class="filter-list-item">
            <button class="filter-list-item-button" type="button">wallpapers</button>
          </li>
          <li class="filter-list-item">
            <button class="filter-list-item-button" type="button">brochures</button>
          </li>
        </ul>
      </section>
      <div class="main-sidebar-social-bar">
        <ul class="social-bar-list">
          <li class="bar-list-item">
            <a class="bar-list-item-ref" href>
              <span class="bar-list-item-icon has-webicon-flickr"></span>
            </a>
          </li>
          <li class="bar-list-item">
            <a class="bar-list-item-ref" href>
              <span class="bar-list-item-icon has-webicon-googleplus"></span>
            </a>
          </li>
          <li class="bar-list-item">
            <a class="bar-list-item-ref" href>
              <span class="bar-list-item-icon has-webicon-twitter"></span>
            </a>
          </li>
          <li class="bar-list-item">
            <a class="bar-list-item-ref" href>
              <span class="bar-list-item-icon has-webicon-pinterest"></span>
            </a>
          </li>
          <li class="bar-list-item">
            <a class="bar-list-item-ref" href>
              <span class="bar-list-item-icon has-webicon-dribbble"></span>
            </a>
          </li>
          <li class="bar-list-item">
            <a class="bar-list-item-ref" href>
              <span class="bar-list-item-icon has-webicon-behance"></span>
            </a>
          </li>
          <li class="bar-list-item">
            <a class="bar-list-item-ref" href>
              <span class="bar-list-item-icon has-webicon-facebook"></span>
            </a>
          </li>
        </ul>
        <div class="main-sidebar-rights">
          <p class="sidebar-rights-description">© 2014 Kappe, All Rights Reserved</p>
        </div>
      </div>
    </div>
    <div class="hamburger-menu">
      <button
        :class="sidebar ? 'hamburger-menu-button sushi' : 'hamburger-menu-button ninja'"
        id="hamburger"
        @click="showSidebar"
        type="button"
      ></button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "side-bar",
  data: function() {
    return {
      activeName: "home"
    };
  },
  methods: {
    showSidebar: function() {
      this.$store.dispatch("toggleSidebar", !this.sidebar);
    },
    toggleActiveButton: function(e) {
      this.activeName = e.target.name;
    }
  },
  computed: {
    displaySidebar: function() {
      const result = this.sidebar ? "show-sidebar sushi" : "hide-sidebar";
      return result;
    },
    ...mapGetters(["sidebar"])
  }
};
</script>
<style lang="scss">
.has-active {
  background-color: rgb(57, 181, 178);
}

.has-no-active {
  background-color: rgb(47, 55, 59);
}

.hello {
  position: relative;
  max-width: 300px;
}

.show-sidebar {
  margin-left: 0;
  transition: 1s all;
}

.hide-sidebar {
  margin-left: -300px;
  transition: 1s all;
}

.main-sidebar {
  position: fixed;
  top: 0;

  height: 100vh;
  max-width: 300px;
  width: 100%;

  overflow-y: auto;
  z-index: 3;
}

.main-sidebar-logo {
  display: flex;
  justify-content: center;
  align-items: center;

  min-height: 125px;

  background-color: #ffffff;
}

.sidebar-navigation-list {
  list-style: none;

  padding: 0;
  margin: 0;
}

.navigation-list-item {
  text-align: right;
}

.navigation-list-item-ref {
  display: block;

  padding: 25px;

  font-size: 18px;
  color: #ffffff;
  text-decoration: none;
  transition: 1s all;
}

.navigation-list-item-ref:hover {
  background-color: rgba(57, 181, 178, 1);
  transition: 1s all;
}

.has-margin-top-zero {
  margin-top: 0;
}

.description-item-iqon {
}

.main-sidebar-filter {
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  padding: 25px;
  background-color: #282e32;
}

.sidebar-filter-title {
  position: relative;

  margin: 0;

  color: #1cb4b2;
  font-size: 19px;
}

.sidebar-filter-title::after {
  display: inline-block;
  vertical-align: middle;
  content: "";

  margin-left: 10px;
  top: calc(50% - 7px);

  height: 15px;
  width: 17px;

  background-image: url(../../assets/static/images/filter-icon.png);
  background-size: 100% 100%;
}

.sidebar-filter-list {
  margin: 0;
  padding: 0;

  text-align: right;
  list-style: none;
}

.filter-list-item {
  margin-top: 15px;
}

.filter-list-item-button {
  padding: 0;
  margin: 0;

  border: none;
  background: none;
  font-size: 13px;
  color: #62676a;
  cursor: pointer;
}

.filter-list-item-button:hover {
  color: #ffffff;
}

.main-sidebar-social-bar {
  padding: 25px;
  height: 100%;
  background-color: #252b2f;
}

.social-bar-list {
  display: flex;

  padding: 0;
  margin: 0;
  list-style: none;
}

.bar-list-item {
  margin-left: 10px;
}

.bar-list-item-icon {
  display: block;

  height: 20px;
  width: 20px;
  background-image: url(../../assets/static/images/sprites.png);
}

.has-webicon-flickr {
  background-position: -12px -16px;
  width: 24px;
  height: 24px;
}

.has-webicon-googleplus {
  background-position: -63px -16px;
  width: 24px;
  height: 24px;
}

.has-webicon-twitter {
  background-position: -113px -16px;
  width: 24px;
  height: 24px;
}

.has-webicon-pinterest {
  background-position: -162px -16px;
  width: 24px;
  height: 24px;
}

.has-webicon-dribbble {
  background-position: -214px -17px;
  width: 24px;
  height: 24px;
}

.has-webicon-behance {
  background-position: -262px -18px;
  width: 24px;
  height: 24px;
}

.has-webicon-facebook {
  background-position: -314px -18px;
  width: 24px;
  height: 24px;
}

.sidebar-rights-description {
  margin: 0;
  margin-top: 25px;

  text-align: right;
  font-size: 12px;
  color: #ffffff;
}

.hamburger-menu {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 100;
}

.hamburger-menu-button {
  position: relative;

  margin: 0;
  margin-right: -25px;
  padding: 0;
  // top: 0;
  // right: 0;
  // left: 0;

  height: 25px;
  width: 25px;

  border: none;
  // border-radius: 50%;
  background-color: rgba(54, 180, 178, 1);
  transition: 1s all;
  // z-index: 10;
  cursor: pointer;
}

.sushi {
  position: relative;
  // overflow: hidden;
}

.sushi::before {
  position: absolute;
  content: "";
  left: 0;
  border-top: 3px solid black;
  width: 100%;
  transform: rotate(45deg);
  transition: 1s all;
}

.sushi::after {
  position: absolute;
  content: "";
  left: 0;
  border-top: 3px solid black;
  width: 100%;
  transform: rotate(135deg);
  transition: 1s all;
}

.sushi:hover::before {
  transform: rotate(135deg);
  transition: 1s all;
}
.sushi:hover::after {
  transform: rotate(45deg);
  transition: 1s all;
}

.ninja::before {
  position: absolute;
  content: "";
  left: calc(50% - 10px);
  top: 50%;
  transform: translateY(-50%);

  border-top: 3px solid rgba(0, 0, 0, 0.6);
  border-bottom: 3px solid rgba(0, 0, 0, 0.6);
  width: 20px;
  height: 20px;
}

.ninja::after {
  position: absolute;
  content: "";
  top: 50%;
  transform: translateY(-50%);
  left: calc(50% - 10px);

  border-top: 3px solid rgba(0, 0, 0, 0.6);
  // border-bottom: 3px solid black;
  width: 20px;
  // height: 0;
}

.ninja:hover::after {
  // position: absolute;
  // content: "";
  // top: 50%;
  // transform: translateY(-50%);
  // left: calc(50% - 10px);

  // border-top: 3px solid rgba(0, 0, 0, 0.6);
  // // border-bottom: 3px solid black;
  // width: 20px;
  // // height: 0;
  transform: rotate(45deg);
}

.hamburger-menu-button:hover {
  background-color: rgba(54, 180, 178, 0.7);
  transition: 1s all;
}
</style>
