//import Cadastro from './components/cadastro/Cadastro.vue';
// vamos fazer com que o componente Cadastro seja carregado apenas quando usuário acessar o link Cadastro ou editar uma foto:
const Cadastro = () => System.import('./components/cadastro/Cadastro.vue');

import Home from './components/home/Home.vue';

export const routes = [
    //rotas nomeadas usando name componente:lugar onde vo ser jogada   //titulo da pagina // o que vai aparecer no menu
    { path: '', name:'home', component: Home, titulo: 'home', menu: true},
                   // /"id": se eu passar / cadastro mais alguma coisa depois ele vai cair nessa rota
    { path: '/cadastro',name:'cadastro', component: Cadastro, titulo: 'Cadastro', menu: true },

    { path: '/cadastro/:id',name:'altera', component: Cadastro, titulo: 'Cadastro', menu: false},
    //Se não existir uma rota, ele vai me jogar pro home
    { path: '*', component: Home, menu: false }
];