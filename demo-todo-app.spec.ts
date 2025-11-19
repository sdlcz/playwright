import { test, expect } from '@playwright/test';
import { TodoAppPage } from './pages/TodoAppPage';
import { TodoAppHelpers } from './utils/TodoAppHelpers';

/**
 * Smoke Tests - Rapid validation of critical user workflows
 * Naming Conventions Applied:
 * - camelCase for function names, variables, and arguments
 * - PascalCase for class names
 * - UPPERCASE for constants
 * - No underscores in names
 */

const TODO_ITEMS = [
  'buy some cheese',
  'feed the cat',
  'book a doctors appointment'
] as const;

test.describe('Smoke Tests - Core Functionality', () => {
  let todoApp: TodoAppPage;

  test.beforeEach(async ({ page }) => {
    // Initialize page object model
    todoApp = new TodoAppPage(page);
    await todoApp.goto();
  });

  test('should load the todo app successfully', async () => {
    await todoApp.verifyPageTitle(/TodoMVC/);
    await todoApp.verifyNewTodoInputVisible();
  });

  test('should allow me to add a single todo item', async () => {
    await todoApp.addTodo(TODO_ITEMS[0]);
    const titles = await todoApp.getTodoTitles();
    expect(titles).toContain(TODO_ITEMS[0]);
  });

  test(
    'should allow me to mark a todo as completed',
    async () => {
      await todoApp.addTodo(TODO_ITEMS[0]);
      await todoApp.completeTodoByIndex(0);
      await todoApp.verifyTodoIsCompleted(0);
    }
  );

  test('should allow me to delete a todo item', async () => {
    await todoApp.addTodos([TODO_ITEMS[0], TODO_ITEMS[1]]);
    await todoApp.completeTodoByIndex(0);
    await todoApp.clearCompleted();
    const count = await todoApp.getTodoCount();
    expect(count).toBe(1);
  });
});


