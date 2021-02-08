<template>
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
</template>

<script>
export default {
  name: 'ContractTabs',

  props: {
    showNumbers: {
      type: Boolean,
      required: true,
    },
  },

  methods: {
    toggleNumbers() {
      this.$emit('toggleNumbers', true)
    },
    toggleValues() {
      this.$emit('toggleNumbers', false)
    },
  },
}
</script>

<style scoped>
.tab {
  @apply flex justify-center text-center text-gray-light text-xs;
}

.tab-button {
  @apply w-full pt-2 pb-3 border-b-2;
}

.tab-button:hover {
  @apply text-glass-purple-light-2 border-glass-purple-light-3;
}

.tab-button:focus {
  @apply outline-none;
}

.tab-button-active {
  @apply border-glass-purple text-glass-purple;
}
</style>
