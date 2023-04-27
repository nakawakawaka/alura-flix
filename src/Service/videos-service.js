const listaVideos = () => {
  return fetch ('http://localhost:3000/videos')
    .then((responsta) => {
      if (responsta.ok) {
        return responsta.json();
      }
      throw new Error('Não foi possivel listar os Videos.')
    });
}

const cadastraVideo = (titulo, url, img, categoria, descricao, codigo) => {
  return fetch('http://localhost:3000/videos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      titulo: titulo,
      url: url,
      img: img,
      categoria: categoria,
      descricao:descricao,
      codigo:codigo,
    })
  }).then(resposta => {
    if (resposta.ok) {
      return resposta.body;
    }
    throw new Error('Não foi possível cadastrar um video.');
  })
}

const video = (id) => {
  return fetch(`http://localhost:3000/videos/${id}`)
  .then(resposta => {
    if (resposta.ok) {
      return resposta.json();
    }
    throw new Error('Não foi possivel encontrar Video.')
  });
}

const listaCategorias = () => {
  return fetch('http://localhost:3000/categoria')
  .then(resp => resp.json())
  .catch(err => console.log(err))
}

const cadastraCategoria = async (nome, descricao, cor, codigo) => {
  return await fetch('http://localhost:3000/categoria', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      nome: nome,
      descricao: descricao,
      cor: cor,
      codigo: codigo
    })
  }).then(resposta => {
    if (resposta.ok) {
      return resposta.body;
    }
    throw new Error('Não foi possível cadastrar um video.');
  })
}

const removeCategoria = async (id) => {
  return await fetch(`http://localhost:3000/categoria/${id}`, {
    method: 'DELETE'
  }).then(resposta => {
    if(!resposta.ok) {
      throw new Error ('Não foi possível remover a categoria.');
    }
  })
}

const editaCategoria = (id, nome, descricao, cor, codigo) => {
  return fetch(`http://localhost:3000/categoria/${id}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      nome: nome,
      descricao: descricao,
      cor: cor,
      codigo: codigo
    })
  }).then(resposta => {
    if (resposta.ok) {
      return resposta.json();
    }
    throw new Error('Não foi possível editar categoria.');
  })
}

export const videosService = {
  listaVideos,
  cadastraVideo,
  listaCategorias,
  cadastraCategoria,
  removeCategoria,
  editaCategoria,
  video
};