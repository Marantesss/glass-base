<script>
import { Doughnut } from 'vue-chartjs'

export default {
  name: 'DoughnutChart',

  extends: Doughnut,

  props: {
    chartdata: {
      type: Object,
      required: true,
    },
    options: {
      type: Object,
      required: true,
    },
  },

  watch: {
    dataset() {
      this.buildChart()
    },
  },

  mounted() {
    this.buildChart()
  },

  methods: {
    buildChart() {
      this.renderChart(this.chartdata, this.options)
    },
  },
}
</script>
