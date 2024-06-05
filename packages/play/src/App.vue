<script setup lang="ts">
// import { AuButton } from "aukuf-ui";
</script>

<template>
  <au-button size="small">button</au-button>
  <au-button size="default">button</au-button>
  <au-button size="large">button</au-button>
  <au-button icon="mdi:magnify">button</au-button>
  <au-button loading>button</au-button>
  <au-button disabled>button</au-button>
  <au-button shape="round">button</au-button>
  <au-button
    shape="circle"
    icon="mdi:magnify"
  ></au-button>
  <au-button type="success">button</au-button>
  <au-button type="warning">button</au-button>
  <au-button type="danger">button</au-button>
  <au-button type="info">button</au-button>
  <au-button tag="a">button</au-button>
  <div>
    <au-icon icon="mdi:loading"></au-icon>
  </div>
  <div>
    <au-collapse>
      <au-collapse-item
        name="1"
        title="title1"
      >
        content1
      </au-collapse-item>
      <au-collapse-item
        name="2"
        title="title2"
      >
        content2
      </au-collapse-item>
      <au-collapse-item
        name="3"
        title="title3"
      >
        content3
      </au-collapse-item>
    </au-collapse>
  </div>
</template>
