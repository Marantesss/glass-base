<template>
  <Card class="w-full h-full">
    <h3 class="card-title mb-2" v-text="title"></h3>
  </Card>
</template>

<script>
import Card from '~/components/cards/Card'

export default {
  name: 'ContractTypeCard',

  components: {
    Card,
  },

  props: {
    title: {
      type: String,
      required: true,
    },
  },
}
</script>

<style></style>
