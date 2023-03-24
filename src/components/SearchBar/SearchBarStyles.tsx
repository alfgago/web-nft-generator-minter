import styled from "styled-components"

const SearchBarStyles = styled.div`
  position: relative;
  margin: auto;
  text-align: left;
  height: 56px;
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
    background: #fff;
    color: #000;
    padding: 0.5rem 0;
    font-size: 0.75rem;
    border-bottom-left-radius: 25px;
    border-bottom-right-radius: 25px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
    display: none;
  }

  &.active .results-box {
    display: block;
  }

  .results-box > div {
    padding: 0.5rem 1rem;
    border-bottom: 1px solid #eee;
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

  .autocomplete-input {
    position: relative;
    width: 100%;
    height: 56px;
    input {
      width: 100%;
      height: 100%;
      border-radius: 4px;
      border: 1px solid #12172433;
      background: rgba(255, 255, 255, 0);
      padding: 0 18px 0 48px;
      line-height: 56px;
      box-shadow: 0px 8px 24px rgba(38, 50, 56, 0.5);
      backdrop-filter: blur(8px);

      font-family: "Poppins";
      font-style: normal;
      font-weight: 400;
      font-size: 18px;
      line-height: 28px;
      letter-spacing: 0.01em;
      color: rgba(18, 23, 36, 0.42);
      outline: none;

      ::-webkit-input-placeholder {
        /* Chrome/Opera/Safari */
        color: rgba(18, 23, 36, 0.42);
      }
      ::-moz-placeholder {
        /* Firefox 19+ */
        color: rgba(18, 23, 36, 0.42);
      }
      :-ms-input-placeholder {
        /* IE 10+ */
        color: rgba(18, 23, 36, 0.42);
      }
      :-moz-placeholder {
        /* Firefox 18- */
        color: rgba(18, 23, 36, 0.42);
      }
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

  .results {
    position: absolute;
    display: none;
    top: 100%;
    left: 0;
    width: 100%;
    background: #fff;
    padding: 16px;
    font-family: Poppins;
    box-shadow: 0px 8px 24px rgba(38, 50, 56, 0.25);
    max-height: 70vh;
    overflow-y: scroll;

    ::-webkit-scrollbar {
      width: 2px;
      background-color: #ccc;
    }

    ::-webkit-scrollbar-track {
      background: #eee;
      border-radius: 50px;
      -webkit-box-shadow: inset 0 0 5px rgb(0 0 0 / 20%);
      box-shadow: inset 0 0 5px rgb(0 0 0 / 20%);
    }

    ::-webkit-scrollbar-thumb {
      background: #818181;
      border-radius: 50px;
    }

    .group-title {
      font-size: 16px;
      font-weight: 400;
      line-height: 24px;
      letter-spacing: 0.01em;
      text-align: left;
      color: #000;
      padding-bottom: 18px;
    }

    .hit-item {
      display: block;
      padding-left: 46px;
      padding-bottom: 7px;
      margin-bottom: 7px;
      border-bottom: 1px solid rgba(18, 23, 36, 0.2);
      width: 100%;

      &:last-of-type {
        border: 0;
        margin-bottom: 20px;
      }

      .hit-title {
        display: block;
        color: #000;
        font-size: 16px;
        line-height: 24px;
        letter-spacing: 0.01em;
        text-align: left;
        font-weight: 500;
        b {
          font-weight: 700;
        }
      }

      .hit-short_answer {
        display: block;
        font-size: 14px;
        line-height: 24px;
        letter-spacing: 0.01em;
        text-align: left;
        font-weight: 400;
        color: rgba(18, 23, 36, 0.65);
        b {
          font-weight: 700;
        }
      }

      .icon {
        position: absolute;
        left: 28px;
        svg {
          height: 18px;
        }
      }
    }
  }

  &.active {
    .autocomplete-input input {
      background: #fff;
      color: #000;
    }

    .results {
      display: block;
    }
  }

  .back-icon {
    display: none;
  }

  @media only screen and (max-width: 981px) {
    &#support-search-bar.active {
      position: fixed;
      top: 51px !important;
      left: 0;
      width: 100%;
      height: 100vh;
      margin: 0;
      background: rgba(255, 255, 255, 0.95);
      border-radius: 0;

      input {
        box-shadow: none;
        border-radius: 0;
        border-left: 0;
        border-right: 0;
      }

      .results {
        display: block;
        position: relative;
        top: 0;
        box-shadow: none;
        height: calc(100vh - 107px);
        max-height: calc(100vh - 107px);
        background: #fff;
      }

      .back-icon {
        display: block;
      }

      .search-icon {
        display: none;
      }
    }
  }
`

export default SearchBarStyles
