const amount = document.querySelector('#amount')

let amountValue = amount.value

amount.oninput = () => {
  const hasCharactersRegex = /\D/g

  amountValue = Number(amount.value.replace(hasCharactersRegex, '')) / 100

  amount.value = formatNumberBRL(amountValue, 'currency')
}

const formatNumberBRL = (value, style) => {
  return value.toLocaleString('pt-BR', {
    style: style,
    currency: 'BRL',
  })
}
