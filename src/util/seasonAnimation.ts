import { keyframes } from '@emotion/react';

export const seasonAnimation = keyframes`
    0%{
      opacity: 0;
      transform: translateY(0);
    }

    20%{
      opacity: 1;
      transform: translate(-15px, 20vh);
    }

    40%{
      opacity: 1;
      transform: translate(15px, 40vh);
    }

    60%{
      opacity: 1;
      transform: translate(-15px, 60vh);
    }

    80%{
      opacity: 1;
      transform: translate(0, 80vh);
    }

    100%{
      opacity: 1;
      transform: translateY(100vh);
    }

`;