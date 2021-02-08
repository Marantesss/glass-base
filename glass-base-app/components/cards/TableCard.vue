<template>
  <Card>
    <h3 class="card-title" v-text="title"></h3>
    <div class="bg-glass-purple-light-2 w-full h-full"></div>
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
      type: [String],
      required: true,
    },
  },
}
</script>

<style></style>
