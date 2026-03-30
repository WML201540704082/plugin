import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import HomePage from './HomePage.vue';

Vue.use(ElementUI);

Vue.config.productionTip = false;

new Vue({
  render: h => h(HomePage),
}).$mount('#app');