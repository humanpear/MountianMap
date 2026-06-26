import { fireEvent, render, screen } from "@testing-library/react";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { beforeEach, describe, expect, it } from "vitest";
import { getMountainGuide } from "../data/mountainDetails";
import { mountains } from "../data/mountains";
import { MountainDetailPage } from "./MountainDetailPage";

function getMountainWithMultipleOfficialRoutes() {
  const mountain = mountains.find((candidate) => {
    const officialRoutes = getMountainGuide(candidate).routes.filter(
      (route) => route.forestTripCourseKind,
    );

    return officialRoutes.length >= 2;
  });

  if (!mountain) {
    throw new Error("Expected at least one mountain with multiple official routes");
  }

  return mountain;
}

function renderMountainDetail() {
  const mountain = getMountainWithMultipleOfficialRoutes();
  const result = render(
    <MountainDetailPage
      mountain={mountain}
      isCompleted={false}
      onBack={() => undefined}
      onShowOnMap={() => undefined}
      onToggleCompleted={() => undefined}
    />,
  );

  return { mountain, ...result };
}

describe("MountainDetailPage course feedback", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("renders course feedback below the mountain detail support cards", () => {
    renderMountainDetail();

    expect(
      screen.getByRole("heading", { name: "코스 평가" }),
    ).toBeInTheDocument();
    expect(screen.getByText("한줄평을 남겨주세요!")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "다른 등산객들의 한줄평" }),
    ).toBeInTheDocument();
  });

  it("selects the recommended course by default", () => {
    const { mountain } = renderMountainDetail();
    const recommendedRoute = getMountainGuide(mountain).routes.find(
      (route) => route.forestTripCourseKind === "recommended" || route.isRecommended,
    );
    const courseSelect = screen.getByLabelText(
      "코스를 선택해주세요",
    ) as HTMLSelectElement;

    expect(recommendedRoute).toBeDefined();
    expect(courseSelect.value).toBe(recommendedRoute!.name);
  });

  it("saves reviews to the selected course key", () => {
    const { mountain } = renderMountainDetail();
    const courseSelect = screen.getByLabelText(
      "코스를 선택해주세요",
    ) as HTMLSelectElement;
    const selectedRouteName = courseSelect.value;
    const reviewBody = "길이 잘 정비되어 있어요.";

    fireEvent.change(
      screen.getByPlaceholderText("코스에 대한 느낌을 자유롭게 남겨주세요."),
      { target: { value: reviewBody } },
    );
    fireEvent.click(screen.getByRole("button", { name: "등록하기" }));

    expect(screen.getByText(reviewBody)).toBeInTheDocument();

    const savedKeys = Object.keys(window.localStorage).filter((key) =>
      key.startsWith(`mountain-map:course-reviews:${mountain.id}:`),
    );
    expect(savedKeys).toHaveLength(1);
    expect(selectedRouteName).toBeTruthy();
    expect(savedKeys[0]).toContain(selectedRouteName);
  });

  it("uses a separate review list when another course is selected", () => {
    const { mountain } = renderMountainDetail();
    const courseSelect = screen.getByLabelText(
      "코스를 선택해주세요",
    ) as HTMLSelectElement;
    const secondRouteName = Array.from(courseSelect.options).at(1)?.value ?? "";
    const firstReview = "추천 코스는 접근이 편했어요.";
    const secondReview = "다른 코스는 조용해서 좋았어요.";

    expect(secondRouteName).toBeTruthy();

    fireEvent.change(
      screen.getByPlaceholderText("코스에 대한 느낌을 자유롭게 남겨주세요."),
      { target: { value: firstReview } },
    );
    fireEvent.click(screen.getByRole("button", { name: "등록하기" }));
    fireEvent.change(courseSelect, { target: { value: secondRouteName } });

    expect(screen.queryByText(firstReview)).not.toBeInTheDocument();

    fireEvent.change(
      screen.getByPlaceholderText("코스에 대한 느낌을 자유롭게 남겨주세요."),
      { target: { value: secondReview } },
    );
    fireEvent.click(screen.getByRole("button", { name: "등록하기" }));

    expect(screen.getByText(secondReview)).toBeInTheDocument();

    const savedKeys = Object.keys(window.localStorage).filter((key) =>
      key.startsWith(`mountain-map:course-reviews:${mountain.id}:`),
    );
    expect(savedKeys).toHaveLength(2);
  });

  it("does not keep the moved feedback section inside the course detail view", () => {
    const source = readFileSync(
      join(process.cwd(), "src/components/MountainDetailPage.tsx"),
      "utf8",
    );

    expect(source).not.toContain('aria-label={`${route.name} 코스 평가`}');
    expect(source).not.toContain(
      "<CourseReviewSection reviews={reviews} routeName={route.name} />",
    );
  });
});
