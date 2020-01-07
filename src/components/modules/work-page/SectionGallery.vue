<template>
  <section>
    <h3 class="gallery-title">Project Gallery</h3>
    <ul ref="gallery" class="gallery-list">
      <li class="gallery-item" :key="index" :id="index" v-for="(items, index) in data.Gallery">
        <img class="gallery-item-img" :src="data.Gallery[index]" alt />
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  name: "SectionGallery",
  data: function() {
    return {
      columnGallery: 80
    };
  },
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  methods: {
    setParams() {
      const galleryCards = document.getElementsByClassName("gallery-item");

      const galleryColums = Math.ceil(
        this.$refs.gallery.clientWidth / this.columnGallery
      );

      const galleryItemWidth =
        (this.$refs.gallery.clientWidth - 1) / galleryColums;

      galleryCards.forEach(element => {
        element.style.width = galleryItemWidth + "px";
        element.style.height = galleryItemWidth + "px";
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
          this.setParams();
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
.gallery-title {
  margin: 10px 0 10px 0;
}

.gallery-list {
  display: flex;
  flex-wrap: wrap;

  margin: 0;
  padding: 0;

  list-style: none;
  font-size: 0;
}

.gallery-item {
  cursor: pointer;
}

.gallery-item-img {
  width: 100%;
  height: 100%;
}
</style>