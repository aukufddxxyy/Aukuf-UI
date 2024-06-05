import { beforeAll, describe, expect, test, vi } from "vitest";
import { DOMWrapper, mount } from "@vue/test-utils";
import type { VueWrapper } from "@vue/test-utils";

import Collapse from "./Collapse.vue";
import CollapseItem from "./CollapseItem.vue";

const onChange = vi.fn();

let wrapper: VueWrapper,
  headers: DOMWrapper<Element>[],
  contents: DOMWrapper<Element>[];

let firstHeader: DOMWrapper<Element>,
  secondHeader: DOMWrapper<Element>,
  disabledHeader: DOMWrapper<Element>,
  firstContent: DOMWrapper<Element>,
  secondContent: DOMWrapper<Element>,
  disabledContent: DOMWrapper<Element>;

describe("Collapse.vue", () => {
  beforeAll(() => {
    wrapper = mount(
      () => (
        <Collapse
          modelValue={["a"]}
          onChange={onChange}
        >
          <CollapseItem
            name="a"
            title="A"
          >
            A
          </CollapseItem>
          <CollapseItem
            name="b"
            title="B"
          >
            B
          </CollapseItem>
          <CollapseItem
            name="c"
            title="C"
            disabled
          >
            C
          </CollapseItem>
        </Collapse>
      ),
      {
        global: {
          stubs: ["AuIcon"],
        },
        attachTo: document.body,
      },
    );
    headers = wrapper.findAll(".au-collapse-item__header");
    contents = wrapper.findAll(".au-collapse-item__wrapper");

    firstHeader = headers[0];
    secondHeader = headers[1];
    disabledHeader = headers[2];
    firstContent = contents[0];
    secondContent = contents[1];
    disabledContent = contents[2];
  });

  test("should render correctly", () => {
    expect(wrapper.classes()).toContain("au-collapse");
    expect(headers.length).toBe(3);
    expect(contents.length).toBe(3);
  });

  test("should render first item open", () => {
    expect(firstHeader.classes()).toContain("is-active");
    // expect(firstContent.classes()).toContain("is-open");
  });

  test("should render second item closed", () => {
    expect(secondHeader.classes()).not.toContain("is-active");
    // expect(secondContent.classes()).not.toContain("is-open");
  });

  test("should render disabled item", () => {
    expect(disabledHeader.classes()).toContain("is-disabled");
    // expect(disabledContent.classes()).toContain("is-disabled");
  });

  // test("should toggle item on click", async () => {
  //   await secondHeader.trigger("click");
  //   expect(onChange).toHaveBeenCalledWith(["b"]);
  // });
});
