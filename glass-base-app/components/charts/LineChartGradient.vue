<script>
import { Line } from 'vue-chartjs'

export default {
  name: 'LineChartGradient',

  extends: Line,

  props: {
    dataset: {
      type: Object,
      required: true,
    },
    labels: {
      type: Array,
      required: true,
    },
    options: {
      type: Object,
      required: true,
    },
    color: {
      type: String,
      required: false,
      default: '#4453C3',
    },
  },

  data: () => ({
    gradient: null,
    datasetStyles: (color) => ({
      borderColor: color,
      pointBorderColor: color,
      pointBackgroundColor: color,
      pointHoverBackgroundColor: color,
      pointHoverBorderColor: color,
      pointRadius: 5,
      pointHoverRadius: 10,
      fill: true,
      borderWidth: 4,
    }),
  }),

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
      this.gradient = this.$refs.canvas
        .getContext('2d')
        .createLinearGradient(0, 0, 0, 450)

      // transparent white
      this.gradient.addColorStop(0, `${this.color}dd`)
      // transparent white
      // this.gradient.addColorStop(0.7, '#ffffff00')
      this.gradient.addColorStop(1, '#ffffff00')

      this.renderChart(
        {
          labels: this.labels,
          datasets: [
            {
              // actual data
              ...this.dataset,
              // styles
              ...this.datasetStyles(this.color),
              backgroundColor: this.gradient,
            },
          ],
        },
        this.options
      )
    },
  },
}
</script>
