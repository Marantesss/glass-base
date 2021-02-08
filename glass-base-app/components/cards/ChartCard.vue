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

  data: () => ({
    showNumbers: true,
    labels: [
      '2019-06',
      '2019-07',
      '2019-08',
      '2019-09',
      '2019-10',
      '2019-11',
      '2019-12',
      '2020-01',
      '2020-02',
      '2020-03',
      '2020-04',
      '2020-05',
    ],
    dataset: {
      label: 'Contratos',
      data: [10, 15, 20, 30, 40, 50, 60, 70, 34, 45, 11, 78, 45],
    },
    dataset1: {
      label: 'Miguel',
      data: [10, 15, 20, 30, 40, 50, 60, 70, 34, 45, 11, 78, 45].sort(),
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
  }),

  computed: {
    shownValues() {
      return this.showNumbers ? this.dataset : this.dataset1
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
