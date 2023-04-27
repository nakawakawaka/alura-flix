import Slider from "react-slick";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Carousel.css"

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 2,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true
      }
    },
    {
      breakpoint: 800,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
};

const VidesoContainer = styled.div`
  img {
    width:100%;
    transition: transform 200ms ease-in-out;
  }

  img:hover {
    transform: scale(1.05);
  }
`

export default function Carousel({ videos, cor, mostraVideo }) {
  const items = videos.map((video) => (
    <VidesoContainer key={video.id}>
      <img
        key={video.id}
        id={video.id}
        src={video.img}
        alt={video.titulo}
        role="presentation"
        style={{ border: `solid 3px ${cor}` }}
        onClick={(e) => {
          mostraVideo(e.target.id, cor)
        }}
      />
    </VidesoContainer>
  ))

  return (
    <div>
      <Slider {...settings}>
        {items}
      </Slider>
    </div>
  );
}
