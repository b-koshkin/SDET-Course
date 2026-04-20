Prompt 1:

You are a Senior QA Automation Engineer expert in TypeScript, JavaScript, and Playwright end-to-end testing. You write concise, typed, and modular code.

Your task: Generate a clean, maintainable test automation framework skeleton.

Project setup:

    Stack: TypeScript + Playwright
    Test runner: Playwright Test
    Folder structure: src/ pages/ components/ utils/ fixtures/ tests/e2e/
    Config: playwright.config.ts
    Utilities: logger.ts, envHelper.ts

Rules and conventions:

    Use Page Object Model (POM) and Component Object Model patterns.
    Base classes: BasePage, BaseTest (with setup/teardown hooks).
    Naming: PascalCase for classes, camelCase for methods.
    Selectors: getByRole, getByLabel, getByTestId only.
    Comments: Add brief JSDoc for each class and public method.
    Avoid raw locators; wrap them in reusable methods.
    Output each file with a header in the format: // path: <file_path>

You are a Senior QA Automation Engineer.

Goal: Simplify redundant methods in src/pages/.ts by merging similar actions into one parameterized function.

Context:

    Stack: TypeScript + Playwright
    Pattern: Page Object Model
    Methods to refactor: clickDropdownDelete() clickDropdownEdit() clickDropdownArchive()

Task:

    Replace all similar methods with a single generic method: clickDropdownByName(option: string)
    Update all internal calls to use the new parameterized method.
    Update test files that reference the old methods.
    Keep logic, selectors, and test results unchanged.
    Output modified files only with headers in the format: // path: <relative_path>

Prompt 2:

You are a Senior QA Automation Engineer.

Goal: Extract repeated sequences of actions from multiple test files into reusable helper functions or Page Object methods.

Inputs:

    Folder: tests/e2e/
    Example: login → navigate → perform action → verify result

Rules:

    Identify repeated flows across test files.
    Move these sequences into appropriate Page Object or helper methods.
    Replace inline steps in tests with calls to new helper functions.
    Keep test logic, assertions, and comments unchanged.
    Output updated files only with headers in the format: // path: <relative_path>

Prompt 3:

You are a Senior QA Automation Engineer.

Goal: Review the following AI-generated code for correctness and consistency before integration.

Inputs: {{generatedCodeExcerpt}}

Check:

    Does it preserve original logic and test flow?
    Are selectors stable and correctly scoped?
    Are all imports valid and paths real?
    Any naming inconsistencies or typos?
    Suggest fixes if necessary.

Output: A structured "Self-Review Report" listing issues, risks, and recommendations.

Ai response:

RISKS (review before prod)
R-1. waitForLoadState('networkidle') — flaky on SPAs
Playwright docs mark networkidle as unreliable for apps with background polling. Recommend replacing with a wait for a stable page landmark (e.g. await this.page.getByRole('main').waitFor()). Left as-is per original spec; flag for team.

R-2. getByRole('row', { name: itemName }) — depends on row accessible name
Rows need an explicit aria-label or labelled-by association. If the app renders plain <tr> without accessible name, this locator silently matches nothing. Validate against real DOM before running.

R-3. openRowDropdown hardcodes 'Actions' button name
row.getByRole('button', { name: 'Actions' }) breaks if the button label differs (icon-only button, tooltip label, i18n). Should be a configurable parameter or getByTestId.

R-4. tsconfig.json path aliases defined but unused
@pages/_, @utils/_ etc. are declared but all imports use relative paths. Either adopt aliases in all imports or remove them to avoid confusion. No functional bug, but maintenance noise.

R-5. getEnvBool case-sensitive
raw === 'true' rejects 'True' / 'TRUE'. Add .toLowerCase() if env vars come from shell or CI with varied casing.

RECOMMENDATIONS
REC-1. expect(heading).toBeTruthy() in "page heading is visible" test works, but doesn't auto-retry. Prefer await expect(examplePage.page.getByRole('heading', { level: 1 })).toBeVisible() for retry-ability.

REC-2. playwright.config.ts calls getEnv() at module-load time. If config is imported in non-test contexts (linting, IDE plugins), missing BASE_URL throws immediately. Current fallback handles it — OK for now.

REC-3. DropdownComponent is defined but not used by ExamplePage. Consider wiring it in or documenting it as a standalone reusable building block.

| Category        | Count | Fixed                              |
| --------------- | ----- | ---------------------------------- |
| Issues          | 3     | all 3                              |
| Risks           | 5     | — (require app-context validation) |
| Recommendations | 3     | — (optional improvements)          |

Prompt 4

You are a Senior QA Automation Engineer.

Goal: Verify that the following refactor didn’t break or reduce test coverage.

Inputs:

    Refactored Page/Object: {{pageExcerpt}}
    Related tests: {{testExcerpt}}

Tasks:

    Check that all old methods still have corresponding tests.
    Identify missing test coverage or renamed methods not updated.
    Suggest where to update or add missing tests. Output a "Test Coverage Report" with list of affected files and recommended updates.

Ai response:

Read [](file:///c%3A/Users/b.koshkin/Desktop/ai-course/sdet_module/framework_generation/src/pages/ExamplePage.ts)

Read [](file:///c%3A/Users/b.koshkin/Desktop/ai-course/sdet_module/framework_generation/tests/e2e/example.spec.ts)

---

## Test Coverage Report

**Scope:** `ExamplePage` post-refactor vs example.spec.ts

---

### Method Coverage Matrix

| Method                  | Tested?    | Test name                          | Notes                                          |
| ----------------------- | ---------- | ---------------------------------- | ---------------------------------------------- |
| `goto()`                | ✓ Indirect | `beforeEach`                       | Called every test via fixture                  |
| `getHeading()`          | ✓ Direct   | `page heading is visible`          | Assertion weak — see GAP-1                     |
| `openRowDropdown()`     | ✓ Indirect | all dropdown tests                 | Called via `selectRowAction`; no isolated test |
| `clickDropdownByName()` | ✓ Indirect | all dropdown tests                 | Called via `selectRowAction`; no isolated test |
| `selectRowAction()`     | ✓ Direct   | edit / delete / archive            | All 3 options covered                          |
| `getDialog()`           | ✓ Direct   | `can edit an item via dropdown`    |                                                |
| `getAlertDialog()`      | ✓ Direct   | `can delete an item via dropdown`  |                                                |
| `getStatusMessage()`    | ✓ Direct   | `can archive an item via dropdown` |                                                |

**Old methods removed:**

| Old method               | Replacement                        | Test updated? |
| ------------------------ | ---------------------------------- | ------------- |
| `clickDropdownDelete()`  | `selectRowAction(item, 'Delete')`  | ✓             |
| `clickDropdownEdit()`    | `selectRowAction(item, 'Edit')`    | ✓             |
| `clickDropdownArchive()` | `selectRowAction(item, 'Archive')` | ✓             |

No renamed method left uncalled. No old method reference survives.

---

### Coverage Gaps

**GAP-1 — `getHeading()` assertion doesn't auto-retry**
`expect(heading).toBeTruthy()` evaluates a string snapshot. Fails to catch async render. Recommended fix:

```ts
test("page heading is visible", async ({ examplePage }) => {
  await expect(
    examplePage["page"].getByRole("heading", { level: 1 }),
  ).toBeVisible();
});
```

**GAP-2 — `openRowDropdown()` has no isolated test**
Only tested as part of `selectRowAction`. A broken `openRowDropdown` (e.g. wrong row locator) would surface as a `selectRowAction` failure with no clear root cause. Recommend:

```ts
test("row dropdown opens on Actions click", async ({ examplePage }) => {
  await examplePage.openRowDropdown("Sample Item");
  await expect(examplePage["page"].getByRole("menu")).toBeVisible();
});
```

**GAP-3 — `clickDropdownByName()` not tested with invalid/missing option**
No negative test. If option name is wrong, test silently times out. Recommend:

```ts
test("throws/times out when dropdown option does not exist", async ({
  examplePage,
}) => {
  await examplePage.openRowDropdown("Sample Item");
  await expect(
    examplePage["page"]
      .getByRole("menu")
      .getByRole("menuitem", { name: "Nonexistent" }),
  ).not.toBeVisible();
});
```

**GAP-4 — `getUrl()` and `getTitle()` (from `BasePage`) untested**
Both inherited methods have no test coverage. Low risk for now; add if navigation flows are added.

**GAP-5 — `goto()` not tested for correct URL**
No assertion that `goto()` lands on `/examples`. Recommend adding to the heading test:

```ts
test("page heading is visible", async ({ examplePage }) => {
  expect(examplePage.getUrl()).toContain("/examples");
  await expect(
    examplePage["page"].getByRole("heading", { level: 1 }),
  ).toBeVisible();
});
```

---

### Affected Files

| File                      | Action                                                               |
| ------------------------- | -------------------------------------------------------------------- |
| tests/e2e/example.spec.ts | Fix GAP-1 assertion; add tests for GAP-2, GAP-3, GAP-5               |
| src/pages/ExamplePage.ts  | No changes needed — coverage gaps are in test file only              |
| src/pages/BasePage.ts     | `getUrl()` / `getTitle()` — add coverage when navigation tests added |

---

### Verdict

Refactor **did not break or reduce coverage** — all 3 replaced methods map to active tests. 5 gaps identified, none regressions from the refactor. GAP-1 is highest priority (flaky assertion); GAP-2 aids debugging speed.
