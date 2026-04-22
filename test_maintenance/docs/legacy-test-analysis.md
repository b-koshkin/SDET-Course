# Legacy Test Analysis — Chapter 2

**File under review:** `tests/e2e/main.navigation.spec.ts`  
**Manual test case:** Main Page Navigation Buttons: Docs, API, Community — visibility, accessibility, and correct navigation  
**Status:** No code changes applied in Chapter 2.

---

## AI-Detected Issues (Prioritized Checklist)

### P1 — Critical

| #   | Issue                                                                   | Category             | Impact                                                                                                                     |
| --- | ----------------------------------------------------------------------- | -------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| 1   | `page.locator("#docs")` used for Docs button                            | **Selector Quality** | ID `#docs` does not exist on playwright.dev. Test fails immediately. CSS/ID selectors break on any markup refactor.        |
| 2   | `await page.waitForTimeout(2000)` used instead of state-based assertion | **Synchronization**  | Fixed waits → flakiness on slow networks, wasted time on fast ones. Playwright auto-wait makes this redundant and harmful. |

### P2 — High

| #   | Issue                                                                                                   | Category                | Impact                                                                                                                                             |
| --- | ------------------------------------------------------------------------------------------------------- | ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| 3   | "Docs" button checked via brittle locator; "API" and "Community" via POM method — inconsistent approach | **Readability / Reuse** | Two patterns for same action in one test. Maintenance cost doubles; new devs confused which pattern is canonical.                                  |
| 4   | `expectNavLinksVisible` uses `.or(getByText(...))` fallback for "Community"                             | **Selector Quality**    | `getByText` matches any element with that text (including footer). Not scoped to navigation. Passes for wrong reasons.                             |
| 5   | No navigation target assertions (URL or heading) after clicking each nav link                           | **Coverage**            | Manual test requires verifying correct navigation. Test only checks visibility — clicking Docs could navigate to wrong page and test still passes. |

### P3 — Medium

| #   | Issue                                                                                       | Category                        | Impact                                                                                                                           |
| --- | ------------------------------------------------------------------------------------------- | ------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| 6   | No accessibility assertions (e.g., `toHaveAccessibleName`, role checks on individual items) | **Accessibility**               | Manual test case specifies accessibility. Test verifies visual presence only, not ARIA semantics.                                |
| 7   | All three nav items tested in single test with no isolation                                 | **Coverage / Duplication Risk** | One failure masks others. If Docs check fails, API and Community never run. Should be separate assertions or `test.step` blocks. |
| 8   | `expect` imported but POM assertions handle `expect` internally — mixed responsibility      | **Readability / Reuse**         | `expect` import unused at spec level after degradation. Signals ad-hoc raw assertions were added outside POM contract.           |

### P4 — Low

| #   | Issue                                                            | Category                | Impact                                                                                           |
| --- | ---------------------------------------------------------------- | ----------------------- | ------------------------------------------------------------------------------------------------ |
| 9   | Test title uses "buttons" but Docs and API are `<link>` elements | **Readability**         | Misleading test name → wrong element type expectation for future maintainers.                    |
| 10  | No `test.beforeEach` for navigation — `goto()` called inline     | **Readability / Reuse** | If more tests added to describe block, each must call `goto()` manually. Duplication risk grows. |

---

## Additional Findings (Beyond AI Detection)

| #   | Finding                                                                                                                                                                                                                     | Category                     | Impact                                                                                    |
| --- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- | ----------------------------------------------------------------------------------------- |
| A   | "Community" is **not a nav link** on playwright.dev — it is footer section text. Manual test case expectation is wrong or refers to a different site version. `getByText` silently passes against footer, masking real gap. | **Coverage / Test Validity** | False positive. Test "passes" but asserts nothing meaningful about nav.                   |
| B   | No check that Docs → `/docs/intro`, API → `/docs/api/class-playwright`, Community → correct URL                                                                                                                             | **Coverage**                 | Navigation correctness is explicitly in manual test case. Completely absent from spec.    |
| C   | POM method `expectNavLinksVisible` accepts arbitrary string array with no type safety                                                                                                                                       | **Maintainability**          | Typo in label string silently tests wrong element. Should use enum or literal union type. |
| D   | No `test.describe` nesting or `test.step` for each nav item — failure output gives no granularity                                                                                                                           | **Readability**              | On CI failure, report shows one failed test with no indication of which nav item failed.  |

---

## Fix Categories for Chapter 3

1. **Selector Quality** — replace `#docs` and `getByText` fallback with scoped `getByRole('navigation').getByRole('link', { name })` per item
2. **Synchronization** — remove `waitForTimeout`; rely on Playwright auto-wait and assertion retry
3. **Coverage** — add `click()` + URL/heading assertion for each nav link
4. **Accessibility** — add `toHaveAccessibleName` or role-scoped assertions
5. **Structure** — split into `test.step` or separate tests per nav item; add `beforeEach` for `goto()`
6. **POM Contract** — move all `expect` into POM; remove raw locator usage from spec

---

_No code changes applied in Chapter 2._
