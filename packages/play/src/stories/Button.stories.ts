import type { Meta, StoryObj, ArgTypes } from "@storybook/vue3";
import { fn, within, userEvent, expect } from "@storybook/test";

import { AuButton } from "aukuf-ui";

type Story = StoryObj<typeof AuButton> & { argTypes: ArgTypes };

const meta: Meta<typeof AuButton> = {
  title: "Example/Button",
  component: AuButton,
  // subcomponents: { ButtonGroup: ErButtonGroup },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["primary", "success", "warning", "danger", "info", ""],
    },
    size: {
      control: { type: "select" },
      options: ["large", "default", "small", ""],
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

export default meta;
