<template>
  <section class="blog-comment-post">
    <h3>Leave a Comment</h3>
    <form @submit.prevent="toSubmit" class="comment-post-form">
      <div class="post-form-personality">
        <label class="personality-user-icon" for="fild-name">
          <input
            class="form-item-input"
            value
            name="name"
            id="fild-name"
            type="text"
            placeholder="Name"
            v-model="nameFild"
          />
        </label>
        <label class="personality-email-icon" for="fild-email">
          <input
            class="form-item-input"
            value
            name="email"
            id="fild-email"
            type="email"
            placeholder="e-mail"
            v-model="emailFild"
          />
        </label>
        <label class="personality-url-icon" for="fild-url">
          <input
            class="form-item-input"
            value
            name="website"
            id="fild-url"
            type="url"
            placeholder="website"
            v-model="websiteFild"
          />
        </label>
      </div>
      <div class="post-form-massage">
        <textarea
          v-model="massageFild"
          class="form-massage"
          value
          name="massage"
          id="fild-message"
          placeholder="Message"
        ></textarea>
        <button class="form-item-submit" name="submit" id="submit" type="submit">POST A COMMENT</button>
      </div>
    </form>
  </section>
</template>

<script>
const uuidv1 = require("uuid/v1");

export default {
  name: "TheComentsForm",
  data: function() {
    return {
      nameFild: "",
      emailFild: "",
      websiteFild: "",
      massageFild: ""
    };
  },
  props: {
    id: {
      type: String,
      requred: true
    }
  },
  methods: {
    toSubmit: async function(e) {

      const newComment = {
        FullName: this.nameFild,
        Photography: `https://robohash.org/${uuidv1()}.png`,
        Email: this.emailFild,
        WebSite: this.websiteFild,
        Comment: this.massageFild,
        Date: new Date()
      };

      await this.$store.dispatch("singlePage/addComment", {
        newComment,
        id: this.id
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.blog-comment-post {
  margin-top: 10px;
  width: 100%;
}

.comment-post-form {
  display: flex;
  margin-top: 15px;
  min-height: 130px;
}

.post-form-personality {
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  flex-grow: 1;
  flex-shrink: 1;
}

.form-item-input {
  padding-left: 10px;

  height: 40px;
  width: 100%;
}

.post-form-massage {
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  margin-left: 10px;

  flex-grow: 1;
  flex-shrink: 1;
}

.form-massage {
  width: 100%;
  min-height: 85px;
}

.form-item-submit {
  margin: 0;
  padding: 0;

  height: 40px;

  border: none;
  background-color: #38b4b4;
  color: white;

  cursor: pointer;
}

.personality-user-icon {
  position: relative;
  margin-left: 40px;
}

.personality-user-icon::before {
  content: "";
  position: absolute;

  top: calc(50% - 15px);
  margin-left: -35px;

  height: 30px;
  width: 30px;

  box-sizing: content-box;
  background: url(../../assets/static/images/user.png);
  background-size: 100% 100%;
}

.personality-user-icon::after {
  content: "";
  position: absolute;

  top: 0;
  left: 0;
  margin-left: -40px;

  height: 100%;
  width: 40px;

  border: 1px solid #000000;
}

.personality-email-icon {
  position: relative;
  margin-left: 40px;
}

.personality-email-icon::before {
  position: absolute;
  content: "";

  top: calc(50% - 15px);
  margin-left: -35px;

  height: 30px;
  width: 30px;

  box-sizing: content-box;
  background: url(../../assets/static/images/user.png);
  background-size: 100% 100%;
}

.personality-email-icon::after {
  content: "";
  position: absolute;

  top: 0;
  left: 0;
  margin-left: -40px;

  height: 100%;
  width: 40px;

  border: 1px solid #000000;
}

.personality-url-icon {
  position: relative;
  margin-left: 40px;
}

.personality-url-icon::before {
  box-sizing: content-box;
  position: absolute;
  content: "";

  top: calc(50% - 15px);
  margin-left: -35px;

  height: 30px;
  width: 30px;

  background: url(../../assets/static/images/coments.png);
  background-size: 100% 100%;
}

.personality-url-icon::after {
  content: "";
  position: absolute;

  top: 0;
  left: 0;
  margin-left: -40px;

  height: 100%;
  width: 40px;

  border: 1px solid #000000;
}

@media only screen and (max-width: 1200px) {
  .comment-post-form{
    flex-wrap: wrap;
  }

  .post-form-massage{
    margin-left: 0;
  }
}
</style>