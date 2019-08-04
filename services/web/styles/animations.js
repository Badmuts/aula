import { keyframes } from 'styled-components'

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
