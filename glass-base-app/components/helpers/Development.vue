<template>
  <div
    class="absolute top-0 right-0 bottom-0 left-0 flex flex-col md:flex-row justify-center items-center mx-12"
  >
    <div class="md:max-w-lg">
      <h2 class="title">Esta página ainda está a ser construída.</h2>
      <p class="subtitle">
        Podes ajudar os nossos developers com uma boa chavena de...
      </p>
      <p class="animation-creds">
        Animation by
        <a class="underline" href="https://dev.to/loetcodes">Louiz</a>
      </p>
    </div>

    <div class="main">
      <div class="section">
        <div class="saucer"></div>
        <div class="cup">
          <div class="cup-center">
            <div class="coffee"></div>
            <div class="froth"></div>
            <div class="coffee-dark-top"></div>
            <div class="hot-steam steam-move"></div>
          </div>
          <div class="cup-handle"></div>
        </div>
        <div class="teaspoon">
          <div class="spoon-center"></div>
          <div class="spoon-handle"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Loading',
}
</script>

<style scoped>
.title {
  @apply text-4xl text-glass-purple;
}

.subtitle {
  @apply text-xl text-gray-light;
}

.animation-creds {
  @apply text-sm text-gray-light;
}

.main {
  display: grid;
  grid-template: 70% 30% / 100%;
  justify-items: center;
  margin: 5px;
}

.section {
  max-height: 400px;
  max-width: 400px;
  min-width: 150px;
  min-height: 150px;
  width: 50vmin;
  height: 50vmin;
  overflow: hidden;
}

.saucer {
  width: 80%;
  height: 80%;
  position: relative;
  top: 10%;
  left: 10%;
  border-radius: 50%;
  background-color: #f1f1f1;
  background: radial-gradient(
    circle,
    #f1f1f1 0%,
    #e8e8e8 39%,
    #b1b1b1 42%,
    #e8e8e8 44%,
    #d2d2d2 68%,
    #eaeaea 70%,
    #dadada 100%
  );
}

.cup {
  width: 100%;
  height: 100%;
  position: relative;
  top: -54%;
  left: 25%;
  z-index: 1;
}

.cup-center {
  width: 48%;
  height: 48%;
  border-radius: 50%;
  border: 1px solid #fdfdfd;
  background: radial-gradient(
    circle,
    rgba(241, 241, 241, 1) 0%,
    rgb(232, 232, 232) 44%,
    rgb(199, 199, 199) 54%,
    rgb(189, 189, 189) 62%,
    rgb(199, 199, 199) 62%,
    rgb(232, 232, 232) 65%,
    rgb(241, 241, 241) 100%
  );
  filter: drop-shadow(17px 10px 11px #979797);
}

.cup-handle {
  width: 12%;
  height: 6%;
  position: relative;
  top: -6%;
  left: 39%;
  transform: rotate(45deg);
  background-color: #e9e9e9;
  border: 2px solid #e9e9e9;
  border-radius: 0% 20% 20% 0%;
  border-left-color: #cacaca;
  border-right-width: 5px;
  filter: drop-shadow(24px 14px 15px #979797);
}

.coffee {
  width: 86%;
  height: 86%;
  position: relative;
  top: 7%;
  left: 7%;
  border-radius: 50%;
  border: 1px solid #a5a5a5;
  background: radial-gradient(
    circle,
    rgb(45, 27, 0) 0%,
    rgb(53, 31, 1) 44%,
    rgb(54, 32, 0) 54%,
    rgb(60, 35, 0) 62%,
    rgb(154, 129, 103) 62%,
    rgba(158, 95, 29, 0.38) 65%,
    rgba(95, 65, 53, 0.33) 100%
  );
}

.froth {
  width: 76%;
  height: 76%;
  position: relative;
  top: -74.2%;
  left: 12%;
  border-radius: 50%;
  border: 1px solid #a28143d9;
  background: radial-gradient(
    circle,
    rgb(125, 88, 32) 0%,
    rgb(130, 92, 34) 44%,
    rgb(128, 91, 33) 62%,
    rgb(187, 140, 70) 100%
  );
  background-color: #9e7b3a;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='30' height='30' viewBox='0 0 90 90'%3E%3Ccircle fill-opacity='0.94' fill='%23362000' cx='45' cy='45' r='5'/%3E%3Cg fill='%23362000' fill-opacity='0.94'%3E%3Ccircle cx='0' cy='90' r='12'/%3E%3Ccircle cx='90' cy='90' r='12'/%3E%3Ccircle cx='90' cy='0' r='12'/%3E%3Ccircle cx='0' cy='0' r='12'/%3E%3C/g%3E%3C/svg%3E");
}

.coffee-dark-top {
  width: 76%;
  height: 76%;
  position: relative;
  bottom: 150%;
  left: 12%;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgb(47, 29, 3) 0%,
    rgb(47, 29, 3) 42%,
    rgb(46, 28, 3) 49%,
    rgb(51, 34, 9) 59%,
    rgb(39, 23, 2) 65%,
    rgb(25, 15, 1) 68%,
    rgb(51, 30, 0) 100%
  );
  clip-path: polygon(
    11% 29%,
    14% 27%,
    18% 22%,
    21% 18%,
    24% 16%,
    33% 12%,
    37% 9%,
    41% 7%,
    43% 6%,
    49% 5%,
    53% 5%,
    56% 6%,
    62% 8%,
    66% 9%,
    70% 12%,
    72% 14%,
    74% 17%,
    75% 22%,
    76% 23%,
    77% 24%,
    80% 25%,
    82% 27%,
    86% 32%,
    87% 36%,
    88% 40%,
    90% 42%,
    92% 43%,
    93% 52%,
    93% 56%,
    94% 61%,
    93% 65%,
    92% 68%,
    89% 70%,
    87% 74%,
    73% 86%,
    67% 89%,
    62% 92%,
    57% 94%,
    53% 94%,
    52% 94%,
    48% 91%,
    45% 90%,
    39% 87%,
    29% 84%,
    21% 79%,
    19% 76%,
    12% 70%,
    8% 68%,
    5% 67%,
    1% 56%,
    1% 46%,
    4% 36%
  );
  box-shadow: inset 8px 10px 17px 5px #020100;
}

.hot-steam {
  width: 100%;
  height: 100%;
  position: relative;
  bottom: 240%;
  left: 23%;
  background: linear-gradient(
    70deg,
    rgba(187, 164, 129, 0.29) 0%,
    rgba(111, 97, 84, 0.42) 44%,
    rgba(169, 157, 134, 0.25) 54%,
    rgba(173, 166, 150, 0.46) 65%,
    rgba(226, 220, 220, 0.19) 74%,
    rgba(220, 220, 220, 0.23) 100%
  );
  clip-path: polygon(
    12% 17%,
    14% 16%,
    16% 15%,
    20% 14%,
    26% 13%,
    29% 13%,
    34% 14%,
    36% 14%,
    39% 14%,
    41% 14%,
    43% 15%,
    45% 16%,
    49% 17%,
    56% 18%,
    60% 20%,
    65% 21%,
    68% 23%,
    78% 25%,
    80% 27%,
    83% 30%,
    88% 38%,
    92% 41%,
    94% 44%,
    94% 46%,
    92% 50%,
    92% 52%,
    92% 56%,
    89% 59%,
    87% 60%,
    85% 60%,
    83% 59%,
    81% 58%,
    79% 58%,
    78% 59%,
    77% 62%,
    77% 66%,
    76% 69%,
    74% 74%,
    73% 75%,
    72% 76%,
    69% 77%,
    68% 79%,
    66% 82%,
    64% 83%,
    60% 84%,
    58% 84%,
    56% 84%,
    52% 85%,
    50% 86%,
    47% 87%,
    44% 88%,
    40% 89%,
    37% 90%,
    35% 90%,
    29% 90%,
    28% 90%,
    20% 89%,
    17% 88%,
    10% 84%,
    4% 79%,
    2% 75%,
    3% 71%,
    3% 63%,
    5% 59%,
    5% 50%,
    2% 45%,
    1% 41%,
    2% 34%,
    5% 27%,
    8% 24%,
    9% 22%,
    10% 19%
  );
}

.steam-move {
  animation-name: steam-fade;
  animation-duration: 10s;
  animation-timing-function: ease-in-out;
  animation-iteration-count: 20;
  animation-direction: alternate;
}

@keyframes steam-fade {
  50% {
    left: 23%;
    clip-path: polygon(
      12% 17%,
      14% 16%,
      16% 15%,
      20% 14%,
      27% 15%,
      29% 17%,
      32% 19%,
      36% 19%,
      39% 20%,
      41% 21%,
      43% 22%,
      45% 22%,
      49% 21%,
      56% 16%,
      58% 15%,
      60% 14%,
      66% 14%,
      72% 12%,
      78% 6%,
      82% 4%,
      89% 4%,
      95% 3%,
      96% 3%,
      97% 8%,
      99% 15%,
      100% 20%,
      100% 26%,
      97% 34%,
      96% 44%,
      95% 46%,
      94% 48%,
      92% 50%,
      87% 51%,
      86% 51%,
      84% 51%,
      83% 51%,
      82% 51%,
      80% 52%,
      79% 57%,
      77% 59%,
      75% 60%,
      74% 61%,
      72% 64%,
      71% 65%,
      70% 70%,
      69% 73%,
      67% 75%,
      65% 77%,
      56% 83%,
      54% 84%,
      51% 85%,
      48% 86%,
      40% 87%,
      36% 88%,
      32% 88%,
      25% 88%,
      20% 87%,
      17% 84%,
      15% 79%,
      13% 75%,
      12% 72%,
      12% 64%,
      16% 59%,
      18% 56%,
      22% 54%,
      23% 53%,
      25% 49%,
      25% 44%,
      24% 39%,
      20% 33%,
      12% 26%,
      9% 20%
    );
  }
}

@media (min-width: 1400px) and (min-height: 600px) {
  .main {
    grid-template: 100% / 50% 50%;
    margin: 4%;
  }

  .text {
    margin-left: 5%;
    font-size: 24vmin;
  }
}
</style>
