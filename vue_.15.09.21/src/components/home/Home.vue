<template>
  
  <div>
    <h1 class="centralizado">{{ titulo }}</h1>
      <!-- Teste para Imag fora da Api -->
 <!-- <img src="/static/teste.svg"> -->

  <!-- So vo exibir a mensagem se tiver algum valor -->
     <p v-show="mensagem" class="centralizado">{{mensagem}}</p>
    
    <input type="search" class="filtro" @input="filtro = $event.target.value" placeholder="filtre por parte do título">

    <ul class="lista-fotos">
      <li class="lista-fotos-item" v-for="foto of fotosComFiltro">

        <meu-painel :titulo="foto.titulo">
                                                          <!-- Para girar usa modifiers :rotate, para scala :scale -->
            <imagem-responsiva :url="foto.url" :titulo="foto.titulo" v-meu-transform:scale.animate="1.1"/>

             <!-- Botão para alterar foto: router-link para saber onde renderizar(como se fosse um <a>) -->
              <router-link :to="{ name: 'altera', params: { id : foto._id }}">
 <!-- params que pode ser mais de um: esse id tem que corresponder com  ao id da routers.js, e o valor que eu to passando é
 foto._id que eu tenho acesso a variavel foto -->
                  <meu-botao rotulo="ALTERA" tipo="button"/>
              </router-link>  

              <!-- Botão remover -->
              <meu-botao tipo="button" rotulo="REMOVER" @botaoAtivado="remove(foto)" :confirmacao="false" estilo="perigo"/>
        </meu-painel>
      </li>
    </ul>
  </div>

</template>

<script>
import Painel from '../shared/painel/Painel.vue';
import ImagemResponsiva from '../shared/imagem-responsiva/ImagemResponsiva.vue';
import botao from '../shared/botao/botao.vue';
import fotoService from '../../dominio/foto/fotoService';

export default {

  components: {
    'meu-painel' : Painel, 
    'imagem-responsiva': ImagemResponsiva,
    'meu-botao' : botao,
  },

  data() {

    return {

      titulo: 'Vue_do_inferno', 
      fotos: [], 
      filtro: '',
      mensagem: '',
    }
  },

  computed: {

    fotosComFiltro() {

      if(this.filtro) {
        let exp = new RegExp(this.filtro.trim(), 'i');
        return this.fotos.filter(foto => exp.test(foto.titulo));
      } else {
        return this.fotos;
      }
    }
  },
  // Mensagens para excluir
  methods: {
       remove(foto) {
      this.service
        .apaga(foto._id)
        .then(
          //f1
          () => {
            let indice = this.fotos.indexOf(foto);
            this.fotos.splice(indice, 1);
            this.mensagem = 'Foto removida com sucesso'
          }, 
          //f2
          err => {
              //Chamar a mensagem de erro do fotoService quando não foi possivel apagar a foto
            this.mensagem = err.message;
          }
        )
    }
// f1: função 1: vai ser executada se a operação foi feita corretamente
// f2: função 2: vai ser executada caso algum problema tenha ocorrido 
  },

  created() {
    // criando uma instância do nosso serviço que depende de $resource: conecata com a API 
    this.service = new fotoService(this.$resource);
    this.service
      .lista()
      .then(fotos => this.fotos = fotos, err => 
     { 
       //Chamar a mensagem de erro do fotoService quando API não for encontrada
       this.mensagem = err.message;
       
       });
  }
}

</script>

<style>

  .centralizado {

    text-align: center;
  }

  .lista-fotos {
    list-style: none;
  }

  .lista-fotos .lista-fotos-item {

    display: inline-block;
  }

  .filtro {

    display: block;
    width: 100%;
  }
</style>
