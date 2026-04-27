import { expect, test } from "@playwright/test";

test("home page loads premium showroom", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "VF Showcase Demo" })).toBeVisible();
  await expect(page.getByRole("link", { name: /Khám phá 3D/ }).first()).toBeVisible();
});

test("cars page loads sourced data", async ({ page }) => {
  await page.goto("/cars");
  await expect(page.getByRole("heading", { name: /Tất cả mẫu xe/ })).toBeVisible();
  await expect(page.getByRole("link", { name: /Xem chi tiết/ }).first()).toBeVisible();
});

test("car detail page exposes 3D controls or fallback", async ({ page }) => {
  await page.goto("/cars/vf-3");
  await expect(page.locator("h1", { hasText: "VF 3" })).toBeVisible();
  const licensedViewer = page.getByTestId("licensed-3d-viewer");
  if (await licensedViewer.isVisible()) {
    await expect(page.getByLabel(/Trình xem 3D chi tiết/)).toBeVisible();
    await expect(licensedViewer.locator("iframe")).toBeVisible();
    await expect(page.getByRole("link", { name: /Xem nguồn model/ })).toBeVisible();
  } else {
    await expect(page.getByLabel(/Trình xem 3D demo/)).toBeVisible();
    await page.waitForSelector("canvas");
    await page.getByRole("button", { name: "Chế độ nhẹ" }).first().click();
    await expect(page.getByTestId("viewer-fallback")).toBeVisible();
  }
});

test("compare page can select two cars and show differences", async ({ page }) => {
  await page.goto("/compare");
  await expect(page.getByRole("heading", { name: /So sánh 2-4 mẫu xe/ })).toBeVisible();
  await page.getByRole("button", { name: /VF 3/ }).click();
  await page.getByRole("button", { name: /VF 5/ }).click();
  await page.getByLabel("Chỉ hiện điểm khác nhau").check();
  await expect(page.getByText("Số chỗ")).toBeVisible();
});

test("mobile viewport does not overflow horizontally", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const hasOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
  expect(hasOverflow).toBe(false);
});
