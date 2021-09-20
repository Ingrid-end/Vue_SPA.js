// constructor = construtor que recebe três parâmetros e caso eles não sejam passados será utilizado uma string 
//vazia como valor padrão.
export default class foto {
    constructor(titulo='', url='', descricao=''){
        this.titulo= titulo;
        this.url = url;
        this.descricao = descricao;
    }
}