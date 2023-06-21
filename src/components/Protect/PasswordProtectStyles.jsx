import styled from "styled-components"

import { COLORS, DEVICE } from "@/styles/variables"

export const PasswordProtectStyles = styled.section`
  position: relative;
  color: #fff;
  padding: 0;

  .title {
    font-size: 2rem;
    font-weight: bold;
  }
  input {
    margin-bottom: 1rem;
    color: #000;
  }

  .content {
    padding-top: 4rem;
    padding-bottom: 6rem;
    text-align: right;

    form {
      text-align: left;
    }
  }
`
