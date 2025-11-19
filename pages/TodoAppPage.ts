import { Page, Locator, expect } from '@playwright/test';

/**
 * TodoAppPage - Page Object Model for TodoMVC application
 * Naming Conventions Applied:
 * - PascalCase for class names
 * - camelCase for methods and properties
 * - UPPERCASE for constants
 * - No underscores in names
 * - Line length < 80 characters
 * 
 * Encapsulates all UI interactions and element selectors.
 * Follows OOP principles with private selectors and public methods.
 */
export class TodoAppPage {
  readonly page: Page;

  private readonly newTodoInput: Locator;

  private readonly todoList: Locator;

  private readonly todoItem: Locator;

  private readonly todoTitle: Locator;

  private readonly todoCount: Locator;

  private readonly markAllCheckbox: Locator;

  private readonly clearCompletedButton: Locator;

  private readonly filterLinks = {
    all: (page: Page) => page.getByRole('link', { name: 'All' }),
    active: (page: Page) =>
      page.getByRole('link', { name: 'Active' }),
    completed: (page: Page) =>
      page.getByRole('link', { name: 'Completed' }),
  };

  /**
   * Constructor - Initialize TodoAppPage with page context
   * @param page - Playwright page object
   */
  constructor(page: Page) {
    this.page = page;
    this.newTodoInput =
      page.getByPlaceholder('What needs to be done?');
    this.todoList = page.locator('.todo-list');
    this.todoItem = page.getByTestId('todo-item');
    this.todoTitle = page.getByTestId('todo-title');
    this.todoCount = page.getByTestId('todo-count');
    this.markAllCheckbox =
      page.getByLabel('Mark all as complete');
    this.clearCompletedButton =
      page.getByRole('button', { name: 'Clear completed' });
  }

  /**
   * Navigate to the TodoMVC application
   */
  async goto(): Promise<void> {
    await this.page.goto(
      'https://demo.playwright.dev/todomvc'
    );
  }

  /**
   * Add a single todo item
   * @param text - The todo text to add
   */
  async addTodo(text: string): Promise<void> {
    await this.newTodoInput.fill(text);
    await this.newTodoInput.press('Enter');
  }

  /**
   * Add multiple todo items
   * @param texts - Array of todo texts to add
   */
  async addTodos(texts: string[]): Promise<void> {
    for (const text of texts) {
      await this.addTodo(text);
    }
  }

  /**
   * Get all todo items
   * @returns Locator for all todo items
   */
  getTodoItems(): Locator {
    return this.todoItem;
  }

  /**
   * Get a specific todo item by index
   * @param index - Zero-based index of the todo item
   * @returns Locator for the specific todo item
   */
  getTodoItemByIndex(index: number): Locator {
    return this.todoItem.nth(index);
  }

  /**
   * Get a todo's checkbox by index
   * @param index - Zero-based index of the todo item
   * @returns Locator for the checkbox
   */
  getTodoCheckboxByIndex(index: number): Locator {
    return this.getTodoItemByIndex(index).getByRole('checkbox');
  }

  /**
   * Mark a todo as completed by index
   * @param index - Zero-based index of the todo item
   */
  async completeTodoByIndex(index: number): Promise<void> {
    await this.getTodoCheckboxByIndex(index).check();
  }

  /**
   * Unmark a todo as completed by index
   * @param index - Zero-based index of the todo item
   */
  async uncompleteTodoByIndex(index: number): Promise<void> {
    await this.getTodoCheckboxByIndex(index).uncheck();
  }

  /**
   * Edit a todo item by index
   * @param index - Zero-based index of the todo item
   * @param newText - New text for the todo
   */
  async editTodoByIndex(
    index: number,
    newText: string
  ): Promise<void> {
    const todoItem = this.getTodoItemByIndex(index);
    await todoItem.dblclick();
    const editInput = todoItem.getByRole('textbox', {
      name: 'Edit',
    });
    await editInput.fill(newText);
    await editInput.press('Enter');
  }

  /**
   * Delete a todo by editing it to empty and confirming
   * @param index - Zero-based index of the todo item
   */
  async deleteTodoByIndex(index: number): Promise<void> {
    const todoItem = this.getTodoItemByIndex(index);
    await todoItem.dblclick();
    const editInput = todoItem.getByRole('textbox', {
      name: 'Edit',
    });
    await editInput.fill('');
    await editInput.press('Enter');
  }

  /**
   * Mark all todos as completed
   */
  async markAllAsCompleted(): Promise<void> {
    await this.markAllCheckbox.check();
  }

  /**
   * Unmark all todos as completed
   */
  async unmarkAll(): Promise<void> {
    await this.markAllCheckbox.uncheck();
  }

  /**
   * Clear all completed todos
   */
  async clearCompleted(): Promise<void> {
    await this.clearCompletedButton.click();
  }

  /**
   * Get the count of todo items
   * @returns Promise resolving to the number of todos
   */
  async getTodoCount(): Promise<number> {
    return await this.todoItem.count();
  }

  /**
   * Get all todo titles as an array of strings
   * @returns Promise resolving to array of todo titles
   */
  async getTodoTitles(): Promise<string[]> {
    return await this.todoTitle.allTextContents();
  }

  /**
   * Verify if new todo input is visible and empty
   */
  async verifyNewTodoInputVisible(): Promise<void> {
    await expect(this.newTodoInput).toBeVisible();
    await expect(this.newTodoInput).toBeEmpty();
  }

  /**
   * Verify if a todo item has the completed class
   * @param index - Zero-based index of the todo item
   */
  async verifyTodoIsCompleted(index: number): Promise<void> {
    await expect(
      this.getTodoItemByIndex(index)
    ).toHaveClass(/completed/);
  }

  /**
   * Verify if a todo item does NOT have completed class
   * @param index - Zero-based index of the todo item
   */
  async verifyTodoIsNotCompleted(
    index: number
  ): Promise<void> {
    await expect(
      this.getTodoItemByIndex(index)
    ).not.toHaveClass(/completed/);
  }

  /**
   * Verify if the mark all checkbox is checked
   */
  async verifyMarkAllIsChecked(): Promise<void> {
    await expect(this.markAllCheckbox).toBeChecked();
  }

  /**
   * Verify if the mark all checkbox is NOT checked
   */
  async verifyMarkAllIsNotChecked(): Promise<void> {
    await expect(this.markAllCheckbox).not.toBeChecked();
  }

  /**
   * Verify if clear completed button is visible
   */
  async verifyClearCompletedIsVisible(): Promise<void> {
    await expect(this.clearCompletedButton).toBeVisible();
  }

  /**
   * Verify if clear completed button is hidden
   */
  async verifyClearCompletedIsHidden(): Promise<void> {
    await expect(this.clearCompletedButton).toBeHidden();
  }

  /**
   * Click on a filter link
   * @param filter - The filter: 'all', 'active', or 'completed'
   */
  async clickFilter(
    filter: 'all' | 'active' | 'completed'
  ): Promise<void> {
    const filterLink = this.filterLinks[filter](this.page);
    await filterLink.click();
  }

  /**
   * Verify if a filter link has the selected class
   * @param filter - The filter: 'all', 'active', or 'completed'
   */
  async verifyFilterIsSelected(
    filter: 'all' | 'active' | 'completed'
  ): Promise<void> {
    const filterLink = this.filterLinks[filter](this.page);
    await expect(filterLink).toHaveClass('selected');
  }

  /**
   * Get the todo count text
   * @returns Promise resolving to the count text
   */
  async getTodoCountText(): Promise<string | null> {
    return await this.todoCount.textContent();
  }

  /**
   * Reload the page and wait for todos to be restored
   */
  async reloadAndWait(): Promise<void> {
    await this.page.reload();
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Go back in browser history
   */
  async goBack(): Promise<void> {
    await this.page.goBack();
  }

  /**
   * Verify the page title
   * @param titlePattern - Pattern to match against page title
   */
  async verifyPageTitle(titlePattern: RegExp): Promise<void> {
    await expect(this.page).toHaveTitle(titlePattern);
  }
}
