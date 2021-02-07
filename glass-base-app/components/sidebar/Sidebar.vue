<template>
  <div>
    <!-- HAMBURGUER -->
    <button class="sidebar-hamburguer" @click="toggleSidebar()">
      <Icon icon="Menu" size="large" />
    </button>
    <div
      class="sidebar flex flex-col justify-between"
      :class="{ 'sidebar-open': isOpen }"
    >
      <!-- LOGO -->
      <div>
        <div class="logo">
          <Logo class="w-24" />
          <h1 class="uppercase">Glass Base</h1>
        </div>
        <span class="line-separator"></span>
      </div>

      <div class="flex-grow">
        <!-- ROUTES -->
        <div class="grid grid-cols-1 gap-2 pb-10">
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
        <div class="grid grid-cols-1 gap-2">
          <DateInput label="De" />
          <DateInput label="Até" />
        </div>
      </div>

      <!-- COFFEE -->
      <div>
        <span class="line-separator"></span>
        <CoffeeButton />
      </div>
    </div>
    <!-- COVER -->
    <div
      class="sidebar-cover"
      :class="{ open: isOpen }"
      @click="toggleSidebar()"
    />
  </div>
</template>

<script>
import Logo from '~/components/Logo'
import SidebarButton from '~/components/sidebar/SidebarButton'
import CoffeeButton from '~/components/sidebar/CoffeeButton'
import DateInput from '~/components/sidebar/DateInput'

export default {
  name: 'Sidebar',

  components: {
    Logo,
    SidebarButton,
    CoffeeButton,
    DateInput,
  },

  data: () => ({
    isOpen: false,
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

  methods: {
    toggleSidebar() {
      this.isOpen = !this.isOpen
    },
  },
}
</script>

<style scoped>
.sidebar {
  @apply w-72 bg-glass-purple min-h-screen px-6 py-2 text-light fixed transition-all duration-300 ease-in-out transform z-20;
  left: -18rem; /* 18rem = w-72 */
}

.sidebar-open {
  left: 0rem;
}

.sidebar-hamburguer {
  @apply fixed outline-none rounded-lg p-1;
  left: 10px;
  top: 10px;
}

.sidebar-hamburguer:hover {
  @apply bg-gray-300;
}

@screen lg {
  .sidebar {
    left: 0rem;
  }

  .sidebar-hamburguer {
    @apply hidden;
  }
}

.sidebar-cover {
  @apply fixed top-0 left-0 opacity-0 transition-opacity duration-300 ease-in-out;
  background-color: black;
}

.sidebar-cover.open {
  @apply opacity-75 z-10 h-screen w-screen;
}

.logo {
  @apply flex justify-center items-center;
}

.line-separator {
  @apply bg-light bg-opacity-50 my-2 h-px w-full block;
}
</style>
