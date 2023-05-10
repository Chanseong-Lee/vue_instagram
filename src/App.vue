<template>
  <div class="header">
    <ul class="header-button-left">
      <li v-if="uiLevel === 1 || uiLevel === 2" @click="cancel">Cancel</li>
    </ul>
    <ul class="header-button-right">
      <li v-if="uiLevel === 1" @click="next">Next</li>
      <li v-if="uiLevel === 2" @click="publish">Save</li>
    </ul>
    <img src="./assets/logo.png" class="logo" />
  </div>

  <ContainerComponent
    :uiLevel="uiLevel"
    :blobURL="blobURL"
    :selectedFilter="selectedFilter"
    @uploadedImage="blobURL = $event"
    @content="content = $event"
  />

  <div class="button-group">
    <button class="more-button" @click="$store.dispatch('getAdditionalData')">
      More
    </button>
  </div>

  <div class="footer">
    <ul class="footer-button-plus">
      <input
        @change="upload"
        type="file"
        id="file"
        class="inputfile"
        accept="image/*"
      />
      <label for="file" class="input-plus">+</label>
    </ul>
  </div>
</template>

<script>
// import dataList from "./assets/dataList.js";
import ContainerComponent from "./components/ContainerComponent.vue";
//mapState import
import { mapMutations, mapState, mapActions } from "vuex";

/* axios ajax */
export default {
  name: "App",
  data() {
    return {
      // dataList: dataList,
      uiLevel: 3 /** router말고 tab기능으로 구현 */,
      blobURL: "",
      content: "",
      selectedFilter: "",
      카운터: 0,
    };
  },
  mounted() {
    //mitt로 보낸 이벤트 수신은 mounted() 훅에서 받는게 관습
    this.emitter.on("sendFilter", (filter) => {
      this.selectedFilter = filter;
    });
  },
  components: {
    ContainerComponent,
  },
  computed: {
    //최초 로드되고 한번 작동되고 다시 실행안함. 값을 갖고있음
    //보통 계산결과 값 저장 용
    //연산결과가 오래걸리는 로직은 재랜더링이 되지않는 computed에 넣어두는것이 효과적
    //위에서 호출할 경우에는 괄호를 사용하지 않고 변수명만사용
    btnCount() {
      //store에 저장되어있는 변수명으로 써두면 store변수를 간단히 쓸수 있다.
      return this.$store.state.btnCount;
    },
    ...mapState(["dataList", "more"]),
    //...mapState({변수명 : 'state변수', ...}),
  },
  methods: {
    //store의 mutations함수들을 가져올 수 있다.
    ...mapMutations(["setLikes", "addDataList"]),
    //store의 actions함수들을 가져올 수 있다.
    ...mapActions(["getAdditionalData"]),
    upload(e) {
      //event parameter
      // e.target.files : 업로드한 file들이 담겨있다.
      let file = e.target.files;
      if (!file[0]) {
        return;
      }
      let url = URL.createObjectURL(file[0]);
      console.log(url);
      this.blobURL = url;
      this.uiLevel = 1; // 업로드탭으로 변경
      /*업로드한 이미지를 불러오는방법은 두가지 
      1. FileReader() : 파일을 글자로 변경, 
      2. URL.createObjectURL() : 이미지의 가상 url을 생성(blob : binary데이터를 다룰때 사용하는 객체)
      */
    },
    next() {
      if (this.uiLevel < 2) {
        this.uiLevel++;
      } else if (this.uiLevel == 2) {
        this.uiLevel = 0;
      }
    },
    cancel() {
      this.uiLevel = 0;
    },
    publish() {
      let newPost = {
        name: "Kim Hyun",
        userImage: "https://placeimg.com/100/100/arch",
        postImage: this.blobURL,
        likes: 36,
        date: "May 15",
        liked: false,
        content: this.content,
        filter: this.selectedFilter,
      };
      //새 오브젝트 index 0으로 밀어넣음
      this.dataList.unshift(newPost);
      this.uiLevel = 0;
    },
  },
};
</script>

<style>
body {
  margin: 0;
}
ul {
  padding: 5px;
  list-style-type: none;
}
.logo {
  width: 22px;
  margin: auto;
  display: block;
  position: absolute;
  left: 0;
  right: 0;
  top: 13px;
}
.header {
  width: 100%;
  height: 40px;
  background-color: white;
  padding-bottom: 8px;
  position: sticky;
  top: 0;
}
.header-button-left {
  color: skyblue;
  float: left;
  width: 50px;
  padding-left: 20px;
  cursor: pointer;
  margin-top: 10px;
}
.header-button-right {
  color: skyblue;
  float: right;
  width: 50px;
  cursor: pointer;
  margin-top: 10px;
}
.button-group {
  width: 100%;
  padding-bottom: 10px;
  background-color: white;
  text-align: center;
}
.more-button {
  margin: auto;
  background-color: white;
  cursor: pointer;
}
.footer {
  width: 100%;
  position: sticky;
  bottom: 0;
  padding-bottom: 10px;
  background-color: white;
}
.footer-button-plus {
  width: 80px;
  margin: auto;
  text-align: center;
  cursor: pointer;
  font-size: 24px;
  padding-top: 12px;
}
.sample-box {
  width: 100%;
  height: 600px;
  background-color: bisque;
}
.inputfile {
  display: none;
}
.input-plus {
  cursor: pointer;
}
#app {
  box-sizing: border-box;
  font-family: "consolas";
  margin-top: 60px;
  width: 100%;
  max-width: 460px;
  margin: auto;
  position: relative;
  border-right: 1px solid #eee;
  border-left: 1px solid #eee;
}
</style>
