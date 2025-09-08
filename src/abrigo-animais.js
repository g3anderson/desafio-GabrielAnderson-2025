

class AbrigoAnimais {

  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {

    const listaBriquedosPessoa1 = brinquedosPessoa1.split(',').map(item => item.trim());
    const listaBriquedosPessoa2 = brinquedosPessoa2.split(',').map(item => item.trim());
    const listaOrdemAnimais = ordemAnimais.split(',').map(item => item.trim());

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
      podeAdotar(animalEncontrado, pessoas[0]);
      podeAdotar(animalEncontrado, pessoas[1]);

    }

    // 
      function podeAdotar(animal, pessoas) {   
        if (validarRegrasAdocao(animal, pessoas[0])) {
          pessoas[0].animaisAdotados.push(animal);
        } else if (validarRegrasAdocao(animal, pessoas[1])) {
          pessoas[1].animaisAdotados.push(animal);
        } else {
          pessoas[2].animaisRecebidos.push(animal);
        }
    }

    function verificarLimiteAdotados(pessoa){
       return pessoa.animaisAdotados.length < 3;
    }

    function verificaRegrasAnimais(animal, pessoas) {
      switch (animal.especie) {
        case "gato":
            const pessoa1Pode = animal.brinquedos.every(brinquedos => pessoas[0].listaBrinquedos.includes(brinquedos));
            const pessoa2Pode = animal.brinquedos.every(brinquedos => pessoas[1].listaBrinquedos.includes(brinquedos));
            
            if (pessoa1Pode && pessoa2Pode) return false;
            return true;

        case "cão":
            const adotaveis = pessoas.filter(p => p.animaisAdotados.length < 3);
            return adotaveis.length > 0;

        case "jabuti":
            const pessoaComAnimal = pessoas.some(p => p.animaisAdotados.length > 0);
            return pessoaComAnimal;

        default:
            return false;
    }
}


    function verificarOrdemBrinquedos(animais, listaBrinquedosPessoa){
       let indice = 0;
        for(let brinquedo of animais.brinquedos){
          indic = pessoaBrinquedo.indexOf(brinquedo,indice);
          if(indice ===-1) return false;
          indice++;
        }
        return true;
    }

    function verificarBrinquedosTutor(animal, pessoa){
       if(animal.brinquedos.every(brinquedoDoAnimal => pessoa.listaBrinquedos.includes(brinquedoDoAnimal))) {return true;}
       return false;
    }

     function validarRegrasAdocao(animais, pessoas) {
        if(
          verificarBrinquedosTutor(animais, pessoas) &&
          verificarOrdemBrinquedos(animais, pessoas) &&
          verificarLimiteAdotados(pessoas) &&
          verificaRegrasAnimais(animais, pessoas) 
        ){return true;}
        return false;
}

  }
}
  



export { AbrigoAnimais as AbrigoAnimais };
