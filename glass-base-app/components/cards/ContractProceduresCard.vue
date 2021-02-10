<template>
  <Card class="w-full h-full">
    <h3 class="card-title mb-2">Tipo de procedimento</h3>
    <div class="content">
      <div class="labels max-w-sm mx-auto">
        <div
          v-for="(label, index) in dataset.labels"
          :key="index"
          class="label"
        >
          <span
            class="label-color"
            :style="{ backgroundColor: datasetOptions.backgroundColor[index] }"
          ></span>
          <span class="label-text" v-text="label"></span>
        </div>
      </div>
      <DoughnutChart :chartdata="dataset" :options="chartOptions" />
    </div>
  </Card>
</template>

<script>
import Card from '~/components/cards/Card'
import DoughnutChart from '~/components/charts/DoughnutChart'

export default {
  name: 'ContractProceduresCard',

  components: {
    Card,
    DoughnutChart,
  },

  props: {
    procedureData: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
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
        cutoutPercentage: 80,
        rotation: Math.PI,
        circumference: Math.PI,
        borderAlign: 'inner',
      },
      datasetOptions: {
        backgroundColor: [
          '#4453C3',
          '#6975CF',
          '#8F98DB',
          '#B4BAE7',
          '#DADDF3',
          '#ECEEF9',
        ],
        borderWidth: 0,
      },
    }
  },

  computed: {
    dataset() {
      const labels = []
      this.procedureData.forEach((value) => {
        switch (value.type) {
          case 'Ajuste Direto Regime Geral':
            labels.push('Ajuste direto')
            break
          case 'Ao abrigo de acordo-quadro (art.º 259.º)':
            labels.push('Artigo 259.º')
            break
          case 'Ao abrigo de acordo-quadro (art.º 258.º)':
            labels.push('Artigo 258.º')
            break
          case 'Concurso limitado por prévia qualificação':
            labels.push('Concurso limitado')
            break
          default:
            // Consulta Prévia & Concurso público
            labels.push(value.type)
            break
        }
      })
      const data = this.procedureData.map((value) => value.value)
      return {
        datasets: [
          {
            data,
            ...this.datasetOptions,
          },
        ],
        labels,
      }
    },
  },
}
</script>

<style scoped>
.labels {
  @apply grid grid-cols-2 gap-6;
}

.label {
  @apply flex items-center;
}

.label-text {
  @apply text-xs;
}

.label-color {
  @apply w-10 h-10 inline-block mr-4;
  border-radius: 50%;
}

.content {
  @apply grid grid-cols-1 gap-2;
}
</style>
