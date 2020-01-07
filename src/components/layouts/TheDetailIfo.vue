<template>
  <section class="project-detail-info">
    <h3 class="detail-info-title">
      <slot name="title" />
    </h3>
    <ul class="detail-info-list">
      <li class="info-list-item">
        <span class="item-icon-user"></span>premiumlayers
      </li>
      <li class="info-list-item">
        <span class="item-icon-likes"></span>
        {{data.Likes}}
        Likes
      </li>
      <li class="info-list-item">
        <span class="item-icon-date"></span>
        {{data.Date}}
      </li>
      <li class="info-list-item">
        <span class="item-icon-coments"></span>
        {{data.Commented}}
        Coments
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  name: "section-info",
  props: {
    data: {
      type: Object,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
.detail-info-title {
  margin: 0;
}

.detail-info-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.info-list-item {
  position: relative;
  padding: 15px 20px 15px 40px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
}

.item-icon-user {
  display: inline-block;
  position: absolute;

  top: 50%;
  transform: translateY(-50%);
  left: 0;

  height: 30px;
  width: 30px;

  background: url(../../assets/static/images/user.png);
  background-size: 100% 100%;
}

.item-icon-likes {
  display: inline-block;
  position: absolute;

  top: 50%;
  transform: translateY(-50%);
  left: 0;

  height: 30px;
  width: 30px;

  background: url(../../assets/static/images/likes.png);
  background-size: 100% 100%;
}

.item-icon-date {
  display: inline-block;
  position: absolute;

  top: 50%;
  transform: translateY(-50%);
  left: 0;

  height: 30px;
  width: 30px;

  background: url(../../assets/static/images/date.png);
  background-size: 100% 100%;
}

.item-icon-coments {
  display: inline-block;
  position: absolute;

  top: 50%;
  transform: translateY(-50%);
  left: 0;

  height: 30px;
  width: 30px;

  background: url(../../assets/static/images/coments.png);
  background-size: 100% 100%;
}
</style>
