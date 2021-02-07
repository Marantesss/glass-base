<template>
  <button class="button" :class="{ 'button-active': active }">
    <Icon :icon="icon" />
    <span class="pl-3">
      <slot></slot>
    </span>
  </button>
</template>

<script>
import Icon from '~/components/common/icons/Icon'

export default {
  name: 'SidebarButton',

  components: {
    Icon,
  },

  props: {
    icon: {
      type: String,
      required: true,
      default: '',
    },
    active: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
}
</script>

<style scoped>
.button {
  /* Layout */
  @apply w-full flex items-center p-4;
  /* Style */
  @apply rounded-lg outline-none;
}

.button:hover {
  @apply bg-white;
  --bg-opacity: 10%;
}

.button-active {
  @apply bg-white bg-opacity-25;
}

.button-active:hover {
  @apply bg-white;
  --bg-opacity: 35%;
}
</style>
