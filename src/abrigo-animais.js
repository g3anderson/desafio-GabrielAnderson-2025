class AbrigoAnimais {

  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {

    //Parte trasnformar as entradas em listas
    const listaBrinquedosPessoa1 = brinquedosPessoa1.split(',').map(item => item.trim().toUpperCase());
    const listaBrinquedosPessoa2 = brinquedosPessoa2.split(',').map(item => item.trim().toUpperCase());
    const listaOrdemAnimais = ordemAnimais.split(',').map(item => item.trim().toUpperCase());
    
    // Lista do resultado final
    let animaisETutores = [];

    //Listas de animais, objetos
    let animais = [
          {nome: "Rex", especie:"cão", brinquedos: ["RATO", "BOLA"]},
          {nome: "Mimi", especie: "gato",brinquedos: ["BOLA", "LASER"]},
          {nome: "Fofo", especie: "gato", brinquedos: ["BOLA", "RATO", "LASER"]},
          {nome: "Zero", especie: "gato", brinquedos: ["RATO","BOLA"]},
          {nome: "Bola", especie: "cão", brinquedos: ["CAIXA", "NOVELO"]},
          {nome: "Bebe", especie: "cão", brinquedos: ["LASER", "RATO", "BOLA"]},
          {nome: "Loco", especie: "jabuti", brinquedos: ["SKATE", "RATO"]}
    ];

    // Lista de pessoas, objetos
    let pessoas = [
          {nome: "- pessoa 1", animaisAdotados:[], listaBrinquedos: listaBrinquedosPessoa1},
          {nome: "- pessoa 2", animaisAdotados:[], listaBrinquedos: listaBrinquedosPessoa2},
          {nome: "- abrigo", animaisRecebidos:[]}
    ];

    //Validacoes de dados validos
    const nomesAnimaisSet = new Set(listaOrdemAnimais);
    if (nomesAnimaisSet.size !== listaOrdemAnimais.length) {
      return { erro: "Animal inválido" };
    }

    if (new Set(listaBrinquedosPessoa1).size !== listaBrinquedosPessoa1.length ||
        new Set(listaBrinquedosPessoa2).size !== listaBrinquedosPessoa2.length) {
      return { erro: "Brinquedo inválido" };
    }

    const brinquedosValidos = new Set(animais.flatMap(animal => animal.brinquedos));
    for (let brinquedo of listaBrinquedosPessoa1.concat(listaBrinquedosPessoa2)) {
        if (!brinquedosValidos.has(brinquedo)) {
          return { erro: "Brinquedo inválido" };
       }
    }

    //Looping para realizar as validações de cada animal que está na lista que foi passada como parametro
    for(let nomeAnimal of listaOrdemAnimais){
      
      // comparo em uppercase para não falhar quando a entrada foi uppercased
      const animalEncontrado = animais.find(animalAtual => animalAtual.nome.toUpperCase() === nomeAnimal);
      if(!animalEncontrado) {return {erro: "Animal inválido"}}

      podeAdotar(animalEncontrado, pessoas);

    }

    // Função que realiza a chamada de validacoes secundarias e responde a pergunta de nosso looping a todos os animais da lista
    function podeAdotar(animal, pessoas) {
      const podePessoa1 = validarRegrasAdocao(animal, pessoas[0], pessoas);
      const podePessoa2 = validarRegrasAdocao(animal, pessoas[1], pessoas);

      // se ambas podem adotar -> empate -> abrigo
      if (podePessoa1 && podePessoa2) {
        pessoas[2].animaisRecebidos.push(animal);
        return;
      }

      if (podePessoa1) {
        pessoas[0].animaisAdotados.push(animal);
        return;
      }

      if (podePessoa2) {
        pessoas[1].animaisAdotados.push(animal);
        return;
     }

      pessoas[2].animaisRecebidos.push(animal);
    }

    //Basicamente, essa função chama todas as validacoes para definir se o animal será adotado ou não
     function validarRegrasAdocao(animais, pessoa, pessoas) {
        if(
          verificarBrinquedosTutor(animais, pessoa) &&
          verificarOrdemBrinquedos(animais, pessoa) &&
          verificarLimiteAdotados(pessoa) &&
          verificaRegrasAnimais(animais, pessoa, pessoas) 
        ){return true;}

        return false;
    }

    // Validacao da regra do enunciado, controla o limite de animais adotados por cada pessoa
    function verificarLimiteAdotados(pessoa){
       return pessoa.animaisAdotados.length < 3;
    }

    // Realiza a verificacao das regras especiais dos animais, exemplo, gatos não aceitarem que duas 
    // pessoas tenham os mesmos brinquedos e o jabuti aceitar qualquer ordem desde que tenha outro animal já adotado
    // agora recebe (animal, pessoa, pessoas)
    function verificaRegrasAnimais(animal, pessoa, pessoas) {

      switch (animal.especie) {
        
        case "gato":
            const pessoa1Pode = animal.brinquedos.every(brinquedos => pessoas[0].listaBrinquedos.includes(brinquedos));
            const pessoa2Pode = animal.brinquedos.every(brinquedos => pessoas[1].listaBrinquedos.includes(brinquedos));
            
            if (pessoa1Pode && pessoa2Pode){return false}; 
            return true;

        case "cão":
            return true;

        case "jabuti":
            // Loco só aceita se A MESMA pessoa já tiver adotado outro animal
            return pessoa.animaisAdotados.length > 0;

        default:
            return false;
      }
    }

    // Realiza a verificacao da ordem dos brinquedos, verificando se ela satisfaz o que cada animal deseja
    function verificarOrdemBrinquedos(animal, pessoa) {
      let indicePessoa = 0;

      for (let brinquedoAnimal of animal.brinquedos) {
          if(animal.nome === "Loco"){return true;}
          let encontrado = false;

          while (indicePessoa < pessoa.listaBrinquedos.length) {
              if (pessoa.listaBrinquedos[indicePessoa] === brinquedoAnimal) {
                  encontrado = true;
                  indicePessoa++;
                  break;
              }
                indicePessoa++;
          }
          if (!encontrado) {return false};
      }

      return true;
    }

    // Verifica se o tutor tem todos os brinquedos que o animal deseja
    function verificarBrinquedosTutor(animal, pessoa){
       if(animal.brinquedos.every(brinquedoDoAnimal => pessoa.listaBrinquedos.includes(brinquedoDoAnimal))) {return true;}
       return false;
    }

    // Montagem do resultado final 
    for (let animal of pessoas[0].animaisAdotados) {
      animaisETutores.push(`${animal.nome} ${pessoas[0].nome}`);
    }

    for (let animal of pessoas[1].animaisAdotados) {
      animaisETutores.push(`${animal.nome} ${pessoas[1].nome}`);
    }

    for (let animal of pessoas[2].animaisRecebidos) {
      animaisETutores.push(`${animal.nome} ${pessoas[2].nome}`);
    }

    animaisETutores.sort();
    return {lista: animaisETutores };

  }
}

export { AbrigoAnimais as AbrigoAnimais };
