function validaCampos(campo) {
  if (campo.length < 4) {
    return {valido: false, texto: "O campo não pode estar vazio"}
  } else {
    return {valido: true, texto: ""}
  }
}

export{ validaCampos }