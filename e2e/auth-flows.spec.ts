import { test, expect } from "@playwright/test"

test.describe("Auth Flows", () => {
  test("login page renders correctly", async ({ page }) => {
    await page.goto("/auth/login")
    await expect(page.getByRole("heading", { name: /welcome back/i })).toBeVisible()
  })

  test("signup page renders correctly", async ({ page }) => {
    await page.goto("/auth/signup")
    await expect(page.getByRole("heading", { name: /create account/i })).toBeVisible()
  })

  test("forgot password page renders", async ({ page }) => {
    await page.goto("/auth/forgot-password")
    await expect(page.getByRole("heading", { name: /reset password/i })).toBeVisible()
  })

  test("invalid login shows error", async ({ page }) => {
    await page.goto("/auth/login")
    await page.getByLabel(/email/i).fill("invalid@example.com")
    await page.getByLabel(/password/i).fill("wrongpassword")
    await page.getByRole("button", { name: /sign in/i }).click()
    await expect(page.getByText(/invalid|error|could not|failed to/i).first()).toBeVisible({ timeout: 15000 })
  })

  test("navigation to login from account page when unauthenticated redirects", async ({ page }) => {
    await page.goto("/account")
    await expect(page).toHaveURL(/\/auth\/login/)
    await expect(page.getByRole("heading", { name: /welcome back/i })).toBeVisible()
  })
})
