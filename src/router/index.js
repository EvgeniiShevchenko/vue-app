import Vue from "vue";
import VueRouter from "vue-router";
import Work from "../components/pages/Work";
import Home from "../components/pages/Home";
import About from "../components/pages/About";
import Services from "../components/pages/Services";
import Blog from "../components/pages/Single";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "main",
    component: Home
  },
  {
    path: "/work",
    name: "work",
    component: Work
  },
  {
    path: "/about",
    name: "about",
    component: About
  },
  {
    path: "/services",
    name: "Services",
    component: Services
  },
  {
    path: "/blog/:id",
    name: "blog",
    component: Blog
  }
];

const router = new VueRouter({
  routes
});

export default router;
