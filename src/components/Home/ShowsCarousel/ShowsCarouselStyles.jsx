import styled from "styled-components"

import { COLORS, DEVICE } from "@/styles/variables"

export const ShowsCarouselStyles = styled.div`
  position: relative;
  pointer-events: all;

  h2 {
    font-size: 2rem;
    padding: 1rem 2rem;
    white-space: nowrap;
    transform-origin: center;
    text-shadow: 0 0 15px rgba(0, 0, 0, 0.5);

    @media ${DEVICE.laptop} {
      position: absolute;
      transform: rotate(90deg);
      font-size: 4rem;
      line-height: 4rem;
      top: 35vh;
      left: 4.5rem;
      padding: 0;
      visibility: hidden;
    }
  }

  .marquee-container {
    text-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
    .overlay {
      display: none;
    }
  }

  @media ${DEVICE.laptop} {
    .marquee-container {
      display: block !important;

      .overlay {
        display: none;
      }
    }

    .marquee {
      display: block !important;
      animation: scrollv var(--duration) linear var(--delay)
        var(--iteration-count) !important;
      animation-play-state: var(--play) !important;
      animation-delay: var(--delay) !important;
      animation-direction: var(--direction) !important;
    }

    .marquee-container:hover div {
      animation-play-state: var(--pause-on-hover) !important;
    }
    .marquee-container:active div {
      animation-play-state: var(--pause-on-click) !important;
    }

    @keyframes scrollv {
      0% {
        transform: translateY(0%);
      }
      100% {
        transform: translateY(-100%);
      }
    }
  }
`
