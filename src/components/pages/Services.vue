<template>
  <div class="container">
    <div :class="margin" ref="wrapper">
      <base-pleoder class="preloader" v-if="data.length === 0" />
      <ul
        v-else
        ref="masonry"
        class="masonry"
        origin-left="false"
        item-selector=".item"
        percent-position="true"
        gutter=".gutter-item"
        initLayout="false"
        v-masonry="masonry"
      >
        <div ref="gutter" class="gutter-item"></div>
        <li
          v-masonry-tile="masonry"
          class="project-list-item item"
          ref="item"
          :key="index"
          v-for="(item, index) in data"
        >
          <article class="project-item-aticle">
            <header :id="'header' + index" class="item-aticle-header">
              <iframe class="video-player" v-if="item.Video.length" :src="item.Video[0]"></iframe>
              <the-slick-slider v-else :slides="item.Gallery" :id="index" :width="itemWidth" />
            </header>
            <router-link class="item-aticle-link" :to="`/blog/${item._id}`">
              <h3 class="item-aticle-title">{{item.Title}}</h3>
            </router-link>
            <v-clamp class="item-aticle-descriptions" autoresize :max-lines="3">{{item.Description}}</v-clamp>
            <footer class="item-aticle-footer">
              <p class="aticle-footer-comments">
                <font-awesome-icon class="description-item-icon" icon="comment" />
                {{item.Commented}} comments
              </p>
              <p class="aticle-footer-date">
                <font-awesome-icon class="description-item-icon" icon="calendar-alt" />
                {{item.Date}}
              </p>
            </footer>
          </article>
        </li>
        <li
          v-masonry-tile="masonry"
          class="img-list-item item"
          :key="'img' + index"
          v-for="(item, index) in Array(3)"
        >
          <img class="list-item-img" src="https://picsum.photos/300/200" alt />
        </li>
        <li
          v-masonry-tile="masonry"
          class="links-list-item item"
          :key="'links' + index"
          v-for="(item, index) in Array(3)"
        >
          <h3 class="links-item-title">Another Post where you can put a link a specific website</h3>
          <a class="links-item-ref" href>http://www.themeforest.net</a>
        </li>
        <section-quotes v-masonry-tile="masonry" class="item" />
        <section-additional-info v-masonry-tile="masonry" class="item" />
      </ul>
    </div>
    <div v-show="data.length !== 0" class="filter-button">
      <filter-button :scroll="scrollBarWidth" />
    </div>
    <base-button-reference />
  </div>
</template>

<script>
import VClamp from "vue-clamp";
import { mapGetters } from "vuex";
import { unsplash } from "../../helpers/ToUnsplashConnection";
import TheSlickSlider from "../layouts/TheSlickSlider";
import FilterButton from "../modules/services-page/FilterButton";
import SectionQuotes from "../modules/services-page/SectionQuotes";
import SectionAdditionalInfo from "../modules/services-page/SectionAdditionalInfo";
import BaseButtonReference from "../base/BaseButtonReference";
import BasePleoder from "../base/BaseLoader";

export default {
  name: "servises",
  data: function() {
    return {
      masonry: "masonry",
      staffItemWidth: 0,
      scrollBarWidth: 0
    };
  },
  components: {
    SectionAdditionalInfo,
    BaseButtonReference,
    TheSlickSlider,
    SectionQuotes,
    FilterButton,
    BasePleoder,
    VClamp
  },
  computed: {
    margin: function() {
      const result = this.sidebar
        ? "wrapper has-show-sidebar"
        : "wrapper has-hide-sidebar";
      return result;
    },
    itemWidth: function() {
      return this.staffItemWidth;
    },
    ...mapGetters({ data: "servicesPage/projects", sidebar: "sidebar" })
  },
  methods: {
    redraw: function() {
      this.$redrawVueMasonry("masonry");
    },
    constructor: function(payload = "DEFAULT") {
      this.staffItemWidth = this.$refs.item[0].clientWidth;

      this.$nextTick(function() {
        setTimeout(() => {
          this.$redrawVueMasonry("masonry");
        }, 0);
      });

      setTimeout(() => {
        if (
          this.$refs.wrapper.offsetWidth - 50 !==
          this.$refs.wrapper.clientWidth
        ) {
          this.scrollBarWidth =
            this.$refs.wrapper.offsetWidth -
            50 -
            this.$refs.wrapper.clientWidth;
        } else {
          this.scrollBarWidth = 0;
        }
      }, 1000);

      switch (payload) {
        case "DEFAULT":
          if (Math.floor(this.$refs.masonry.clientWidth) < 780 - 300) {
            this.$store.dispatch("toggleSidebar", false);
          }
          if (Math.floor(this.$refs.masonry.clientWidth) > 780) {
            this.$store.dispatch("toggleSidebar", true);
          }
          break;
        case "SIDEBAR":
          break;
      }
    }
  },
  mounted: function() {
    window.addEventListener("resize", () => {
      this.constructor();
    });

    this.$store.dispatch("servicesPage/fetchAllProject");

    this.$store.watch(
      (satate, getters) => getters["servicesPage/pending"],
      (newValue, oldValue) => {
        if (newValue === false) {
          this.constructor();
        }
      }
    );

    this.$store.watch(
      (state, geters) => geters["sidebar"],
      (newValue, oldValue) => {
        setTimeout(() => {
          this.constructor("SIDEBAR");
        }, 1000);
      }
    );
  },
  destroyed: function() {
    this.$store.dispatch("servicesPage/resetState");
    window.removeEventListener("resize", this.constructor);
  }
};
</script>

<style lang="scss" scoped>
.item {
  width: 23.5%;
  margin-bottom: 2%;
}

.gutter-item {
  width: 2%;
}

.container {
  position: relative;
  overflow: hidden;
}

.wrapper {
  height: 100vh;

  border: 25px solid #737575;
  background-color: #737575;
  overflow-y: auto;
}

.masonry {
  position: relative;

  padding: 0;
  margin: 0;

  width: 100%;
  height: 100%;

  list-style: none;
}

.project-item-aticle {
  background-color: #ffffff;
}

.video-player {
  width: 100%;
}

.item-aticle-link {
  display: block;
  margin-top: 10px;

  text-decoration: none;
  color: #1ab4b2;
}

.item-aticle-title {
  padding: 10px;
  padding-top: 0;
}

.item-aticle-descriptions {
  padding: 10px;
  padding-top: 0;

  font-size: 16px;
}

.item-aticle-footer {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  padding: 10px;

  border-top: 1px solid rgba(121, 119, 119, 0.4);
  font-size: 12px;
}

.list-item-img {
  width: 100%;
}

.links-list-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  min-height: 100px;

  text-align: center;
  background-color: #1ab4b2;
}

.links-item-title {
  font-size: 12px;
  color: #ffffff;
}

.links-item-ref {
  margin-top: 5px;

  font-size: 12px;
  color: #ffffff;
  font-style: italic;
}

.filter-button {
  position: absolute;
  bottom: 0;
  width: 100%;
}

@media only screen and (max-width: 1200px) {
  .item {
    width: 32%;
    margin-bottom: 2%;
  }
  .corousel {
    height: 32%;
  }
}

@media only screen and (max-width: 768px) {
  .item {
    width: 49%;
    margin-bottom: 2%;
  }
  .corousel {
    height: 49%;
  }
}

@media only screen and (max-width: 370px) {
  .item {
    width: 100%;
    margin-bottom: 2%;
  }
  .corousel {
    height: 100%;
  }
}
</style>