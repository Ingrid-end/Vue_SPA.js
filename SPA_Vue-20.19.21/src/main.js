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

//Vue.http.options.root = process.env.API_URL ? process.env.API_URL : 'http://localhost:3000';
//Para colocar outra API0

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

   //Interceptando a requisição e a resposta
Vue.http.options.root = 'http://localhost:3000';

Vue.http.interceptors.push((req, next) => {

    // é possível colocar informações no header antes do envio da requisição
    req.headers.set('Authorization', 'informação de segurança aqui');
    console.log('Lidando com o request');

    next(res => {
      console.log('Lidando com a resposta')
      // é possível acessar os dados da reposta e realizar transformações antes
      console.log(res.body);
    });

});