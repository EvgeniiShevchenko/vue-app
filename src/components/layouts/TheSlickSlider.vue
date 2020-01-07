<template>
  <div class="slider">
    <slick :style="imgHeight" :id="'slider' + this.id" :options="configuration" ref="slick">
      <div
        :style="imgHeight"
        class="slider-item"
        :key="'slick' + index"
        v-for="(img, index) in slides"
      >
        <img class="slider-item-img" :src="img" alt />
      </div>
    </slick>
    <div class="slider-item-nav">
      <button type="button" @click="prev" class="nav-prev-arrow"></button>
      <button type="button" @click="next" class="nav-next-arrow"></button>
    </div>
  </div>
</template>

<script>
import Slick from "vue-slick";

export default {
  name: "TheSlickSlider",
  data: function() {
    return {
      slickOptions: {
        slidesToShow: 1,
        pauseOnHover: true,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 3000,
        speed: 1000,
        appendArrows: ".slider-item-nav",
        prevArrow: ".nav-prev-arrow",
        nextArrow: ".nav-next-arrow"
      }
    };
  },
  props: {
    slides: {
      type: Array,
      required: true
    },
    id: {
      type: Number,
      required: true
    },
    width: {
      type: Number,
      required: false
    },
    options: {
      type: Object,
      required: false,
      default: function() {
        return {};
      }
    }
  },
  components: {
    Slick
  },
  computed: {
    configuration: function() {
      if (this.options.length !== 0) {
        return { ...this.slickOptions, ...this.options };
      }
      return this.slickOptions;
    },
    imgHeight: function() {
      if (this.width !== undefined) {
        return `height: ${this.width}px`;
      }
      return `height: 100%`;
    }
  },
  methods: {
    next: function() {
      this.$refs.slick.next();
    },

    prev: function() {
      this.$refs.slick.prev();
    }
  }
};
</script>

<style lang="scss" scoped>
.slider {
  position: relative;
}

.slider-item {
  cursor: pointer;
}

.slider-item-img {
  width: 100%;
  height: 100%;
}

.slider-item-nav {
  position: absolute;

  display: flex;
  justify-content: space-between;
  align-items: center;

  top: 50%;

  width: 100%;
  height: 0;
}

.nav-prev-arrow {
  position: relative;

  margin: 0;
  padding: 0;

  height: 30px;
  width: 30px;

  background-color: rgba(26, 180, 178, 0.7);
  border: none;
  cursor: pointer;
}

.nav-prev-arrow::before {
  position: absolute;
  content: "";

  top: calc(50% - 6px);
  left: calc(50% - 6px);

  height: 12px;
  width: 12px;

  border-left: 2px solid white;
  border-bottom: 2px solid white;
  transform: rotate(45deg);
}

.nav-next-arrow {
  position: relative;

  margin: 0;
  padding: 0;

  height: 30px;
  width: 30px;

  background-color: rgba(26, 180, 178, 0.7);
  border: none;
  cursor: pointer;
}

.nav-next-arrow::after {
  position: absolute;
  content: "";

  top: calc(50% - 6px);
  right: calc(50% - 6px);

  height: 12px;
  width: 12px;

  border-right: 2px solid white;
  border-top: 2px solid white;
  transform: rotate(45deg);
}
</style>