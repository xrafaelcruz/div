import { createGlobalStyle, css, keyframes } from 'styled-components'
import theme from './theme'
import scroll from './scroll'
import toast from './toast'

const fontFamily = css`
  font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
`

const GlobalStyles = createGlobalStyle`
  /* latin */
  @font-face {
    font-family: 'Special Elite';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: url('https://fonts.gstatic.com/s/specialelite/v11/XLYgIZbkc4JPUL5CVArUVL0ntnAOSFNuQsI.woff2') format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    font-size: 62.5%;
    background: ${theme.colors.darkGray2};
  }

  html, body, #__next, main {
    height: 100%;
  }

  body {
    ${fontFamily};
    color: #fff;
  }

  button {
    ${fontFamily};
    font-weight: 400;
  }
  
  input, select, textarea {
    ${fontFamily};
    font-weight: 300;
  }

  a {
    cursor: pointer;
    text-decoration: none;

    button {
      width: 100%;
    }
  }

  h1 {
    font-size: 24px;
    font-weight: bold;
  }

  h2 {
    font-size: 22px;
    font-weight: bold;
  }

  fieldset {
    border: 0;
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 100%;
  }

  ${toast};
  ${scroll};
`

export const opacityAnimation = keyframes`
  from {
    transform: translateY(-60px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`

export default GlobalStyles
