<template>
  <div class="carousel">
    <img class="carousel-img" :src="content" alt />
    <ul class="corousel-list">
      <li class="corousel-list-item" :key="index" v-for="(project, index) in data">
        <button
          v-if="activeButton === index"
          :id="index"
          class="corousel-item-button has-button-active"
        ></button>
        <button v-else :id="index" @click="corouselHendler" class="corousel-item-button"></button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "TheCarousel",
  data: function() {
    return {
      activeButton: 0,
      sliderStatus: true
    };
  },
  props: {
    data: {
      type: Array | Object,
      required: true
    },
    content: {
      type: String,
      required: false
    }
  },
  methods: {
    corouselHendler: function(event) {
      const id = Number(event.target.id);
      const highestTimeoutId = setTimeout(";");

      this.activeButton = id;

      for (let i = 0; i < highestTimeoutId; i++) {
        clearTimeout(i);
      }

      this.$emit("paggination", id);
    },
    timer: function() {
      const countSlider = this.data.length - 1;

      if (this.sliderStatus === true) {
        setInterval(() => {
          if (this.activeButton < countSlider) {
            let currentSlide = (this.activeButton += 1);

            this.activeButton = currentSlide;
            this.$emit("paggination", currentSlide);
          } else {
            this.activeButton = 0;
            this.$emit("paggination", 0);
          }
        }, 8000);
      }
    }
  },
  mounted: function() {
    this.timer();
  }
};
</script>

<style lang="scss" scoped>
.carousel {
  position: relative;
}

.carousel-img {
  width: 100%;
  cursor: pointer;
}

.corousel-list {
  position: absolute;
  right: 10px;
  bottom: 20px;

  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  z-index: 0;
}

.corousel-list-item {
  margin-right: 5px;
}

.corousel-item-button {
  box-sizing: content-box;
  margin: 0;
  padding: 0;

  width: 25px;
  height: 8px;

  border: 1px solid #c8cac9;
  background-color: #999b9a;
  outline: none;
  cursor: pointer;
}

.has-button-active {
  background-color: #38b4b4;

  border: 1px solid #5a5a58;
}
</style>