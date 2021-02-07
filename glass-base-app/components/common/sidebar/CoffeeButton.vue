<template>
  <button
    class="w-full flex items-center justify-center py-4 rounded-lg bg-white text-dark mb-4 mt-6 outline-none"
  >
    <Icon icon="Coffee" size="large" />
    <span class="pl-2 uppercase"> Buy me a coffee </span>
  </button>
</template>

<script>
import Icon from '~/components/common/icons/Icon'

export default {
  name: 'CoffeeButton',

  components: {
    Icon,
  },
}
</script>

<style></style>
