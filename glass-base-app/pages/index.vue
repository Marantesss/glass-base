<template>
  <div v-if="loading">LOADING</div>
  <div v-else-if="error">ERROR</div>
  <div v-else>
    <h2 class="page-title">
      Dados entre
      <span class="text-glass-purple" v-text="startDateFormatted"></span> e
      <span class="text-glass-purple" v-text="endDateFormatted"></span>
    </h2>
    <section class="grid grid-cols-12 gap-6">
      <!-- Big Numbers Row -->
      <div
        v-for="bigNumber in bigNumbers"
        :key="bigNumber.title"
        class="col-span-12 md:col-span-4"
      >
        <BigNumberCard
          :title="bigNumber.title"
          :value="bigNumber.value"
          :icon="bigNumber.icon"
        />
      </div>
      <!-- Line Chart Row -->
      <div class="col-span-12">
        <ChartCard />
      </div>
      <!-- Doughnut Chart -->
      <div class="col-span-12 xl:col-span-4">
        <ContractTypeCard title="Tipo de procedimento" />
      </div>
      <!-- Top tables -->
      <div class="col-span-12 md:col-span-6 xl:col-span-4">
        <TableCard
          title="Top entidades contratantes"
          :values="topContractors"
        />
      </div>
      <div class="col-span-12 md:col-span-6 xl:col-span-4">
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
    error: false,
    loading: false,
    dateStringOptions: {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    },
    bigNumbers: [
      {
        title: 'Número de Contratos',
        value: null,
        icon: 'DocumentDuplicate',
      },
      {
        title: 'Valor de Contratos',
        value: null,
        icon: 'Cash',
      },
      {
        title: 'Valor Médio por Contrato',
        value: null,
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

  async created() {
    this.loading = true
    try {
      const {
        contractCount,
        contractValue,
        contractAvgValue,
      } = await this.$axios.$get('http://localhost:8000') // TODO PLACE THIS SOMEWHERE ELSE
      // TODO recycle this using mixins or something else
      this.bigNumbers[0].value = new Intl.NumberFormat('pt-PT').format(
        contractCount
      )
      this.bigNumbers[1].value = new Intl.NumberFormat('pt-PT', {
        style: 'currency',
        currency: 'EUR',
      }).format(contractValue)
      this.bigNumbers[2].value = new Intl.NumberFormat('pt-PT', {
        style: 'currency',
        currency: 'EUR',
      }).format(contractAvgValue)
    } catch (error) {
      this.error = true
    }
    this.loading = false
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
