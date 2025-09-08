

class AbrigoAnimais {

  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {

    const listaBriquedosPessoa1 = brinquedosPessoa1.split(',').map(item => item.trim());
    const listaBriquedosPessoa2 = brinquedosPessoa2.split(',').map(item => item.trim());
    const listaOrdemAnimais = ordemAnimais.split(',').map(item => item.trim()).sort();

    let animais = [
    {nome: "Rex", especie:"cão", brinquedos: ["RATO", "BOLA"]},
    {nome: "Mimi", especie: "gato",brinquedos: ["BOLA", "LASER"]},
    {nome: "Fofo", especie: "gato", brinquedos: ["BOLA", "RATO", "LASER"]},
    {nome: "Zero", especie: "gato", brinquedos: ["RATO","BOLA"]},
    {nome: "Bola", especie: "cão", brinquedos: ["CAIXA", "NOVELO"]},
    {nome: "Bebe", especie: "cão", brinquedos: ["LASER", "RATO", "BOLA"]},
    {nome: "Loco", especie: "jabuti", brinquedos: ["SKATE", "RATO"]}
    ];

    let pessoas = [
    {nome: "- pessoa1", animaisAdotados:[], listaBrinquedos: listaBriquedosPessoa1},
    {nome: "- pessoa2", animaisAdotados:[], listaBrinquedos: listaBriquedosPessoa2},
    {nome: " - abrigo", animaisRecebidos:[]}
    ];

    let animaisETutores = [];


    for(let nomeAnimal of listaOrdemAnimais){
      const animalEncontrado = animais.find(animalAtual => animalAtual.nome === nomeAnimal);
      if(!animalEncontrado) {
        return {erro: "AnimalInválido"}
      }
      podeAdotar(animalEncontrado, pessoas);

    }


    function podeAdotar(animalEncontrado, pessoas){   
      if(animalEncontrado.brinquedos.every(brinquedoDoAnimal => pessoas[0].listaBrinquedos.includes(brinquedoDoAnimal))){
        if(verificarLimiteAdotados(pessoas[0]) && verificaRegrasAnimais(animalEncontrado, pessoas[0])){
            pessoas[0].animaisAdotados.push(animalEncontrado);
        }
      }
      else if(animalEncontrado.brinquedos.every(brinquedoDoAnimal => pessoas[1].listaBrinquedos.includes(brinquedoDoAnimal))){
        pessoas[1].animaisAdotados.push(animalEncontrado);
      }
    }


    function verificarLimiteAdotados(pessoa){
       return pessoa.animaisAdotados.length < 3;
    }


    function verificaRegrasAnimais(animal, pessoas){

      switch(animal.especie){
        case "gato":
          if  (animal.brinquedos.every(brinquedos => pessoas[0].listaBrinquedos.includes(brinquedos)) && animal.brinquedos.every(brinquedos => pessoas[1].listaBrinquedos.includes(brinquedos)))
          {return false;}
          else {return true;}
          break;
  
        case "cão":
          return true;
          break;

        case "jabuti":
           return true; 
          break;
        }
      }
    }

}
  



export { AbrigoAnimais as AbrigoAnimais };
