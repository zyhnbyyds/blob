/**
* @copy codepen
* @link https://codepen.io/acctforjudge/pen/QWPQQxX
*/
<template>
  <div class="bub">
    <div class="bubbles" />
    <div class="bubbles" />
    <div class="bubbles" />
    <div class="bubbles" />
    <div class="bubbles" />
  </div>
</template>

<style scoped>
.bub {
  --alpha: 0.7;
  height: 90px;
  width: 150px;
  display: grid;
  grid-template-columns: auto auto auto auto auto;
  place-items: center;
}

.bubbles {
  height: 15px;
  width: 15px;
  border-radius: 50%;
  animation: in-out 700ms infinite linear;
  position: relative;
  box-shadow: 0px 0px 7px 5px rgba(246, 244, 244, 0.3);
}

.bubbles:nth-child(1) {
  animation-delay: 0;
  background: rgba(155, 255, 255, var(--alpha));
}

.bubbles:nth-child(2) {
  animation-delay: 100ms;
  background: rgba(55, 225, 220, var(--alpha));
}

.bubbles:nth-child(3) {
  animation-delay: 200ms;
  background: rgba(195, 255, 200, var(--alpha));
}

.bubbles:nth-child(4) {
  animation-delay: 300ms;
  background: rgba(255, 255, 100, var(--alpha));
}

.bubbles:nth-child(5) {
  animation-delay: 400ms;
  background: rgba(255, 255, 0, var(--alpha));
}

@keyframes in-out {
  50% {
    scale: 0.7;
    transform: translate(0, -30px);
  }
}

html.dark {
  .bubbles {
    outline: 1px solid white;
    box-shadow: 0px 0px 10px 10px rgba(255, 255, 255, 0.9);
  }
}
</style>
