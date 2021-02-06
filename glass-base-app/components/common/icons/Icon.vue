<template>
  <component :is="iconComponent" :class="chosenSizeClass"></component>
</template>

<script>
import Map from '~/components/common/icons/Map'
import DocumentText from '~/components/common/icons/DocumentText'
import PieChart from '~/components/common/icons/PieChart'
import Calendar from '~/components/common/icons/Calendar'
import UserGroup from '~/components/common/icons/UserGroup'
import XCircle from '~/components/common/icons/XCircle'
import Coffee from '~/components/common/icons/Coffee'

export default {
  name: 'Icon',

  props: {
    icon: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required: false,
      default: 'medium',
    },
  },

  computed: {
    chosenSizeClass() {
      switch (this.size.toLowerCase()) {
        case 'small':
          return 'w-4 h-4'
        case 'medium':
          return 'w-6 h-6'
        case 'large':
          return 'w-8 h-8'
        default:
          return 'w-0 h-0'
      }
    },
    iconComponent() {
      switch (this.icon.toLowerCase()) {
        case 'map':
          return Map
        case 'documenttext':
          return DocumentText
        case 'piechart':
          return PieChart
        case 'calendar':
          return Calendar
        case 'usergroup':
          return UserGroup
        case 'xcircle':
          return XCircle
        case 'coffee':
          return Coffee
        default:
          return null
      }
    },
  },
}
</script>

<style></style>
