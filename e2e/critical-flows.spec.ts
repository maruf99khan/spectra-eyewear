import { test, expect } from "@playwright/test"

test.describe("Critical Flows", () => {
  test("homepage loads and shows hero", async ({ page }) => {
    await page.goto("/")
    await expect(page.getByRole("heading", { name: /see the world/i })).toBeVisible()
  })

  test("products page shows grid", async ({ page }) => {
    await page.goto("/search")
    await expect(page.locator("h3").nth(4)).toBeVisible({ timeout: 10000 })
  })

  test("stores page navigates correctly", async ({ page }) => {
    await page.goto("/")
    await page.getByRole("link", { name: /stores/i }).first().click()
    await expect(page).toHaveURL("/stores")
  })

  test("cart page renders", async ({ page }) => {
    await page.goto("/cart")
    await expect(page.getByRole("heading", { name: /cart/i })).toBeVisible()
  })

  test("auth pages render", async ({ page }) => {
    await page.goto("/auth/login")
    await expect(page.getByRole("heading", { name: /welcome back/i })).toBeVisible()
    await page.goto("/auth/signup")
    await expect(page.getByRole("heading", { name: /create account/i })).toBeVisible()
  })

  test("admin redirects to login when unauthenticated", async ({ page }) => {
    await page.goto("/admin")
    await expect(page).toHaveURL(/\/auth\/login/)
  })

  test("search input filters products", async ({ page }) => {
    await page.goto("/search")
    const input = page.getByPlaceholder(/search/i)
    await input.fill("round")
    await input.press("Enter")
    await expect(page).toHaveURL(/q=round/i)
  })
})
