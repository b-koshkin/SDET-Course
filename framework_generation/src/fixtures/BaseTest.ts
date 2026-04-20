// path: src/fixtures/BaseTest.ts
import { test as base } from "@playwright/test";
import { ExamplePage } from "../pages/ExamplePage";
import { Logger } from "../utils/logger";

/** Shape of fixtures exposed to every test. */
export type TestFixtures = {
  examplePage: ExamplePage;
};

const logger = new Logger("BaseTest");

/**
 * Extended test instance with shared setup/teardown hooks
 * and pre-built Page Object fixtures.
 */
export const test = base.extend<TestFixtures>({
  /**
   * Provide a ready ExamplePage instance to each test.
   */
  examplePage: async ({ page }, use) => {
    logger.info("Setting up ExamplePage fixture");
    const examplePage = new ExamplePage(page);
    await use(examplePage);
    logger.info("Tearing down ExamplePage fixture");
  },
});

export { expect } from "@playwright/test";
