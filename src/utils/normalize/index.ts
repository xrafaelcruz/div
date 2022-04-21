import { currencyMask } from 'utils/masks/currency'

export const convertToMoney = (value: string | number) => {
  return currencyMask(Number(value).toFixed(2))
}
