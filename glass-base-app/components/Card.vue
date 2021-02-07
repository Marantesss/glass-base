<template>
  <div class="card">
    <slot name="icon"></slot>
    <div class="flex-grow">
      <h3 class="title">
        <slot name="title"></slot>
      </h3>
      <slot name="body"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Card',
}
</script>

<style scoped>
.card {
  /* STYLE */
  @apply bg-white rounded-lg p-4;
}

.title {
  @apply text-gray-light font-bold;
}
</style>
