import { test, expect } from "@playwright/test"

test.describe("Product Flows", () => {
  const KNOWN_SLUG = "spectra-aviator-gold"

  test("product detail page loads for a known product slug", async ({ page }) => {
    await page.goto(`/products/${KNOWN_SLUG}`)
    await expect(page.getByRole("heading", { name: /spectra aviator gold/i })).toBeVisible()
  })

  test("product page shows name, price, description", async ({ page }) => {
    await page.goto(`/products/${KNOWN_SLUG}`)
    await expect(page.getByRole("heading", { name: /spectra aviator gold/i })).toBeVisible()
    await expect(page.getByText(/\$349/)).toBeVisible()
    await expect(page.getByText(/timeless aviator design/i)).toBeVisible()
  })

  test("add to cart button exists on product detail", async ({ page }) => {
    await page.goto(`/products/${KNOWN_SLUG}`)
    await expect(page.getByRole("button", { name: /add to cart/i })).toBeVisible()
  })

  test("related products section shows on product detail", async ({ page }) => {
    await page.goto(`/products/${KNOWN_SLUG}`)
    await expect(page.getByRole("heading", { name: /complete your look/i })).toBeVisible()
  })

  test("404 for non-existent product slug", async ({ page }) => {
    await page.goto("/products/spectra-non-existent-product")
    await expect(page.getByRole("heading", { name: /lost your way/i })).toBeVisible()
  })
})
