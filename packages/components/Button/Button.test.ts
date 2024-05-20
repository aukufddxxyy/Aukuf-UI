import { h } from "vue";
import { describe, it, expect, test } from "vitest";
import { mount } from "@vue/test-utils";

import Icon from "../Icon/Icon.vue";
import Button from "./Button.vue";
import ButtonGroup from "./ButtonGroup.vue";

describe("Button.vue", () => {
  //   class
  it("should has the correct type class when type prop is set", () => {
    const types = ["primary", "success", "warning", "danger", "info", "text"];
    types.forEach((type) => {
      const wrapper = mount(Button, {
        props: {
          type: type as any,
        },
      });
      expect(wrapper.classes()).toContain(`au-button--${type}`);
    });
  });

  //   size
  it("should has the correct size class when size prop is set", () => {
    const sizes = ["large", "default", "small"];
    sizes.forEach((size) => {
      const wrapper = mount(Button, {
        props: {
          size: size as any,
        },
      });
      expect(wrapper.classes()).toContain(`au-button--${size}`);
    });
  });

  //   plain round circle
  it.each([
    ["plain", "is-plain"],
    ["round", "is-round"],
    ["circle", "is-circle"],
    ["disabled", "is-disabled"],
    ["loading", "is-loading"],
  ])("should has the correct class when %s prop is set", (prop, className) => {
    const wrapper = mount(Button, {
      props: {
        [prop]: true,
      },
      global: {
        stubs: ["AuIcon"],
      },
    });
    expect(wrapper.classes()).toContain(className);
  });

  //   native type attribute
  it("should has the correct native type attribute", () => {
    const wrapper = mount(Button, {
      props: {
        nativeType: "submit",
      },
    });
    expect(wrapper.element.tagName).toBe("BUTTON");
    expect(wrapper.element.type).toBe("submit");
  });

  //   tag
  it("should render as a link when tag prop is set to a", () => {
    const wrapper = mount(Button, {
      props: {
        tag: "a",
      },
    });
    expect(wrapper.element.tagName).toBe("A");
  });

  // icon
  it("should render icon when icon prop is set", () => {
    const wrapper = mount(Button, {
      props: {
        icon: "mdi:cloud-download",
      },
      global: {
        stubs: ["AuIcon"],
      },
    });
    const iconElement = wrapper.findComponent(Icon);
    expect(iconElement.exists()).toBeTruthy();
    expect(iconElement.attributes("icon")).toBe("mdi:cloud-download");
  });

  //   loading-icon
  it("should render loading icon when loading prop is set", async () => {
    const wrapper = mount(Button, {
      props: {
        loading: true,
      },
      global: {
        stubs: ["AuIcon"],
      },
    });
    // expect(wrapper.findComponent(Icon).exists()).toBe(true);
    const iconElement = wrapper.findComponent(Icon);

    expect(wrapper.find(".loading-icon").exists()).toBe(true);
    expect(iconElement.exists()).toBeTruthy();
    expect(iconElement.attributes("icon")).toBe("mdi:loading");
    await wrapper.trigger("click");
    expect(wrapper.emitted("click")).toBeUndefined();
  });
});

describe("ButtonGroup.vue", () => {
  test("basic button group", async () => {
    const wrapper = mount(ButtonGroup, {
      slots: {
        default: [Button, Button],
      },
    });
    // const wrapper = mount(() => (
    //   // <ButtonGroup>
    //   //   <Button>button 1</Button>
    //   //   <Button>button 2</Button>
    //   // </ButtonGroup>
    // ));

    expect(wrapper.classes()).toContain("au-button-group");
  });

  test("button group size", () => {
    const sizes = ["large", "default", "small"];
    sizes.forEach((size) => {
      const wrapper = mount(ButtonGroup, {
        props: {
          size: size as any,
        },
        slots: {
          default: [Button, Button],
        },
      });

      const buttonWrapper = wrapper.findComponent(Button);
      expect(buttonWrapper.classes()).toContain(`au-button--${size}`);
    });
  });

  test("button group type", () => {
    const types = ["primary", "success", "warning", "danger", "info"];
    types.forEach((type) => {
      const wrapper = mount(ButtonGroup, {
        props: {
          type: type as any,
        },
        slots: {
          default: [Button, Button],
        },
      });

      const buttonWrapper = wrapper.findComponent(Button);
      expect(buttonWrapper.classes()).toContain(`au-button--${type}`);
    });
  });

  test("button group disabled", () => {
    const wrapper = mount(ButtonGroup, {
      props: {
        disabled: true,
      },
      slots: {
        default: [h(Button, null, "1"), h(Button)],
      },
    });

    const buttonWrapper = wrapper.findComponent(Button);
    expect(buttonWrapper.classes()).toContain(`is-disabled`);
  });
});
