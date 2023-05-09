<template>
  <div class="post">
    <div class="post-header">
      <div
        class="profile"
        :style="`background-image: url(${post.userImage});`"
      ></div>
      <span class="profile-name">{{ post.name }}</span>
    </div>
    <div
      @dblclick="setLikes"
      :class="`post-body ${post.filter}`"
      :style="`background-image: url(${post.postImage});`"
    ></div>
    <div class="post-content">
      <!-- <p>{{ post.likes }} Likes</p> -->
      <p>{{ post.likes }} Likes</p>
      <p>
        <strong>{{ post.name }}</strong> {{ post.content }}
      </p>
      <p class="date">{{ post.date }}</p>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    post: Object,
    idx: Number,
  },
  methods: {
    setLikes() {
      this.$store.commit("setLikes", this.idx);
    },
  },
};
</script>
<style>
.post {
  width: 100%;
}
.profile {
  /* background-image: url("https://placeimg.com/100/100/arch"); */
  width: 30px;
  height: 30px;
  background-size: 100%;
  border-radius: 50%;
  float: left;
}
.profile-name {
  display: block;
  float: left;
  padding-left: 10px;
  padding-top: 7px;
  font-size: 14px;
}
.post-header {
  height: 30px;
  padding: 10px;
}
.post-body {
  /* background-image: url("https://placeimg.com/640/480/animals"); */
  height: 450px;
  background-position: center;
  background-size: cover; /* cover : 지정한 요소를 다 덮도록 배경이미지를 확대/축소 */
}
.post-content {
  padding-left: 15px;
  padding-right: 15px;
  font-size: 14px;
}
.date {
  font-size: 11px;
  color: grey;
  margin-top: -8px;
}
</style>
