<template>
  <div class="flex">
    <Sidebar />
    <Nuxt />
  </div>
</template>

<script>
import Sidebar from '~/components/common/sidebar/Sidebar'

export default {
  name: 'Default',

  componets: {
    Sidebar,
  },
}
</script>

<style></style>
