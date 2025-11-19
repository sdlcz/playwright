# Coding Standards & Naming Conventions

**Based on:** [ktaranov/naming-convention JavaScript Guide](https://github.com/ktaranov/naming-convention/blob/master/JavaScript%20Name%20and%20Coding%20Conventions.md)

## Quick Reference

| Item | Convention | Example |
|------|-----------|---------|
| **Function names** | camelCase | `helloWorld()`, `addTodo()`, `getTodoCount()` |
| **Function arguments** | camelCase | `isShow`, `expectedCount`, `todoItem` |
| **Local variables** | camelCase | `firstName`, `todoApp`, `fullPrice` |
| **Global variables** | PascalCase | `GlobalConfig`, `AppState`, `TodoAppPage` |
| **Class names** | PascalCase | `TodoAppPage`, `TodoAppHelpers`, `LoginPage` |
| **Constants** | UPPERCASE | `PI`, `TODO_ITEMS`, `STORAGE_KEY`, `MAX_RETRY_COUNT` |
| **⚠️ NO Underscores** | Ever | ✗ `todo_item`, `_private`, `$var`, `secret_sauce` |
| **⚠️ NO Hyphens** | Ever | ✗ `my-var`, `hello-world` |

## Naming Conventions

### ⚠️ CRITICAL RULE: NO UNDERSCORES

**Never use underscores in any names**, including:

- ✗ Variable names: `todo_item`, `new_todo`
- ✗ Function names: `get_todos()`, `add_todo_item()`
- ✗ Parameters: `todo_index`, `expected_count`
- ✗ Object properties: `user_name`, `password_hash`
- ✗ Private properties: `_todoCount` (use `private` keyword instead)
- ✗ String values: `standard_user`, `secret_sauce`

**Also forbidden:**

- ✗ Hyphens in names: `my-variable`, `hello-world`
- ✗ Dollar sign prefix: `$variable`, `$value`

**The ONLY exception:** UPPERCASE CONSTANTS can use underscores between words

- ✓ `TODO_ITEMS`, `API_KEY`, `STORAGE_KEY`, `MAX_RETRY_COUNT`

### 1. Function Names - camelCase

Functions should use camelCase with a descriptive verb prefix.

```typescript
// ✓ Good
async addTodo(text: string): Promise<void> { }
async getTodoCount(): Promise<number> { }
async completeTodoByIndex(index: number): Promise<void> { }

// ✗ Bad
async AddTodo(text: string): Promise<void> { }
async get_todo_count(): Promise<number> { }
async completeTodo_byIndex(index: number): Promise<void> { }
```

### 2. Class Names - PascalCase

Classes should use PascalCase (also known as UpperCamelCase).

```typescript
// ✓ Good
export class TodoAppPage { }
export class TodoAppHelpers { }

// ✗ Bad
export class todoAppPage { }
export class todo_app_page { }
```

### 3. Variables & Properties - camelCase

Local variables and object properties should use camelCase.

```typescript
// ✓ Good
let todoApp: TodoAppPage;
const newTodoInput: Locator;
let todoCount: number = 0;

// ✗ Bad
let TodoApp: TodoAppPage;
let new_todo_input: Locator;
let $todoCount: number = 0;
```

### 4. Constants - UPPERCASE

Constants should use UPPERCASE with underscores separating words.

```typescript
// ✓ Good
const TODO_ITEMS = ['buy milk', 'feed cat'];
private static readonly STORAGE_KEY = 'react-todos';

// ✗ Bad
const todoItems = ['buy milk', 'feed cat'];
const StorageKey = 'react-todos';
```

### 5. Function Arguments - camelCase

Function parameters should use camelCase.

```typescript
// ✓ Good
static async checkNumberOfTodos(
  page: Page,
  expectedCount: number
): Promise<void> { }

// ✗ Bad
static async checkNumberOfTodos(
  Page: Page,
  ExpectedCount: number
): Promise<void> { }
```

## Code Formatting

### 1. Spacing Around Operators

Always add spaces around operators for readability.

```typescript
// ✓ Good
const fullPrice = price * 100 / discount;
const values = ['Volvo', 'Saab', 'Fiat'];
let x = y + z;

// ✗ Bad
const fullPrice=price*100/discount;
const values=['Volvo','Saab','Fiat'];
let x=y+z;
```

### 2. Code Indentation - 4 Spaces

Use 4 spaces for indentation (never tabs).

```typescript
// ✓ Good
if (time < 20) {
    greeting = 'Good day';
} else {
    greeting = 'Good evening';
}

// ✗ Bad (using tabs or 2 spaces inconsistently)
if (time < 20) {
  greeting = 'Good day';
} else {
    greeting = 'Good evening';
}
```

### 3. Complex Statements - Opening Brace on Same Line

Place the opening brace on the same line as the statement.

```typescript
// ✓ Good
if (time < 20) {
    greeting = 'Good day';
} else {
    greeting = 'Good evening';
}

function toCelsius(fahrenheit) {
    return (5/9) * (fahrenheit - 32);
}

// ✗ Bad
if (time < 20)
{
    greeting = 'Good day';
}
else
{
    greeting = 'Good evening';
}
```

### 4. Object Definitions

Format objects with proper spacing and line breaks.

```typescript
// ✓ Good
const person = {
    firstName: 'John',
    lastName: 'Doe',
    age: 50,
    eyeColor: 'blue'
};

// Short objects can be on one line
const person = { firstName: 'John', lastName: 'Doe', age: 50 };

// ✗ Bad
const person = {
    firstName: 'John',
    lastName: 'Doe',
    age: 50,
    eyeColor: 'blue',
};
```

### 5. Line Length < 80 Characters

Keep lines under 80 characters by wrapping long statements.

```typescript
// ✓ Good - Lines wrapped appropriately
async editTodoByIndex(
    index: number,
    newText: string
): Promise<void> {
    const todoItem = this.getTodoItemByIndex(index);
    await todoItem.dblclick();
}

// ✗ Bad - Lines too long
async editTodoByIndex(index: number, newText: string): Promise<void> { const todoItem = this.getTodoItemByIndex(index); await todoItem.dblclick(); }
```

## Applied Standards in This Project

### TodoAppPage.ts

- **PascalCase** class name: `TodoAppPage`
- **camelCase** methods: `addTodo()`, `getTodoCount()`, `completeTodoByIndex()`
- **camelCase** properties: `newTodoInput`, `todoList`, `todoItem`
- **Lines < 80 chars** with proper wrapping
- **4-space indentation**
- **Proper spacing** around operators

### TodoAppHelpers.ts

- **PascalCase** class name: `TodoAppHelpers`
- **UPPERCASE** constants: `STORAGE_KEY`
- **camelCase** static methods: `checkNumberOfTodos()`, `checkTodoExists()`
- **camelCase** parameters: `expectedCount`, `searchTitle`
- **Lines < 80 chars**
- **Proper spacing** and indentation

### demo-todo-app.spec.ts

- **camelCase** variables: `todoApp`, `titles`, `count`
- **UPPERCASE** constants: `TODO_ITEMS`
- **camelCase** test descriptions and implementations
- **Lines < 80 chars** with proper formatting

### demo-todo-app.regression.spec.ts

- **camelCase** variables: `todoApp`, `count`, `titles`
- **UPPERCASE** constants: `TODO_ITEMS`
- **camelCase** methods and test cases
- **Lines < 80 chars**
- **4-space indentation**

## Best Practices Summary

1. ✓ Use **camelCase** for function names, arguments, and local variables
2. ✓ Use **PascalCase** for global variables and class names
3. ✓ Use **UPPERCASE** for constants (with underscores between words)
4. ✓ Always include **spaces around operators** (=, +, -, *, /)
5. ✓ Use **4 spaces** for indentation (never tabs)
6. ✓ Keep lines **< 80 characters**
7. ✓ Put opening brace on **same line** for complex statements
8. ✓ Always end **simple statements with semicolon**
9. ✗ **NEVER use underscores** in variable/function/parameter names
10. ✗ **NEVER use hyphens** in JavaScript names
11. ✗ Never prefix with **$ sign**
12. ✗ Don't use tabs - use 4 spaces for indentation

## ⚠️ COMPREHENSIVE NAMING STANDARDS

### Forbidden Characters & Patterns

This applies to **ALL code** in this project:

**No Underscores:**

- ✗ ~~`standard_user`~~ → ✓ `standardUser`
- ✗ ~~`secret_sauce`~~ → ✓ `secretSauce`
- ✗ ~~`locked_out_user`~~ → ✓ `lockedOutUser`
- ✗ ~~`get_todo_count()`~~ → ✓ `getTodoCount()`

**No Hyphens:**

- ✗ ~~`my-variable`~~ → ✓ `myVariable`
- ✗ ~~`hello-world`~~ → ✓ `helloWorld`

**No Dollar Signs:**

- ✗ ~~`$variable`~~ → ✓ `variable`
- ✗ ~~`$count`~~ → ✓ `count`

**Exception:** UPPERCASE constants with underscores

- ✓ `TODO_ITEMS`, `API_KEY`, `STORAGE_KEY`, `MAX_RETRY_COUNT`, `PI`

## Real-World Examples

### ✓ Correct Naming

```typescript
// Functions - camelCase
function helloWorld() { }
async function addTodo(text: string) { }
async function getTodoCount(): number { }

// Function arguments and local variables - camelCase
function hello(isShow: boolean) {
    const firstName = "John";
    const lastName = "Doe";
    const price = 19.90;
    const discount = 0.10;
    const fullPrice = price * 100 / discount;
}

// Global variables and Classes - PascalCase
const GlobalConfig = { ... };
const AppState = { ... };
class TodoAppPage { }

// Constants - UPPERCASE
const PI = 3.14159;
const MAX_RETRY_COUNT = 5;
const STORAGE_KEY = 'react-todos';

// Proper spacing around operators
const x = y + z;
const values = ["Volvo", "Saab", "Fiat"];

// 4-space indentation
if (time < 20) {
    greeting = "Good day";
} else {
    greeting = "Good evening";
}
```

### ✗ Incorrect Naming (Do NOT use)

```typescript
// ✗ Underscores
function get_todos() { }
const my_variable = 10;
const standard_user = "user";

// ✗ Hyphens
const my-var = 5;
const hello-world = "hi";

// ✗ Dollar signs
const $variable = 10;
const $count = 0;

// ✗ Mixed conventions
const TODO_items = []; // Should be camelCase or UPPERCASE
const localVARIABLE = 5; // Inconsistent casing
```

## File References

- **Pages:** `tests-examples/pages/TodoAppPage.ts`
- **Helpers:** `tests-examples/utils/TodoAppHelpers.ts`
- **Smoke Tests:** `tests-examples/demo-todo-app.spec.ts`
- **Regression Tests:** `tests-examples/demo-todo-app.regression.spec.ts`

All files follow the above conventions and are ready for production use.
