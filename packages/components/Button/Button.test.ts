import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";

import Button from "./Button.vue";

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
});
