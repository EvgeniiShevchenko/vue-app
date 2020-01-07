<template>
  <div :class="margin">
    <base-loader class="preloader" v-if="data.length === 0" />
    <div v-else ref="content" class="wrapper">
      <aticle class="aticle" :title="data[0].Title" :descriptions="data[0].Description">
        <template slot="header">
          <img class="about-header-img" :src="data[0].Photography[0]" alt="Executor photo" />
        </template>
        <template slot="footer">
          <section-footer-aticle :staff="data[0].Staff" />
        </template>
      </aticle>
      <div class="about-detail">
        <section class="about-detail-skills">
          <h3 class="detail-skills-title">Our Skills</h3>
          <ul class="detail-skills-list">
            <li class="detail-skills-item" :key="index" v-for="(item, index) in data[0].Skills">
              <div class="skills-item-wrapper">
                <p class="skills-item-descriptions">{{item.NameScill}}</p>
                <p class="skills-item-descriptions">{{item.LevelOfOwnership}}%</p>
              </div>
              <span :style="{width: item.LevelOfOwnership + '%'}" class="skills-item-progress"></span>
            </li>
          </ul>
        </section>
        <section class="about-detail-testimonials">
          <h3 class="detail-testimonials-title">Testimonials</h3>
          <ul class="detail-testimonials-list">
            <li
              class="testimonials-list-item"
              :key="index"
              v-for="(item, index) in data[0].Testimonials"
            >
              <div class="testimonials-item-wrapper">
                <img class="testimonials-item-img" :src="item.Photography" alt />
                <p class="testimonials-item-post">{{item.FullName}} - {{item.Post}}</p>
              </div>
              <p class="testimonials-item-descriptions">{{item.Comment}}</p>
            </li>
          </ul>
        </section>
        <section class="about-detail-services">
          <h3 class="detail-services-title">Services</h3>
          <ul class="detail-services-list">
            <li
              class="services-list-item"
              :key="index"
              v-for="(item, index) in data[0].Services"
            >{{item}}</li>
          </ul>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import BaseLoader from "../base/BaseLoader";
import Aticle from "../layouts/TheAticle";
import SectionFooterAticle from "../modules/about-page/SectionFooterAticle";

export default {
  name: "AboutPage",
  components: {
    SectionFooterAticle,
    BaseLoader,
    Aticle
  },
  computed: {
    margin: function() {
      const result = this.sidebar
        ? "container has-show-sidebar"
        : "container has-hide-sidebar";
      return result;
    },
    ...mapGetters({ data: "aboutPage/author", sidebar: "sidebar" })
  },
  methods: {
    screenHandler: function(payload = "DEFAULT") {
      const screenWidth = document.querySelector(".wrapper").clientWidth;
      switch (payload) {
        case "DEFAULT":
          if (Math.floor(screenWidth) < 780 - 300) {
            this.$store.commit("toggleSidebar", false);
          }
          if (Math.floor(screenWidth) > 780) {
            this.$store.commit("toggleSidebar", true);
          }
          break;
        case "SIDEBAR":
          break;
      }
    }
  },
  mounted: function() {
    window.addEventListener("resize", () => {
      this.screenHandler();
    });

    this.$store.dispatch("aboutPage/fetchAuthor");

    this.$store.watch(
      (state, geters) => geters["aboutPage/pending"],
      (newValue, oldValue) => {
        if (newValue === false) {
          this.screenHandler();
        }
      }
    );
  },
  destroyed: function() {
    this.$store.dispatch("aboutPage/resetState");
    window.removeEventListener("resize", this.screenHandler);
  }
};
</script>

<style lang="scss" scoped>
.container {
  padding: 25px;
  top: 0px;

  height: 100vh;

  border: 25px solid #f9fafa;
  outline: 25px solid #cccccc;
  outline-offset: -25px;
}

.wrapper {
  display: flex;
  flex-wrap: wrap;

  height: calc(100vh - 100px);
  overflow-y: auto;
}

.aticle {
  width: calc(100% / 2);
}

.about-header-img {
  width: 100%;
}

.about-detail {
  padding-left: 25px;
  width: calc(100% / 2);
}

.detail-skills-title {
  margin: 0;
}

.detail-skills-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.skills-item-wrapper {
  display: flex;
  justify-content: space-between;
}

.skills-item-descriptions {
  margin: 10px 0 0 0;
}

.skills-item-progress {
  display: block;

  margin-top: 5px;

  height: 20px;
  background-color: #e2e2e2;
}

.detail-testimonials-title {
  margin: 20px 0 0 0;
}

.detail-testimonials-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.testimonials-list-item {
  margin-top: 10px;
}

.testimonials-item-wrapper {
  display: flex;

  height: 50px;

  align-items: center;
  background-color: #1ab4b2;
}

.testimonials-item-img {
  width: 50px;
  height: 100%;
}

.testimonials-item-post {
  margin-left: 20px;
  color: #ffffff;
}

.testimonials-item-descriptions {
  margin: 15px 0 0 0;
  padding-left: 25px;
}

.detail-services-list {
  padding: 0;
  margin: 10px 0 0 20px;
}

.services-list-item {
  margin-bottom: 10px;
}

.detail-services-title {
  margin: 20px 0 0 0;
}

@media only screen and (max-width: 768px) {
  .aticle {
    width: 100%;
    padding-right: 0;
  }

  .about-detail {
    padding-left: 0;
    width: 100%;
  }
}
</style>
