import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f9f9f9;
  }

  h1 {
    font-size: 24px;
    color: #333;
    text-align: center;
    margin: 20px 0;
  }
`;

export default GlobalStyles;
