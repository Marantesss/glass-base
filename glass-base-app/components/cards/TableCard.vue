<template>
  <Card class="w-full h-full">
    <h3 class="card-title mb-2" v-text="title"></h3>
    <!-- Tabs -->
    <div class="tab">
      <button
        class="tab-button"
        :class="{ 'tab-button-active': showNumbers }"
        @click="toggleNumbers()"
      >
        Número de Contratos
      </button>
      <button
        class="tab-button"
        :class="{ 'tab-button-active': !showNumbers }"
        @click="toggleValues()"
      >
        Valor de Contratos
      </button>
    </div>
    <!-- Table -->
    <div class="table">
      <div v-for="(value, index) in shownValues" :key="index" class="row">
        <span class="position" v-text="index + 1"></span>
        <span class="name" v-text="value.name"></span>
        <span class="value" v-text="value.value"> 123123 </span>
      </div>
    </div>
  </Card>
</template>

<script>
import Card from '~/components/cards/Card'

export default {
  name: 'TableCard',

  components: {
    Card,
  },

  props: {
    title: {
      type: String,
      required: true,
    },
    values: {
      type: Array,
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
    toggleNumbers() {
      this.showNumbers = true
    },
    toggleValues() {
      this.showNumbers = false
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

.tab {
  @apply flex justify-center text-center text-gray-light text-xs;
}

.tab-button {
  @apply w-full pt-2 pb-3 border-b-2 outline-none;
}

.tab-button-active {
  @apply border-glass-purple text-glass-purple;
}
</style>
