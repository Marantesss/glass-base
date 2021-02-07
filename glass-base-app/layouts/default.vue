<template>
  <div>
    <Sidebar />
    <section class="transition-all duration-500 ease-in-out lg:ml-72">
      <Nuxt />
    </section>
  </div>
</template>

<script>
import Sidebar from '~/components/common/sidebar/Sidebar'
import Icon from '~/components/common/icons/Icon'

export default {
  name: 'Default',

  componets: {
    Sidebar,
    Icon,
  },
}
</script>

<style></style>
