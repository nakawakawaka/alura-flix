import { useContext, useState } from "react";
import { TextField, ThemeProvider, createTheme } from "@mui/material";
import styled from "styled-components";
import BtnSalvarLimpar from "component/BtnSalvarLimpar";
import ListaCategoria from "component/ListaCategoria";
import useErros from "Hooks/useErros";
import ValidacoesFormulario from "Context/ValidacoesFormulario";
import Swal from 'sweetalert2'
import { useAPI } from "Context/Api";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
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

export default function NovaCategoria() {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [cor, setCor] = useState('#000000');
  const [codigo, setCodigo] = useState('');
  const [edit, setEdit] = useState('');
  const validacoes = useContext(ValidacoesFormulario);
  const [erros, validarCampos, possoEnviar] = useErros(validacoes);
  const {cadastraCategoria, editaCategoria } = useAPI();

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
      <Form onSubmit={event => {
        event.preventDefault();
        if(possoEnviar()) {
          if (!edit) {
            cadastraCategoria({nome, descricao, cor, codigo})
            setCodigo('')
            Swal.fire(
              'Sucesso!',
              'Categoria cadastrada com sucesso!',
              'success'
            )
          } else {
            editaCategoria(edit, {nome, descricao, cor, codigo});
            setCodigo('')
            Swal.fire(
              'Sucesso!',
              'Categoria editada com sucesso!',
              'success'
            )
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
        <TextField 
          onChange={(event) => setDescricao(event.target.value)}
          value={descricao}
          variant="filled"
          placeholder='Descrição'
          multiline
          rows={7}
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
      <ListaCategoria editar={editarCategoria} />
    </ThemeProvider>
  )
}
