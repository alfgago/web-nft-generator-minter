import styled from "styled-components"
import { COLORS, DEVICE } from "@/styles/variables"

export const CommonStyles = styled.button`
    position: relative;
    width: 100%;
    max-width: ${250 / 16}rem;
    color:  ${COLORS.white};
    background-color: ${COLORS.black};
    font-size: ${20 / 16}rem;
    border-radius: 25px;
    transition: .5s ease all;
    cursor: pointer;

    &:hover {
        opacity: 0.8;
    }
`
