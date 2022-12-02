import styled from "styled-components"

export const OwnedLotteryStyles = styled.section`
  .header-cont {
    display: flex;
    gap: 6rem;

    align-items: center;
    > div h2 {
      font-weight: 600;
      font-size: 40px;
    }

    .filters {
        display: flex;
        gap: ${97 / 16}rem;

        span {
            font-size: ${32 / 16}rem;
            font-weight: 500;
        }
  }
`
