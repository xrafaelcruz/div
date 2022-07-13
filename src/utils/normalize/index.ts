import { applyCurrencyMask } from 'utils/masks/currency'

export const convertToMoney = (value: string | number) => {
  return applyCurrencyMask(Number(value))
}
