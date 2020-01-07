<template>
  <section v-show="coments !== undefined">
    <h3 class="footer-comments-title">{{coments.length}} Comments</h3>
    <ul v-show="coments.length !== 0" ref="comments" id="comments" class="footer-comments-list">
      <li
        ref="item"
        class="comments-list-item"
        :key="'comment' + index"
        v-for="(item, index) in coments"
      >
        <div>
          <img ref="images" class="comments-item-img" :src="item.Photography" alt />
        </div>
        <div ref="descriptions" class="comments-item-descriptions">
          <p class="item-descriptions-title">{{item.FullName}} / {{item.Date}}</p>
          <p class="item-descriptions-comment">{{item.Comment}}</p>
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  name: "SectionFooterComents",
  props: {
    coments: {
      type: Array,
      required: true
    },
    reload: {
      type: Boolean,
      required: true
    }
  },
  watch: {
    reload: function() {
      this.setParams();
    }
  },
  methods: {
    setParams: function() {
      const comentCards = this.$refs.item;
      const comentImg = this.$refs.images;
      const comentDescriptions = this.$refs.descriptions;
      const marginValue = this.$refs.comments.clientWidth / 2 / 3;

      (() => {
        let skip = 3;
        let counter = 0;
        let marginComment = 0;

        for (let item = 0; item < comentCards.length; item++) {
          if (counter < skip) {
            if (comentCards[counter] === undefined) {
              comentDescriptions[comentCards.length - 1].setAttribute(
                "class",
                "comments-item-descriptions"
              );
              break;
            }
            comentCards[counter].style.marginLeft = `${
              this.reload ? 0 : marginComment + "px"
            }`;
            comentDescriptions[counter].setAttribute(
              "class",
              `comments-item-descriptions ${this.reload ? "" : "marker-before"}`
            );
            counter += 1;
            marginComment += marginValue;
          }
          if (counter >= skip) {
            skip += 6;
            counter += 3;
            marginComment = 0;
          }
        }
      })();

      (() => {
        let skip = 6;
        let counter = 3;
        let marginComment = this.$refs.comments.clientWidth / 2;
        let resetCounter = 3;

        for (let item = 0; item < comentCards.length; item++) {
          if (counter < skip) {
            if (comentCards[counter] === undefined) {
              comentDescriptions[comentCards.length - 1].setAttribute(
                "class",
                "comments-item-descriptions"
              );
              break;
            }
            comentCards[counter].style.marginLeft = `${
              this.reload ? 0 : marginComment + "px"
            }`;
            comentDescriptions[counter].setAttribute(
              "class",
              `comments-item-descriptions ${this.reload ? "" : "marker-after"}`
            );
            comentDescriptions[resetCounter].setAttribute(
              "class",
              "comments-item-descriptions"
            );
            counter += 1;
            marginComment -= marginValue;
          }
          if (counter >= skip) {
            skip += 6;
            counter += 3;
            resetCounter += 6;
            marginComment = this.$refs.comments.clientWidth / 2;
          }
        }
      })();

      comentImg.forEach(item => {
        item.style.height = 50 + "px";
        item.style.width = 50 + "px";
      });
    }
  },
  mounted: function() {
    window.addEventListener("resize", () => {
      this.setParams();
    });

    this.setParams();

    this.$store.watch(
      (state, getters) => getters["singlePage/pending"],
      (newValue, oldValue) => {
        if (newValue === false) {
          this.setParams();
        }
      }
    );
  },
  destroyed: function() {
    window.removeEventListener("resize", this.setParams);
  }
};
</script>

<style lang="scss" scoped>
.footer-comments-title {
  margin-top: 10px;
}

.footer-comments-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.comments-list-item {
  display: flex;
  margin-top: 10px;

  min-height: 50px;

  cursor: pointer;
}

.comments-item-img {
  width: 100%;
  height: 100%;
}

.comments-item-descriptions {
  position: relative;
  display: flex;
  flex-direction: column;

  margin-left: 10px;

  min-height: 50px;
}

.marker-after::after {
  position: absolute;
  content: "";

  margin-top: 35px;
  margin-left: -160px;

  height: 100%;
  width: 50px;

  border-left: 1px solid #000000;
  border-top: 1px solid #000000;
  z-index: -1;
}

.marker-before::before {
  position: absolute;
  content: "";

  margin-top: 35px;
  margin-left: -35px;

  height: 100%;
  width: 50px;

  border-left: 1px solid #000000;
  border-bottom: 1px solid #000000;
  z-index: -1;
}

.item-descriptions-title {
  font-size: 12px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.4);
}

.item-descriptions-comment {
  font-size: 12px;
  width: 100%;
}
</style>