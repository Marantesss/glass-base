<template>
  <div>
    <Sidebar />
    <div
      class="transition-all duration-500 ease-in-out lg:ml-72 bg-gray-background min-h-screen p-4 pt-12 lg:p-4 relative"
    >
      <Nuxt />
    </div>
  </div>
</template>

<script>
import Sidebar from '~/components/sidebar/Sidebar'
import Icon from '~/components/icons/Icon'

export default {
  name: 'Default',

  componets: {
    Sidebar,
    Icon,
  },
}
</script>

<style>
.card-title {
  @apply text-gray-light font-bold;
}
</style>
