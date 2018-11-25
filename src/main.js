import Vue from 'vue'
import App from './App.vue'

import ImageGrid from './components/ImageGrid.vue';
import Placeholder from './components/Placeholder.vue';
import Popup from './components/Popup.vue';
import GridItem from './components/GridItem.vue';
import SearchDialog from './components/SearchDialog.vue';
import Vuefire from 'vuefire'

Vue.use(Vuefire)
Vue.component('ImageGrid',ImageGrid);
Vue.component('Placeholder',Placeholder);
Vue.component('Popup',Popup);
Vue.component('GridItem',GridItem);
Vue.component('SearchDialog',SearchDialog);

new Vue({
  el: '#app',
  render: h => h(App)
})
