<template>
  <div class="sidebar text-light">
    <!-- LOGO -->
    <div>
      <div class="logo">
        <Logo class="w-24" />
        <h1 class="uppercase">Glass Base</h1>
      </div>
      <span class="line-separator"></span>
    </div>
    <!-- ROUTES -->
    <div class="grid grid-col-1 gap-2">
      <NuxtLink v-for="route in routes" :key="route.name" :to="route.path">
        <SidebarButton
          :active="$nuxt.$route.path === route.path"
          :icon="route.icon"
        >
          {{ route.name }}
        </SidebarButton>
      </NuxtLink>
    </div>
    <!-- TIME -->
    <div class="grid grid-col-1 gap-2">
      <DateInput label="De" />
      <DateInput label="Até" />
    </div>
    <!-- COFFEE -->
    <div>
      <span class="line-separator"></span>
      <CoffeeButton />
    </div>
  </div>
</template>

<script>
import Logo from '~/components/common/Logo'
import SidebarButton from '~/components/common/sidebar/SidebarButton'
import CoffeeButton from '~/components/common/sidebar/CoffeeButton'
import DateInput from '~/components/common/sidebar/DateInput'

export default {
  name: 'Sidebar',

  components: {
    Logo,
    SidebarButton,
    CoffeeButton,
    DateInput,
  },

  data: () => ({
    startDate: null,
    endDate: new Date(),
    routes: [
      {
        name: 'Dashboard',
        path: '/',
        icon: 'PieChart',
      },
      {
        name: 'Contratos',
        path: '/contratos',
        icon: 'DocumentText',
      },
      {
        name: 'Entidades',
        path: '/entidades',
        icon: 'UserGroup',
      },
      {
        name: 'Mapa',
        path: '/mapa',
        icon: 'Map',
      },
    ],
  }),
}
</script>

<style scoped>
.sidebar {
  /* Style */
  @apply w-72 bg-glass-purple min-h-screen px-6 py-2;
  /* Layout */
  @apply flex flex-col justify-between;
}

.logo {
  @apply flex justify-center items-center;
}

.line-separator {
  @apply bg-light bg-opacity-50 my-2 h-px w-full block;
}
</style>
