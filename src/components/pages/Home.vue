<template>
  <div :class="margin" ref="main">
    <base-loader class="preloader" v-if="photos.length === 0" />
    <section-pictures v-else :data="photos" :width="columnWidth" />
    <button-reference />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import SectionPictures from "../modules/main-page/SectionPictures";
import ButtonReference from "../base/BaseButtonReference";
import BaseLoader from "../base/BaseLoader";

export default {
  name: "MainPage",
  data: function() {
    return {
      columnWidth: 250
    };
  },
  components: {
    SectionPictures,
    ButtonReference,
    BaseLoader
  },
  computed: {
    margin: function() {
      const result = this.sidebar
        ? "container has-show-sidebar"
        : "container has-hide-sidebar";
      return result;
    },
    ...mapGetters(["sidebar", "photos"])
  },
  methods: {
    screenHandler: function(payload = "DEFAULT") {
      const screenWidth = this.$refs.main.clientWidth;

      switch (payload) {
        case "DEFAULT":
          if (Math.floor(screenWidth) < 780 - 300) {
            this.columnWidth = 200;
            this.$store.dispatch("toggleSidebar", false);
          }
          if (Math.floor(screenWidth) > 780) {
            this.columnWidth = 250;
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

    this.screenHandler();
  },
  destroyed: function() {
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
  position: absolute;

  right: 0;

  height: 100vh;

  overflow-y: scroll;
  visibility: visible;
}
</style>
