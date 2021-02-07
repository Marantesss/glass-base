<template>
  <div>
    <h2 class="page-title">
      Dados entre
      <span class="text-glass-purple">{{ endDateFormatted }}</span> e
      <span class="text-glass-purple">{{ startDateFormatted }}</span>
    </h2>
    <section class="grid grid-cols-3 gap-2">
      <BigNumberCard
        v-for="bigNumber in bigNumbers"
        :key="bigNumber.title"
        :title="bigNumber.title"
        :value="bigNumber.value"
        :icon="bigNumber.icon"
      />
    </section>
  </div>
</template>

<script>
import BigNumberCard from '~/components/BigNumberCard'

export default {
  name: 'Index',

  components: {
    BigNumberCard,
  },

  data: () => ({
    // TODO use state management VUEX
    startDate: new Date(),
    endDate: new Date('2021-01-01'),
    bigNumbers: [
      {
        title: 'Número de Contratos',
        value: new Intl.NumberFormat('pt-PT').format(1235952),
        icon: 'DocumentDuplicate',
      },
      {
        title: 'Valor de Contratos',
        value: new Intl.NumberFormat('pt-PT', {
          style: 'currency',
          currency: 'EUR',
        }).format(198235000),
        icon: 'Cash',
      },
      {
        title: 'Valor Médio por Contrato',
        value: new Intl.NumberFormat('pt-PT', {
          style: 'currency',
          currency: 'EUR',
        }).format(45761),
        icon: 'Scale',
      },
    ],
  }),

  computed: {
    startDateFormatted() {
      return new Intl.DateTimeFormat('pt-PT', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }).format(this.startDate)
    },
    endDateFormatted() {
      return new Intl.DateTimeFormat('pt-PT', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }).format(this.endDate)
    },
  },
}
</script>

<style scoped>
/* TODO maybe place this on the layout component */
.page-title {
  @apply text-3xl text-gray-dark font-bold mb-2;
}
/* Sample `apply` at-rules with Tailwind CSS
.container {
  @apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/
</style>
