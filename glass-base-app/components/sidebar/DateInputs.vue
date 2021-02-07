<template>
  <div class="grid grid-cols-1 gap-2">
    <div class="text-gray-dark">
      <label class="px-1 text-light">De</label>
      <div class="flex">
        <div
          class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"
        >
          <Icon icon="calendar" />
        </div>
        <input
          v-model="startDate"
          type="date"
          class="w-full -mx-10 pl-10 pr-3 py-4 rounded-lg outline-none"
        />
      </div>
    </div>
    <div class="text-gray-dark">
      <label class="px-1 text-light">Até</label>
      <div class="flex">
        <div
          class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"
        >
          <Icon icon="calendar" />
        </div>
        <input
          v-model="endDate"
          type="date"
          class="w-full -mx-10 pl-10 pr-3 py-4 rounded-lg outline-none"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import Icon from '~/components/icons/Icon'

export default {
  name: 'DateInput',

  components: {
    Icon,
  },

  data: () => ({
    date: null,
  }),

  computed: {
    ...mapGetters({
      getStartDate: 'dateInputs/startDate',
      getEndDate: 'dateInputs/endDate',
    }),
    startDate: {
      get() {
        return this.getStartDate
      },
      set(startDate) {
        this.setStartDate({ startDate })
      },
    },
    endDate: {
      get() {
        return this.getEndDate
      },
      set(endDate) {
        this.setEndDate({ endDate })
      },
    },
  },

  methods: {
    ...mapActions({
      setStartDate: 'dateInputs/setStartDate',
      setEndDate: 'dateInputs/setEndDate',
    }),
  },
}
</script>

<style></style>
