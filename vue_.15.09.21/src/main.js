import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
import { routes } from './routes';
import './directives/tranform';
import veeValidate from 'vee-validate';
import msg from './pt_BR';
// Bootstrap
import 'bootstrap/dist/css/bootstrap.css';
//Jquery
import 'Jquery/dist/jquery.js';
//Bootstrap js
import 'bootstrap/dist/js/bootstrap.js';
//CSS
import'./assets/CSS/teste.css'
//js
import './assets/JS/teste.js';



Vue.use(VueResource);
// opções de http, quando for mudar o endereço da API, muda somente aqui e ja vai para o globo
Vue.http.options.root = 'http://localhost:3000';
Vue.use(VueRouter);

const router = new VueRouter({ 
  routes, 
  mode: 'history'
});

Vue.use(veeValidate,{
  //Para usar as mensagens em portugues
  locale: 'pt_BR',
  dictionary: {
    pt_BR: {
      messages: msg
    }
  }
});

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})

