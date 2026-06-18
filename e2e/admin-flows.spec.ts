import { test, expect } from "@playwright/test"

test.describe("Admin Flows", () => {
  test("unauthenticated user is redirected to login", async ({ page }) => {
    await page.goto("/admin")
    await expect(page).toHaveURL(/\/auth\/login/)
  })

  test("admin products page redirects to login", async ({ page }) => {
    await page.goto("/admin/products")
    await expect(page).toHaveURL(/\/auth\/login/)
  })

  test("admin orders page redirects to login", async ({ page }) => {
    await page.goto("/admin/orders")
    await expect(page).toHaveURL(/\/auth\/login/)
  })
})
