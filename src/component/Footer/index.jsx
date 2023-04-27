/* eslint-disable import/no-anonymous-default-export */
import styled from 'styled-components';
import logo from 'assets/img/logo.png'

const Footer = styled.section`
  width: 100%;
  text-align: center;
  border-top: solid 1px var(--cor-primaria);
  margin-top: 10rem;
`

const Img = styled.img`
  width: 16rem;
  padding: .5rem 0 3.5rem 0;
`

export default () => {
  return (
    <Footer>
        <Img src={logo} alt='logo Aluraflix'/>
    </Footer>
  )
}
