<template>
  <div class="text-gray-dark">
    <label v-if="label" class="px-1 text-light" v-text="label">Até</label>
    <div class="flex">
      <div
        class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"
      >
        <Icon icon="calendar" />
      </div>
      <input
        v-model="date"
        type="date"
        class="w-full -mx-10 pl-10 pr-3 py-4 rounded-lg outline-none"
      />
    </div>
  </div>
</template>

<script>
import Icon from '~/components/common/icons/Icon'

export default {
  name: 'DateInput',

  components: {
    Icon,
  },

  props: {
    label: {
      type: String,
      required: false,
      default: null,
    },
  },
}
</script>

<style></style>
