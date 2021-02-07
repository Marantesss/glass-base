<template>
  <Card class="flex justify-between items-center">
    <template slot="icon">
      <span class="pr-2">
        <Icon :icon="icon" class="text-glass-purple" size="huge" />
      </span>
    </template>
    <template slot="title">{{ title }}</template>
    <template slot="body">
      <span class="value" v-text="value"></span>
    </template>
  </Card>
</template>

<script>
import Card from '~/components/Card'

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
