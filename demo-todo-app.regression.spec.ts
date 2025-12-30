import { test, expect } from '@playwright/test';
import { TodoAppPage } from './pages/TodoAppPage';
import { TodoAppHelpers } from './utils/TodoAppHelpers';

/**
 * Regression Tests - Comprehensive functionality and edge case validation
 * Naming Conventions Applied:
 * - camelCase for function names, variables, and arguments
 * - PascalCase for class names
 * - UPPERCASE for constants
 * - No underscores in names
 * - Line length < 80 characters
 * 
 * REQUIRES REVIEW DUE TEST FLAKINESS & FAILURES
 */

const TODO_ITEMS = [
  'buy some cheese',
  'feed the cat',
  'book a doctors appointment'
] as const;

/**
 * REGRESSION TESTS - Detailed functionality and edge cases
 * These tests verify detailed behavior and edge cases
 * Uses OOP principles with Page Object Model pattern
 */

test.describe('New Todo - Regression Tests', () => {
  let todoApp: TodoAppPage;

  test.beforeEach(async ({ page }) => {
    todoApp = new TodoAppPage(page);
    await todoApp.goto();
  });

  test(
    'should clear text input field when an item is added',
    async () => {
      await todoApp.addTodo(TODO_ITEMS[0]);
      await todoApp.verifyNewTodoInputVisible();
      await TodoAppHelpers.checkNumberOfTodos(todoApp.page, 1);
    }
  );

  test('should append new items to the bottom of the list', async () => {
    await todoApp.addTodos(TODO_ITEMS as unknown as string[]);

    const count = await todoApp.getTodoCount();
    expect(count).toBe(3);

    const titles = await todoApp.getTodoTitles();
    expect(titles).toEqual([...TODO_ITEMS]);
    await TodoAppHelpers.checkNumberOfTodos(todoApp.page, 3);
  });
});

test.describe('Mark all as completed - Regression Tests', () => {
  let todoApp: TodoAppPage;

  test.beforeEach(async ({ page }) => {
    todoApp = new TodoAppPage(page);
    await todoApp.goto();
    await todoApp.addTodos(TODO_ITEMS as unknown as string[]);
    await TodoAppHelpers.checkNumberOfTodos(todoApp.page, 3);
  });

  test.afterEach(async () => {
    await TodoAppHelpers.checkNumberOfTodos(todoApp.page, 3);
  });

  test('should allow me to mark all items as completed', async () => {
    await todoApp.markAllAsCompleted();

    const count = await todoApp.getTodoCount();
    for (let i = 0; i < count; i++) {
      await todoApp.verifyTodoIsCompleted(i);
    }
    await TodoAppHelpers.checkNumberOfCompletedTodos(todoApp.page, 3);
  });

  test('should allow me to clear the complete state of all items', async () => {
    await todoApp.markAllAsCompleted();
    await todoApp.unmarkAll();

    const count = await todoApp.getTodoCount();
    for (let i = 0; i < count; i++) {
      await todoApp.verifyTodoIsNotCompleted(i);
    }
  });

  test('complete all checkbox should update state when items are completed / cleared', async () => {
    await todoApp.markAllAsCompleted();
    await todoApp.verifyMarkAllIsChecked();
    await TodoAppHelpers.checkNumberOfCompletedTodos(todoApp.page, 3);

    await todoApp.uncompleteTodoByIndex(0);
    await todoApp.verifyMarkAllIsNotChecked();

    await todoApp.completeTodoByIndex(0);
    await TodoAppHelpers.checkNumberOfCompletedTodos(todoApp.page, 3);
    await todoApp.verifyMarkAllIsChecked();
  });
});

test.describe('Item - Regression Tests', () => {
  let todoApp: TodoAppPage;

  test.beforeEach(async ({ page }) => {
    todoApp = new TodoAppPage(page);
    await todoApp.goto();
  });

  test('should allow me to mark items as complete', async () => {
    await todoApp.addTodos([TODO_ITEMS[0], TODO_ITEMS[1]]);

    await todoApp.completeTodoByIndex(0);
    await todoApp.verifyTodoIsCompleted(0);

    await todoApp.verifyTodoIsNotCompleted(1);
    await todoApp.completeTodoByIndex(1);

    await todoApp.verifyTodoIsCompleted(0);
    await todoApp.verifyTodoIsCompleted(1);
  });

  test('should allow me to un-mark items as complete', async () => {
    await todoApp.addTodos([TODO_ITEMS[0], TODO_ITEMS[1]]);

    await todoApp.completeTodoByIndex(0);
    await todoApp.verifyTodoIsCompleted(0);
    await todoApp.verifyTodoIsNotCompleted(1);
    await TodoAppHelpers.checkNumberOfCompletedTodos(todoApp.page, 1);

    await todoApp.uncompleteTodoByIndex(0);
    await todoApp.verifyTodoIsNotCompleted(0);
    await todoApp.verifyTodoIsNotCompleted(1);
    await TodoAppHelpers.checkNumberOfCompletedTodos(todoApp.page, 0);
  });

  test('should allow me to edit an item', async () => {
    await todoApp.addTodos(TODO_ITEMS as unknown as string[]);

    await todoApp.editTodoByIndex(1, 'buy some sausages');

    const titles = await todoApp.getTodoTitles();
    expect(titles).toEqual([TODO_ITEMS[0], 'buy some sausages', TODO_ITEMS[2]]);
    await TodoAppHelpers.checkTodoExists(todoApp.page, 'buy some sausages');
  });
});

test.describe('Editing - Regression Tests', () => {
  let todoApp: TodoAppPage;

  test.beforeEach(async ({ page }) => {
    todoApp = new TodoAppPage(page);
    await todoApp.goto();
    await todoApp.addTodos(TODO_ITEMS as unknown as string[]);
    await TodoAppHelpers.checkNumberOfTodos(todoApp.page, 3);
  });

  test('should hide other controls when editing', async () => {
    const todoItem = todoApp.getTodoItemByIndex(1);
    await todoItem.dblclick();
    const checkbox = todoApp.getTodoCheckboxByIndex(1);
    await expect(checkbox).not.toBeVisible();
    await TodoAppHelpers.checkNumberOfTodos(todoApp.page, 3);
  });

  test('should save edits on blur', async () => {
    const todoItem = todoApp.getTodoItemByIndex(1);
    await todoItem.dblclick();
    const editInput = todoItem.getByRole('textbox', { name: 'Edit' });
    await editInput.fill('buy some sausages');
    await editInput.dispatchEvent('blur');

    const titles = await todoApp.getTodoTitles();
    expect(titles).toEqual([TODO_ITEMS[0], 'buy some sausages', TODO_ITEMS[2]]);
    await TodoAppHelpers.checkTodoExists(todoApp.page, 'buy some sausages');
  });

  test('should trim entered text', async () => {
    await todoApp.editTodoByIndex(1, '    buy some sausages    ');

    const titles = await todoApp.getTodoTitles();
    expect(titles).toEqual([TODO_ITEMS[0], 'buy some sausages', TODO_ITEMS[2]]);
    await TodoAppHelpers.checkTodoExists(todoApp.page, 'buy some sausages');
  });

  test('should remove the item if an empty text string was entered', async () => {
    await todoApp.deleteTodoByIndex(1);

    const titles = await todoApp.getTodoTitles();
    expect(titles).toEqual([TODO_ITEMS[0], TODO_ITEMS[2]]);
  });

  test('should cancel edits on escape', async () => {
    const todoItem = todoApp.getTodoItemByIndex(1);
    await todoItem.dblclick();
    const editInput = todoItem.getByRole('textbox', { name: 'Edit' });
    await editInput.fill('buy some sausages');
    await editInput.press('Escape');

    const titles = await todoApp.getTodoTitles();
    expect(titles).toEqual([...TODO_ITEMS]);
  });
});

test.describe('Counter - Regression Tests', () => {
  let todoApp: TodoAppPage;

  test.beforeEach(async ({ page }) => {
    todoApp = new TodoAppPage(page);
    await todoApp.goto();
  });

  test('should display the current number of todo items', async () => {
    await todoApp.addTodo(TODO_ITEMS[0]);
    let countText = await todoApp.getTodoCountText();
    expect(countText).toContain('1');

    await todoApp.addTodo(TODO_ITEMS[1]);
    countText = await todoApp.getTodoCountText();
    expect(countText).toContain('2');

    await TodoAppHelpers.checkNumberOfTodos(todoApp.page, 2);
  });
});

test.describe('Clear completed button - Regression Tests', () => {
  let todoApp: TodoAppPage;

  test.beforeEach(async ({ page }) => {
    todoApp = new TodoAppPage(page);
    await todoApp.goto();
    await todoApp.addTodos(TODO_ITEMS as unknown as string[]);
  });

  test('should display the correct text', async () => {
    await todoApp.completeTodoByIndex(0);
    await todoApp.verifyClearCompletedIsVisible();
  });

  test('should remove completed items when clicked', async () => {
    await todoApp.completeTodoByIndex(1);
    await todoApp.clearCompleted();
    
    const count = await todoApp.getTodoCount();
    expect(count).toBe(2);
    
    const titles = await todoApp.getTodoTitles();
    expect(titles).toEqual([TODO_ITEMS[0], TODO_ITEMS[2]]);
  });

  test('should be hidden when there are no items that are completed', async () => {
    await todoApp.completeTodoByIndex(0);
    await todoApp.clearCompleted();
    await todoApp.verifyClearCompletedIsHidden();
  });
});

test.describe('Persistence - Regression Tests', () => {
  let todoApp: TodoAppPage;

  test.beforeEach(async ({ page }) => {
    todoApp = new TodoAppPage(page);
    await todoApp.goto();
  });

  test('should persist its data', async () => {
    await todoApp.addTodos([TODO_ITEMS[0], TODO_ITEMS[1]]);

    const firstCheckbox = todoApp.getTodoCheckboxByIndex(0);
    await todoApp.completeTodoByIndex(0);
    
    let titles = await todoApp.getTodoTitles();
    expect(titles).toEqual([TODO_ITEMS[0], TODO_ITEMS[1]]);
    await expect(firstCheckbox).toBeChecked();

    await TodoAppHelpers.checkNumberOfCompletedTodos(todoApp.page, 1);

    await todoApp.reloadAndWait();
    
    titles = await todoApp.getTodoTitles();
    expect(titles).toEqual([TODO_ITEMS[0], TODO_ITEMS[1]]);
    await expect(firstCheckbox).toBeChecked();
  });
});

test.describe('Routing - Regression Tests', () => {
  let todoApp: TodoAppPage;

  test.beforeEach(async ({ page }) => {
    todoApp = new TodoAppPage(page);
    await todoApp.goto();
    await todoApp.addTodos(TODO_ITEMS as unknown as string[]);
    await TodoAppHelpers.checkTodoExists(todoApp.page, TODO_ITEMS[0]);
  });

  test('should allow me to display active items', async () => {
    await todoApp.completeTodoByIndex(1);

    await TodoAppHelpers.checkNumberOfCompletedTodos(todoApp.page, 1);
    await todoApp.clickFilter('active');
    
    const count = await todoApp.getTodoCount();
    expect(count).toBe(2);
    
    const titles = await todoApp.getTodoTitles();
    expect(titles).toEqual([TODO_ITEMS[0], TODO_ITEMS[2]]);
  });

  test('should respect the back button', async () => {
    await todoApp.completeTodoByIndex(1);
    await TodoAppHelpers.checkNumberOfCompletedTodos(todoApp.page, 1);

    await todoApp.clickFilter('all');
    let count = await todoApp.getTodoCount();
    expect(count).toBe(3);

    await todoApp.clickFilter('active');
    count = await todoApp.getTodoCount();
    expect(count).toBe(2);

    await todoApp.clickFilter('completed');
    count = await todoApp.getTodoCount();
    expect(count).toBe(1);

    await todoApp.goBack();
    count = await todoApp.getTodoCount();
    expect(count).toBe(2);

    await todoApp.goBack();
    count = await todoApp.getTodoCount();
    expect(count).toBe(3);
  });

  test('should allow me to display completed items', async () => {
    await todoApp.completeTodoByIndex(1);
    await TodoAppHelpers.checkNumberOfCompletedTodos(todoApp.page, 1);
    await todoApp.clickFilter('completed');
    
    const count = await todoApp.getTodoCount();
    expect(count).toBe(1);
  });

  test('should allow me to display all items', async () => {
    await todoApp.completeTodoByIndex(1);
    await TodoAppHelpers.checkNumberOfCompletedTodos(todoApp.page, 1);
    await todoApp.clickFilter('active');
    await todoApp.clickFilter('completed');
    await todoApp.clickFilter('all');
    
    const count = await todoApp.getTodoCount();
    expect(count).toBe(3);
  });

  test('should highlight the currently applied filter', async () => {
    await todoApp.verifyFilterIsSelected('all');

    await todoApp.clickFilter('active');
    await todoApp.verifyFilterIsSelected('active');

    await todoApp.clickFilter('completed');
    await todoApp.verifyFilterIsSelected('completed');
  });
});
