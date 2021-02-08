<template>
  <button class="button">
    <Icon icon="Coffee" size="large" />
    <span class="pl-2 uppercase"> Buy me a coffee </span>
  </button>
</template>

<script>
import Icon from '~/components/icons/Icon'

export default {
  name: 'CoffeeButton',

  components: {
    Icon,
  },
}
</script>

<style scoped>
.button {
  @apply w-full flex items-center justify-center py-4 rounded-lg bg-transparent border-white text-white border-2 mb-4 mt-6;
}

.button:hover {
  @apply bg-white text-dark;
}

.button:focus {
  @apply outline-none;
}
</style>
