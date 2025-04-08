const form = document.querySelector('form')
const amount = document.querySelector('#amount')
const expense = document.querySelector('#expense')
const category = document.querySelector('#category')

let amountValue = amount.value

amount.oninput = () => {
  const hasCharactersRegex = /\D/g

  amountValue = Number(amount.value.replace(hasCharactersRegex, '')) / 100

  amount.value = formatNumberBRL(amountValue, 'currency')
}

form.onsubmit = event => {
  event.preventDefault()

  const newExpense = {
    id: new Date().getTime(),
    name: expense.value,
    category: {
      id: category.value,
      name: category.options[category.selectedIndex].text,
    },
    amount: amountValue,
    createdAt: new Date(),
  }
}

const formatNumberBRL = (value, style) => {
  return value.toLocaleString('pt-BR', {
    style: style,
    currency: 'BRL',
  })
}
