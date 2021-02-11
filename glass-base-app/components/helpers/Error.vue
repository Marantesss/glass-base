<template>
  <div
    class="absolute top-0 right-0 bottom-0 left-0 flex flex-col justify-center items-center"
  >
    <div>
      <h2 class="title">Oop<span class="animate-fall">s</span></h2>
      <h4 class="subtitle">
        Parece que os nossos servidores estão a dormir...
      </h4>
      <p class="text">Já experimentaste desligar e voltar a ligar?</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Error',
}
</script>

<style scoped>
.title {
  @apply text-6xl text-glass-purple mx-auto;
}

.subtitle {
  @apply text-2xl font-bold text-gray-light mx-auto;
}

.text {
  @apply text-gray-light;
}

@-webkit-keyframes swing-and-fall {
  0% {
    transform: translate(0, 0px) rotate(0deg);
    transform-origin: top center;
  }
  10% {
    transform: translate(0, 0px) rotate(15deg);
  }
  15% {
    transform: translate(0, 0px) rotate(-10deg);
  }
  20% {
    transform: translate(0, 0px) rotate(5deg);
  }
  25% {
    transform: translate(0, 0px) rotate(-5deg);
  }
  30% {
    transform: translate(0, 0px) rotate(2deg);
  }
  35% {
    transform: translate(0, 0px) rotate(-1deg);
  }
  40% {
    transform: translate(0, 0px) rotate(0deg);
    transform-origin: top center;
  }
  40% {
    transform: translate(0, 0px) rotate(0deg);
    transform-origin: center center;
  }
  70% {
    transform: translate(0, 100vh) rotate(375deg);
  }
  71% {
    transform: translate(0, -100vh) rotate(-375deg);
  }
  100% {
    transform: translate(0, 0px) rotate(0deg);
    transform-origin: center center;
  }
}

@keyframes swing-and-fall {
  0% {
    transform: translate(0, 0px) rotate(0deg);
    transform-origin: top center;
  }
  10% {
    transform: translate(0, 0px) rotate(15deg);
  }
  15% {
    transform: translate(0, 0px) rotate(-10deg);
  }
  20% {
    transform: translate(0, 0px) rotate(5deg);
  }
  25% {
    transform: translate(0, 0px) rotate(-5deg);
  }
  30% {
    transform: translate(0, 0px) rotate(2deg);
  }
  35% {
    transform: translate(0, 0px) rotate(-1deg);
  }
  40% {
    transform: translate(0, 0px) rotate(0deg);
    transform-origin: top center;
  }
  40% {
    transform: translate(0, 0px) rotate(0deg);
    transform-origin: center center;
  }
  70% {
    transform: translate(0, 100vh) rotate(375deg);
  }
  71% {
    transform: translate(0, -100vh) rotate(-375deg);
  }
  100% {
    transform: translate(0, 0px) rotate(0deg);
    transform-origin: center center;
  }
}

.animate-fall {
  display: inline-block;
  -webkit-animation: swing-and-fall 3s infinite linear;
  animation: swing-and-fall 3s infinite linear;
  transform-origin: top center;
}
</style>
