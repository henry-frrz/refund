const form = document.querySelector('form')
const amount = document.querySelector('#amount')
const expense = document.querySelector('#expense')
const category = document.querySelector('#category')

const expenseCount = document.querySelector('aside header p span')
const totalAmountExpensesElement = document.querySelector('aside header h2')
const expenseList = document.querySelector('ul')

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

  addNewExpense(newExpense)
  updateExpenseCount()
  updateTotalAmountExpenses()
  form.reset()
}

const addNewExpense = expense => {
  const expenseItem = document.createElement('li')
  expenseItem.classList.add('expense')

  expenseItem.innerHTML = `
  <img src="./img/${expense.category.id}.svg" alt="Ícone de tipo da despesa" />
  <div class="expense-info">
    <strong>${expense.name}</strong>
    <span>${expense.category.name}</span>
  </div>
  <span class="expense-amount"><small>R$</small>${formatNumberBRL(
    expense.amount,
    'decimal'
  )}</span>
  <img src="./img/remove.svg" alt="remover" class="remove-icon" />
`

  expenseList.append(expenseItem)
}

const updateExpenseCount = () => {
  const expenseListLength = expenseList.children.length

  expenseCount.textContent = `${expenseListLength} ${
    expenseListLength > 1 ? 'despesas' : 'despesa'
  }`
}

const updateTotalAmountExpenses = () => {
  let totalAmountExpenses = 0
  const expensesAmount = document.querySelectorAll('.expense-amount')

  expensesAmount.forEach(expenseAmount => {
    totalAmountExpenses += Number(
      expenseAmount.textContent.replace('R$', '').replace(',', '.')
    )
  })

  totalAmountExpensesElement.innerHTML = `<small>R$</small>${
    totalAmountExpenses === 0
      ? '0,00'
      : formatNumberBRL(totalAmountExpenses, 'decimal')
  }`
}

const formatNumberBRL = (value, style) => {
  return value.toLocaleString('pt-BR', {
    style: style,
    currency: 'BRL',
  })
}
