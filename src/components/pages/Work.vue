<template>
  <div :class="margin">
    <!-- <div class="container" :style="marginRight"> -->
    <base-loader class="preloader" v-if="data.length === 0" />
    <div v-else ref="content" class="wrapper">
      <aticle
        class="project-aticle"
        :title="data[activeButton].Title"
        :descriptions="data[activeButton].Description"
      >
        <template slot="header">
          <carousel @paggination="nextProject" :data="data" :content="data[activeButton].Images" />
        </template>
        <template slot="footer">
          <section-footer-aticle :reletedProjects="data[activeButton].ReletedProjects" />
        </template>
      </aticle>
      <div class="project-detail">
        <section-info :data="data[activeButton]">
          <template slot="title">Project info</template>
        </section-info>
        <section class="project-detail-tags">
          <h3 class="detail-tags-title">Tags</h3>
          <ul class="detail-tags-list">
            <li
              class="tags-list-item"
              :key="index"
              v-for="(item, index) in data[activeButton].Tags"
            >{{ item }}</li>
          </ul>
        </section>
        <section-gallery :data="data[activeButton]" />
        <section class="project-detail-features">
          <h3 class="detail-features-title">Project Features</h3>
          <ul class="detail-features-list">
            <li
              class="detail-features-item"
              :key="index"
              v-for="(item, index) in data[activeButton].Features"
            >
              <span class="features-item-check"></span>
              {{ item }}
            </li>
          </ul>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import BaseLoader from "../base/BaseLoader";
import SectionInfo from "../layouts/TheDetailIfo";
import Aticle from "../layouts/TheAticle";
import Carousel from "../layouts/TheCarousel";
import SectionGallery from "../modules/work-page/SectionGallery";
import SectionFooterAticle from "../modules/work-page/SectionFooterAticle";

export default {
  name: "WorkPage",
  data: function() {
    return {
      activeButton: 0
    };
  },
  components: {
    Aticle,
    Carousel,
    BaseLoader,
    SectionInfo,
    SectionGallery,
    SectionFooterAticle
  },
  computed: {
    margin: function() {
      const result = this.sidebar
        ? "container has-show-sidebar"
        : "container has-hide-sidebar";
      return result;
    },
    ...mapGetters({ data: "workPage/projects", sidebar: "sidebar" })
  },
  methods: {
    nextProject: function(currentButton) {
      this.activeButton = currentButton;
    },
    screenHandler: function(payload = "DEFAULT") {
      const screenWidth = this.$refs.content.clientWidth;

      switch (payload) {
        case "DEFAULT":
          if (Math.floor(screenWidth) < 780 - 300) {
            this.$store.dispatch("toggleSidebar", false);
          }
          if (Math.floor(screenWidth) > 780) {
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
      this.screenHandler();
    });

    this.$store.watch(
      (state, geters) => geters["workPage/pending"],
      (newValue, oldValue) => {
        if (newValue === false) {
          this.screenHandler();
        }
      }
    );

    this.$store.dispatch("workPage/fetchAllProject");
  },
  destroyed: function() {
    this.$store.dispatch("workPage/resetState");
    window.removeEventListener("resize", this.screenHandler);
  }
};
</script>

<style lang="scss" scoped>
.preloader {
  display: flex;
  justify-content: center;
  align-items: center;

  height: 100%;
}

.container {
  top: 0px;
  padding: 25px;

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

.project-detail {
  padding-left: 25px;
  width: calc(100% / 2);
}

.project-aticle {
  width: calc(100% / 2);
}

.detail-tags-title {
  margin: 10px 0 10px 0;
}

.detail-tags-list {
  display: flex;
  flex-wrap: wrap;

  margin: 0;
  padding: 0;
  margin-top: 10px;

  list-style: none;
}

.tags-list-item {
  padding: 10px 15px 10px 15px;
  margin: 0 5px 5px 0;

  border: 1px solid #000000;
  border-radius: 8px;
}

.detail-features-title {
  margin: 20px 0 0 0;
}

.detail-features-list {
  margin: 10px 0 0 0;
  padding: 0;

  list-style: none;
}

.detail-features-item {
  margin-top: 10px;
}

.features-item-check {
  display: inline-block;
  position: relative;

  top: calc(50% - 5px);

  height: 10px;
  width: 10px;

  overflow: hidden;
}

.features-item-check::before {
  position: absolute;
  content: "";

  right: 2px;
  margin-top: -5px;

  height: 10px;
  width: 10px;

  border: 2px solid #000000;
  transform: rotate(45deg);
}

@media only screen and (max-width: 768px) {
  .project-aticle {
    width: 100%;
  }

  .aticle {
    padding-right: 0;
  }

  .project-detail {
    margin-top: 20px;
    padding-left: 0;
    width: 100%;
  }
}
</style>
