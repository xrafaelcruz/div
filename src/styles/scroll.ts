import { css } from 'styled-components'

const scroll = css`
  ${({ theme }) => css`
    ::-webkit-scrollbar {
      background-color: ${theme.colors.darkGray3};
      border-radius: 5px;
      height: 8px;
      position: absolute;
      width: 12px;
    }

    ::-webkit-scrollbar-track {
      background-color: ${theme.colors.darkGray1};
    }

    ::-webkit-scrollbar-thumb {
      background-color: ${theme.colors.darkGray3};
      border-radius: 5px;
    }
  `}
`

export default scroll
