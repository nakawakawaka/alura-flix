import React from "react"

const ValidacoesFormulario = React.createContext({
  titulo: semValidacao, 
  url: semValidacao, 
  img: semValidacao, 
  categSelec: semValidacao,  
  codigo: semValidacao,
  nome: semValidacao,
  cor: semValidacao,
});

function semValidacao(dados) {
  console.log(dados);
  return { valido: true, texto: "" }
}

export default ValidacoesFormulario;