<!-- v-model="foto.titulo" é a memsa coisa que @input="foto.descricao = $evente.targt.value" :value="foto.descricao"-->

<template>

  <div>
    <h1 class="centralizado">Cadastro</h1>
    <h2 class="centralizado">{{ foto.titulo }}</h2>

      <!-- Mensagem se vai alterar ou incluir foto, vai aparecer um ou outro dependendo da ação -->
    <h2 v-if="foto._id" class="centralizado">Alterando</h2>
    <h2 v-else class="centralizado">Incluindo</h2>

<!-- .prevent é para cancelar o evento padrão -->
    <form @submit.prevent="grava()">

      <!--INOUT DO TITULO -->
       <div class="controle">
        <label for="titulo">TÍTULO</label>
          <!-- VALIDAÇÃO DO TITULO -->
           <!-- Propriedades da validação: name,v-validate data-vv-rules="required"(obrigatorio)|tamanho minimo e maximo  data-vv-as: inves de usar o name na mensagem-->
         <input name="titulo" v-model="foto.titulo" id="titulo" autocomplete="off"  v-validate data-vv-rules="required|min:3|max:30" data-vv-as="título" >
          <!-- mensagem que vai aparecer para o usuario se tiver erro -->
                                                          <!-- Mensagem padrçao do V-validate/ pega o data-vv-as para menssagem -->
         <span v-show="errors.has('titulo')" class="erro">{{ errors.first('titulo') }}</span>
         <!-- errors: Propriedade do Vue que guarda os erros dos inputs (funciona como vdd ou falso) -->
         <!-- has: Quer saber se teve problema no elemento titulo, (o name é usado para dar nome ao elemento) -->
      </div>

      <!--INOUT DA URL-->
     <div class="controle">
        <label for="url">URL</label>
       <!-- Validação -->
        <input name="url" v-model="foto.url" id="url" autocomplete="off" v-validate data-vv-rules="required">
         <span v-show="errors.has('url')" class="erro">{{ errors.first('url') }}</span>
       <!--So vai ixibir o componente se tiver alguma coisa digitada em fotos v-show// Para exibir a foto os ":" -->
        <imagem-responsiva v-show="foto.url" :url="foto.url" :titulo="foto.titulo"/>
      </div>

      <!--INOUT DA DESCRIÇÃO -->
      <div class="controle">
        <label for="descricao">DESCRIÇÃO</label>
        <textarea id="descricao" autocomplete="off" v-model="foto.descricao"></textarea>
      </div>

      <div class="centralizado">
        <meu-botao rotulo="GRAVAR" tipo="submit"/>
        <router-link :to="{name: 'home'}"><meu-botao rotulo="VOLTAR" tipo="button"/></router-link>
      </div>

    </form>
  </div>
</template>

<script>

import ImagemResponsiva from '../shared/imagem-responsiva/imagemResponsiva.vue';
import botao from '../shared/botao/Botao.vue'
import foto from '../../dominio/foto/foto'
import fotoService from '../../dominio/foto/fotoService'

export default {

  components: {

    'imagem-responsiva': ImagemResponsiva, 
    'meu-botao': botao
  },
  data(){
      return{
          foto: new foto(),
// Esse id vai ser o resultado de: vai ser o id que tu passou para o url
          id:this.$route.params.id
                       //params: objeto java onde cada parametro que eu passar eu consigo acessar atras do nome do params
      }
  },
  methods: {
    grava() {
// Para o validar
 this.$validator
        // Vai verificar se todos os campos passaram na validação
           .validateAll()
          // Se tudo ok o sucess vai ser true, se um falhou o success vai ser falso
           .then(success => {
            //Se foi sucesso:
             if(success) {
              //  cadastra
              this.service
                .cadastra(this.foto)
                   .then(() => {
                   //Se o objeto foto passado como parâmetro tiver a propriedade _id é porque estamos alterando
                   if(this.id) this.$router.push({ name: 'home'});
                                              //minha rota nomeada //push: vai para outra pagina
//se não tiver id, é porque ele nunca foi gravado no banco e precisamos incluí-lo através da nossa API.
                   this.foto = new Foto()
                }, 
                //mensagem pro tecnico do erro
               err => console.log(err));
            }
        });
    }
  },




  created(){
    this.service = new fotoService(this.$resource);
    if(this.id) {
      this.service
        .busca(this.id)
        .then(foto => this.foto = foto);
    }
  }
  // $route: me da aceso ao parametros que o componete recebeu pela rota;
  //%router: gerenciamento de qual conteúdo deve ser mostrado na tela com base na url que o usuário está acessando
}

</script>
<style scoped>

  .centralizado {
    text-align: center;
  }
  .controle {
    font-size: 1.2em;
    margin-bottom: 20px;

  }
  .controle label {
    display: block;
    font-weight: bold;
  }

 .controle label + input, .controle textarea {
    width: 100%;
    font-size: inherit;
    border-radius: 5px
  }

  .centralizado {
    text-align: center;
  }
  .erro{
    color: red;
  }

</style>