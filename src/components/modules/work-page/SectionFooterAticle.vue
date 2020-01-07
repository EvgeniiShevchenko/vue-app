<template>
  <section>
    <h3 class="footer-content-title">Related Projects</h3>
    <ul ref="related" class="footer-content-list">
      <li
        ref="cards"
        class="content-list-item"
        :key="index"
        v-for="(item, index) in reletedProjects"
      >
        <img class="content-list-img" :src="item" alt />
      </li>
    </ul>
  </section>
</template>
    
<script>
export default {
  name: "SectionFooterAticle",
  data: function() {
    return {
      relatedColumn: 150
    };
  },
  props: {
    reletedProjects: {
      type: Array,
      required: false
    }
  },
  methods: {
    setParams: function() {
      const relatedCards = this.$refs.cards;

      const relatedColumns = Math.ceil(
        this.$refs.related.clientWidth / this.relatedColumn
      );
      const relatedItemWidth =
        (this.$refs.related.clientWidth - 1) / relatedColumns;

      relatedCards.forEach(element => {
        element.style.width = relatedItemWidth + "px";
        element.style.height = relatedItemWidth + "px";
      });
    }
  },
  mounted: function() {
    window.addEventListener("resize", () => {
      this.setParams();
    });

    this.$store.watch(
      (state, geters) => geters["workPage/pending"],
      (newValue, oldValue) => {
        setTimeout(() => {
          this.screenHandler();
        }, 1000);
      }
    );

    this.setParams();
  },
  destroyed: function() {
    window.removeEventListener("resize", this.setParams);
  }
};
</script>

<style lang="scss" scoped>
.footer-content-title {
  margin-top: 10px;
}

.footer-content-list {
  display: flex;
  flex-wrap: wrap;

  margin: 0;
  padding: 0;

  list-style: none;
  font-size: 0;
}

.content-list-item {
  margin-top: 10px;
  cursor: pointer;
}

.content-list-img {
  width: 100%;
  height: 100%;
}
</style>