import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Montserrat', sans-serif;
  }
  body {
    margin: 0;
    padding: 0;
    background-image: linear-gradient(to bottom, #131313, #1d1d1d, #272727, #323232, #3d3d3d);
  }

  p, h4, h1, h2, h3, h5 {
    margin: 0;
  }
`;

export default GlobalStyle;