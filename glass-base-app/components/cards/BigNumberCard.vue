<template>
  <Card class="flex justify-between items-center">
    <span class="pr-2">
      <Icon :icon="icon" class="text-glass-purple" size="huge" />
    </span>
    <div class="flex-grow">
      <h3 class="card-title" v-text="title"></h3>
      <span class="value" v-text="value"></span>
    </div>
  </Card>
</template>

<script>
import Card from '~/components/cards/Card'

export default {
  name: 'BigNumberCard',

  components: {
    Card,
  },

  props: {
    title: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
  },
}
</script>

<style scoped>
.value {
  @apply text-3xl font-bold;
}
</style>
