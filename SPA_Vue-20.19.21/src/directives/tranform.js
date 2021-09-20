import Vue from 'vue';

Vue.directive('meu-transform', {

    bind(el, binding, vnode) {
         //   Eixo padrão= current pode ser qualquer nome
         let current = 0;

        // adicionando um evento ao elemento do DOM, clicando duas vezes ativa a funcão
        el.addEventListener('dblclick', function() {

            let incremento = binding.value || 90;
            let efeito;
        // Se não foi passado o argumento ou é igual a rotate ele vai fazer:
            if(!binding.arg || binding.arg =='rotate'){
                
                if(binding.modifiers.reverse) {
                    current-=incremento;
                  } else {
                    current+=incremento;
                  }
                  efeito = `rotate(${current}deg)`;    
            }else if(binding.arg == "scale"){
                efeito = `scale(${incremento})`
            }
    
        // para aplicar a rotação
        this.style.transform = efeito;
        if (binding.modifiers.animate) this.style.transition = "transform 0.5s";

      });
    }

});



     