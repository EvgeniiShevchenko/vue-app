<template>
  <article class="aticle">
    <header>
      <slot name="header" />
    </header>
    <h3 class="aticle-title">{{ title }}</h3>
    <p class="aticle-description">{{descriptions}}</p>
    <footer>
      <slot name="footer" />
    </footer>
  </article>
</template>

<script>
export default {
  name: "TheAticle",
  props: {
    title: {
      type: String,
      required: false
    },
    descriptions: {
      type: String,
      required: false
    }
  }
};
</script>

<style lang="scss" scoped>
.aticle {
  display: flex;
  flex-direction: column;

  padding-right: 25px;
}

.aticle-title {
  margin: 15px 0 0 0;
}

.aticle-description {
  margin: 15px 0 0 0;
  text-align: justify;
}
</style>