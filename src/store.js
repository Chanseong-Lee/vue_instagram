/** VueX4 settings */
import { createStore } from "vuex";
import dataList from "./assets/dataList.js";
import axios from "axios";

const store = createStore({
  state() {
    return {
      //데이터 ( State )를 보관하는 공간
      dataList: dataList,
      followersList: {},
      more: {},
      btnCount: 0,
    };
  },
  mutations: {
    //state를 변경하는 api 정의($store.state.변수명 으로 직접 수정하면 안됨)
    setLikes(state, idx) {
      if (state.dataList[idx].liked) {
        state.dataList[idx].likes--;
        state.dataList[idx].liked = false;
      } else {
        state.dataList[idx].likes++;
        state.dataList[idx].liked = true;
      }
    },
    setAdditionalData(state, additinalData) {
      state.more = additinalData;
    },
    setBtnCount(state) {
      state.btnCount++;
    },
    addDataList(state, additinalData) {
      state.dataList.push(additinalData);
    },
    setFollowersList(state, arr) {
      state.followersList = arr;
    },
  },
  actions: {
    // ajax요청을 하는 공간(mutations에서 ajax하면 안된다)
    getAdditionalData(context) {
      if (this.state.btnCount < 2) {
        axios
          .get(
            "https://codingapple1.github.io/vue/more" +
              this.state.btnCount +
              ".json"
          )
          .then((result) => {
            // actions에서 ajax요청 후 state변경은 mutations에서 호출하도록 한다.
            context.commit("addDataList", result.data);
            context.commit("setBtnCount");
          });
      } else {
        alert("데이터가 존재하지 않습니다.");
        return;
      }
    },
    getFollowersList(context) {
      axios.get("./follower.json").then((result) => {
        context.commit("setFollowersList", result);
      });
    },
  },
});

export default store;
