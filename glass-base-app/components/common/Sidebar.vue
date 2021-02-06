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
      <button v-for="route in routes" :key="route.name" class="button">
        <Icon :icon="route.icon" />
        <span class="pl-3">
          {{ route.name }}
        </span>
      </button>
    </div>
    <!-- TIME -->
    <div class="grid grid-col-1 gap-2 text-gray-dark">
      <!-- De -->
      <div>
        <label for="" class="px-1 text-light">De</label>
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
      <!-- Até -->
      <div>
        <label for="" class="px-1 text-light">Até</label>
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
    <!-- COFFEE -->
    <div>
      <span class="line-separator"></span>
      <button
        class="w-full flex items-center justify-center py-4 rounded-lg bg-white text-dark outline-none"
      >
        <Icon icon="Coffee" size="large" />
        <span class="pl-2 uppercase"> Buy me a coffee </span>
      </button>
    </div>
  </div>
</template>

<script>
import Logo from '~/components/common/Logo'
import Icon from '~/components/common/icons/Icon'

export default {
  name: 'Sidebar',

  components: {
    Logo,
    Icon,
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
  @apply flex justify-between items-center;
}

.line-separator {
  @apply bg-light bg-opacity-50 my-2 h-px w-full block;
}

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
</style>
