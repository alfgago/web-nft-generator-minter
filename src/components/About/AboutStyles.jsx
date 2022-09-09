import styled from "styled-components"
import { COLORS, DEVICE } from "@/styles/variables"

export const AboutStyles = styled.footer`
    position: relative;
    width: 100%;
    color:  ${COLORS.black};
    background-color: ${COLORS.white};
    font-size: ${16 / 16}rem;
    padding: ${32 / 16}rem;
    
    @media ${DEVICE.laptop} {
        font-size: ${16 / 16}rem;
    }
`
