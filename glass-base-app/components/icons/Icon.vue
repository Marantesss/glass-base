<template>
  <component :is="iconComponent" :class="chosenSizeClass"></component>
</template>

<script>
import Map from '~/components/icons/Map'
import DocumentText from '~/components/icons/DocumentText'
import PieChart from '~/components/icons/PieChart'
import Calendar from '~/components/icons/Calendar'
import UserGroup from '~/components/icons/UserGroup'
import XCircle from '~/components/icons/XCircle'
import Coffee from '~/components/icons/Coffee'
import Menu from '~/components/icons/Menu'

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
        case 'menu':
          return Menu
        default:
          return null
      }
    },
  },
}
</script>

<style></style>
