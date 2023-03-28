import styled from "styled-components"

const SearchBarStyles = styled.div`
  position: relative;
  margin: auto;
  text-align: left;
  height: ${35 / 16}rem;
  width: 100%;
  z-index: 99;

  input {
    background: transparent;
    border: solid 2px #fff;
    border-radius: 50px;
    font-weight: 400;
    width: 100%;
    line-height: 2.375rem;
    padding: 0 1.25rem;
    color: #fff;
    padding-right: 2.5rem;
    font-size: inherit;
  }
  input::placeholder {
    opacity: 0.7;
    color: #fff;
  }

  .results-box {
    position: absolute;
    top: 100%;
    margin-top: 1rem;
    width: 100%;
    background: #fff;
    color: #000;
    border-radius: 10px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
    display: none;

    &:before {
      content: "";
      position: absolute;
      left: 1rem;
      bottom: 100%;

      width: 0;
      height: 0;
      border-style: solid;
      border-width: 0 15px 10px 15px;
      border-color: transparent transparent #fff transparent;
    }
  }

  .results {
    position: relative;
    padding: 0.5rem 0;
    font-size: 0.75rem;
    max-height: 50vh;
    overflow: auto;
  }

  &.active .results-box {
    display: block;
  }

  .results > div {
    padding: 0.5rem 1rem;
    border-bottom: 1px solid #eee;

    &:hover {
      background: #1415ff;
      color: #fff;

      .type {
        border: 1px solid #fff;
      }
    }
  }

  .type {
    position: absolute;
    font-size: 0.5rem;
    border: 1px solid #000;
    border-radius: 15px;
    padding: 3px 9px;
  }

  .res {
    padding-left: 3rem;
  }


    .back-icon,
    .search-icon {
      position: absolute;
      top: 50%;
      left: 18px;
      transform: translateY(-50%);
      z-index: 2;

      svg {
        width: 18px;
        height: 18px;
      }
    }
  }
`

export default SearchBarStyles
