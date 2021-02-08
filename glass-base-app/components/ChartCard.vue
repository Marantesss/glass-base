<template>
  <Card>
    <h3 class="card-title">Evolução ao longo do tempo</h3>
    <template slot="body">
      <div class="bg-glass-purple-light-2 w-full h-full"></div>
    </template>
  </Card>
</template>

<script>
import Card from '~/components/Card'

export default {
  name: 'ChartCard',

  components: {
    Card,
  },
}
</script>

<style></style>
