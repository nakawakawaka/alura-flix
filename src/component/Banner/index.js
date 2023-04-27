
import styled from '@emotion/styled';
import Button from '../Button';
import './Banner.css'
import ReactPlayer from 'react-player';

const BannerContainer = styled.div`
  background-image: url(${({ img }) => img});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
`
const Overlay = styled.div`
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  height: 100vh;

  @media screen and (max-width: 950px) {
    flex-direction: column-reverse;
    height: 100%;
    gap: 4rem;
    padding-top: 5rem;
  }
`


const Banner = ({ categoria, titulo, descricao, img, url }) => {
  return (
    <BannerContainer img={img} >
      <Overlay className='container'>
        <div className='bannerInfo'>
          <Button texto={categoria} tipo='bannerBtn' />
          <h1>{titulo}</h1>
          <p>{descricao}</p>
        </div>

        <div className='player'>
          <ReactPlayer url={url} controls />
        </div>


      </Overlay>
    </BannerContainer>
  )
}

export default Banner;