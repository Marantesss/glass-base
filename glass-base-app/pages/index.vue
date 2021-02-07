<template>
  <div>
    <!-- eslint-disable-next-line vue/no-v-html -->
    <h2 class="page-title" v-html="titleString"></h2>
    <!-- TODO: RESPONSIVENESS -->
    <section class="grid grid-rows-7 grid-cols-3 gap-6">
      <BigNumberCard
        v-for="bigNumber in bigNumbers"
        :key="bigNumber.title"
        :title="bigNumber.title"
        :value="bigNumber.value"
        :icon="bigNumber.icon"
      />
      <ChartCard class="col-span-3 row-span-3" />
      <TableCard
        v-for="cenas in [1, 2, 3]"
        :key="cenas"
        class="row-span-3"
        :title="cenas"
      />
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import BigNumberCard from '~/components/BigNumberCard'
import ChartCard from '~/components/ChartCard'
import TableCard from '~/components/TableCard'

export default {
  name: 'Index',

  components: {
    BigNumberCard,
    ChartCard,
    TableCard,
  },

  data: () => ({
    // TODO use state management VUEX
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
    ...mapGetters({
      getStartDate: 'dateInputs/startDate',
      getEndDate: 'dateInputs/endDate',
    }),
    startDateFormatted() {
      return new Intl.DateTimeFormat('pt-PT', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }).format(this.getStartDate)
    },
    endDateFormatted() {
      return new Intl.DateTimeFormat('pt-PT', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }).format(this.getEndDate)
    },
    titleString() {
      if (this.getStartDate === null) {
        return `Dados até
          <span class="text-glass-purple">${this.endDateFormatted}</span>`
      }
      return `Dados entre
        <span class="text-glass-purple">${this.startDateFormatted}</span> e
        <span class="text-glass-purple">${this.endDateFormatted}</span>`
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
