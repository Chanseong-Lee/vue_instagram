import { createApp } from 'vue'
import App from './App.vue'

/* mitt 라이브러리 import */
import mitt from 'mitt'

let emitter = mitt();
let app = createApp(App);
/* 모든 component가 사용할 수 있는 global한 변수 보관함 : globalProperties */
app.config.globalProperties.emitter = emitter;

app.mount('#app')
