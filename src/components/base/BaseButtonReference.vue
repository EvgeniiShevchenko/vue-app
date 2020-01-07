<template>
  <div class="main-info">
    <button class="main-info-button" type="button">
      <span class="info-button-icon"></span>
    </button>
    <ul class="main-info-description">
      <li class="info-description-item has-margin-top-zero">
        <font-awesome-icon class="description-item-icon" icon="phone-alt" />9930 1234 5679
      </li>
      <li class="info-description-item">
        <font-awesome-icon class="description-item-icon" icon="envelope" />contact@domain.com
      </li>
      <li class="info-description-item">
        <font-awesome-icon class="description-item-icon" icon="home" />street address example
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "BaseButtonReference"
};
</script>

<style lang="scss" scoped>
.main-info {
  position: absolute;

  display: flex;
  flex-direction: column;
  align-items: flex-end;

  right: 0;
  top: 0;

  z-index: 3;
}

.main-info:hover .main-info-description {
  display: flex;
  position: absolute;

  top: 90px;
}

.main-info-button {
  padding: 10px;
  margin: 0;

  height: 90px;
  width: 90px;

  border: none;
  background-color: rgb(54, 180, 178);
  cursor: pointer;
}

.info-button-icon {
  display: block;

  height: 100%;
  width: 100%;

  background-image: url(../../assets/static/images/info-button.png);
  background-size: 100% 100%;
}

.description-item-icon {
  margin-right: 10px;
}

.main-info-description {
  display: none;
  flex-direction: column;
  justify-content: space-around;

  margin: 0;
  padding: 0;

  width: 280px;
  min-height: 120px;

  list-style: none;
  background-color: rgba(0, 0, 0, 0.6);
}

.info-description-item {
  margin-left: 20px;
  color: #ffffff;
}
</style>