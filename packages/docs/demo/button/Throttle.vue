<script setup>
// import { ErMessage } from "eric-ui";
function handleBtnClick() {
  // ErMessage.info("btn click");
  return;
}
</script>

<template>
  <p>
    <au-button @click="handleBtnClick">with throttle</au-button>
    <au-button
      :use-throttle="false"
      @click="handleBtnClick"
    >
      without throttle
    </au-button>
  </p>
</template>
