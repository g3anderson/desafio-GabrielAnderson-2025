// REGRAS DE ADOÇÃO
// 1) O animal vai para a pessoa que mostrar todos seus brinquedos favoritos na ordem desejada (Objeto animal)
// 2) Uma pessoa pode intercalar brinquedos que o animal queira ou não, desde que estejam na ordem desejada
//    (Pode ter outro brinquedo no meio desde que os objetos principais estejam na ordem certa)
// 3) Gatos não dividem seus brinquedos
// 4) Se ambas as pessoas tiverem condições de adoção, ninguém fica com o animal (tadinho)
// 5) Uma pessoa não pode levar mais de três animais para casa
// 6) Loco não se importa com a ordem dos seus brinquedos desde que tenha outro animal como companhia

/* ENTRADAS E SAÍDAS
1) O programa deve receber três parâmetros de texto: 
   - os brinquedos da primeira pessoa, 
   - os da segunda pessoa, 
   - e a ordem em que os animais devem ser considerados
2) Cada parâmetro deve conter os itens separados por vírgula
3) O programa deve retornar uma estrutura contendo a lista em ordem alfabética dos animais e com quem ficaram
   ou a mensagem de erro, se houver
4) Formato de saída:
   - "nome animal - pessoa número"
   - ou "nome animal - abrigo"
5) Caso animal seja inválido ou duplicado, apresentar erro "Animal inválido"
6) Caso brinquedo seja inválido ou duplicado, apresentar erro "Brinquedo inválido"
*/

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
    const animaisETutores = [];

    for(let animal of listaOrdemAnimais){
        switch(animal){
          case "Rex":
            if(listaBriquedosPessoa1.find(animais[0].brinquedos)){
                animaisETutores.push( animais[0] + ":" + "- pessoa1");
            }
            else if(listaBriquedosPessoa2.find(animais[0].brinquedos)){
              animaisETutores.push(animais[1] + ":" + "pessoa2")
            }
            break;
          case "Mimi":
            if(listaBriquedosPessoa1.find(animais[1].brinquedos)){
                animaisETutores.push('${animal}')

            }
        }
    }

    function podeAdotar(){}
    function verificarAnimalRepetido(){}
    function verificarLimiteAdotados(){}

  }
}

export { AbrigoAnimais as AbrigoAnimais };
