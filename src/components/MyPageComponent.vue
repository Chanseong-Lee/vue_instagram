<template>
  <div style="padding: 10px">
    <h4>Followers</h4>
    <input
      id="keyword"
      @input="searchFollower($event.target.value)"
      placeholder="🔍"
    />
    <div class="post-header" v-for="(item, i) in follower" :key="i">
      <div
        class="profile"
        :style="`background-image: url(${item.image})`"
      ></div>
      <span class="profile-name">{{ item.name }}</span>
    </div>
  </div>
</template>
<script>
import { ref, onMounted } from "vue";
import axios from "axios";

export default {
  name: "MyPageComponent",
  // Composition API instead of Option API
  // created life cycle과 유사, 컴포넌트 만들기전에 실행됨
  setup() {
    // 데이터를 만들때는 ref함수를 사용해야한다.
    // ref함수는 refrence data type으로 데이터를 만들기 위해 사용함(실시간 반영을 위해)
    let follower = ref([]);
    let temp = ref([]);
    // let keyword = ref("");
    function searchFollower(str) {
      let filtered = temp.value.filter((item) => item.name.indexOf(str) !== -1);
      follower.value = filtered;
    }
    //life cycle의 mount와 동일함
    onMounted(() => {
      axios.get("./follower.json").then((res) => {
        //여기서 follower는 ref타입이므로 value라는 프로퍼티에 값을 저장해야한다.
        follower.value = res.data;
        temp.value = [...res.data];
      });
    });

    return { follower, searchFollower };
  },
};
</script>
<style></style>
