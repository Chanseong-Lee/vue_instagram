<template>
  <div
    :class="`${filter} filter-item`"
    :style="`background-image: url(${blobURL})`"
  >
    <slot></slot>
    <button @click="fire">버튼</button>
  </div>
</template>
<script>
export default {
  name: "FilterBoxComponent",
  props: {
    blobURL: String,
    filter: String,
  },
  methods: {
    fire() {
      // 다른컴포넌트로 이벤트를 보낸다.
      this.emitter.emit("sendFilter", this.filter);
    },
  },
};
</script>
<style>
.filter-item {
  width: 100px;
  height: 100px;
  margin: 10px 10px 10px auto;
  padding: 8px;
  display: inline-block;
  color: white;
  background-size: cover;
  background-position: center;
}
</style>
