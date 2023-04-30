import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import Swal from 'sweetalert2';

export default function ListaCategoria({ categoria, deletar, editar }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="caption table">
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell align="center">Descrição</TableCell>
            <TableCell align="center">Editar</TableCell>
            <TableCell align="center">Remover</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categoria.map((data) => (
            <TableRow key={data.nome}>
              <TableCell component="th" scope="data">
                {data.nome}
              </TableCell>
              <TableCell align="left">{data.descricao}</TableCell>
              <TableCell align="center" padding="none">
                <Button variant="text" value="Editar" onClick={async () => await editar(data)}>
                  Editar
                </Button>
              </TableCell>
              <TableCell align="center" padding="none">
                <Button variant="text" color="error" onClick={() => {
                  Swal.fire({
                    title: 'Voce tem certeza?',
                    text: "O item selecionado será deletado!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Sim, delete!'
                  }).then((result) => {
                    if (result.isConfirmed) {
                      deletar(data.id)
                      Swal.fire(
                        'Deletado!',
                        'A categoria foi deletada com sucesso.',
                        'success'
                      )
                    }
                  })
                }} >
                  Remover
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}