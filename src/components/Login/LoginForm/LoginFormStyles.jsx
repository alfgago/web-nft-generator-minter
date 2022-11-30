import styled from "styled-components"

import { COLORS, DEVICE } from "@/styles/variables"

export const LoginFormlStyles = styled.div`
  color: black;
  width: 100%;
  font-family: "Trap";
  padding-top: ${30 / 16}rem;

  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
  }

  p {
    width: ${268 / 16}rem;
    height: 5vh;
    text-align: center;
    font-family: "Trap", "Inter", Helvetica Neue, sans-serif;
    margin: 0px;
  }

  form {
    display: flex;
    flex-direction: column;
    width: 78%;
    padding: 0px 20px;
  }
  @media only screen and (${DEVICE.maxlaptop}) {
    form {
      width: 100%;
      align-items: center;
      max-width: ${624 / 16}rem;
      min-width: 192px;
      padding: 20px 20px;
    }
  }

  button {
    background-color: #777777;
    width: 10.5rem;
    height: ${51 / 16}rem;
    border-radius: 30px;
    border: none;
    color: #fff;
    padding: 7px 2px 7px 2px;
    font-size: 18px;

    @media only screen and (${DEVICE.laptop}) {
      width: ${109 / 16}rem;
      height: ${41 / 16}rem;
      border-radius: 12px;
      font-size: 18px;
      align-self: end;
    }
  }

  input + a {
    align-self: start;
    padding: 10px 0px 0px 20px;
  }

  @media only screen and (${DEVICE.maxlaptop}) {
    a + div {
      padding-bottom: ${52 / 16}rem;
    }
  }

  .subtitle {
    font-weight: 500;
    font-size: ${20 / 16}rem;

    @media only screen and (${DEVICE.laptop}) {
      padding-bottom: 4rem;
    }
  }

  .subtitle + div {
    padding-bottom: 0px;
    padding-top: 15px;
    @media only screen and (${DEVICE.laptop}) {
      padding-bottom: 12px;
    }
  }

  .register-cont {
    font-weight: 600;
    font-size: 24px;

    @media only screen and (${DEVICE.maxlaptop}) {
      padding-bottom: 2rem;
      font-size: 20px;
    }
  }

  .alert {
    padding-bottom: ${5 / 16}rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    color: red;
    list-style-type: circle;
    font-weight: 400;
    align-self: start;
    font-size: 1.1rem;
  }

  a {
    color: #717171;
    text-decoration: underline;
    text-transform: none;
  }

  input + div {
    padding: 5px 20px 0px 20px;
  }

  input::placeholder {
    color: #717171;
  }

  p + a {
    padding-top: ${16 / 16}rem;
  }
`
