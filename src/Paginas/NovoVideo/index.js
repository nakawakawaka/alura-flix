import { useContext, useState } from 'react';
import { videosService } from 'Service/videos-service';
import { MenuItem, TextField, TextareaAutosize, createTheme, ThemeProvider, Button } from '@mui/material';
import styled from 'styled-components';
// import Button from 'component/Button';
import BtnSalvarLimpar from 'component/BtnSalvarLimpar';
import ValidacoesFormulario from 'Context/ValidacoesFormulario';
import useErros from 'Hooks/useErros';
import { Link } from 'react-router-dom';

const BtnContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
`

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
})

export default function NovoVideo({ categoria }) {
  const [titulo, setTitulo] = useState('');
  const [url, setUrl] = useState('');
  const [img, setImg] = useState('');
  const [categSelec, setCategSelec] = useState('');
  const [descricao, setDescricao] = useState('');
  const [codigo, setCodigo] = useState('');
  const validacoes = useContext(ValidacoesFormulario);
  const [erros, validarCampos, possoEnviar] = useErros(validacoes);

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
      <Form onSubmit={event => {
        event.preventDefault();
        if (possoEnviar()) {
          videosService.cadastraVideo(titulo, url, img, categSelec, descricao, codigo);
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
          {categoria.map((option) => (
            <MenuItem key={option.id} value={option.nome}>
              {option.nome}
            </MenuItem>
          ))}
        </TextField>

        <TextareaAutosize
          onChange={(event) => setDescricao(event.target.value)}
          value={descricao}
          aria-label="Descrição"
          placeholder='Descrição'
          minRows={7}
          style={{ backgroundColor: '#2e2e2e', marginTop: '1rem' }}
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