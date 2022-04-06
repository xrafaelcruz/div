import { createGlobalStyle, css } from 'styled-components'
import theme from './theme'

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
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    color: #fff;
  }

  main {
    flex: 1;
    padding: 48px 16px;
    margin: auto;
    max-width: 480px;
    width: 100%;
  }

  a {
    cursor: pointer;
    text-decoration: none;
  }

  h1 {
    font-size: 22px;
    font-weight: bold;
  }

  h2 {
    font-size: 18px;
    font-weight: bold;
  }
`

export const defaultStyles = css`
  h1 {
    font-size: 3.8rem;
    color: ${(props) => props.theme.color.primary};

    @media (max-width: 920px) {
      font-size: 3.4rem;
    }
  }

  time {
    font-size: 1.6rem;
    font-weight: 400;
  }
`

export default GlobalStyles
