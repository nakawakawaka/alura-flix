import { Button } from "@mui/material"
import Carousel from "component/Carousel"
import styled from "styled-components"

const CategoriaContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  margin-bottom: 1rem;
`

export default function Categorias({ id, cor, nome, descricao, videos, mostraVideo, destaque }) {
  return (
    videos.length > 0 && <div
      className='container'
    >
      <CategoriaContainer key={id}>
        <Button style={{ backgroundColor: `${cor}`, color: "white" }}>
          {nome}
        </Button>
        <p>{descricao}</p>
      </CategoriaContainer>
      <Carousel videos={videos} cor={cor} mostraVideo={mostraVideo} destaque={destaque} />
    </div>
  )
}
