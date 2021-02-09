<template>
  <Card class="w-full h-full">
    <h3 class="card-title mb-2" v-text="title"></h3>
    <!-- Tabs -->
    <ContractTabs :show-numbers="showNumbers" @toggleNumbers="toggleNumbers" />
    <!-- Table -->
    <div class="table">
      <div v-for="(value, index) in shownValues" :key="index" class="row">
        <span class="position" v-text="index + 1"></span>
        <span class="name" v-text="value.name"></span>
        <span class="value" v-text="getFormattedValue(value.value)"></span>
      </div>
    </div>
  </Card>
</template>

<script>
import Card from '~/components/cards/Card'
import ContractTabs from '~/components/helpers/ContractTabs'

export default {
  name: 'TableCard',

  components: {
    Card,
    ContractTabs,
  },

  props: {
    title: {
      type: String,
      required: true,
    },
    values: {
      type: Object,
      required: true,
    },
  },

  data: () => ({
    showNumbers: true,
  }),

  computed: {
    shownValues() {
      return this.showNumbers ? this.values.number : this.values.value
    },
  },

  methods: {
    toggleNumbers(value) {
      this.showNumbers = value
    },
    getFormattedValue(value) {
      return this.showNumbers
        ? this.$formatNumber(value)
        : this.$formatCurrency(value)
    },
  },
}
</script>

<style scoped>
.table {
  @apply grid gap-4 mt-4;
}

.row {
  @apply grid grid-cols-10;
}

.position {
  @apply col-span-1 text-gray-light;
}

.name {
  @apply col-span-6;
}

.value {
  @apply col-span-3 text-gray-light text-right;
}
</style>
