const amount = document.querySelector('#amount')

amount.oninput = () => {
  const hasCharactersRegex = /\D/g

  amount.value = amount.value.replace(hasCharactersRegex, '')
}
