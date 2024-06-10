<script setup>
// import { ErMessage } from "eric-ui";

function handleClose() {
  // ErMessage.info("close callback");
  return;
}
</script>
<template>
  <div class="basic block">
    <au-alert
      title="Unclosable alert"
      type="success"
      :closable="false"
    />
    <au-alert
      title="Alert with callback"
      type="warning"
      @close="handleClose"
    />
  </div>
</template>
