import { describe, it, expect, test } from "vitest";
import { mount } from "@vue/test-utils";

import Icon from "../src/Icon.vue";

describe("Icon.vue", () => {
  it("renders the Icon component", () => {
    const wrapper = mount(Icon, {
      props: {
        icon: "mdi:ab-testing",
      },
    });
    const svgElement = wrapper.find("svg");
    expect(wrapper.exists()).toBe(true);
    expect(svgElement.exists()).toBe(true);
  });

  it('applies the "au-icon" class', () => {
    const wrapper = mount(Icon, {
      props: {
        icon: "mdi:ab-testing",
      },
    });
    expect(wrapper.classes()).toContain("au-icon");
  });

  it("binds the $attrs to the <i> element", () => {
    const wrapper = mount(Icon, {
      props: {
        icon: "mdi:ab-testing",
        title: "My Icon",
      },
    });
    expect(wrapper.attributes("title")).toBe("My Icon");
  });

  it('applies the "loading-icon" class when props.loading is true', () => {
    const wrapper = mount(Icon, {
      props: {
        icon: "mdi:ab-testing",
        loading: true,
      },
    });
    const svgElement = wrapper.find("svg");
    expect(svgElement.classes()).toContain("loading-icon");
  });

  // style color
  it("applies the color style to the <svg> element", () => {
    const wrapper = mount(Icon, {
      props: {
        icon: "mdi:ab-testing",
        color: "red",
      },
    });
    const svgElement = wrapper.find("svg");
    expect(svgElement.attributes("style")).toBe("color: red;");
  });
});
