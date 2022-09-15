import styled from "styled-components"

export const HeaderStyled = styled.div`
  position: fixed;
  height: 90px;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 9000;
  transition: 0.3s ease-in;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.9);
  color: #ffffff;
  .nav-menu {
    display: flex;
    align-items: center;
  }
  .nav-menu a {
    color: #ffffff;
  }
  .navbar img {
    width: 250px;
    height: auto;
  }
  .nav-item {
    padding: 1rem;
    font-weight: 500;
    list-style: none;
  }
  .nav-item a:hover {
    padding-bottom: 12px;
  }
`

export const NavStyled = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1728px;
  margin: auto;
  height: 100%;
  padding: 0 2.6rem;
`
