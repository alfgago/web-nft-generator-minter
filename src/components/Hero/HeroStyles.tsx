import styled from "styled-components"

export const HeroStyled = styled.div`
  color: #fff;
  /*height: 100vh;*/
  height: 819px;
  width: 100%;
  position: relative;
  background: #000;
  .content {
    background: linear-gradient(
      270deg,
      #f1ff97 -0.82%,
      rgba(243, 243, 243, 0.9) 52.7%
    );
    position: relative;
    height: 100%;
    display: flex;

    padding: 1rem;

    max-width: 1728px;
    margin: 0 auto;
  }
`
export interface Props {
  image?: string
}

export const ArtistImage = styled.div<Props>`
  width: 100%;
  background: url("${(props) => props.image}") no-repeat;
  height: 819px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1000;

  .waterMarkLogo {
    position: absolute;
    bottom: 36px;
    left: 51px;
  }
`

export const ImageOverlap = styled.div<Props>`
  width: 100%;
  background: url("${(props) => props.image}") no-repeat;
  height: 819px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2000;
`
