import styled from "styled-components"
import { COLORS, DEVICE } from "@/styles/variables"

export const ArtistStyles = styled.div`
  position: relative;
  width: 100%;
  color: ${COLORS.black};
  font-size: ${16 / 16}rem;
  padding: 0;
  background: #000;
  main {
    display: flex;
    justify-content: space-around;
    max-width: 1728px;
    margin: 0 auto;
    padding: ${32 / 16}rem 200px;
    background: linear-gradient(
      270deg,
      #f1ff97 -0.82%,
      rgba(243, 243, 243, 0.9) 52.7%
    );
  }

  h1 {
    padding: 0;
    margin: 0;
  }

  .column2 {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  @media ${DEVICE.laptop} {
    font-size: ${16 / 16}rem;
  }
`

export const CardPassType = styled.div`
  display: flex;
  width: 655px;
  height: 307px;
  background: #fff;
  box-shadow: 0px 4px 32px rgba(0, 0, 0, 0.2);
`

export const CardDescription = styled.div`
  padding: 40px 27px 21px 37px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  h4 {
    font-size: 30px;
    margin: 0;
    padding: 0;
  }
  ul {
    font-size: 20px;
    margin: 0;
    padding: 0;
    list-style: none;
    > li {
      margin: 0px 0px 10px 0px;
      padding: 0;
    }
  }
  button {
    border: none;
    font-size: 17px;
    line-height: 19px;
    padding: 10px 34px;
    margin: 0px 2px;
    color: #fff;
    font-weight: 700;
    background: #373737;
    border-radius: 29px;
    :hover {
      background: #858585;
      cursor: pointer;
    }
  }
  .variant {
    background: #858585;
  }
`

export const CardActions = styled.div`
  display: flex;
`

export const PassTypeList = styled.div`
  width: 427px;
  color: ${COLORS.black};
  font-size: ${16 / 16}rem;
  padding: 0;

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    .active {
      margin: 5px 6px;
      font-weight: 600;
      color: #fff;
      padding: 14px 25px;
      background: #373737;
      border: 1px solid #454545;
      border-radius: 69px;
    }
    > li:first-child {
      margin: 5px 6px 5px 0px;
    }
    > li:not(.active) {
      font-weight: 600;
      margin: 5px 6px;
      padding: 14px 25px;
      background: transparent;
      border: 1px solid #454545;
      border-radius: 36px;
    }
  }
`

export const FaqStyles = styled.div`
  position: relative;
  width: 100%;
  height: 557px;
  color: ${COLORS.black};
  font-size: ${16 / 16}rem;
  padding: 0;
  background: #000;

  .faqContainer {
    display: flex;
    flex-direction: column;
    height: 557px;
    justify-content: space-around;
    max-width: 1728px;
    margin: 0 auto;
    padding: 4rem 260px;
    background: linear-gradient(
      270deg,
      #d8f5fe 8.41%,
      rgba(255, 255, 255, 0.9) 88.16%
    );

    .title {
      display: flex;
      padding: 0px 40px;
      margin: 0;
      width: 100%;
      font-weight: 600;
      font-size: 52px;
      line-height: 57px;
    }

    .faqBox {
      display: flex;
    }

    ul {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex-wrap: wrap;
      font-size: 25px;
      flex-direction: column;
      .active {
        margin: 5px 6px;
        font-weight: 400;
        color: #fff;
        padding: 14px 25px;
        background: #373737;
        border: 1px solid #454545;
        border-radius: 69px;
        width: fit-content;
      }
      > li:first-child {
        margin: 5px 6px 5px 0px;
      }
      > li:not(.active) {
        font-weight: 400;
        margin: 5px 6px;
        padding: 19px 25px;
        background: transparent;
        border: 1px solid #454545;
        border-radius: 36px;
        width: fit-content;
      }
    }

    .answer {
      background: #373737;
      border-radius: 25px;
      width: 434px;
      height: 217px;
      padding: 30px;
      color: #fff;
      margin: 5px 0px 5px 70px;
    }
  }
`

export const ContainerPage = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  color: ${COLORS.black};
  font-size: ${16 / 16}rem;
  padding: 0;
  background: #000;
  .mainContentPage {
    background: #fff;
    max-width: 1728px;
    margin: 0 auto;
    padding: 51px 260px;

    .title {
      display: flex;
      padding: 0px 40px;
      margin: 0;
      margin-top: 40px;
      margin-bottom: 65px;
      width: 100%;
      font-weight: 600;
      font-size: 52px;
      line-height: 57px;
    }
  }
`
export const BoxDrops = styled.div`
  display: flex;
  flex-direction: column;
`
export const DropRow = styled.div`
  display: flex;
  width: 100%;
  font-size: 24px;
  margin-bottom: 35px;
  .place {
    display: flex;
    font-weight: 400;
    align-items: center;
    justify-content: center;
    width: 226px;
    background: #000;
    color: #fff;
    padding: 20px;
  }
  .date {
    display: flex;
    font-weight: 700;
    align-items: center;
    justify-content: center;
    width: 155px;
    background: #e1fdfd;
  }
  .collection {
    display: flex;
    align-items: center;
    width: 344px;
    background: #f2f2f2;
    font-weight: 400;
    .name {
      margin-left: 20px;
    }
  }
  .time {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 273px;
    margin-left: 10px;
    background: #f2f2f2;
    font-size: 20px;
    font-weight: 700;
  }
  .actions {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 10px;
    flex-direction: column;
    justify-content: space-around;
    padding: 5px;
    button {
      width: 100%;
      border: none;
      font-size: 17px;
      line-height: 19px;
      padding: 10px 34px;
      margin: 0px 2px;
      color: #fff;
      font-weight: 500;
      background: #373737;
      border-radius: 29px;
      :hover {
        background: #858585;
        cursor: pointer;
      }
    }
    .variant {
      background: #c2c2c2;
    }
  }
`

export const BoxDrawing = styled.div`
  display: flex;
  flex-direction: column;
`
export const DrawRow = styled.div`
  display: flex;
  width: 100%;
  font-size: 24px;
  margin-bottom: 35px;
  justify-content: space-between;
  background: linear-gradient(
    90deg,
    rgba(240, 240, 240, 0.5) 53.85%,
    rgba(249, 215, 255, 0.5) 94.9%
  );
  .column1 {
    display: flex;
    font-weight: 400;

    justify-content: center;
    font-weight: 700;
    font-size: 33px;
    background: transparent;
    .info {
      padding: 40px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      h5 {
        font-weight: 700;
        font-size: 33px;
        padding: 0;
        margin: 0;
      }
      p {
        padding: 0;
        margin: 0;
        font-weight: 700;
        font-size: 24px;
      }
    }
  }
  .column2 {
    display: flex;
    font-weight: 700;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 33px;
    justify-content: space-between;
    margin-top: 40px;
    margin-bottom: 40px;
    padding: 0px 40px;
    border-left: solid 2px #000;
    .time {
      display: flex;
      width: 100%;
    }
    .place {
      display: flex;
      width: 100%;
    }
    .date {
      display: flex;
      width: 100%;
    }
  }
  .column3 {
    width: 243px;
    display: flex;
    flex-wrap: wrap;
    padding: 40px 25px 40px 0px;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;
    text-align: center;
    span {
      font-size: 20px;
    }
    p {
      padding: 0;
      margin: 0;
      font-size: 33px;
      font-weight: 700;
    }
    button {
      width: 100%;
      height: 56px;
      border: none;
      font-size: 17px;
      line-height: 19px;
      padding: 10px 10px;
      margin: 0px 2px;
      color: #fff;
      font-weight: 500;
      background: #373737;
      border-radius: 29px;
      :hover {
        background: #858585;
        cursor: pointer;
      }
    }
    .variant {
      background: #c2c2c2;
    }
  }
`
