export default ({ app }, inject) => {
  inject('formatCurrency', (value) =>
    new Intl.NumberFormat('pt-PT', {
      style: 'currency',
      currency: 'EUR',
    }).format(value)
  )

  inject('formatNumber', (value) =>
    new Intl.NumberFormat('pt-PT').format(value)
  )

  inject('formatDate', (value) =>
    new Date(value).toLocaleDateString('pt-PT', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  )
}
