<template>
  <div :class="margin">
    <base-loader class="preloader" v-if="data.length === 0" />
    <div v-else ref="content" class="wrapper">
      <div class="blog">
        <aticle class="aticle" :title="data.Title" :descriptions="data.Description">
          <template slot="header">
            <carousel
              @paggination="nextProject"
              :data="data.Gallery"
              :content="data.Gallery[activeButton]"
            />
          </template>
          <template slot="footer">
            <section-footer-coments
              class="comments"
              :reload="reloadChild"
              :coments="data.Comments"
            />
          </template>
        </aticle>
        <section-coments-form :id="aticleId" />
      </div>
      <div class="detail">
        <section-info :data="data">
          <template slot="title">Post info</template>
        </section-info>
        <section class="detail-tags">
          <h3 class="detail-tags-title">Tags</h3>
          <ul class="detail-tags-list">
            <li class="tags-list-item" :key="index" v-for="(item, index) in data.Tags">{{ item }}</li>
          </ul>
        </section>
        <section class="blog-archives">
          <h3 class="blog-archives-title">Archives</h3>
          <ul class="blog-archives-list">
            <li
              class="blog-archives-item"
              :key="index"
              v-for="(item, index) in ['Desember 2013 (24)', 'November 2013 (7)', 'September 2013 (2)', 'March 2013 (22)', 'January 2013 (11)']"
            >{{ item }}</li>
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
import Carousel from "../layouts/TheCarousel";
import SectionComentsForm from "../layouts/TheComentsForm";
import SectionInfo from "../layouts/TheDetailIfo";
import SectionFooterComents from "../modules/single-page/SectionFooterComents";

export default {
  name: "Blog",
  data: function() {
    return {
      activeButton: 0,
      aticleId: "",
      reloadChild: false
    };
  },
  components: {
    Aticle,
    Carousel,
    BaseLoader,
    SectionInfo,
    SectionComentsForm,
    SectionFooterComents
  },
  computed: {
    margin: function() {
      const result = this.sidebar
        ? "container has-show-sidebar"
        : "container has-hide-sidebar";
      return result;
    },
    ...mapGetters({ data: "singlePage/project", sidebar: "sidebar" })
  },
  methods: {
    screenHandler: function(payload = "DEFAULT") {
      const screenWidth = this.$refs.content.clientWidth;
      const fullWidth = window.screen.width;
      const comments = document
        .getElementById("comments")
        .getElementsByTagName("li");

      if (fullWidth < 600) {
        comments.forEach(item => {
          item.style.marginLeft = 0;
          this.reloadChild = true;
        });
      }

      if (fullWidth > 600) {
        comments.forEach(item => {
          this.reloadChild = false;
        });
      }

      switch (payload) {
        case "DEFAULT":
          if (Math.floor(screenWidth) < 600) {
            this.$store.dispatch("toggleSidebar", false);
          }
          if (Math.floor(screenWidth) > 780) {
            this.$store.dispatch("toggleSidebar", true);
          }
          break;
        case "SIDEBAR":
          break;
      }
    },
    nextProject: function(currentButton) {
      this.activeButton = currentButton;
    }
  },
  created: function() {
    this.aticleId = this.$route.params.id;
  },
  mounted: function() {
    window.addEventListener("resize", () => {
      this.screenHandler();
    });

    this.$store.dispatch("singlePage/fetchProject", this.aticleId);

    this.$store.watch(
      (state, geters) => geters["singlePage/pending"],
      (newValue, oldValue) => {
        if (newValue === false) {
          this.screenHandler();
        }
      }
    );

    this.$store.watch(
      (state, geters) => geters["sidebar"],
      (newValue, oldValue) => {
        this.screenHandler("SIDEBAR");
      }
    );
  },
  destroyed: function() {
    this.$store.dispatch("singlePage/resetState");

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

.blog {
  display: flex;
  flex-direction: column;

  padding-right: 25px;
  width: calc(100% / 2);
}

.aticle {
  padding-right: 0;
}

.blog-header-img {
  width: 100%;
  cursor: pointer;
}

.detail {
  padding-left: 25px;
  width: calc(100% / 2);
}

.detail-tags-title {
  margin-top: 10px;
}

.detail-tags-list {
  display: flex;
  flex-wrap: wrap;

  margin: 10px 0 0 0;
  padding: 0;

  list-style: none;
}

.tags-list-item {
  padding: 10px 15px 10px 15px;
  margin: 0 0 5px 5px;

  border: 1px solid #000000;
  border-radius: 8px;
}
.blog-archives-title {
  margin: 20px 0 0 0;
}

.blog-archives-list {
  margin: 10px 0 0 0;
  padding: 0;

  list-style: none;
}

.blog-archives-item {
  position: relative;
  margin-top: 10px;
}

.post-form-list {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;

  margin: 0;
  padding: 0;

  list-style: none;
}

@media only screen and (max-width: 768px) {
  .blog {
    width: 100%;
  }

  .detail {
    margin-top: 20px;
    padding-left: 0;

    width: 100%;
  }
}
</style>
