import styled from "styled-components"

export const OwnedLotteryStyles = styled.section`

  .active-filter{
    border-bottom: ${3 / 16}rem solid;
    padding-bottom: ${5 / 16}rem;
  }

  .header-cont {
    display: flex;
    gap: 6rem;
    padding-bottom: ${69 / 16}rem;

    align-items: center;
    > div h2 {
      font-weight: 600;
      font-size: 40px;
    }

    .filters {
        display: flex;
        gap: ${97 / 16}rem;

        li {
            font-size: ${32 / 16}rem;
            font-weight: 500;
            list-style-type: none;
            cursor: pointer;
        }
  }
`
