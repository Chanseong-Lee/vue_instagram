import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios';
import store from './store.js'
/* mitt 라이브러리 import */
import mitt from 'mitt'

let emitter = mitt();
let app = createApp(App);
/* 모든 component가 사용할 수 있는 global한 변수 보관함 : globalProperties */
app.config.globalProperties.axios = axios;
app.config.globalProperties.emitter = emitter;
/* vuex4 설치 ->  state(데이터)를 모든 컴포넌트에서 사용가능하게 해주는 라이브러리 */

app.use(store).mount('#app')
