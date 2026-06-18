import { test, expect } from "@playwright/test"

test.describe("Cart Flows", () => {
  test("empty cart shows empty state", async ({ page }) => {
    await page.goto("/cart")
    await expect(page.getByText(/your cart is empty/i)).toBeVisible()
  })

  test("cart page renders with correct heading", async ({ page }) => {
    await page.goto("/cart")
    await expect(page.getByRole("heading", { name: /your cart is empty|shopping cart/i })).toBeVisible()
  })

  test("navigation from cart back to collection", async ({ page }) => {
    await page.goto("/cart")
    const browseLink = page.getByRole("link", { name: /browse collection/i })
    await expect(browseLink).toBeVisible()
    await expect(browseLink).toHaveAttribute("href", "/collections/all")
  })

  test("empty cart shows 'Browse Collection' link", async ({ page }) => {
    await page.goto("/cart")
    await expect(page.getByRole("link", { name: /browse collection/i })).toBeVisible()
  })
})
