import { useContext, useState } from 'react';
import { MenuItem, TextField, createTheme, ThemeProvider, Button } from '@mui/material';
import styled from 'styled-components';
import Swal from 'sweetalert2'
import BtnSalvarLimpar from 'component/BtnSalvarLimpar';
import ValidacoesFormulario from 'Context/ValidacoesFormulario';
import useErros from 'Hooks/useErros';
import { Link } from 'react-router-dom';
import { useAPI } from 'Context/Api';

const BtnContainer = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: 500px) {
    flex-direction: column;
    align-items: center;
  }
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
})

export default function NovoVideo() {
  const [titulo, setTitulo] = useState('');
  const [url, setUrl] = useState('');
  const [img, setImg] = useState('');
  const [categSelec, setCategSelec] = useState('');
  const [descricao, setDescricao] = useState('');
  const [codigo, setCodigo] = useState('');
  const validacoes = useContext(ValidacoesFormulario);
  const [erros, validarCampos, possoEnviar] = useErros(validacoes);
  const { Categoria, cadastraVideo } = useAPI();

  const limpar = () => {
    setTitulo('');
    setUrl('');
    setImg('');
    setCategSelec('');
    setDescricao('');
    setCodigo('');
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <Form onSubmit={ event => {
        event.preventDefault();
        if (possoEnviar()) {
          cadastraVideo({titulo, url, img, categSelec, descricao, codigo});
          Swal.fire(
            'Sucesso!',
            'Video cadastrado com sucesso!',
            'success'
          )
        }
      }} className='container' >
        <h1>Novo Video</h1>
        <TextField
          onChange={(event) => setTitulo(event.target.value)}
          value={titulo}
          onBlur={validarCampos}
          error={!erros.titulo.valido}
          helperText={erros.titulo.texto}
          name='titulo'
          label='Título'
          variant="filled"
          margin='normal'
          required
        />
        <TextField
          onChange={(event) => setUrl(event.target.value)}
          value={url}
          onBlur={validarCampos}
          error={!erros.url.valido}
          helperText={erros.url.texto}
          name='url'
          label='Link do vídeo'
          variant="filled"
          margin='normal'
        />
        <TextField
          onChange={(event) => setImg(event.target.value)}
          value={img}
          onBlur={validarCampos}
          error={!erros.img.valido}
          helperText={erros.img.texto}
          name='img'
          label='Link da imagem do vídeo'
          variant="filled"
          margin='normal' />

        <TextField
          onChange={event => setCategSelec(event.target.value)}
          value={categSelec}
          select
          defaultValue=""
          helperText="Porfavor selecione uma categoria"
          label="Categoria"
          name='categoria'
          variant="filled"
          margin='normal'
        >
          {Categoria.map((option) => (
            <MenuItem key={option.id} value={option.nome}>
              {option.nome}
            </MenuItem>
          ))}
        </TextField>

        <TextField 
          onChange={(event) => setDescricao(event.target.value)}
          value={descricao}
          variant="filled"
          placeholder='Descrição'
          multiline
          rows={7}
        />

        <TextField
          onChange={(event) => setCodigo(event.target.value)}
          value={codigo}
          onBlur={validarCampos}
          error={!erros.codigo.valido}
          helperText={erros.codigo.texto}
          name='codigo'
          label='Código de segurança'
          variant="filled"
          margin='normal'
        />

        <BtnContainer>
          <BtnSalvarLimpar limpar={limpar} />

          <Link to={'/novacategoria'}>
            <Button variant="contained" size="large" >NovaCategoria</Button>
          </Link>
        </BtnContainer>

      </Form>
    </ThemeProvider>
  )
}
