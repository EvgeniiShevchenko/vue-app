<template>
  <li class="quotes-list-aside">
    <h3 class="quotes-aside-title">{{title}}</h3>
    <p class="quotes-aside-text">{{descriptions}}</p>
  </li>
</template>

<script>
export default {
  name: "SectionAdditionalInfo",
  props: {
    title: {
      type: String,
      required: false,
      default: function() {
        return "Aside Post Format";
      }
    },
    descriptions: {
      type: String,
      required: false,
      default: function() {
        return "This is Photoshop's version of Lorem ipsum. Proin gravida nibh vel velit auctor aliquet. Aenean sollicitudin";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.quotes-list-aside {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding: 20px 10px;

  background-color: #232b2e;
  border-left: 10px solid #1ab5b1;
}

.quotes-aside-title {
  width: 100%;

  text-align: left;
  font-size: 14px;
  color: #ffffff;
}

.quotes-aside-text {
  margin-top: 10px;

  font-size: 14px;
  color: #9c9e9d;
}
</style>