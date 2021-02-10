<template>
  <Card
    class="flex justify-start items-center h-full flex-row md:flex-col xl:flex-row"
  >
    <span class="pr-2 md:pr-0 xl:pr-2">
      <Icon :icon="icon" class="text-glass-purple" size="huge" />
    </span>
    <div
      class="flex-grow whitespace-normal text-left md:text-center xl:text-left min-w-0"
    >
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
  @apply text-xl font-bold;
}
</style>
