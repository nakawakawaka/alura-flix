import Banner from 'component/Banner';
import Categorias from 'component/Categorias';
import styled from 'styled-components';
import { useAPI } from 'Context/Api';

const CategoriasContainer = styled.div`
  margin-top: -2.5rem;
`

export default function Home() {
  const { Categoria, videos } = useAPI()

  return (
    <section className='home'>
      <Banner />

      {Categoria.map((data) => (
          <CategoriasContainer key={data.id}>
          <Categorias
            key={data.id}
            id={data.id}
            cor={data.cor}
            nome={data.nome}
            descricao={data.descricao}
            videos={videos.filter(video => video.categoria === data.nome)}
          />
        </CategoriasContainer>
      ))}
    </section>
  )
}