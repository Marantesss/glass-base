<template>
  <div>
    <!-- eslint-disable-next-line vue/no-v-html -->
    <h2 class="page-title" v-html="titleString"></h2>
    <section class="grid grid-cols-3 gap-6">
      <!-- Big Numbers Row -->
      <div
        v-for="bigNumber in bigNumbers"
        :key="bigNumber.title"
        class="col-span-3 md:col-span-1"
      >
        <BigNumberCard
          :title="bigNumber.title"
          :value="bigNumber.value"
          :icon="bigNumber.icon"
        />
      </div>
      <!-- Line Chart Row -->
      <div class="col-span-3">
        <ChartCard />
      </div>
      <!-- Doughnut Chart -->
      <div class="col-span-3 md:col-span-1">
        <ContractTypeCard title="Tipo de procedimento" />
      </div>
      <!-- Top tables -->
      <div class="col-span-3 md:col-span-1">
        <TableCard
          title="Top entidades contratantes"
          :values="topContractors"
        />
      </div>
      <div class="col-span-3 md:col-span-1">
        <TableCard title="Top entidades contratadas" :values="topContracted" />
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import BigNumberCard from '~/components/cards/BigNumberCard'
import ChartCard from '~/components/cards/ChartCard'
import TableCard from '~/components/cards/TableCard'
import ContractTypeCard from '~/components/cards/ContractTypeCard'

export default {
  name: 'Index',

  components: {
    BigNumberCard,
    ChartCard,
    TableCard,
    ContractTypeCard,
  },

  data: () => ({
    dateStringOptions: {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    },
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
    topContractors: {
      number: [
        {
          name: 'Banana cenas LDA number',
          value: 3456,
        },
        {
          name: 'Banana cenas LDA',
          value: 3456,
        },
        {
          name: 'Banana cenas LDA',
          value: 3456,
        },
        {
          name: 'Banana cenas LDA',
          value: 3456,
        },
        {
          name: 'Banana cenas LDA',
          value: 3456,
        },
        {
          name: 'Banana cenas LDA',
          value: 3456,
        },
      ],
      value: [
        {
          name: 'Banana cenas LDA value',
          value: 81923789123,
        },
        {
          name: 'Banana cenas LDA',
          value: 3456,
        },
        {
          name: 'Banana cenas LDA',
          value: 3456,
        },
        {
          name: 'Banana cenas LDA',
          value: 3456,
        },
        {
          name: 'Banana cenas LDA',
          value: 3456,
        },
        {
          name: 'Banana cenas LDA',
          value: 3456,
        },
      ],
    },
    topContracted: {
      number: [
        {
          name: 'Banana cenas LDA number',
          value: 3456,
        },
        {
          name: 'Banana cenas LDA',
          value: 3456,
        },
        {
          name: 'Banana cenas LDA',
          value: 3456,
        },
        {
          name: 'Banana cenas LDA',
          value: 3456,
        },
        {
          name: 'Banana cenas LDA',
          value: 3456,
        },
        {
          name: 'Banana cenas LDA',
          value: 3456,
        },
      ],
      value: [
        {
          name: 'Banana cenas LDA value',
          value: 3456,
        },
        {
          name: 'Banana cenas LDA',
          value: 3456,
        },
        {
          name: 'Banana cenas LDA',
          value: 3456,
        },
        {
          name: 'Banana cenas LDA',
          value: 3456,
        },
        {
          name: 'Banana cenas LDA',
          value: 3456,
        },
        {
          name: 'Banana cenas LDA',
          value: 3456,
        },
      ],
    },
  }),

  computed: {
    ...mapGetters({
      getStartDate: 'dateInputs/startDate',
      getEndDate: 'dateInputs/endDate',
    }),
    startDateFormatted() {
      return new Date(this.getStartDate).toLocaleDateString(
        'pt-PT',
        this.dateStringOptions
      )
    },
    endDateFormatted() {
      return new Date(this.getEndDate).toLocaleDateString(
        'pt-PT',
        this.dateStringOptions
      )
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
