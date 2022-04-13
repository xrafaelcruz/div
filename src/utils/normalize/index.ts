import { currencyMask } from 'utils/masks/currency'

export const convertToMoney = (value: string) => {
  return currencyMask(Number(value).toFixed(2))
}
