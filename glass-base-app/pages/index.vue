<template>
  <Loading v-if="loading" />
  <Error v-else-if="error" />
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
        <ChartCard
          :labels="chartLabels"
          :numbers-dataset="chartContractNumbers"
          :values-dataset="chartContractValues"
        />
      </div>
      <!-- Doughnut Chart -->
      <div class="col-span-12 xl:col-span-4">
        <ContractProceduresCard :procedure-data="contractingProcedureTypes" />
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
import ContractProceduresCard from '~/components/cards/ContractProceduresCard'
import Loading from '~/components/helpers/Loading'
import Error from '~/components/helpers/Error'

export default {
  name: 'Index',

  components: {
    BigNumberCard,
    ChartCard,
    TableCard,
    ContractProceduresCard,
    Loading,
    Error,
  },

  data: () => ({
    error: false,
    loading: false,
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
    topContractors: {},
    topContracted: {},
    contractingProcedureTypes: [],
    // TODO think of better names
    chartLabels: [],
    chartContractNumbers: [],
    chartContractValues: [],
  }),

  computed: {
    ...mapGetters({
      getStartDate: 'dateInputs/startDate',
      getEndDate: 'dateInputs/endDate',
    }),
    startDateFormatted() {
      return this.$formatDate(this.getStartDate)
    },
    endDateFormatted() {
      return this.$formatDate(this.getEndDate)
    },
  },

  async created() {
    this.loading = true
    try {
      const {
        contractCount,
        contractValue,
        contractAvgValue,
        contractingProcedureTypes,
        topContracted,
        topContractors,
        contractsOverTime,
      } = await this.$axios.$get('/overview')

      this.bigNumbers[0].value = this.$formatNumber(contractCount)
      this.bigNumbers[1].value = this.$formatCurrency(contractValue)
      this.bigNumbers[2].value = this.$formatCurrency(contractAvgValue)
      this.topContracted = topContracted
      this.topContractors = topContractors
      this.contractingProcedureTypes = contractingProcedureTypes

      this.chartLabels = this.getChartLabels(contractsOverTime.number)
      this.chartContractNumbers = this.getChartDataset(contractsOverTime.number)
      this.chartContractValues = this.getChartDataset(contractsOverTime.value)
    } catch (error) {
      this.error = true
    }
    this.loading = false
  },

  methods: {
    getChartLabels(chartDataArray) {
      const labels = []
      chartDataArray.forEach((elem) =>
        labels.push(`${elem.month}-${elem.year}`)
      )
      return labels
    },
    getChartDataset(chartDataArray) {
      const dataset = []
      chartDataArray.forEach((elem) => dataset.push(elem.value))
      return dataset
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
