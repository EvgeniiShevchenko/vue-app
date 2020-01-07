<template>
  <section>
    <h3 class="staff-title">Our Staff</h3>
    <ul ref="staff" class="staff-list">
      <li ref="character" class="staff-list-item" :key="index" v-for="(item, index) in staff">
        <img class="staff-item-img" :src="item.Photography" alt />
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  name: "SectionFooterAticle",
  data: function() {
    return {
      staffColumn: 150
    };
  },
  props: {
    staff: {
      type: Array,
      required: true
    }
  },
  methods: {
    setParams: function() {
      const staffList = this.$refs.staff;
      const staffCards = this.$refs.character;
      const staffColums = Math.ceil(staffList.clientWidth / this.staffColumn);
      const staffItemWidth = (staffList.clientWidth - 1) / staffColums;
      const marginValue = 10;
      const marginAuto = (staffColums * marginValue) / (staffColums - 1) + "px";

      function marginControl() {
        const quantityRows = staffCards.length / staffColums;
        const hasOne = (staffColums + 1) / staffColums;
        return quantityRows === hasOne;
      }

      if (staffCards.length % staffColums === 0) {
        staffCards.forEach(element => {
          element.style.width = staffItemWidth - marginValue + "px";
          element.style.height = staffItemWidth - marginValue + "px";
          element.style.marginBottom = marginAuto;
          staffList.classList.remove("flexBroken");
          staffCards[staffCards.length - 1].style.marginLeft = 0;
        });
      } else {
        staffCards.forEach(element => {
          element.style.width = staffItemWidth - marginValue + "px";
          element.style.height = staffItemWidth - marginValue + "px";
          element.style.marginBottom = marginAuto;
          staffList.setAttribute("class", "staff-list flexBroken");
        });
        if (marginControl()) {
          staffCards[staffCards.length - 1].style.marginLeft = 0;
        } else {
          staffCards[staffCards.length - 1].style.marginLeft = marginAuto;
        }
      }
    }
  },
  mounted: function() {
    window.addEventListener("resize", () => {
      this.setParams();
    });

    this.setParams();

    this.$store.watch(
      (state, geters) => geters["sidebar"],
      (oldValue, newValue) => {
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
.staff-title {
  margin: 40px 0 0 0;
}

.staff-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  margin: 20px 0 0 0;
  padding: 0;

  list-style: none;
}

.flexBroken::after {
  content: "";
  flex: auto;
}

.staff-item-img {
  width: 100%;
  height: 100%;
}
</style>