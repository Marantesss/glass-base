<template>
  <div
    class="absolute top-0 right-0 bottom-0 left-0 flex flex-col justify-center items-center"
  >
    <div class="spinner">
      <div class="cube1"></div>
      <div class="cube2"></div>
    </div>
    <p class="subtitle">A fazer pedidos mágicos...</p>
  </div>
</template>

<script>
export default {
  name: 'Loading',
}
</script>

<style scoped>
.subtitle {
  @apply text-2xl font-bold text-gray-light mx-auto text-center mt-3;
}

.spinner {
  @apply relative mx-auto;
  /* Visually calculated */
  width: 58px;
  height: 58px;
}

.cube1,
.cube2 {
  @apply bg-glass-purple w-4 h-4 absolute top-0 left-0 rounded-sm;

  -webkit-animation: sk-cubemove 1.8s infinite ease-in-out;
  animation: sk-cubemove 1.8s infinite ease-in-out;
}

.cube2 {
  -webkit-animation-delay: -0.9s;
  animation-delay: -0.9s;
}

@-webkit-keyframes sk-cubemove {
  25% {
    -webkit-transform: translateX(42px) rotate(-90deg) scale(0.5);
  }
  50% {
    -webkit-transform: translateX(42px) translateY(42px) rotate(-180deg);
  }
  75% {
    -webkit-transform: translateX(0px) translateY(42px) rotate(-270deg)
      scale(0.5);
  }
  100% {
    -webkit-transform: rotate(-360deg);
  }
}

@keyframes sk-cubemove {
  25% {
    transform: translateX(42px) rotate(-90deg) scale(0.5);
    -webkit-transform: translateX(42px) rotate(-90deg) scale(0.5);
  }
  50% {
    transform: translateX(42px) translateY(42px) rotate(-179deg);
    -webkit-transform: translateX(42px) translateY(42px) rotate(-179deg);
  }
  50.1% {
    transform: translateX(42px) translateY(42px) rotate(-180deg);
    -webkit-transform: translateX(42px) translateY(42px) rotate(-180deg);
  }
  75% {
    transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5);
    -webkit-transform: translateX(0px) translateY(42px) rotate(-270deg)
      scale(0.5);
  }
  100% {
    transform: rotate(-360deg);
    -webkit-transform: rotate(-360deg);
  }
}

/*
.logo-loading {
  animation: logo-loading 1.2s infinite;
}

@keyframes logo-loading {
  0% {
    transform: rotate(0);
    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
  }
  50% {
    transform: rotate(180deg);
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  100% {
    transform: rotate(360deg);
  }
}
*/
</style>
