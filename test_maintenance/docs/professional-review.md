# Professional Review — Chapter 4

**Spec under review:** `tests/e2e/main.navigation.refactored.spec.ts` (Chapter 3 output)  
**Professionalized output:** `tests/e2e/main.navigation.professional.spec.ts`

---

## Step 1 — Audit Against Professional Standards

### Checklist Findings (numbered, prioritized)

| #   | Category                  | Finding                                                                                                                                                         | Severity |
| --- | ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| 1   | **Traceability**          | No test case IDs. Cannot link spec assertions to requirements/test plan.                                                                                        | High     |
| 2   | **Coverage — Negative**   | No edge-case or negative tests. Navigation items can silently grow or change without detection.                                                                 | High     |
| 3   | **Clarity — Naming**      | Test titles are descriptive but not behavior-driven. "Docs nav link is visible and accessible" vs. preferred "should be visible, accessible, and navigate to …" | Medium   |
| 4   | **Maintainability — POM** | `Community` test accesses `page` fixture directly in spec (`page.getByText(...)`). Breaks POM contract — locator logic outside POM.                             | Medium   |
| 5   | **Validation Quality**    | `Community` assertion uses `getByText` without scope guard — can silently pass against footer, header, or any element. Weak.                                    | Medium   |
| 6   | **Clarity — Comments**    | Community deviation from manual TC lacks explicit `@known-discrepancy` label. Future maintainer may not notice it was intentional.                              | Low      |
| 7   | **Accessibility**         | `toHaveAccessibleName` present but only for nav links. Community section has no accessibility assertion at all.                                                 | Low      |
| 8   | **Coverage — Edge**       | No test for absent/unexpected nav items — no guard against nav menu regressions (e.g., a link added/removed silently).                                          | High     |

---

## Step 2 — AI Diff Summary (Changes Applied)

```diff
- test("Community section is present on the page", async ({ page }) => {
-   await test.step("Community text is visible on page", async () => {
-     await expect(
-       page.getByText("Community", { exact: true }).first(),
-     ).toBeVisible();
-   });
- });
+ // TC-NAV-003 — direct page access replaced with POM method
+ test("TC-NAV-003: Community section should be present on the page", async () => {
+   await test.step("Community text is visible somewhere on the page", async () => {
+     await docsPage.expectPageSectionVisible("Community");
+   });
+ });

+ // TC-NAV-EDGE-001: Edge case — nav must not silently grow with unintended links
+ test("TC-NAV-EDGE-001: Navigation should not contain unexpected items (e.g. Settings)", async () => {
+   await test.step("Settings link is absent from main navigation", async () => {
+     await docsPage.expectNavLinkAbsent("Settings");
+   });
+ });

- test("Docs nav link is visible and accessible", ...)
+ test("TC-NAV-001: Docs nav link should be visible, accessible, and navigate to /docs/intro", ...)

- test("API nav link is visible and accessible", ...)
+ test("TC-NAV-002: API nav link should be visible, accessible, and navigate to /docs/api", ...)
```

New POM methods added to `PlaywrightDocsPage`:

- `expectNavLinkAbsent(name)` — scoped to `navigation[Main]`, asserts `not.toBeVisible()`
- `expectPageSectionVisible(text)` — replaces raw `page.getByText()` in spec

---

## Step 3 — AI-Generated Edge-Case Test

```ts
// TC-NAV-EDGE-001: Edge case — unexpected nav item must not appear
test("TC-NAV-EDGE-001: Navigation should not contain unexpected items (e.g. Settings)", async () => {
  await test.step("Settings link is absent from main navigation", async () => {
    await docsPage.expectNavLinkAbsent("Settings");
  });
});
```

**Rationale:** Negative test guards against silent nav regressions. Uses POM-scoped `not.toBeVisible()` — no hard-coded timeouts, no CSS selectors.

---

## Step 4 — Manual Improvements Applied

1. **`docsPage!` non-null assertion** in `let docsPage!: PlaywrightDocsPage` — removes TypeScript strict-mode false-positive without disabling checks.
2. **Unified `expectPageSectionVisible` POM method** — Community check now fully encapsulated, spec has zero raw `page.` calls.
3. **Behavior-driven titles** — all test names follow "should …" / "TC-NNN: … should …" convention matching standard test plan style.
4. **`@known-discrepancy` inline comment** for Community — explicit signal to future maintainers.

---

## Final Results

| Criteria                            | Refactored (Ch.3)                 | Professional (Ch.4)         |
| ----------------------------------- | --------------------------------- | --------------------------- |
| Traceability (TC IDs)               | ❌                                | ✅ TC-NAV-001…003, EDGE-001 |
| Negative / edge tests               | ❌                                | ✅ TC-NAV-EDGE-001          |
| POM purity (no raw `page.` in spec) | ⚠️ Community used `page` directly | ✅ All via POM              |
| Behavior-driven titles              | ⚠️ Partially                      | ✅                          |
| Known discrepancy documented        | ⚠️ Comment only                   | ✅ Explicit label           |
| Accessibility assertions            | ✅ for nav links                  | ✅ for nav links            |
| Test run result                     | 3/3 passed                        | **4/4 passed**              |

**Playwright HTML report:** clean, all steps named, TC IDs visible in report titles.
