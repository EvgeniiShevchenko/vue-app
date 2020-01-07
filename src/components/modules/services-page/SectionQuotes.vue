<template>
  <li class="quotes-list-item">
    <h3 class="quotes-albert-einstain-title">{{quotes}}</h3>
    <p class="quotes-albert-einstain-sign">&ldquo;</p>
    <p class="quotes-albert-einstain-name">Albert Einstein</p>
  </li>
</template>

<script>
export default {
  name: "SectionQuotes",
  props: {
    quotes: {
      type: String,
      required: false,
      default: function() {
        return "Logic will get you from A to B. Imagination will take you everywhere";
      }
    },
    author: {
      type: String,
      required: false,
      default: function() {
        return "Albert Einstein";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.quotes-list-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding: 20px 10px;

  background-color: #232b2e;
  text-align: center;
}

.quotes-albert-einstain-title {
  font-size: 14px;
  color: white;
  font-style: italic;
  font-weight: 300;
}

.quotes-albert-einstain-sign {
  margin-top: 10px;

  color: #1ab5b1;
  font-size: 40px;
}

.quotes-albert-einstain-name {
  margin-top: -10px;
  color: #1ab5b1;
}
</style>