//Para não ficar duplicando o mesmo endereço e se precisar trocar so tracar aqui
export default class fotoService {

  constructor(resource) {
 // o atributo _ em javascript diz que esse atributo é privado, so o a propria class pode usar
 this._resource = resource('v1/fotos{/id}');
}                              //endereço 
//  Metodos: 
 lista (){
  return this._resource
// me devolve uma promess que é o retorno
.query()
// retorno é a resposta que é convertida em json / se não teve resposta :err
.then(res => res.json(), err => {
  //Mensagem de erro no console para o tecnico
  console.log(err);
//lanço para quem esta acessando o serviço uma mensagem de alto nivel do erro
    throw new Error('Não encontramos suas fotos :(');
});
 }

 cadastra(foto) {
 if(foto._id){
//alterar a foto
 return this._resource
//update recebe dois parametros: 
 .update({id: foto._id}, foto);
 //id da foto que desejamos alterar // segundo  é o objeto foto em si.
 }else {
   // cadastrar a foto
 //me retorna uma promess
 return this._resource
 //para enviar a foto
 .save(foto);
 }
}

apaga(id) {
 //Vai passar pro resource o comando delete
                            //usando como chave o id
  return this._resource
  .delete({ id })
// se deu algum erro:
// null= me devolve nada como resposta,  mas se der um erro
  .then(null, err => {
    console.log(err);
    throw new Error('Não foi possivel apagar a foto :(')
  })
}
//metodo que busca a foto pelo id dele(para o alterar)
busca(id) {
  return this._resource
      .get({ id })
      .then(res => res.json());
}
}

