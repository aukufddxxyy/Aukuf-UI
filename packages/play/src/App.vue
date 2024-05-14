<script setup lang="ts">
import { AuButton, AuButtonGroup } from "aukuf-ui";
</script>

<template>
  <au-button-group type="danger">
    <au-button
      size="small"
      :loading="true"
      :disable="true"
    >
      button
    </au-button>
    <au-button
      size="small"
      :loading="true"
      :disable="true"
    >
      button
    </au-button>
  </au-button-group>
</template>
