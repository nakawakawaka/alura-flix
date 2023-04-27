import { useEffect, useState } from 'react';
import { videosService } from 'Service/videos-service';
import Banner from 'component/Banner';
import Categorias from 'component/Categorias';
import styled from 'styled-components';

const CategoriasContainer = styled.div`
  margin-top: -2.5rem;
`

export default function Home({ categoria }) {
  const [banner, setBanner] = useState('');
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    videosService.video(1)
      .then(data => setBanner(data))
      .catch(err => console.log(err))
  }, [])

  useEffect(() => {
    videosService.listaVideos()
      .then(data => setVideos(data))
      .catch(err => console.log(err))
  }, [])

  const mostraVideo = async id => {
    await videosService.video(id)
      .then(data => setBanner(data))
      .catch(err => console.log(err));
  }

  return (
    <section className='home'>
      <Banner
        categoria={banner.categoria}
        titulo={banner.titulo}
        descricao={banner.descricao}
        img={banner.img}
        url={banner.url}
      />

      {categoria.map((data) => (
          <CategoriasContainer key={data.id}>
          <Categorias
            key={data.id}
            id={data.id}
            cor={data.cor}
            nome={data.nome}
            descricao={data.descricao}
            videos={videos.filter(video => video.categoria === data.nome)}
            mostraVideo={mostraVideo}
            banner={banner}
          />
        </CategoriasContainer>
      ))}
    </section>
  )
}