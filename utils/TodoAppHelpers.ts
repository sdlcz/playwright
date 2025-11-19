import { Page } from '@playwright/test';

/**
 * TodoAppHelpers - Utility class for todo app storage and data operations
 * Follows OOP principles with static helper methods
 */
export class TodoAppHelpers {
  private static readonly STORAGE_KEY = 'react-todos';

  /**
   * Create default todos in the application
   * @param page - Playwright page object
   * @param todoItems - Array of todo item texts
   */
  static async createTodos(page: Page, todoItems: string[]): Promise<void> {
    const newTodo = page.getByPlaceholder('What needs to be done?');

    for (const item of todoItems) {
      await newTodo.fill(item);
      await newTodo.press('Enter');
    }
  }

  /**
   * Verify the number of todos in localStorage
   * @param page - Playwright page object
   * @param expectedCount - Expected number of todos
   */
  static async checkNumberOfTodos(
    page: Page,
    expectedCount: number
  ): Promise<void> {
    await page.waitForFunction((expected: number) => {
      const todos = JSON.parse(localStorage[this.STORAGE_KEY] || '[]');
      return todos.length === expected;
    }, expectedCount);
  }

  /**
   * Verify the number of completed todos in localStorage
   * @param page - Playwright page object
   * @param expectedCount - Expected number of completed todos
   */
  static async checkNumberOfCompletedTodos(
    page: Page,
    expectedCount: number
  ): Promise<void> {
    await page.waitForFunction((expected: number) => {
      const todos = JSON.parse(localStorage[this.STORAGE_KEY] || '[]');
      return todos
        .filter((todo: any) => todo.completed)
        .length === expected;
    }, expectedCount);
  }

  /**
   * Verify if a specific todo title exists in localStorage
   * @param page - Playwright page object
   * @param title - Todo title to search for
   */
  static async checkTodoExists(
    page: Page,
    title: string
  ): Promise<void> {
    await page.waitForFunction((searchTitle: string) => {
      const todos = JSON.parse(localStorage[this.STORAGE_KEY] || '[]');
      return todos
        .map((todo: any) => todo.title)
        .includes(searchTitle);
    }, title);
  }

  /**
   * Clear all todos from localStorage
   * @param page - Playwright page object
   */
  static async clearAllTodos(page: Page): Promise<void> {
    await page.evaluate(() => {
      localStorage.removeItem(this.STORAGE_KEY);
    });
  }
}
