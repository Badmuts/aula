import { keyframes } from "styled-components";

export const slideInLeft = keyframes`
  from {
        transform: translate3d(40px,0,0)
    }

    to {
        transform: translate3d(0,0,0);
    }
`;

export const fadeInUp = keyframes`
  from {
        transform: translate3d(0,40px,0)
    }

    to {
        transform: translate3d(0,0,0);
        opacity: 1;
    }
`;

export const fadeOutDown = keyframes`
    from {
        transform: translate3d(0,0,0);
    }

    to {
        transform: translate3d(0,40px,0);
        opacity: 0;
    }
`;

export const bounceIn = keyframes`
    from,
    20%,
    40%,
    60%,
    80%,
    to {
        animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }

    0% {
        opacity: 0;
        transform: scale3d(0.3, 0.3, 0.3);
    }

    20% {
        transform: scale3d(1.1, 1.1, 1.1);
    }

    40% {
        transform: scale3d(0.9, 0.9, 0.9);
    }

    60% {
        opacity: 1;
        transform: scale3d(1.03, 1.03, 1.03);
    }

    80% {
        transform: scale3d(0.97, 0.97, 0.97);
    }

    to {
        opacity: 1;
        transform: scale3d(1, 1, 1);
    }
`;
