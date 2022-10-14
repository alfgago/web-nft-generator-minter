import styled from "styled-components"
import { COLORS, DEVICE } from "@/styles/variables"

export const LoginFormlStyles = styled.section`
  color: black;
  width: 100%;
  font-family: "Trap";

  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
  }

  p {
    width: ${220 / 16}rem;
    height: 5vh;
    text-align: center;
    font-family: "Trap", "Inter", Helvetica Neue, sans-serif;
    margin: 0px;
  }

  form {
    display: flex;
    flex-direction: column;
    width: 78%;
  }

  input {
    background-color: #d9d9d9;
    color: #717171;
    width: 100%;
    height: 40px;
    border: 0px solid #d9d9d9;
    border-radius: ${12 / 16}rem;
    padding: 20px 20px;

    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    line-height: 26px;
  }
  button {
    background-color: #777777;
    width: 109px;
    border-radius: 12px;
    border: none;
    color: #fff;
    padding: 7px 2px 7px 2px;
    font-size: 18px;
  }
  .btn-container {
    display: flex;
    justify-content: flex-end;
  }

  a {
    color: #717171;
    text-decoration: underline;
    text-transform: none;
  }

  .subtitle {
    padding-bottom: 45px;
    font-weight: 500;
  }

  .div p {
    font-weight: 600;
  }

  input + div {
    padding: 5px 20px 0px 20px;
  }
`
