import type { Meta, StoryObj } from "@storybook/vue3";
// import { AuCollapse, AuCollapseItem } from "eric-ui";
import { AuCollapse, AuCollapseItem } from "aukuf-ui";

type Story = StoryObj<typeof AuCollapse>;

const meta: Meta<typeof AuCollapse> = {
  title: "Collapse",
  component: AuCollapse,
  subcomponents: { AuCollapseItem },
  tags: ["autodocs"],
};

export const Default: Story = {
  render: (args) => ({
    components: {
      AuCollapse,
      AuCollapseItem,
    },
    setup() {
      return {
        args,
      };
    },
    template: `
    <au-collapse v-bind="args">
      <au-collapse-item name="a" title="Title a">
        <div>this is content a</div>
      </au-collapse-item>
      <au-collapse-item name="b" title="title b">
        <div>this is content b</div>
      </au-collapse-item>
      <au-collapse-item name="c" title="title c  disable" disabled>
        <div>this is content c</div>
      </au-collapse-item>
    </au-collapse>
    `,
  }),
  args: {
    accordion: false,
    modelValue: ["a"],
  },
};

export const Accordion: Story = {
  render: (args) => ({
    components: {
      AuCollapse,
      AuCollapseItem,
    },
    setup() {
      return {
        args,
      };
    },
    template: `
    <au-collapse v-bind="args">
      <au-collapse-item name="a" title="Title a">
        <div>this is content a</div>
      </au-collapse-item>
      <au-collapse-item name="b" title="title b">
        <div>this is content b</div>
      </au-collapse-item>
      <au-collapse-item name="c" title="title c  disable" disabled>
        <div>this is content c</div>
      </au-collapse-item>
    </au-collapse>
    `,
  }),
  args: {
    accordion: true,
    modelValue: ["a"],
  },
};

export default meta;
