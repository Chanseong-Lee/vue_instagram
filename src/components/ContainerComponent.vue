<template>
  <div>
    <div v-if="uiLevel === 0">
      <PostComponent
        :post="post"
        :idx="i"
        v-for="(post, i) in $store.state.dataList"
        :key="i"
      />
    </div>

    <!-- 필터선택페이지 -->
    <div v-if="uiLevel === 1">
      <div
        :class="`upload-image ${selectedFilter}`"
        :style="`background-image: url(${blobURL});`"
      ></div>
      <div class="filters">
        <FilterBoxComponent
          v-for="(filter, i) in filterList"
          :key="i"
          :blobURL="blobURL"
          :filter="filter"
        >
          <!-- 
            component태그 사이에 입력한것은 자식component의 slot태그에 매핑된다. 
            주의점 : 
              1. 태그사이에만 사용가능하다. 태그속성에 바인딩 불가능
              2. slot을 여러개 사용하고 싶다면 template태그의 v-slot:변수명 -> 자식<slot name=변수명>으로 받을 수 있다.
              3. 보낼 데이터가 많으면 차라리 props를 사용하는 것이 낫다.
              4. slot props로 자식에서 부모로 역으로 보낼 수도있다.
              5. 데이터 뿐만이 아닌 html태그도 보낼수 있다.
            -->
          <span>{{ filter }}</span>
        </FilterBoxComponent>
      </div>
    </div>

    <!-- 글작성페이지 -->
    <div v-if="uiLevel === 2">
      <div
        :class="`upload-image ${selectedFilter}`"
        :style="`background-image: url(${blobURL});`"
        @change="$emit('uploadedImage', blobURL)"
      ></div>
      <div class="write">
        <textarea
          @input="$emit('content', $event.target.value)"
          class="write-box"
        ></textarea>
      </div>
    </div>
  </div>
</template>
<script>
import PostComponent from "./PostComponent.vue";
import FilterBoxComponent from "./FilterBoxComponent.vue";

import filterList from "../assets/filterList.js";

export default {
  data() {
    return {
      filterList: filterList,
    };
  },
  components: {
    PostComponent,
    FilterBoxComponent,
  },
  props: {
    // dataList: Array,
    uiLevel: Number,
    blobURL: String,
    selectedFilter: String,
  },
};
</script>
<style>
.upload-image {
  width: 100%;
  height: 450px;
  background: cornflowerblue;
  background-size: cover;
}
.filters {
  overflow-x: scroll;
  white-space: nowrap;
}
.filter-1 {
  width: 100px;
  height: 100px;
  background-color: cornflowerblue;
  margin: 10px 10px 10px auto;
  padding: 8px;
  display: inline-block;
  color: white;
  background-size: cover;
}
.filters::-webkit-scrollbar {
  height: 5px;
}
.filters::-webkit-scrollbar-track {
  background: #f1f1f1;
}
.filters::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 5px;
}
.filters::-webkit-scrollbar-thumb:hover {
  background: #555;
}
.write-box {
  border: none;
  width: 90%;
  height: 100px;
  padding: 15px;
  margin: auto;
  display: block;
  outline: none;
}
</style>
