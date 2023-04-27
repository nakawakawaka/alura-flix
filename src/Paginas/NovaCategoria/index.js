import { useContext, useState } from "react";
import { TextField, TextareaAutosize, ThemeProvider, createTheme } from "@mui/material";
import styled from "styled-components";
import BtnSalvarLimpar from "component/BtnSalvarLimpar";
import ListaCategoria from "component/ListaCategoria";
import useErros from "Hooks/useErros";
import ValidacoesFormulario from "Context/ValidacoesFormulario";

const Form = styled.form`
  display: flex;
  flex-direction: column;
`

const InputColor = styled.input`
  width: 100%;
  height: 2.5rem;
  margin-top: 1rem;
  background-color: #2e2e2e;
  padding-top: .7rem;
`

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
})

export default function NovaCategoria({ categoria, novaCategoria, deletar, editar}) {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [cor, setCor] = useState('');
  const [codigo, setCodigo] = useState('');
  const [edit, setEdit] = useState('');
  const validacoes = useContext(ValidacoesFormulario);
  const [erros, validarCampos, possoEnviar] = useErros(validacoes);

  const editarCategoria = (props) => {
    setNome(props.nome)
    setDescricao(props.descricao)
    setCor(props.cor)
    setCodigo(props.codigo)
    setEdit(props.id)
  }

  const limpar = () => {
    setNome("")
    setDescricao("")
    setCor("")
    setCodigo("")
    setEdit("")
  }
  
  return (
    <ThemeProvider theme={darkTheme}>
      <Form onSubmit={async event => {
        event.preventDefault();
        if(possoEnviar()) {
          if (!edit) {
            await novaCategoria({nome, descricao, cor, codigo})
          } else {
            await editar(edit, {nome, descricao, cor, codigo});
            setCodigo('')
          }
        }
      }} className='container'>
        <h1>Nova Categoria</h1>
        <TextField
          onChange={(event) => setNome(event.target.value)}
          value={nome}
          onBlur={validarCampos}
          error={!erros.nome.valido}
          helperText={erros.nome.texto}
          name="nome"
          label="Nome"
          variant="filled"
          margin='normal'
          fullWidth
          required
        />
        <TextareaAutosize
          onChange={(event) => setDescricao(event.target.value)}
          value={descricao}
          aria-label="Descrição"
          placeholder='Descrição'
          minRows={7}
          style={{backgroundColor:'#2e2e2e', marginTop: '1rem'}}
        />
        <InputColor
          onChange={(event) => setCor(event.target.value)}
          value={cor}
          name="cor"
          type="color"
        />
        <TextField
          onChange={(event) => setCodigo(event.target.value)}
          value={codigo}
          onBlur={validarCampos}
          error={!erros.codigo.valido}
          helperText={erros.codigo.texto}
          name="codigo"
          label='Código de segurança'
          variant="filled"
          margin='normal'
          required
        />
        <BtnSalvarLimpar limpar={limpar} />
      </Form>
      <ListaCategoria categoria={categoria} deletar={deletar} editar={editarCategoria} />
    </ThemeProvider>
  )
}