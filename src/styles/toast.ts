import { css } from 'styled-components'

const toast = css`
  ${({ theme }) => css`
    .Toastify__toast--error {
      background-color: ${theme.colors.darkGray3};
      color: ${theme.colors.white};
      font-size: 14px;

      svg {
        fill: ${theme.colors.error};
      }

      .Toastify__close-button {
        svg {
          fill: ${theme.colors.white};
        }
      }
    }

    .Toastify__progress-bar--error {
      background-color: ${theme.colors.error};
    }
  `}
`

export default toast
