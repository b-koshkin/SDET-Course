# Refactoring Summary — Chapter 3

**Spec under review:** `tests/e2e/main.navigation.spec.ts`  
**Refactored output:** `tests/e2e/main.navigation.refactored.spec.ts`

---

## Version Comparison

### 1. Degraded Version (Chapter 2)

```ts
const docsLink = page.locator("#docs"); // brittle ID selector
await expect(docsLink).toBeVisible();
await page.waitForTimeout(2000); // fixed wait
await docsPage.expectNavLinksVisible(["API", "Community"]);
```

**Problems:**

- `#docs` does not exist on playwright.dev → immediate failure
- `waitForTimeout(2000)` → flaky on slow networks, wastes time on fast
- No navigation target checks (URLs never verified)
- No accessibility assertions
- Inconsistent locator strategy (raw `locator()` mixed with POM)
- All items tested in one test — failure masks others
- `getByText` fallback matches footer "Community", not a nav element

---

### 2. AI-Refactored Version (Chapter 3 — this file)

**Fixes applied:**

| Issue                             | Fix                                                                                      |
| --------------------------------- | ---------------------------------------------------------------------------------------- |
| `#docs` ID selector               | Replaced with `getByRole('navigation').getByRole('link', { name: 'Docs', exact: true })` |
| `waitForTimeout(2000)`            | Removed; Playwright auto-wait handles synchronization                                    |
| No URL assertions                 | Added `clickNavLinkAndExpectUrl()` with regex URL pattern check                          |
| No accessibility assertions       | Added `toHaveAccessibleName()` per nav item                                              |
| Mixed locator patterns            | All interactions moved into POM methods                                                  |
| All items in one test             | Split into 3 isolated tests (Docs, API, Community)                                       |
| Footer "Community" false-positive | Documented and separated with explanatory comment                                        |
| No `beforeEach`                   | Added `beforeEach` for `goto()` — eliminates duplication                                 |
| No `test.step`                    | Each assertion wrapped in named steps for clear HTML report output                       |

**Structure improvement:** AI did not just patch bugs — it restructured into isolated tests per nav item with named steps, improving both granularity of failure reporting and readability.

---

### 3. Manual Improvement (Human layer)

Added to `PlaywrightDocsPage`:

```ts
async expectNavLinkAccessibleName(name: string) {
  const nav = this.page.getByRole("navigation", { name: "Main" });
  const link = nav.getByRole("link", { name, exact: true });
  await expect(link).toHaveAccessibleName(name);
}
```

**Why this matters:** AI-generated assertions confirmed visual presence and URL navigation, but did not verify ARIA accessible name at the element level. This addition ensures screen readers will announce the correct label — closing the accessibility coverage gap identified in the Chapter 2 analysis.

---

## Results

| Version       | Selector Quality         | Sync          | URL Check   | A11y                            | Test Isolation | Steps          |
| ------------- | ------------------------ | ------------- | ----------- | ------------------------------- | -------------- | -------------- |
| Degraded      | ❌ ID + getByText        | ❌ Fixed wait | ❌ None     | ❌ None                         | ❌ All-in-one  | ❌ None        |
| AI-Refactored | ✅ Role+name, nav-scoped | ✅ Auto-wait  | ✅ Per link | ⚠️ Via method, no element-level | ✅ 3 tests     | ✅ Named steps |
| + Manual      | ✅ Role+name, nav-scoped | ✅ Auto-wait  | ✅ Per link | ✅ `toHaveAccessibleName`       | ✅ 3 tests     | ✅ Named steps |

**Test run result:** 3/3 passed in Chromium.
