<template>
  <h2>通过 slot 传入内容</h2>
  <div style="max-width: 600px">
    <au-alert type="success">Success alert</au-alert>
    <au-alert type="info">Info alert</au-alert>
    <au-alert type="warning">Warning alert</au-alert>
    <au-alert type="danger">Error alert</au-alert>
  </div>
  <h2>通过 prop 传入内容</h2>
  <div style="max-width: 600px">
    <au-alert
      type="success"
      title="Success alert"
    />
    <au-alert
      type="info"
      title="Info alert"
    />
    <au-alert
      type="warning"
      title="Warning alert"
    />
    <au-alert
      type="danger"
      title="Error alert"
    />
  </div>
</template>
