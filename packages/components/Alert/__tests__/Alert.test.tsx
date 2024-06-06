import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import Alert from "../src/Alert.vue";
import Icon from "../../Icon/src/Icon.vue";
import type { AlertType } from "../src/types";

describe("Alert.vue", () => {
  const title = "Test Alert";
  const desc = "This is a test description";
  it("should render the alert with default props", () => {
    const wrapper = mount(Alert, {
      props: {
        title,
      },
      slots: {
        default: desc,
      },
      global: {
        stubs: ["AuIcon"],
      },
    });
    expect(wrapper.text()).toContain(title);
    expect(wrapper.text()).toContain(desc);

    // close icon
    const iconElement = wrapper.findComponent(Icon);
    expect(iconElement.exists()).toBeTruthy();
    expect(iconElement.attributes("icon")).toBe("mdi:information-variant-circle");

    const wrapper2 = mount(() => (
      <Alert
        title={title}
        description={desc}
      ></Alert>
    ));

    expect(wrapper2.text()).toContain(title);
    expect(wrapper2.text()).toContain(desc);
  });

  it.each([
    ["info", "mdi:information-variant-circle"],
    ["success", "mdi:checkbox-marked-circle"],
    ["warning", "mdi:alert-circle"],
    ["danger", "mdi:close-circle"],
    ["error", "mdi:close-circle"],
    ["non-compliance", "mdi:information-variant-circle"], // 不符合 type 定义的
  ])("should has the correct icon when props type is %s", (type, iconName) => {
    const wrapper = mount(Alert, {
      props: {
        title,
        closable: false,
        showIcon: true,
        type: type as AlertType,
      },
      slots: {
        default: desc,
      },
      global: {
        stubs: ["AuIcon"],
      },
    });

    const iconElement = wrapper.findComponent(Icon);
    expect(iconElement.exists()).toBeTruthy();
    expect(iconElement.attributes("icon")).toBe(iconName);
  });

  it("should emit close event when close icon is clicked", () => {
    const onClose = vi.fn();

    const wrapper = mount(Alert, {
      props: {
        title,
        closable: true,
        showIcon: false,
        onClose,
      },
      slots: {
        default: desc,
      },
      global: {
        stubs: ["AuIcon"],
      },
    });
    wrapper.findComponent(Icon).trigger("click");
    expect(onClose).toHaveBeenCalled();
  });

  it("should allow custom content via slots", () => {
    const wrapper = mount(Alert, {
      props: {
        title: "test title",
      },
      slots: {
        default: desc,
        title,
      },
    });
    expect(wrapper.text()).toContain(desc);
    expect(wrapper.text()).toContain(title);
    expect(wrapper.text()).not.toContain("test title");
  });

  it("should support centering text", () => {
    const wrapper = mount(Alert, {
      props: {
        title,
        description: desc,
        center: true,
      },
    });
    //class
    const rootNode = wrapper.find(".au-alert");
    expect(rootNode.classes()).toContain("text-center");
  });

  it("should not render close icon when closable is false", () => {
    const wrapper = mount(Alert, {
      props: { closable: false },
    });
    expect(wrapper.find(".au-alert__close").exists()).toBe(false);
  });

  it("should toggle visibility when open and close methods are called", async () => {
    const wrapper = mount(Alert, {
      props: { title, closable: false },
    });
    await wrapper.vm.close();
    expect(wrapper.find(".au-alert").attributes().style).toBe("display: none;");
    await wrapper.vm.open();
    expect(wrapper.find(".au-alert").attributes().style).toBe("");
  });
});
