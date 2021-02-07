<template>
  <div>
    <Sidebar />
    <section class="transition-all duration-500 ease-in-out md:ml-72">
      <Nuxt />
    </section>
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
