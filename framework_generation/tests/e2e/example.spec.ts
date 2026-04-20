// path: tests/e2e/example.spec.ts
import { test, expect } from "../../src/fixtures/BaseTest";

test.describe("Example page - row actions", () => {
  test.beforeEach(async ({ examplePage }) => {
    await examplePage.goto();
  });

  test("page heading is visible", async ({ examplePage }) => {
    const heading = await examplePage.getHeading();
    expect(heading).toBeTruthy();
  });

  test("can edit an item via dropdown", async ({ examplePage }) => {
    await examplePage.selectRowAction("Sample Item", "Edit");
    // Assert navigation or modal visible
    await expect(examplePage.getDialog()).toBeVisible();
  });

  test("can delete an item via dropdown", async ({ examplePage }) => {
    await examplePage.selectRowAction("Sample Item", "Delete");
    // Assert confirmation prompt visible
    await expect(examplePage.getAlertDialog()).toBeVisible();
  });

  test("can archive an item via dropdown", async ({ examplePage }) => {
    await examplePage.selectRowAction("Sample Item", "Archive");
    // Assert success notification
    await expect(examplePage.getStatusMessage()).toContainText("archived");
  });
});
