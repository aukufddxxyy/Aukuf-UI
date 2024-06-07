import type { Meta, StoryObj, ArgTypes } from "@storybook/vue3";
import { ref, watch } from "vue";

import { AuAlert } from "aukuf-ui";
import type { AlertInstance } from "aukuf-ui";

type Story = StoryObj<typeof AuAlert> & { argTypes?: ArgTypes };

const meta: Meta<typeof AuAlert> = {
  title: "Alert",
  component: AuAlert,
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["success", "info", "warning", "danger"],
    },
    effect: {
      control: { type: "select" },
      options: ["dark", "light", ""],
    },
    closable: {
      control: "boolean",
    },
    showIcon: {
      control: "boolean",
    },
    center: {
      control: "boolean",
    },
  },
};

export const Default: Story & { args: { visible: boolean } } = {
  args: {
    title: "this is title",
    description: "this is description",
    type: "success",
    effect: "light",
    closable: true,
    showIcon: true,
    center: false,
    visible: true,
  },
  render: (args) => ({
    components: {
      AuAlert,
    },
    setup() {
      const alertRef = ref<AlertInstance>();
      watch(
        () => (args as any).visible,
        (val: boolean) => {
          if (val) {
            alertRef.value?.open();
          } else {
            alertRef.value?.close();
          }
        },
      );
      return { args, alertRef };
    },
    template: `
    <au-alert ref="alertRef" v-bind="args"></au-alert>
      `,
  }),
};

export default meta;
