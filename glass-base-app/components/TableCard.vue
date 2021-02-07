<template>
  <Card>
    <template slot="title">{{ title }}</template>
    <template slot="body">
      <div class="bg-glass-purple-light-2 w-full h-full"></div>
    </template>
  </Card>
</template>

<script>
export default {
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
