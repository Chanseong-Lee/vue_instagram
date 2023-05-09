<template>
  <div
    @click="sendFilter"
    :class="`${filter} filter-item`"
    :style="`background-image: url(${blobURL})`"
  >
    <div class="filter-name">
      <slot></slot>
    </div>
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
    sendFilter() {
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
  cursor: pointer;
}
.filter-name {
  text-align: center;
  vertical-align: middle;
  background-color: black;
  border-radius: 5px;
  opacity: 0.6;
  width: 100%;
  margin-top: 110%;
}
</style>
