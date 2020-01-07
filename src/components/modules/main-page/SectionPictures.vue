<template>
  <ul class="main-content-box" ref="pictures">
    <li ref="item" v-for="(item, index) in data" :key="index" class="content-box-item">
      <img class="box-item-img" :src="item.urls.raw + '&fit=scale&w=300&h=300'" />
      <section class="box-item-hover">
        <h3 class="item-hover-title">Cool App Design</h3>
        <h4 class="item-hover-subtitle">development, mobile</h4>
        <a class="item-hover-ref" href>
          <span class="item-hover-icon"></span>
        </a>
      </section>
    </li>
  </ul>
</template>

<script>
export default {
  name: "SectionPictures",
  props: {
    data: {
      type: Array,
      required: true
    },
    width: {
      type: Number,
      required: true
    }
  },
  methods: {
    setParams: function() {
      const cards = this.$refs.item;
      const cardWidth = this.$refs.pictures.clientWidth;
      let columnWidth = this.width;

      const culumn = Math.ceil(cardWidth / columnWidth);
      const screenWidth = cardWidth / culumn;

      cards.forEach((item, index) => {
        item.style.width = screenWidth + "px";
        item.style.heigth = screenWidth + "px";
      });
    }
  },
  mounted: function() {
    window.addEventListener("resize", () => {
      this.setParams();
    });

    this.setParams();

    this.$store.watch(
      (state, geters) => geters["sidebar"],
      (newValue, oldValue) => {
        setTimeout(() => {
          this.setParams();
        }, 1000);
      }
    );
  },
  destroyed: function() {
    window.removeEventListener("resize", this.setParams);
  }
};
</script>

<style lang="scss" scoped>
.main-content-box {
  position: absolute;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  padding: 0;
  margin: 0;

  width: 100%;

  list-style: none;
  font-size: 0;
}

.content-box-item {
  position: relative;
}

.content-box-item:hover .box-item-hover {
  display: flex;
  background-color: rgba(54, 180, 178, 0.8);
}

.box-item-img {
  width: 100%;
}

.box-item-hover {
  position: absolute;
  display: none;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  top: 0;

  height: 100%;
  width: 100%;

  z-index: 3;
}

.item-hover-title {
  margin: 0;

  font-size: 24px;
  text-align: center;
  color: #ffffff;
}

.item-hover-subtitle {
  margin: 0;
  margin-top: 5px;
  padding-bottom: 15px;

  border-bottom: 1px solid #ffffff;
  font-size: 12px;
  color: #ffffff;
}

.item-hover-ref {
  margin-top: 15px;

  height: 40px;
  width: 40px;

  background: url(../../../assets/static/images/info-button.png);
  background-size: 100% 100%;
}

.item-hover-icon {
  display: block;
  font-size: 18px;
}
</style>