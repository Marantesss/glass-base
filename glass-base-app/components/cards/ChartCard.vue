<template>
  <Card>
    <div class="mb-2 flex justify-between">
      <h3 class="card-title">Evolução ao longo do tempo</h3>
      <ContractTabs
        class="w-96"
        :show-numbers="showNumbers"
        @toggleNumbers="toggleNumbers"
      />
    </div>
    <LineChartGradient
      cenas="cenas"
      :labels="labels"
      :dataset="shownValues"
      :options="chartOptions"
      :height="400"
    />
  </Card>
</template>

<script>
import Card from '~/components/cards/Card'
import LineChartGradient from '~/components/charts/LineChartGradient'
import ContractTabs from '~/components/helpers/ContractTabs'

export default {
  name: 'ChartCard',

  components: {
    Card,
    LineChartGradient,
    ContractTabs,
  },

  props: {
    labels: {
      type: Array,
      required: true,
    },
    numbersDataset: {
      type: Array,
      required: true,
    },
    valuesDataset: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      showNumbers: true,
      numbers: {
        label: 'Contratos',
        data: this.numbersDataset,
      },
      values: {
        label: 'Euros',
        data: this.valuesDataset,
      },
      chartOptions: {
        responsive: true,
        legend: {
          display: false,
        },
        title: {
          display: false,
        },
        tooltips: {
          backgroundColor: '#00000099',
        },
        animation: {
          easing: 'easeInOutBack',
        },
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              gridLines: {
                display: true,
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
              gridLines: {
                display: false,
              },
            },
          ],
        },
      },
    }
  },

  computed: {
    shownValues() {
      return this.showNumbers ? this.numbers : this.values
    },
  },

  methods: {
    toggleNumbers(value) {
      this.showNumbers = value
    },
  },
}
</script>

<style></style>
