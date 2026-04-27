import { expect, test } from "@playwright/test";
import { PNG } from "pngjs";

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
  await expect(page.getByLabel(/Trình xem 3D demo/)).toBeVisible();
  await page.waitForSelector("canvas");
  await page.waitForTimeout(500);
  const screenshot = await page.getByTestId("vehicle-viewer").screenshot();
  const png = PNG.sync.read(screenshot);
  const sampledColors = new Set<string>();
  for (let index = 0; index < png.data.length; index += 4 * 997) {
    sampledColors.add(`${png.data[index]}-${png.data[index + 1]}-${png.data[index + 2]}`);
  }
  expect(sampledColors.size).toBeGreaterThan(12);
  await page.getByRole("button", { name: "Chế độ nhẹ" }).first().click();
  await expect(page.getByTestId("viewer-fallback")).toBeVisible();
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
