export const currencyMask = (value: string) => {
  value = value.replace('.', '').replace(',', '').replace(/\D/g, '')

  const options = { minimumFractionDigits: 2 }
  const result = new Intl.NumberFormat('pt-BR', options).format(
    parseFloat(value) / 100
  )

  if (result !== 'NaN' && value) {
    return 'R$ ' + result
  }

  return ''
}

export const removeCurrencyMask = (value: string) => {
  const valueNumber = Number(
    value.toString().replaceAll('.', '').replaceAll(',', '.').replace('R$ ', '')
  )

  if (typeof valueNumber !== 'number' || isNaN(valueNumber)) {
    throw new Error('Valor inválido')
  }

  return valueNumber
}
