# Suite Maintenance Summary — Chapter 5

**Scope:** All specs in `tests/e2e/`  
**Reference standard:** `tests/e2e/main.navigation.professional.spec.ts` (Chapter 4)

---

## AI Scan Findings

### Specs Reviewed

| File                                   | AI Finding                                                                                                                                                       | Decision              |
| -------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- |
| `playwright.spec.ts`                   | No `beforeEach`, `docsPage` instantiated inline in each test (duplication). No TC IDs, no `test.step`, vague test titles ("has title"). Functional but outdated. | **Refactored**        |
| `main.navigation.spec.ts`              | Intentional Ch.2 degradation: `#docs` ID selector (element absent), `waitForTimeout(2000)`, incomplete coverage (Docs unchecked via POM). Broken by design.      | **Retired (skipped)** |
| `main.navigation.refactored.spec.ts`   | Intermediate Ch.3 output. Raw `page.getByText()` in spec (POM leak), unused `expect` import, no TC IDs. Fully superseded by professional spec.                   | **Retired (skipped)** |
| `main.navigation.professional.spec.ts` | Canonical. TC IDs, `beforeEach`, POM-pure, named steps, edge case, accessibility assertions.                                                                     | **Kept as-is**        |

---

## AI-Identified Issues (Consolidated)

| #   | File                                 | Issue                                                  | Category         | Severity |
| --- | ------------------------------------ | ------------------------------------------------------ | ---------------- | -------- |
| 1   | `playwright.spec.ts`                 | `docsPage` instantiated in each test — duplication     | Maintainability  | Medium   |
| 2   | `playwright.spec.ts`                 | No `test.step` — failure output has no granularity     | Clarity          | Medium   |
| 3   | `playwright.spec.ts`                 | No TC IDs — no traceability to requirements            | Traceability     | High     |
| 4   | `playwright.spec.ts`                 | Vague titles: "has title", not behavior-driven         | Clarity          | Low      |
| 5   | `main.navigation.spec.ts`            | `#docs` selector — element doesn't exist, always fails | Selector Quality | Critical |
| 6   | `main.navigation.spec.ts`            | `waitForTimeout(2000)` — fixed wait, flakiness risk    | Synchronization  | Critical |
| 7   | `main.navigation.refactored.spec.ts` | Raw `page.getByText()` in spec — breaks POM contract   | Maintainability  | Medium   |
| 8   | `main.navigation.refactored.spec.ts` | Fully superseded by professional spec — redundant      | Duplication      | High     |

---

## Changes Applied

### `playwright.spec.ts` — Refactored

**Before:**

```ts
test.describe("Playwright documentation", () => {
  test("has title", async ({ page }) => {
    const docsPage = new PlaywrightDocsPage(page);
    await docsPage.goto();
    await docsPage.expectTitleContains("Playwright");
  });

  test("get started link navigates to installation page", async ({ page }) => {
    const docsPage = new PlaywrightDocsPage(page);
    await docsPage.goto();
    await docsPage.clickGetStarted();
    await docsPage.expectInstallationHeadingVisible();
  });
});
```

**After:**

```ts
test.describe("Playwright documentation — core smoke", () => {
  let docsPage!: PlaywrightDocsPage;

  test.beforeEach(async ({ page }) => {
    docsPage = new PlaywrightDocsPage(page);
    await docsPage.goto();
  });

  test("TC-DOCS-001: Page title should contain 'Playwright'", async () => {
    await test.step("Title contains 'Playwright'", async () => {
      await docsPage.expectTitleContains("Playwright");
    });
  });

  test("TC-DOCS-002: 'Get started' link should navigate to the Installation page", async () => {
    await test.step("Click Get started link", async () => {
      await docsPage.clickGetStarted();
    });
    await test.step("Installation heading is visible", async () => {
      await docsPage.expectInstallationHeadingVisible();
    });
  });
});
```

Improvements: `beforeEach` eliminates duplication, TC IDs added, behavior-driven titles, named steps.

### `main.navigation.spec.ts` — Retired

Marked `test.describe.skip(...)` with `@deprecated` header. Kept on disk for historical reference / course audit trail. Not executed in CI.

### `main.navigation.refactored.spec.ts` — Retired

Marked `test.describe.skip(...)` with `@deprecated` header. Superseded by professional spec. Kept for chapter progression traceability.

---

## Decisions Not Applied (Manual Review Deferred)

| Potential change                                                       | Reason deferred                                                             |
| ---------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| Delete retired files entirely                                          | Preserves course chapter audit trail; instructors may reference them        |
| Merge `playwright.spec.ts` into `main.navigation.professional.spec.ts` | Different concerns (smoke vs. navigation deep-check); separation is correct |

---

## Final Suite Results

| Metric             | Before              | After            |
| ------------------ | ------------------- | ---------------- |
| Total tests        | 10                  | 10               |
| Passing            | 6                   | 6                |
| Skipped            | 0                   | 4 (retired)      |
| Failing            | 4 (broken degraded) | 0                |
| TC IDs             | 4/10                | 6/6 active       |
| `beforeEach` usage | 1/4 specs           | 3/4 active specs |
| `test.step` usage  | 1/4 specs           | 3/4 active specs |

**Run result:** 6 passed, 4 skipped — no failures in Chromium.
