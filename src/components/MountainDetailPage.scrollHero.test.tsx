import { act, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { mountains } from "../data/mountains";
import { MountainDetailPage } from "./MountainDetailPage";

vi.mock("../services/mountainWeather", () => ({
  fetchMountainWeather: vi.fn(async () => null),
  getMountainWeatherPageUrl: vi.fn(() => undefined),
  getMountainWeatherStationForName: vi.fn(() => undefined),
}));

describe("MountainDetailPage scroll-reactive hero", () => {
  beforeEach(() => {
    Object.defineProperty(window, "innerWidth", {
      configurable: true,
      value: 1200,
    });
    vi.spyOn(window, "requestAnimationFrame").mockImplementation((callback) => {
      return window.setTimeout(() => callback(performance.now()), 0);
    });
    vi.spyOn(window, "cancelAnimationFrame").mockImplementation((id) => {
      window.clearTimeout(id);
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("shows the whole hero image first, then dims and collapses on internal scroll", async () => {
    const mountain = mountains[0];
    const { container } = render(
      <MountainDetailPage
        mountain={mountain}
        isCompleted={false}
        onBack={vi.fn()}
        onShowOnMap={vi.fn()}
        onToggleCompleted={vi.fn()}
      />,
    );

    const section = container.querySelector(
      `section[aria-label="${mountain.name} 상세 정보"]`,
    ) as HTMLElement;
    const header = section.querySelector("header") as HTMLElement;
    const heroFrame = header.querySelector(
      "[data-scroll-hero-frame]",
    ) as HTMLElement;
    const heroContent = header.querySelector(
      "[data-scroll-hero-content]",
    ) as HTMLElement;
    const image = heroFrame.querySelector("img") as HTMLImageElement;

    expect(section.className).toContain("overflow-auto");
    expect(header.className).not.toContain("overflow-hidden");
    expect(heroFrame.className).toContain("sticky");
    expect(heroFrame.className).toContain("overflow-hidden");
    expect(heroFrame.className).toContain("items-end");
    expect(heroContent.style.transform).toBe("");
    expect(image.className).toContain("w-full");
    expect(image.className).not.toContain("object-contain");
    expect(header.style.height).toBe("675px");
    expect(heroFrame.style.height).toBe("var(--hero-frame-height)");
    expect(header.style.getPropertyValue("--hero-frame-height")).toBe("675px");
    expect(header.style.getPropertyValue("--hero-image-brightness")).toBe(
      "1.000",
    );
    expect(header.style.getPropertyValue("--hero-image-opacity")).toBe("1.000");

    await act(async () => {
      section.scrollTop = 120;
      section.dispatchEvent(new Event("scroll"));
      await new Promise((resolve) => window.setTimeout(resolve, 0));
    });

    expect(header.style.height).toBe("675px");
    expect(header.style.getPropertyValue("--hero-frame-height")).toBe("555px");
    expect(header.style.getPropertyValue("--hero-sticky-offset")).toBe(
      "120px",
    );
    expect(header.style.getPropertyValue("--hero-image-brightness")).toBe(
      "0.829",
    );
    expect(header.style.getPropertyValue("--hero-image-opacity")).toBe("0.893");

    await act(async () => {
      section.scrollTop = 360;
      section.dispatchEvent(new Event("scroll"));
      await new Promise((resolve) => window.setTimeout(resolve, 0));
    });

    expect(header.style.height).toBe("675px");
    expect(header.style.getPropertyValue("--hero-frame-height")).toBe("360px");
    expect(header.style.getPropertyValue("--hero-sticky-offset")).toBe(
      "315px",
    );
    expect(header.style.getPropertyValue("--hero-image-brightness")).toBe(
      "0.550",
    );
    expect(header.style.getPropertyValue("--hero-image-opacity")).toBe("0.720");

    await act(async () => {
      section.scrollTop = 0;
      section.dispatchEvent(new Event("scroll"));
      await new Promise((resolve) => window.setTimeout(resolve, 0));
    });

    expect(header.style.height).toBe("675px");
    expect(header.style.getPropertyValue("--hero-frame-height")).toBe("675px");
    expect(header.style.getPropertyValue("--hero-sticky-offset")).toBe("0px");
    expect(header.style.getPropertyValue("--hero-image-brightness")).toBe(
      "1.000",
    );
    expect(header.style.getPropertyValue("--hero-image-opacity")).toBe("1.000");
  });
});
