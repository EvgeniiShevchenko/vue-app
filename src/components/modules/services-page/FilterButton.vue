<template>
  <div class="older-button" ref="filter" :style="positionButton">
    <button class="older-button-posts" type="button">OLDER POSTS</button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "FilterButton",
  props: {
    scroll: {
      type: Number,
      required: false
    }
  },
  computed: {
    positionButton: function() {
      if (this.sidebar) {
        return `marginLeft: 300px; width: ${
          this.scroll
            ? "calc(100% - 300px - " + this.scroll + "px"
            : "calc(100% - 300px)"
        }`;
      }
      return `marginLeft: 0; width: ${
        this.scroll ? "calc(100% - " + this.scroll + "px" : "100%"
      }`;
    },
    ...mapGetters(["sidebar"])
  }
};
</script>

<style lang="scss" scoped>
.older-button {
  display: flex;
  justify-content: center;
}

.older-button-posts {
  margin: 0;

  width: 200px;
  min-height: 60px;

  border: 0;
  color: #ffffff;
  background-color: #1ab4b2;
  cursor: pointer;
}
</style>