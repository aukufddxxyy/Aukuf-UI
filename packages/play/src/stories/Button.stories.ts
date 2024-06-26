import type { Meta, StoryObj, ArgTypes } from "@storybook/vue3";
import { fn, within, userEvent, expect } from "@storybook/test";

import { AuButton, AuButtonGroup } from "aukuf-ui";

type Story = StoryObj<typeof AuButton> & { argTypes?: ArgTypes };

const meta: Meta<typeof AuButton> = {
  title: "Button",
  component: AuButton,
  subcomponents: { ButtonGroup: AuButtonGroup },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["primary", "success", "warning", "danger", "info", ""],
    },
    size: {
      control: { type: "select" },
      options: ["large", "middle", "small", ""],
    },
    shape: {
      control: { type: "select" },
      options: ["circle", "round", ""],
    },
    block: {
      control: "boolean",
    },
    disabled: {
      control: "boolean",
    },
    loading: {
      control: "boolean",
    },
    useThrottle: {
      control: "boolean",
    },
    throttleDuration: {
      control: "number",
    },
    autofocus: {
      control: "boolean",
    },
    tag: {
      control: { type: "select" },
      options: ["button", "a", "div"],
    },
    nativeType: {
      control: { type: "select" },
      options: ["button", "submit", "reset", ""],
    },
    icon: {
      control: { type: "text" },
    },
    loadingIcon: {
      control: { type: "text" },
    },
  },
  args: { onClick: fn() },
};

const container = (val: string) => `
<div style="display: flex; gap: 10px;">
  ${val}
</div>
`;

export const Default: Story & { args: { content: string } } = {
  argTypes: {
    content: { control: { type: "text" } },
  },
  args: {
    type: "primary",
    content: "Button",
  },
  render: (args) => ({
    components: { AuButton },
    setup() {
      return { args };
    },
    template: container(
      `<AuButton v-bind="args" @click="args.onClick">{{ args.content }}</AuButton>`,
    ),
  }),
  play: async ({ canvasElement, args, step }) => {
    const canvas = within(canvasElement);
    await step("Click the button", async () => {
      await userEvent.click(canvas.getByRole("button"));
    });

    expect(args.onClick).toHaveBeenCalled();
  },
};

export const Group: Story & { args: { content1: string; content2: string } } = {
  argTypes: {
    groupType: {
      control: { type: "select" },
      options: ["primary", "success", "warning", "danger", "info", ""],
    },
    groupSize: {
      control: { type: "select" },
      options: ["large", "default", "small", ""],
    },
    groupDisabled: {
      control: "boolean",
    },
    content1: {
      control: { type: "text" },
      defaultValue: "Button1",
    },
    content2: {
      control: { type: "text" },
      defaultValue: "Button2",
    },
  },
  args: {
    shape: "round",
    content1: "Button1",
    content2: "Button2",
  },
  render: (args: any) => ({
    components: { AuButton, AuButtonGroup },
    setup() {
      return { args };
    },
    template: container(`
       <au-button-group :type="args.groupType" :size="args.groupSize" :disabled="args.groupDisabled">
         <au-button v-bind="args">{{args.content1}}</au-button>
         <au-button v-bind="args">{{args.content2}}</au-button>
       </au-button-group>
    `),
  }),
  play: async ({ canvasElement, args, step }) => {
    const canvas = within(canvasElement);
    await step("click btn1", async () => {
      await userEvent.click(canvas.getByText("Button1"));
    });
    await step("click btn2", async () => {
      await userEvent.click(canvas.getByText("Button2"));
    });
    expect(args.onClick).toHaveBeenCalled();
  },
};

export default meta;
